import { c as createServerRpc } from "./createServerRpc-DLtduoDR.js";
import { g as getDb, a as admins, e as eq, s as sessions } from "./db-Dnq2UT9U.js";
import { i as createServerFn, a3 as setCookie$1 } from "./server-DQQzqNuw.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function verifyPassword(password, hash) {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}
function generateId() {
  return crypto.randomUUID();
}
const loginSchema = objectType({
  email: stringType().email(),
  password: stringType().min(1)
});
const loginAdmin_createServerFn_handler = createServerRpc({
  id: "66f21b8f89dac0f16e26e09c8f616aa53937ea2f0a6305ec9e7f83e4ae236351",
  name: "loginAdmin",
  filename: "src/routes/admin.login.tsx"
}, (opts) => loginAdmin.__executeServer(opts));
const loginAdmin = createServerFn({
  method: "POST"
}).inputValidator((data) => loginSchema.parse(data)).handler(loginAdmin_createServerFn_handler, async ({
  data
}) => {
  const db = getDb();
  const adminRows = await db.select().from(admins).where(eq(admins.email, data.email));
  if (adminRows.length === 0) {
    return {
      error: "Identifiants invalides"
    };
  }
  const admin = adminRows[0];
  const valid = await verifyPassword(data.password, admin.passwordHash);
  if (!valid) {
    return {
      error: "Identifiants invalides"
    };
  }
  const sessionId = generateId();
  await db.insert(sessions).values({
    id: sessionId,
    adminId: admin.id,
    expiresAt: Date.now() + 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  setCookie$1("admin_session", sessionId, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax"
  });
  return {
    success: true
  };
});
export {
  loginAdmin_createServerFn_handler
};
