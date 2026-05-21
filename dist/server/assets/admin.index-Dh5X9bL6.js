import { c as createServerRpc } from "./createServerRpc-Ccmq3ICk.js";
import { g as getDb } from "./db-BZ2-xBa0.js";
import { c as contacts, d as desc, i as inscriptions } from "./schema-BzPAZZ25.js";
import { i as createServerFn } from "./server-co7iUJes.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const getAdminData_createServerFn_handler = createServerRpc({
  id: "597836b1bd871bfd285c93b908f9790d1d46bf54e341210270e02f6781dff6eb",
  name: "getAdminData",
  filename: "src/routes/admin.index.tsx"
}, (opts) => getAdminData.__executeServer(opts));
const getAdminData = createServerFn({
  method: "GET"
}).handler(getAdminData_createServerFn_handler, async ({
  context
}) => {
  const env = context.env;
  if (!env || !env.DB) throw new Error("DB not configured");
  const db = getDb(env.DB);
  const recentContacts = await db.select().from(contacts).orderBy(desc(contacts.dateEnvoi)).limit(10);
  const recentInscriptions = await db.select().from(inscriptions).orderBy(desc(inscriptions.dateInscription)).limit(10);
  return {
    recentContacts,
    recentInscriptions
  };
});
export {
  getAdminData_createServerFn_handler
};
