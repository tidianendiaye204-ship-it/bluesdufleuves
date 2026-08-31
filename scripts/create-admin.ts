import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../src/db/schema";
import { admins } from "../src/db/schema";
import { hashPassword } from "../src/lib/auth";

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log("Usage: npx tsx scripts/create-admin.ts <email> <password>");
    process.exit(1);
  }

  // Utiliser une base SQLite locale pour créer l'admin
  const sqlite = new Database(
    "./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/1ff380e9e4dce17834231ba30c64e1b9d3858074bf18a1be6414098e6b060e6e.sqlite",
  );
  const db = drizzle(sqlite, { schema });

  const passwordHash = await hashPassword(password);
  const adminId = crypto.randomUUID();

  try {
    await db.insert(admins).values({
      id: adminId,
      email,
      passwordHash,
    });
    console.log(`Admin créé avec succès: ${email}`);
    console.log(`ID: ${adminId}`);
  } catch (error) {
    console.error("Erreur lors de la création de l'admin:", error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

createAdmin();
