import { a as createServerRpc, d as drizzle, i as inscriptions } from "./schema-OPy8uzBH.js";
import { i as createServerFn } from "./server-DP3gGS2r.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const inscriptionSchema = objectType({
  prenom: stringType().min(1, "Le prénom est requis"),
  nom: stringType().min(1, "Le nom est requis"),
  email: stringType().email("Email invalide"),
  tel: stringType().min(1, "Le téléphone est requis"),
  formation: stringType().min(1, "La formation est requise"),
  motivation: stringType().min(10, "La motivation doit faire au moins 10 caractères")
});
const soumettreInscription_createServerFn_handler = createServerRpc({
  id: "c9426a028804a61ba850d9ff6a96cda44ae6a6770b4200230bb9f743a5414807",
  name: "soumettreInscription",
  filename: "src/routes/formations.tsx"
}, (opts) => soumettreInscription.__executeServer(opts));
const soumettreInscription = createServerFn({
  method: "POST"
}).inputValidator((data) => inscriptionSchema.parse(data)).handler(soumettreInscription_createServerFn_handler, async ({
  data,
  context
}) => {
  const env = context.env;
  if (!env || !env.DB) {
    throw new Error("Erreur serveur : Base de données non connectée.");
  }
  const db = drizzle(env.DB);
  try {
    await db.insert(inscriptions).values({
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      tel: data.tel,
      formation: data.formation,
      motivation: data.motivation,
      dateInscription: /* @__PURE__ */ new Date(),
      statut: "en_attente"
    });
    return {
      success: true,
      message: "Candidature enregistrée avec succès."
    };
  } catch (error) {
    console.error("Erreur d'insertion DB:", error);
    throw new Error("Impossible d'enregistrer la candidature. Veuillez réessayer plus tard.");
  }
});
export {
  soumettreInscription_createServerFn_handler
};
