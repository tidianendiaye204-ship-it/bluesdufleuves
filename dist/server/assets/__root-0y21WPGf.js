import { c as createServerRpc } from "./createServerRpc-C9lbyJsG.js";
import "./styles-BTO9n2yM.js";
import { a3 as getDb, aU as withRetry, aB as newsletter } from "./db-BgyvUZip.js";
import { i as createServerFn } from "./server-DUqS4k7t.js";
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
    try {
      await withRetry(async () => {
        await db.insert(newsletter).values({
          email: data.email,
          dateInscription: /* @__PURE__ */ new Date()
        });
      });
    } catch (insertError) {
      const errMsg = insertError && typeof insertError === "object" && "message" in insertError ? insertError.message : "";
      if (errMsg.includes("no such table: newsletter")) {
        console.warn("Table newsletter missing, attempting to create it...");
        const {
          sql
        } = await import("./index-B5uiqBt8.js");
        await db.run(sql`
            CREATE TABLE IF NOT EXISTS newsletter (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL UNIQUE,
              date_inscription INTEGER NOT NULL
            )
          `);
        await db.insert(newsletter).values({
          email: data.email,
          dateInscription: /* @__PURE__ */ new Date()
        });
      } else {
        throw insertError;
      }
    }
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
