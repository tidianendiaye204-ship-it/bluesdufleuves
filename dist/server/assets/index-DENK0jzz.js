import { c as createServerRpc } from "./createServerRpc-Ccmq3ICk.js";
import { b as drizzle, n as newsletter } from "./schema-BzPAZZ25.js";
import { i as createServerFn } from "./server-co7iUJes.js";
import { o as objectType, s as stringType } from "./types-DLNE6-nO.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const newsletterSchema = objectType({
  email: stringType().email("Adresse email invalide")
});
const soumettreNewsletter_createServerFn_handler = createServerRpc({
  id: "4503841b0b9eec2559deab11fdcf35e26d107a806b7bac9c41da5a164831575b",
  name: "soumettreNewsletter",
  filename: "src/routes/index.tsx"
}, (opts) => soumettreNewsletter.__executeServer(opts));
const soumettreNewsletter = createServerFn({
  method: "POST"
}).inputValidator((data) => newsletterSchema.parse(data)).handler(soumettreNewsletter_createServerFn_handler, async ({
  data,
  context
}) => {
  const env = context.env;
  if (!env || !env.DB) {
    throw new Error("Erreur serveur : Base de données non connectée.");
  }
  const db = drizzle(env.DB);
  try {
    await db.insert(newsletter).values({
      email: data.email,
      dateInscription: /* @__PURE__ */ new Date()
    });
    return {
      success: true
    };
  } catch (error) {
    if (error && typeof error === "object" && "message" in error && typeof error.message === "string" && error.message.includes("UNIQUE")) {
      return {
        success: true,
        alreadySubscribed: true
      };
    }
    throw new Error("Impossible d'enregistrer votre email. Veuillez réessayer.");
  }
});
export {
  soumettreNewsletter_createServerFn_handler
};
