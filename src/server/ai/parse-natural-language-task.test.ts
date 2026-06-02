import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Provide the OPENAI_API_KEY so env validation passes in tests
vi.mock("@/lib/env", () => ({
  env: {
    OPENAI_API_KEY: "sk-test-key",
    DATABASE_URL: "postgresql://test:test@localhost/test",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test",
    CLERK_SECRET_KEY: "sk_test",
    NODE_ENV: "test",
  },
}));

import { parseNaturalLanguageTask } from "./parse-natural-language-task";

function makeOpenAiResponse(content: string) {
  return new Response(
    JSON.stringify({
      choices: [{ message: { content } }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("parseNaturalLanguageTask — input validation", () => {
  it("throws VALIDATION when input is too short (< 8 chars)", async () => {
    await expect(parseNaturalLanguageTask("hi")).rejects.toMatchObject({
      code: "VALIDATION",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("throws VALIDATION when input exceeds 500 characters", async () => {
    const longInput = "a".repeat(501);
    await expect(parseNaturalLanguageTask(longInput)).rejects.toMatchObject({
      code: "VALIDATION",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("strips control characters before sending to OpenAI", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValue(
      makeOpenAiResponse(
        JSON.stringify({ content: "Call the dentist", expiresAt: null })
      )
    );

    await parseNaturalLanguageTask("Call\x00 the\x1F dentist tomorrow");

    const body = JSON.parse((mockFetch.mock.calls[0]?.[1] as RequestInit)?.body as string);
    expect(body.messages[1].content).toBe("Call the dentist tomorrow");
  });
});

describe("parseNaturalLanguageTask — API error handling", () => {
  it("throws INTERNAL when OpenAI returns non-ok status", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("Unauthorized", { status: 401 })
    );

    await expect(
      parseNaturalLanguageTask("Remind me to call dentist")
    ).rejects.toMatchObject({ code: "INTERNAL" });
  });

  it("throws INTERNAL when AI returns empty choices", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ choices: [] }), { status: 200 })
    );

    await expect(
      parseNaturalLanguageTask("Remind me to call dentist")
    ).rejects.toMatchObject({ code: "INTERNAL" });
  });

  it("throws INTERNAL when AI returns malformed JSON", async () => {
    vi.mocked(fetch).mockResolvedValue(makeOpenAiResponse("not valid json {{{"));

    await expect(
      parseNaturalLanguageTask("Remind me to call dentist")
    ).rejects.toMatchObject({ code: "INTERNAL" });
  });

  it("throws VALIDATION when AI returns JSON without required fields", async () => {
    vi.mocked(fetch).mockResolvedValue(
      makeOpenAiResponse(JSON.stringify({ someField: "unexpected" }))
    );

    await expect(
      parseNaturalLanguageTask("Remind me to call dentist")
    ).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("parseNaturalLanguageTask — success cases", () => {
  it("returns parsed task with content and null expiresAt", async () => {
    vi.mocked(fetch).mockResolvedValue(
      makeOpenAiResponse(
        JSON.stringify({ content: "Call the dentist", expiresAt: null })
      )
    );

    const result = await parseNaturalLanguageTask(
      "Remind me to call the dentist"
    );

    expect(result).toEqual({ content: "Call the dentist", expiresAt: null });
  });

  it("returns parsed task with ISO 8601 expiresAt", async () => {
    vi.mocked(fetch).mockResolvedValue(
      makeOpenAiResponse(
        JSON.stringify({
          content: "Submit tax return",
          expiresAt: "2025-04-15T00:00:00.000Z",
        })
      )
    );

    const result = await parseNaturalLanguageTask(
      "Submit my tax return on April 15"
    );

    expect(result.content).toBe("Submit tax return");
    expect(result.expiresAt).toBe("2025-04-15T00:00:00.000Z");
  });
});
