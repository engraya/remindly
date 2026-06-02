import { describe, it, expect } from "vitest";
import { AppError, getErrorMessage, getErrorCode } from "./errors";

describe("AppError", () => {
  it("exposes code and message", () => {
    const err = new AppError("FORBIDDEN", "No access");
    expect(err.code).toBe("FORBIDDEN");
    expect(getErrorMessage(err)).toBe("No access");
    expect(getErrorCode(err)).toBe("FORBIDDEN");
  });

  it("handles unknown errors", () => {
    expect(getErrorCode(new Error("x"))).toBe("INTERNAL");
  });
});
