import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { AppError } from "@/server/errors";

let mutationLimiter: Ratelimit | null = null;
let aiLimiter: Ratelimit | null = null;

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function getMutationLimiter(): Ratelimit | null {
  const redis = getRedisClient();
  if (!redis) return null;

  if (!mutationLimiter) {
    mutationLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 m"),
      analytics: true,
    });
  }
  return mutationLimiter;
}

function getAiLimiter(): Ratelimit | null {
  const redis = getRedisClient();
  if (!redis) return null;

  if (!aiLimiter) {
    aiLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
    });
  }
  return aiLimiter;
}

export async function assertMutationRateLimit(userId: string): Promise<void> {
  const limiter = getMutationLimiter();
  if (!limiter) return;

  const { success } = await limiter.limit(`mutation:${userId}`);
  if (!success) {
    throw new AppError(
      "RATE_LIMITED",
      "Too many requests. Please try again shortly."
    );
  }
}

export async function assertAiRateLimit(userId: string): Promise<void> {
  const limiter = getAiLimiter();
  if (!limiter) return;

  const { success } = await limiter.limit(`ai:${userId}`);
  if (!success) {
    throw new AppError(
      "RATE_LIMITED",
      "AI request limit reached. Please wait a moment before trying again."
    );
  }
}
