const Database = require("better-sqlite3");
const db = new Database("local-dev.db");
db.exec("ALTER TABLE announcements ADD type text DEFAULT 'info' NOT NULL");
console.log("Migration applied");
