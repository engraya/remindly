import { describe, it, expect } from "vitest";
import { createTaskSchema } from "./create-task.schema";

describe("createTaskSchema", () => {
  it("accepts valid input", () => {
    const result = createTaskSchema.safeParse({
      collectionId: 1,
      content: "Buy groceries for the week",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short content", () => {
    const result = createTaskSchema.safeParse({
      collectionId: 1,
      content: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid collection id", () => {
    const result = createTaskSchema.safeParse({
      collectionId: 0,
      content: "Valid task content here",
    });
    expect(result.success).toBe(false);
  });
});
