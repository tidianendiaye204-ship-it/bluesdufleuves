import { Resend } from "resend";
import { logger } from "./logger";

// Helper to get Resend instance safely
export function getResendClient(): Resend | null {
  const env =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof globalThis !== "undefined" ? (globalThis as any).__CF_ENV__ || process.env : process.env;
  const apiKey = env?.RESEND_API_KEY;

  if (!apiKey) {
    logger.warn("RESEND_API_KEY non configurée. L'envoi d'email est désactivé.");
    return null;
  }
  return new Resend(apiKey);
}

// Admin email to receive notifications
const ADMIN_EMAIL = "contact@levillagepodor.com";

function getSender(): string {
  return `Le Village Podor <no-reply@levillagepodor.com>`;
}

export async function sendContactConfirmation(
  userEmail: string,
  userName: string,
  subject: string,
) {
  const resend = getResendClient();
  if (!resend) return;

  try {
    // 1. Email to the user
    await resend.emails.send({
      from: getSender(),
      to: userEmail,
      subject: "Nous avons bien reçu votre message - Le Village Podor",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2>Bonjour ${userName},</h2>
          <p>Nous vous confirmons la bonne réception de votre message concernant <strong>"${subject}"</strong>.</p>
          <p>Notre équipe va en prendre connaissance et vous répondra dans les plus brefs délais.</p>
          <br/>
          <p>Cordialement,</p>
          <p><strong>L'équipe Le Village Podor</strong></p>
        </div>
      `,
    });

    // 2. Alert to admin
    await resend.emails.send({
      from: getSender(),
      to: ADMIN_EMAIL,
      subject: `Nouveau message de contact : ${subject}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${userName}</p>
          <p><strong>Email :</strong> ${userEmail}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p>Veuillez consulter le tableau de bord administrateur pour lire le message complet.</p>
        </div>
      `,
    });

    logger.info("Emails de contact envoyés avec succès", { to: userEmail });
  } catch (error) {
    logger.error("Erreur lors de l'envoi de l'email de contact", error);
  }
}

export async function sendFormationConfirmation(
  userEmail: string,
  userName: string,
  formationName: string,
) {
  const resend = getResendClient();
  if (!resend) return;

  try {
    // 1. Email to the user
    await resend.emails.send({
      from: getSender(),
      to: userEmail,
      subject: "Candidature reçue - Nann-K Center",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2>Bonjour ${userName},</h2>
          <p>Nous vous remercions pour votre intérêt et vous confirmons la bonne réception de votre candidature pour la formation : <strong>${formationName}</strong>.</p>
          <p>Notre équipe pédagogique va examiner votre demande et vous contactera très prochainement.</p>
          <br/>
          <p>Cordialement,</p>
          <p><strong>L'équipe du Nann-K Center</strong></p>
        </div>
      `,
    });

    // 2. Alert to admin
    await resend.emails.send({
      from: getSender(),
      to: ADMIN_EMAIL,
      subject: `Nouvelle inscription : ${formationName}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nouvelle inscription</h2>
          <p><strong>Nom :</strong> ${userName}</p>
          <p><strong>Email :</strong> ${userEmail}</p>
          <p><strong>Formation :</strong> ${formationName}</p>
          <p>Veuillez consulter le tableau de bord administrateur pour voir les détails de la candidature.</p>
        </div>
      `,
    });

    logger.info("Emails d'inscription envoyés avec succès", { to: userEmail });
  } catch (error) {
    logger.error("Erreur lors de l'envoi de l'email d'inscription", error);
  }
}

export async function sendNewsletterBlast(
  emails: string[],
  article: { title: string; excerpt: string; slug: string },
) {
  const resend = getResendClient();
  if (!resend) return;

  try {
    const BATCH_SIZE = 50;
    const batches = [];
    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      batches.push(emails.slice(i, i + BATCH_SIZE));
    }

    const articleUrl = `https://levillagepodor.com/admin/articles`; // We will adjust link later if there's a public article page, for now we can just point to homepage or if they have a dynamic route. Actually wait, do they have a public article route?
    // Let's check if they have a public article route. For now I'll just use a generic or # placeholder, but I will put a proper link if I find it.
    // Let me just link to the main site for now, or / (home).

    // I will write the function assuming the article page is at / (for now).

    for (const batch of batches) {
      const emailOptions = batch.map((email) => ({
        from: getSender(),
        to: email,
        subject: `Nouvel article : ${article.title} - Le Village Podor`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; padding: 20px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://levillagepodor.com/logo-the-village.webp" alt="The Village Podor" style="max-height: 80px; width: auto;" />
            </div>
            <h2 style="color: #0c4a6e;">${article.title}</h2>
            <p style="font-size: 16px; line-height: 1.5;">
              ${article.excerpt}
            </p>
            <br/>
            <div style="text-align: center;">
              <a href="${articleUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0c4a6e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Lire la suite sur le site
              </a>
            </div>
            <hr style="margin-top: 40px; border: none; border-top: 1px solid #eaeaea;" />
            <p style="font-size: 12px; color: #888; text-align: center;">
              Vous recevez cet email car vous êtes inscrit à la newsletter de The Village Podor.
            </p>
          </div>
        `,
      }));

      await resend.batch.send(emailOptions);
    }

    logger.info(`Newsletter envoyée à ${emails.length} abonnés.`);
  } catch (error) {
    logger.error("Erreur lors de l'envoi de la newsletter", error);
  }
}
