import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const sql = neon(process.env.DATABASE_URL!);

// @ts-expect-error: This line might cause a type issue depending on the structure of drizzle's client.
export const db = drizzle({ client: sql });
