import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../db/schema";

export type Database =
  | ReturnType<typeof drizzleD1<typeof schema>>
  | ReturnType<typeof drizzleSqlite<typeof schema>>;

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

const D1_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  tel TEXT NOT NULL,
  formation TEXT NOT NULL,
  motivation TEXT NOT NULL,
  date_inscription INTEGER NOT NULL,
  status TEXT DEFAULT 'en_attente' NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  sujet TEXT NOT NULL,
  message TEXT NOT NULL,
  date_envoi INTEGER NOT NULL,
  status TEXT DEFAULT 'non_lu' NOT NULL
);

CREATE TABLE IF NOT EXISTS newsletter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  date_inscription INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  published_at INTEGER NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
  updated_at INTEGER,
  is_published INTEGER DEFAULT 1 NOT NULL
);
`;

let dbInstance: Database | null = null;
let schemaReady = false;

function getD1Binding(): D1Database | undefined {
  const env = process.env as any;
  return env.DB ?? env.bluesdufleuve_db;
}

function isLocalDev(): boolean {
  const env = process.env as any;
  return (
    env.NODE_ENV === "development" || env.MODE === "development" || import.meta.env?.DEV === true
  );
}

export async function ensureD1Schema(d1: D1Database): Promise<void> {
  if (schemaReady) return;
  try {
    await d1.exec(D1_SCHEMA_SQL);
    schemaReady = true;
  } catch (e) {
    console.warn("Failed to create D1 schema (non-critical):", e);
  }
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
      try {
        sqlite.exec(D1_SCHEMA_SQL);
      } catch {}
      dbInstance = drizzleSqlite(sqlite, { schema });
      return dbInstance;
    }

    if (dbInstance) return dbInstance;

    console.warn("D1 database binding not found, using local SQLite database for development.");
    const sqlite = new Database("local-dev.db");

    try {
      try {
        const tableInfo = sqlite.pragma("table_info(newsletter)") as Array<{ name: string }>;
        if (tableInfo.length > 0 && tableInfo.some((col) => col.name === "dateInscription")) {
          sqlite.exec("DROP TABLE newsletter;");
        }
      } catch {}
      sqlite.exec(D1_SCHEMA_SQL);
    } catch (e) {
      console.warn("Table might already exist, continuing...", e);
    }

    dbInstance = drizzleSqlite(sqlite, { schema });
    return dbInstance;
  } catch (e) {
    console.error("Fatal DB init error, using in-memory DB as fallback!", e);
    const sqlite = new Database(":memory:");
    try {
      sqlite.exec(D1_SCHEMA_SQL);
    } catch {}
    dbInstance = drizzleSqlite(sqlite, { schema });
    return dbInstance;
  }
}
