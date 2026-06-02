import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppError } from "@/server/errors";

vi.mock("@/server/auth/require-user", () => ({
  requireUser: vi.fn(),
}));
vi.mock("@/server/rate-limit", () => ({
  assertMutationRateLimit: vi.fn(),
}));
vi.mock("@/server/auth/assert-ownership", () => ({
  assertCollectionOwner: vi.fn(),
}));
vi.mock("@/server/repositories/task.repository", () => ({
  taskRepository: {
    create: vi.fn(),
    markDone: vi.fn(),
  },
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { requireUser } from "@/server/auth/require-user";
import { assertMutationRateLimit } from "@/server/rate-limit";
import { assertCollectionOwner } from "@/server/auth/assert-ownership";
import { taskRepository } from "@/server/repositories/task.repository";
import { revalidatePath } from "next/cache";
import { taskService } from "./task.service";

const mockUser = { id: "user_test123", firstName: "Test", lastName: "User", imageUrl: "" };

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(requireUser).mockResolvedValue(mockUser);
  vi.mocked(assertMutationRateLimit).mockResolvedValue(undefined);
  vi.mocked(assertCollectionOwner).mockResolvedValue(undefined);
});

describe("taskService.create", () => {
  it("creates a task with valid input", async () => {
    vi.mocked(taskRepository.create).mockResolvedValue(undefined as never);

    await taskService.create({
      collectionId: 1,
      content: "Write unit tests",
      expiresAt: undefined,
    });

    expect(assertMutationRateLimit).toHaveBeenCalledWith(mockUser.id);
    expect(assertCollectionOwner).toHaveBeenCalledWith(mockUser.id, 1);
    expect(taskRepository.create).toHaveBeenCalledWith({
      content: "Write unit tests",
      userId: mockUser.id,
      collectionId: 1,
      expireAt: null,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard", "page");
  });

  it("throws VALIDATION error when content is too short", async () => {
    await expect(
      taskService.create({ collectionId: 1, content: "Short" })
    ).rejects.toMatchObject({ code: "VALIDATION" });

    expect(taskRepository.create).not.toHaveBeenCalled();
  });

  it("throws FORBIDDEN when user does not own collection", async () => {
    vi.mocked(assertCollectionOwner).mockRejectedValue(
      new AppError("FORBIDDEN", "Access denied")
    );

    await expect(
      taskService.create({ collectionId: 99, content: "Valid content here" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("stores expiresAt as a Date when provided", async () => {
    vi.mocked(taskRepository.create).mockResolvedValue(undefined as never);
    const expiresAt = new Date("2025-12-31");

    await taskService.create({
      collectionId: 1,
      content: "Year-end review task",
      expiresAt,
    });

    expect(taskRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ expireAt: expiresAt })
    );
  });
});

describe("taskService.markDone", () => {
  it("marks a task as done and revalidates path", async () => {
    vi.mocked(taskRepository.markDone).mockResolvedValue(true);

    await taskService.markDone(42);

    expect(taskRepository.markDone).toHaveBeenCalledWith(42, mockUser.id);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard", "page");
  });

  it("throws NOT_FOUND when task does not exist or does not belong to user", async () => {
    vi.mocked(taskRepository.markDone).mockResolvedValue(false);

    await expect(taskService.markDone(999)).rejects.toMatchObject({
      code: "NOT_FOUND",
    });

    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("throws VALIDATION error for invalid task ID", async () => {
    await expect(taskService.markDone(-1)).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });
});
