import { c as createServerRpc } from "./createServerRpc-DqwfPTY6.js";
import { g as getDb, c as contacts, d as desc, i as inscriptions } from "./db-Dnq2UT9U.js";
import { i as createServerFn } from "./server-BT1Lll6w.js";
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
}).handler(getAdminData_createServerFn_handler, async () => {
  const db = getDb();
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
