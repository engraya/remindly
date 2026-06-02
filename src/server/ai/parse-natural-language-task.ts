import { z } from "zod";
import { AppError } from "@/server/errors";
import { env } from "@/lib/env";
import { PARSE_TASK_SYSTEM_PROMPT } from "./prompts";

const MAX_INPUT_LENGTH = 500;

const aiTaskSchema = z.object({
  content: z.string().min(8),
  expiresAt: z.string().datetime().nullable().optional(),
});

export type ParsedNaturalLanguageTask = z.infer<typeof aiTaskSchema>;

export async function parseNaturalLanguageTask(
  input: string
): Promise<ParsedNaturalLanguageTask> {
  const sanitized = input.replace(/[\x00-\x1F\x7F]/g, "").trim();

  if (sanitized.length < 8) {
    throw new AppError("VALIDATION", "Task description too short");
  }
  if (sanitized.length > MAX_INPUT_LENGTH) {
    throw new AppError(
      "VALIDATION",
      `Task description must be under ${MAX_INPUT_LENGTH} characters`
    );
  }

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AppError(
      "INTERNAL",
      "AI features require GEMINI_API_KEY to be configured"
    );
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: PARSE_TASK_SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: sanitized }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new AppError("INTERNAL", "Failed to parse task with AI");
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) {
    throw new AppError("INTERNAL", "Empty AI response");
  }

  let jsonData: unknown;
  try {
    jsonData = JSON.parse(raw);
  } catch {
    throw new AppError("INTERNAL", "AI returned malformed JSON");
  }

  const parsed = aiTaskSchema.safeParse(jsonData);
  if (!parsed.success) {
    throw new AppError("VALIDATION", "AI returned invalid task data");
  }

  return parsed.data;
}
