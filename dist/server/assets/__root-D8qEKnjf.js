import { c as createServerRpc } from "./createServerRpc-DV_d9LkD.js";
import "./styles-DAnF-_po.js";
import { g as getDb, w as withRetry, n as newsletter } from "./db-JsrdoyeD.js";
import { i as createServerFn } from "./server-Ci9T_1RX.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "fs";
import "path";
import "util";
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
    if (!db) {
      throw new Error("La connexion à la base de données a échoué.");
    }
    await withRetry(() => db.insert(newsletter).values({
      email: data.email,
      dateInscription: /* @__PURE__ */ new Date()
    }));
    return {
      success: true
    };
  } catch (e) {
    console.error("Newsletter error detail:", {
      message: e.message,
      cause: e.cause,
      stack: e.stack,
      fullError: e
    });
    const errorMessage = e.message || "";
    if (errorMessage.includes("UNIQUE") || errorMessage.includes("UNIQUE constraint failed") || errorMessage.includes("D1_ERROR: UNIQUE")) {
      return {
        error: "Cet email est déjà inscrit à notre newsletter."
      };
    }
    if (errorMessage.includes("D1_BINDING_MISSING") || errorMessage.includes("binding is not defined")) {
      return {
        error: "Service temporairement indisponible (DB)."
      };
    }
    return {
      error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard."
    };
  }
});
export {
  subscribeNewsletterFn_createServerFn_handler
};
