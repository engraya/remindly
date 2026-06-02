import { describe, it, expect } from "vitest";
import { createCollectionSchema } from "./create-collection.schema";

describe("createCollectionSchema", () => {
  it("accepts valid input", () => {
    const result = createCollectionSchema.safeParse({
      name: "Work Tasks",
      color: "Ocean",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short names", () => {
    const result = createCollectionSchema.safeParse({
      name: "abc",
      color: "Ocean",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid colors", () => {
    const result = createCollectionSchema.safeParse({
      name: "Valid Name",
      color: "NotAColor",
    });
    expect(result.success).toBe(false);
  });
});
