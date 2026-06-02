import { c as createServerRpc } from "./createServerRpc-DV_d9LkD.js";
import { g as getDb, w as withRetry, i as inscriptions } from "./db-JsrdoyeD.js";
import { i as createServerFn } from "./server-Ci9T_1RX.js";
import { o as objectType, s as stringType } from "./types-DGfzljZx.js";
import "fs";
import "path";
import "util";
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
  data
}) => {
  const db = getDb();
  try {
    await withRetry(() => db.insert(inscriptions).values({
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      tel: data.tel,
      formation: data.formation,
      motivation: data.motivation,
      dateInscription: /* @__PURE__ */ new Date(),
      statut: "en_attente"
    }));
    return {
      success: true,
      message: "Votre inscription a été enregistrée avec succès."
    };
  } catch (error) {
    console.error("Erreur d'insertion DB:", error);
    throw new Error("Impossible d'enregistrer l'inscription. Veuillez réessayer.");
  }
});
export {
  soumettreInscription_createServerFn_handler
};
