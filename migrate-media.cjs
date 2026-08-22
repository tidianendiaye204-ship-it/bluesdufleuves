const Database = require("better-sqlite3");
const db = new Database("local-dev.db");
db.exec(
  "ALTER TABLE announcements ADD media_url text; ALTER TABLE announcements ADD action_url text;",
);
console.log("Migration applied");
