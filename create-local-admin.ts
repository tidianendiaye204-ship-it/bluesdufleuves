import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./src/db/schema";
import { hashPassword } from "./src/lib/auth";

async function createLocalAdmin() {
  const email = "admin@test.com";
  const password = "admin123"; // Mot de passe local simple

  console.log("Création du compte admin local...");
  console.log(`Email: ${email}`);
  console.log(`Mot de passe: ${password}`);

  const sqlite = new Database("local-dev.db");
  const db = drizzle(sqlite, { schema });

  const passwordHash = await hashPassword(password);
  const adminId = crypto.randomUUID();

  try {
    await db.insert(schema.admins).values({
      id: adminId,
      email,
      passwordHash,
    });
    console.log("\n✅ Compte admin local créé avec succès !");
    console.log(`   Email: ${email}`);
    console.log(`   Mot de passe: ${password}`);
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

createLocalAdmin();
