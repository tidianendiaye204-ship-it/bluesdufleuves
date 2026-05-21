import { a as createServerRpc, d as drizzle, c as contacts } from "./schema-1FN9LeQn.js";
import { i as createServerFn } from "./server-C17troPO.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const contactSchema = objectType({
  nom: stringType().min(1, "Le nom complet est requis"),
  email: stringType().email("Adresse email invalide"),
  sujet: stringType().min(1, "Le sujet est requis"),
  message: stringType().min(10, "Le message doit faire au moins 10 caractères")
});
const soumettreContact_createServerFn_handler = createServerRpc({
  id: "25bd83a04822d276f143e55888ef23fa51c2686bfcfe01c9b074561e5a9b704a",
  name: "soumettreContact",
  filename: "src/routes/contact.tsx"
}, (opts) => soumettreContact.__executeServer(opts));
const soumettreContact = createServerFn({
  method: "POST"
}).inputValidator((data) => contactSchema.parse(data)).handler(soumettreContact_createServerFn_handler, async ({
  data,
  context
}) => {
  const env = context.env;
  if (!env || !env.DB) {
    throw new Error("Erreur serveur : Base de données non connectée.");
  }
  const db = drizzle(env.DB);
  try {
    await db.insert(contacts).values({
      nom: data.nom,
      email: data.email,
      sujet: data.sujet,
      message: data.message,
      dateEnvoi: /* @__PURE__ */ new Date(),
      statut: "non_lu"
    });
    return {
      success: true,
      message: "Votre message a été envoyé avec succès."
    };
  } catch (error) {
    console.error("Erreur d'insertion DB (Contact):", error);
    throw new Error("Impossible d'envoyer le message. Veuillez réessayer plus tard.");
  }
});
export {
  soumettreContact_createServerFn_handler
};
