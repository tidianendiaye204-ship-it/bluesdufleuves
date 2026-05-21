import { c as createServerRpc } from "./createServerRpc-Ccmq3ICk.js";
import { g as getDb } from "./db-BZ2-xBa0.js";
import { n as newsletter } from "./schema-BzPAZZ25.js";
import { i as createServerFn } from "./server-co7iUJes.js";
import { o as objectType, s as stringType } from "./types-DLNE6-nO.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const newsletterSchema = objectType({
  email: stringType().email()
});
const subscribeNewsletter_createServerFn_handler = createServerRpc({
  id: "4dbf9513ee44ef2a584b50bf7b7ef4ffcc6287677f0acec0db6f2e74c0a9506b",
  name: "subscribeNewsletter",
  filename: "src/components/Footer.tsx"
}, (opts) => subscribeNewsletter.__executeServer(opts));
const subscribeNewsletter = createServerFn({
  method: "POST"
}).inputValidator((data) => newsletterSchema.parse(data)).handler(subscribeNewsletter_createServerFn_handler, async ({
  data,
  context
}) => {
  const env = context.env;
  if (!env || !env.DB) throw new Error("DB not configured");
  const db = getDb(env.DB);
  try {
    await db.insert(newsletter).values({
      email: data.email,
      dateInscription: /* @__PURE__ */ new Date()
    });
    return {
      success: true
    };
  } catch (e) {
    if (e.message?.includes("UNIQUE")) {
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
  subscribeNewsletter_createServerFn_handler
};
