import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

// Type pour notre base de données
export type Database = ReturnType<typeof drizzle<typeof schema>>;

/**
 * Fonction pour exécuter des opérations de base de données avec retry logic
 * Utile pour gérer les erreurs transitoires de connexion ou de verrouillage (ex: SQLite SQLITE_BUSY)
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delayMs = 500
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
      console.warn(`DB Operation failed (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      // Increase delay exponentially
      delayMs *= 2;
      attempt++;
    }
  }
  throw new Error("Unreachable");
}

export function getDb(d1: any): Database {
  return drizzle(d1, { schema });
}
