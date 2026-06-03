import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../db/schema";

// Type pour notre base de données
export type Database =
  | ReturnType<typeof drizzleD1<typeof schema>>
  | ReturnType<typeof drizzleSqlite<typeof schema>>;

/**
 * Fonction pour exécuter des opérations de base de données avec retry logic
 * Utile pour gérer les erreurs transitoires de connexion ou de verrouillage (ex: SQLite SQLITE_BUSY)
 */
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
      // Increase delay exponentially
      delayMs *= 2;
      attempt++;
    }
  }
  throw new Error("Unreachable");
}

let dbInstance: Database | null = null;

export function getDb(): Database {
  if (dbInstance) return dbInstance;

  // On Cloudflare (Pages/Workers), le binding D1 est injecté dans process.env
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d1Binding = (process.env as any).DB || (process.env as any).bluesdufleuve_db;

  if (d1Binding) {
    // Production: utiliser D1
    dbInstance = drizzleD1(d1Binding, { schema });
    return dbInstance;
  } else {
    // Développement local: utiliser BetterSqlite3
    console.warn("D1 database binding not found, using local SQLite database for development.");

    // Créer une base de données locale
    const sqlite = new Database("local-dev.db");

    // Exécuter les migrations pour créer les tables si nécessaire
    try {
      // Vérifier si la table utilise l'ancienne colonne et la recréer si nécessaire
      try {
        const tableInfo = sqlite.pragma("table_info(newsletter)") as Array<{ name: string }>;
        if (tableInfo.length > 0 && tableInfo.some((col) => col.name === "dateInscription")) {
          sqlite.exec("DROP TABLE newsletter;");
        }
      } catch {
        // Ignorer
      }

      // Créer toutes les tables si elles n'existent pas
      sqlite.exec(`
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
      `);

      sqlite.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nom TEXT NOT NULL,
          email TEXT NOT NULL,
          sujet TEXT NOT NULL,
          message TEXT NOT NULL,
          date_envoi INTEGER NOT NULL,
          status TEXT DEFAULT 'non_lu' NOT NULL
        );
      `);

      sqlite.exec(`
        CREATE TABLE IF NOT EXISTS newsletter (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          date_inscription INTEGER NOT NULL
        );
      `);

      sqlite.exec(`
        CREATE TABLE IF NOT EXISTS admins (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL
        );
      `);

      sqlite.exec(`
        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          admin_id TEXT NOT NULL,
          expires_at INTEGER NOT NULL
        );
      `);

    } catch (e) {
      console.warn("Table might already exist, continuing...", e);
    }

    dbInstance = drizzleSqlite(sqlite, { schema });
    return dbInstance;
  }
}
