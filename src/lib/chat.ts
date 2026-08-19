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
- Événement : Festival "Les Blues du Fleuve", 19ème édition.
- Dates : Du 5 au 7 Décembre 2026.
- Lieux : Podor et Ndioum, Sénégal (région du Fouta Toro).
- Fondateur : Baaba Maal (légende de la musique sénégalaise, roi du Yela).
- Tarifs Billetterie (À TITRE INDICATIF, LA BILLETTERIE N'EST PAS ENCORE OUVERTE) : Pass 1 Jour (5 000 FCFA), Pass 3 Jours (12 000 FCFA), Pass VIP (30 000 FCFA). Si on te pose la question, précise bien que la billetterie officielle n'est pas encore disponible sur le site et qu'il faut patienter.
- Artistes attendus : Baaba Maal, Joe Keita, Demba Guissé, Binta Diallo (Laaly Junior), Kane Diallo (Welma), Oumar Wade (Producteur Exécutif), et bien d'autres.
- Activités : Concerts (Arts Vivants), régates de pirogues, forum de développement (Conférences), expositions d'artisanat, mode.
- The Village Podor : Un grand centre culturel fondé par Baaba Maal à Podor. C'est un espace de création, d'incubation et de formation pour les jeunes talents de la vallée.
- NANN-K : Mouvement citoyen initié par Baaba Maal pour le développement économique et social par l'Agriculture, l'Élevage, la Pêche, les Technologies et la Culture.
- Formations : Le centre propose des formations professionnelles (audiovisuel, numérique, arts vivants) pour l'autonomisation des jeunes.
- Contact : Si l'utilisateur veut nous joindre, indique-lui de visiter la page "Contact" (ou /contact) du site.

Sois poli, enthousiaste et extrêmement bref (2 ou 3 phrases maximum par réponse). Tu dois tutoyer ou vouvoyer selon le contexte, mais toujours être très amical.
N'invente pas d'informations. Si on te pose une question dont la réponse n'est pas dans ces informations, invite l'utilisateur à nous contacter par téléphone au 33 917 94 81 ou par email à contact@levillagepodor.com.`;

export const chatFn = createServerFn({ method: "POST" })
  .validator(
    (data: { message: string; history: { role: "user" | "model"; parts: { text: string }[] }[] }) =>
      data,
  )
  .handler(async ({ data }) => {
    const ai = getGeminiClient();
    if (!ai) {
      return { error: "La clé API Gemini n'est pas configurée côté serveur." };
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Compris. Je suis BluesBot, prêt à aider !" }] },
          ...data.history,
          { role: "user", parts: [{ text: data.message }] },
        ],
        config: {
          temperature: 0.7,
        },
      });

      return { response: response.text };
    } catch (error) {
      console.error("Erreur avec l'API Gemini:", error);
      return { error: "Désolé, mes circuits sont un peu surchargés. Réessayez dans un instant." };
    }
  });
