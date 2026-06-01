import { hashPassword } from "../src/lib/auth";

async function createAdminRemote() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log("Usage: npx tsx scripts/create-admin-remote.ts <email> <password>");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const adminId = crypto.randomUUID();

  console.log(`SQL pour créer l'admin sur la base distante :`);
  console.log(``);
  console.log(`INSERT INTO admins (id, email, password_hash) VALUES ('${adminId}', '${email}', '${passwordHash}');`);
  console.log(``);
  console.log(`Exécutez cette commande :`);
  console.log(`npx wrangler d1 execute bluesdufleuve-db --remote --command="INSERT INTO admins (id, email, password_hash) VALUES ('${adminId}', '${email}', '${passwordHash}')"`);
}

createAdminRemote();
