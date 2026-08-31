import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import * as schema from "../db/schema";

// We use 'any' for the local dev sqlite to avoid requiring the types in production
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = ReturnType<typeof drizzleD1<typeof schema>> | any;

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delayMs = 500,
): Promise<T> {
  let attempt = 1;
  while (attempt <= maxRetries) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(`DB Operation failed after ${maxRetries} attempts:`, error);
        throw error;
      }
      console.warn(
        `DB Operation failed (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= 2;
      attempt++;
    }
  }
  throw new Error("Unreachable");
}

let dbInstance: Database | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let DatabaseClass: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let drizzleSqlite: any = null;

// Use top-level await for dev dependencies so they are tree-shaken in production
if (import.meta.env.DEV) {
  try {
    DatabaseClass = (await import("better-sqlite3")).default;
    drizzleSqlite = (await import("drizzle-orm/better-sqlite3")).drizzle;
  } catch (e) {
    console.warn("Failed to load local SQLite driver", e);
  }
}

function getD1Binding(): D1Database | undefined {
  // Check globalThis first (set explicitly by server.ts for reliable object binding)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = globalThis as any;
  if (g.__CF_ENV__?.DB) return g.__CF_ENV__.DB as D1Database;
  if (g.__CF_ENV__?.bluesdufleuve_db) return g.__CF_ENV__.bluesdufleuve_db as D1Database;

  // Fallback: process.env (works for string values, may work for objects too)
  if (typeof process === "undefined") return undefined;
  const env = process.env as Record<string, unknown>;
  const db = env.DB as D1Database | undefined;
  if (db) return db;
  return env.bluesdufleuve_db as D1Database | undefined;
}

export function getDb(): Database {
  try {
    const d1Binding = getD1Binding();

    if (d1Binding) {
      if (!dbInstance) {
        dbInstance = drizzleD1(d1Binding, { schema });
      }
      return dbInstance;
    }

    if (!import.meta.env.DEV || !DatabaseClass || !drizzleSqlite) {
      if (!import.meta.env.DEV) {
        console.warn("D1 binding not found in production. Returning mock DB.");
      }
      // If we don't have D1 in production, and no local sqlite is available, we shouldn't crash.
      // But we can't use better-sqlite3. So we throw or mock.
      throw new Error(
        "D1 Database binding not found and local SQLite is unavailable in production.",
      );
    }

    if (dbInstance) return dbInstance;

    console.warn("D1 database binding not found, using local SQLite database for development.");
    const sqlite = new DatabaseClass("local-dev.db");

    try {
      // Check if tables exist by querying one
      const tableInfo = sqlite.pragma("table_info(newsletter)") as Array<{ name: string }>;
      if (
        tableInfo.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tableInfo.some((col: any) => col.name === "dateInscription")
      ) {
        console.warn("Old schema detected. Please run migrations to update.");
      }
    } catch (e) {
      console.warn("Table check failed, continuing...", e);
    }

    dbInstance = drizzleSqlite(sqlite, { schema });
    return dbInstance;
  } catch (e) {
    console.error("Fatal DB init error!", e);
    throw e;
  }
}
