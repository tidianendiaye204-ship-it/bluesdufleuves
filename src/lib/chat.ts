import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

// Helper pour obtenir le client Gemini en toute sécurité sur Cloudflare Workers
function getGeminiClient(): GoogleGenAI | null {
  const env =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof globalThis !== "undefined" ? (globalThis as any).__CF_ENV__ || process.env : process.env;
  const apiKey = env?.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

const SYSTEM_PROMPT = `Tu es "BluesBot", l'assistant virtuel officiel du festival "Les Blues du Fleuve" et du centre culturel "The Village Podor", fondé par Baaba Maal.
Ton but est de répondre aux questions des visiteurs de manière concise, chaleureuse et précise, en français.

Voici les informations à connaître :
- Événement : Festival "Les Blues du Fleuve", 18ème édition.
- Dates du Festival : Du 04 au 06 décembre 2026 à Podor et Ndioum, Sénégal (région du Fouta Toro).
- Avant-Première "En route vers les Blues du Fleuve" : Vendredi 27 novembre 2026 à 21h00 au Théâtre National Daniel Sorano à Dakar, avec Baaba Maal et l'Ensemble Lyrique Traditionnel (co-production MARVA Group, parrain : Dr. Cheikh Oumar Anne, Maire de Ndioum). Tarifs Sorano : Entrée Unique 10.000 FCFA, VIP 20.000 FCFA.
- Fondateur : Baaba Maal (légende de la musique sénégalaise, roi du Yela).
- Tarifs Billetterie Festival (À TITRE INDICATIF, LA BILLETTERIE N'EST PAS ENCORE OUVERTE) : Pass 1 Jour (5 000 FCFA), Pass 3 Jours (12 000 FCFA), Pass VIP (30 000 FCFA). Si on te pose la question, précise bien que la billetterie officielle n'est pas encore disponible sur le site et qu'il faut patienter.
- Artistes attendus : Baaba Maal, Joe Keita, Demba Guissé, Binta Diallo (Laaly Junior), Kane Diallo (Welma), Oumar Wade (Producteur Exécutif), et bien d'autres.
- Activités : Concerts (Arts Vivants), régates de pirogues, forum de développement (Conférences), expositions d'artisanat, mode.
- The Village Podor : Un grand centre culturel fondé par Baaba Maal à Podor. C'est un espace de création, d'incubation et de formation pour les jeunes talents de la vallée.
- NANN-K : Mouvement citoyen initié par Baaba Maal pour le développement économique et social par l'Agriculture, l'Élevage, la Pêche, les Technologies et la Culture.
- Formations : Le centre propose des formations professionnelles (musique traditionnelle, lutherie, musicologie, enregistrement studio, poterie, savonnerie) accessibles sur la page /formations.
- Contact : Page /contact, téléphone +221 33 917 94 81 ou +221 77 496 75 31, email contact@levillagepodor.com.
- Site officiel du festival : https://lesbluesdufleuve.com/

Sois poli, enthousiaste et extrêmement bref (2 ou 3 phrases maximum par réponse). Tu dois tutoyer ou vouvoyer selon le contexte, mais toujours être très amical.
N'invente pas d'informations. Si on te pose une question dont la réponse n'est pas dans ces informations, invite l'utilisateur à nous contacter par téléphone au 33 917 94 81 ou par email à contact@levillagepodor.com.`;

function getFallbackResponse(message: string): string {
  const q = message.toLowerCase();

  if (
    q.includes("quand") ||
    q.includes("date") ||
    q.includes("jour") ||
    q.includes("novembre") ||
    q.includes("decembre") ||
    q.includes("décembre")
  ) {
    return "La 18ème édition du Festival Les Blues du Fleuve se tiendra du 04 au 06 décembre 2026 à Podor et Ndioum ! Avant cela, ne manquez pas la soirée d'ouverture « En route vers les Blues du Fleuve » le vendredi 27 novembre 2026 à 21h au Théâtre National Daniel Sorano (Dakar).";
  }
  if (
    q.includes("billet") ||
    q.includes("pass") ||
    q.includes("prix") ||
    q.includes("tarif") ||
    q.includes("fcfa") ||
    q.includes("sorano")
  ) {
    return "Pour « En route vers les Blues du Fleuve » (27 nov. 2026 à Sorano), l'entrée unique est à 10.000 FCFA et le VIP à 20.000 FCFA. Pour le festival à Podor (04–06 déc.), la billetterie officielle ouvrira prochainement sur la page Billetterie.";
  }
  if (
    q.includes("formation") ||
    q.includes("inscri") ||
    q.includes("cours") ||
    q.includes("etude") ||
    q.includes("étude")
  ) {
    return "Le centre NANN-K à Podor propose 6 parcours de formation (musique traditionnelle, lutherie, musicologie, studio, poterie, savonnerie). Vous pouvez candidater directement depuis la page Formations (/formations).";
  }
  if (
    q.includes("ou ") ||
    q.includes("où ") ||
    q.includes("lieu") ||
    q.includes("adresse") ||
    q.includes("podor") ||
    q.includes("ndioum")
  ) {
    return "Le centre culturel The Village est situé Avenue Cheikh Oumar TALL à Podor (Sénégal). Le festival se déroule à Podor et Ndioum du 04 au 06 décembre 2026, avec une avant-première au Théâtre Daniel Sorano à Dakar le 27 novembre 2026.";
  }
  if (
    q.includes("contact") ||
    q.includes("tel") ||
    q.includes("mail") ||
    q.includes("joindre") ||
    q.includes("numero") ||
    q.includes("numéro")
  ) {
    return "Vous pouvez nous contacter via la page Contact (/contact), par téléphone au +221 33 917 94 81 ou +221 77 496 75 31, ou par email à contact@levillagepodor.com.";
  }
  if (
    q.includes("artiste") ||
    q.includes("baaba") ||
    q.includes("programme") ||
    q.includes("concert")
  ) {
    return "Retrouvez Baaba Maal (fondateur), Joe Keita, Demba Guissé, Binta Diallo (Laaly Junior), Kane Diallo (Welma) et de nombreux invités ! Consultez la page Le Festival pour le programme complet.";
  }

  return "La 18ème édition des Blues du Fleuve a lieu du 04 au 06 décembre 2026 à Podor et Ndioum, précédée du grand concert au Théâtre Daniel Sorano le 27 novembre 2026. Pour toute question précise, contactez-nous au +221 33 917 94 81 ou sur contact@levillagepodor.com.";
}

export const chatFn = createServerFn({ method: "POST" })
  .validator(
    (data: { message: string; history: { role: "user" | "model"; parts: { text: string }[] }[] }) =>
      data,
  )
  .handler(async ({ data }) => {
    const ai = getGeminiClient();
    if (!ai) {
      return { response: getFallbackResponse(data.message) };
    }

    const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
    let lastError: unknown = null;

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [...data.history, { role: "user", parts: [{ text: data.message }] }],
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        });

        if (response.text) {
          return { response: response.text };
        }
      } catch (error) {
        lastError = error;
        console.error(`Erreur avec l'API Gemini (${model}):`, error);
      }
    }

    console.error("Tous les modèles Gemini ont échoué, utilisation du fallback local:", lastError);
    return { response: getFallbackResponse(data.message) };
  });
