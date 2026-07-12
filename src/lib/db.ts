import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../db/schema";

export type Database =
  ReturnType<typeof drizzleD1<typeof schema>> | ReturnType<typeof drizzleSqlite<typeof schema>>;

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

function getD1Binding(): D1Database | undefined {
  const env = process.env as Record<string, unknown>;
  const db = env.DB as D1Database | undefined;
  if (db) return db;
  return env.bluesdufleuve_db as D1Database | undefined;
}

function isLocalDev(): boolean {
  const env = process.env as Record<string, unknown>;
  return (
    env.NODE_ENV === "development" || env.MODE === "development" || import.meta.env?.DEV === true
  );
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

    if (!isLocalDev()) {
      console.warn("D1 binding not found in production, using in-memory DB");
      const sqlite = new Database(":memory:");
      dbInstance = drizzleSqlite(sqlite, { schema });
      return dbInstance;
    }

    if (dbInstance) return dbInstance;

    console.warn("D1 database binding not found, using local SQLite database for development.");
    const sqlite = new Database("local-dev.db");

    try {
      // Check if tables exist by querying one
      const tableInfo = sqlite.pragma("table_info(newsletter)") as Array<{ name: string }>;
      if (tableInfo.length > 0 && tableInfo.some((col) => col.name === "dateInscription")) {
        console.warn("Old schema detected. Please run migrations to update.");
      }
    } catch (e) {
      console.warn("Table check failed, continuing...", e);
    }

    dbInstance = drizzleSqlite(sqlite, { schema });
    return dbInstance;
  } catch (e) {
    console.error("Fatal DB init error, using in-memory DB as fallback!", e);
    const sqlite = new Database(":memory:");
    dbInstance = drizzleSqlite(sqlite, { schema });
    return dbInstance;
  }
}
