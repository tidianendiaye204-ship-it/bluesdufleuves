import { c as createServerRpc } from "./createServerRpc-6UeBda09.js";
import "./index-DpQda5kq.js";
import { g as getDb, w as withRetry, n as newsletter } from "./db-Dnq2UT9U.js";
import { i as createServerFn } from "./server-Dot0zqUM.js";
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
  try {
    const db = getDb();
    await withRetry(() => db.insert(newsletter).values({
      email: data.email,
      dateInscription: /* @__PURE__ */ new Date()
    }));
    return {
      success: true
    };
  } catch (e) {
    console.error("Newsletter error:", e);
    if (e.message?.includes("UNIQUE") || e.message?.includes("UNIQUE constraint failed") || e.message?.includes("D1_ERROR: UNIQUE")) {
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
