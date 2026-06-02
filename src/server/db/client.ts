import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Lazy initialization — neon() is only called when the db is first accessed,
// not at module import time. This prevents build-time failures when DATABASE_URL
// is not available (e.g., during `next build` in CI or preview deploys).
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return drizzle(neon(url), { schema });
}

let _db: ReturnType<typeof createDb> | undefined;

export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      if (!_db) _db = createDb();
      return _db[prop as keyof ReturnType<typeof createDb>];
    },
  }
) as ReturnType<typeof createDb>;
