import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppError } from "@/server/errors";

// Mock all external dependencies before importing the module under test
vi.mock("@/server/auth/require-user", () => ({
  requireUser: vi.fn(),
}));
vi.mock("@/server/rate-limit", () => ({
  assertMutationRateLimit: vi.fn(),
}));
vi.mock("@/server/repositories/collection.repository", () => ({
  collectionRepository: {
    findByUserId: vi.fn(),
    create: vi.fn(),
    deleteByIdForUser: vi.fn(),
  },
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { requireUser } from "@/server/auth/require-user";
import { assertMutationRateLimit } from "@/server/rate-limit";
import { collectionRepository } from "@/server/repositories/collection.repository";
import { revalidatePath } from "next/cache";
import { collectionService } from "./collection.service";

const mockUser = { id: "user_test123", firstName: "Test", lastName: "User", imageUrl: "" };

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(requireUser).mockResolvedValue(mockUser);
  vi.mocked(assertMutationRateLimit).mockResolvedValue(undefined);
});

describe("collectionService.getForCurrentUser", () => {
  it("returns collections for the authenticated user", async () => {
    const mockCollections = [{ id: 1, name: "Work", tasks: [] }];
    vi.mocked(collectionRepository.findByUserId).mockResolvedValue(
      mockCollections as never
    );

    const result = await collectionService.getForCurrentUser();

    expect(requireUser).toHaveBeenCalledOnce();
    expect(collectionRepository.findByUserId).toHaveBeenCalledWith(mockUser.id);
    expect(result).toEqual(mockCollections);
  });

  it("throws when user is not authenticated", async () => {
    vi.mocked(requireUser).mockRejectedValue(
      new AppError("UNAUTHORIZED", "Not authenticated")
    );

    await expect(collectionService.getForCurrentUser()).rejects.toThrow(
      AppError
    );
  });
});

describe("collectionService.create", () => {
  it("creates a collection with valid input and revalidates path", async () => {
    vi.mocked(collectionRepository.create).mockResolvedValue(undefined as never);

    await collectionService.create({ name: "Work Tasks", color: "Sunset" });

    expect(assertMutationRateLimit).toHaveBeenCalledWith(mockUser.id);
    expect(collectionRepository.create).toHaveBeenCalledWith({
      name: "Work Tasks",
      color: "Sunset",
      userId: mockUser.id,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard", "page");
  });

  it("throws VALIDATION error for invalid input", async () => {
    await expect(
      collectionService.create({ name: "ab", color: "Sunset" })
    ).rejects.toThrow(AppError);

    expect(collectionRepository.create).not.toHaveBeenCalled();
  });

  it("throws when rate limit is exceeded", async () => {
    vi.mocked(assertMutationRateLimit).mockRejectedValue(
      new AppError("RATE_LIMITED", "Too many requests")
    );

    await expect(
      collectionService.create({ name: "Work Tasks", color: "Sunset" })
    ).rejects.toMatchObject({ code: "RATE_LIMITED" });
  });
});

describe("collectionService.delete", () => {
  it("deletes a collection and revalidates path", async () => {
    vi.mocked(collectionRepository.deleteByIdForUser).mockResolvedValue(true);

    await collectionService.delete(1);

    expect(collectionRepository.deleteByIdForUser).toHaveBeenCalledWith(
      1,
      mockUser.id
    );
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard", "page");
  });

  it("throws NOT_FOUND when collection does not belong to user", async () => {
    vi.mocked(collectionRepository.deleteByIdForUser).mockResolvedValue(false);

    await expect(collectionService.delete(999)).rejects.toMatchObject({
      code: "NOT_FOUND",
    });

    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("throws VALIDATION error for invalid collection ID", async () => {
    await expect(collectionService.delete("not-a-number")).rejects.toMatchObject(
      { code: "VALIDATION" }
    );
  });
});
