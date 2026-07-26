import { Resend } from "resend";
import { logger } from "./logger";

// Helper to get Resend instance safely
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logger.warn("RESEND_API_KEY non configurée. L'envoi d'email est désactivé.");
    return null;
  }
  return new Resend(apiKey);
}

// Admin email to receive notifications
const ADMIN_EMAIL = "contact@levillagepodor.com";

function getSender(): string {
  return `Les Blues du Fleuve <contact@levillagepodor.com>`;
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
      subject: "Nous avons bien reçu votre message - Les Blues du Fleuve",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2>Bonjour ${userName},</h2>
          <p>Nous vous confirmons la bonne réception de votre message concernant <strong>"${subject}"</strong>.</p>
          <p>Notre équipe va en prendre connaissance et vous répondra dans les plus brefs délais.</p>
          <br/>
          <p>Cordialement,</p>
          <p><strong>L'équipe Les Blues du Fleuve</strong></p>
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
