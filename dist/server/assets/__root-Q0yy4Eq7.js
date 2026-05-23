import { c as createServerRpc } from "./createServerRpc-BGUvLQ5S.js";
import "./index-DpQda5kq.js";
import { g as getDb, n as newsletter } from "./db-Dnq2UT9U.js";
import { i as createServerFn } from "./server-BQhiJ5WE.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const newsletterSchema = objectType({
  email: stringType().email()
});
const subscribeNewsletterFn_createServerFn_handler = createServerRpc({
  id: "8c50d859ef0f2507fd6e69a6c839f420addbeb6ec5612d0563370e2f161d1612",
  name: "subscribeNewsletterFn",
  filename: "src/routes/__root.tsx"
}, (opts) => subscribeNewsletterFn.__executeServer(opts));
const subscribeNewsletterFn = createServerFn({
  method: "POST"
}).inputValidator((data) => newsletterSchema.parse(data)).handler(subscribeNewsletterFn_createServerFn_handler, async ({
  data
}) => {
  const db = getDb();
  try {
    await db.insert(newsletter).values({
      email: data.email,
      dateInscription: /* @__PURE__ */ new Date()
    });
    return {
      success: true
    };
  } catch (e) {
    if (e.message?.includes("UNIQUE") || e.message?.includes("UNIQUE constraint failed")) {
      return {
        error: "Cet email est déjà inscrit."
      };
    }
    return {
      error: "Une erreur est survenue."
    };
  }
});
export {
  subscribeNewsletterFn_createServerFn_handler
};
