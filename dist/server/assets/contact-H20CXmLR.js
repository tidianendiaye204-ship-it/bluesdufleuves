import { c as createServerRpc } from "./createServerRpc-DCaBCLQJ.js";
import { g as getDb, w as withRetry, c as contacts } from "./db-Dnq2UT9U.js";
import { i as createServerFn } from "./server-S6Z8VJ19.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const contactSchema = objectType({
  nom: stringType().min(1, "Le nom complet est requis"),
  email: stringType().email("Adresse email invalide"),
  sujet: stringType().min(1, "Le sujet est requis"),
  message: stringType().min(10, "Le message doit faire au moins 10 caractères"),
  cfTurnstileResponse: stringType().min(1, "Veuillez valider le captcha")
});
const soumettreContact_createServerFn_handler = createServerRpc({
  id: "25bd83a04822d276f143e55888ef23fa51c2686bfcfe01c9b074561e5a9b704a",
  name: "soumettreContact",
  filename: "src/routes/contact.tsx"
}, (opts) => soumettreContact.__executeServer(opts));
const soumettreContact = createServerFn({
  method: "POST"
}).inputValidator((data) => contactSchema.parse(data)).handler(soumettreContact_createServerFn_handler, async ({
  data
}) => {
  const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secret = "1x0000000000000000000000000000000AA";
  const tsResponse = await fetch(verifyUrl, {
    method: "POST",
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(data.cfTurnstileResponse)}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  });
  const tsResult = await tsResponse.json();
  if (!tsResult.success) {
    throw new Error("Validation Captcha échouée.");
  }
  const db = getDb();
  try {
    await withRetry(() => db.insert(contacts).values({
      nom: data.nom,
      email: data.email,
      sujet: data.sujet,
      message: data.message,
      dateEnvoi: /* @__PURE__ */ new Date(),
      statut: "non_lu"
    }));
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
