import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { getDb, withRetry } from "@/lib/db";
import { contacts } from "@/db/schema";
import { z } from "zod";
import { createSeoMeta } from "@/lib/seo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";

const contactSchema = z.object({
  nom: z.string().min(1, "Le nom complet est requis"),
  email: z.string().email("Adresse email invalide"),
  sujet: z.string().min(1, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
  cfTurnstileResponse: z.string().min(1, "Veuillez valider le captcha"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const soumettreContact = createServerFn({ method: "POST" })
  .inputValidator((data: ContactFormValues) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    // Using test keys for dummy validation
    const secret = "1x0000000000000000000000000000000AA";

    const tsResponse = await fetch(verifyUrl, {
      method: "POST",
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(data.cfTurnstileResponse)}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const tsResult = (await tsResponse.json()) as { success: boolean };
    if (!tsResult.success) {
      throw new Error("Validation Captcha échouée.");
    }

    const db = getDb();

    try {
      await withRetry(() =>
        db.insert(contacts).values({
          nom: data.nom,
          email: data.email,
          sujet: data.sujet,
          message: data.message,
          dateEnvoi: new Date(),
          statut: "non_lu",
        }),
      );

      return { success: true, message: "Votre message a été envoyé avec succès." };
    } catch (error) {
      console.error("Erreur d'insertion DB (Contact):", error);
      throw new Error("Impossible d'envoyer le message. Veuillez réessayer plus tard.");
    }
  });

export const Route = createFileRoute("/contact")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "Contactez-nous | Blues du Fleuve",
      description:
        "Prenez contact avec l'équipe du festival Les Blues du Fleuve situé à Podor, Sénégal. Nous sommes à votre écoute pour vos questions, partenariats et formations.",
      ogTitle: "Contactez Blues du Fleuve — Podor",
      ogDescription:
        "L'équipe du festival Blues du Fleuve vous accueille à Podor. Formulaire de contact et coordonnées disponibles.",
      keywords: "contact, Blues du Fleuve, Podor, formulaire, email, téléphone, festival Sénégal",
      canonical: "https://lesbluesdufleuve.sn/contact",
    });
    return { meta, links };
  },
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: "",
      email: "",
      sujet: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    try {
      const result = await soumettreContact({ data });
      if (result.success) {
        setSent(true);
        setTimeout(() => {
          reset();
          setSent(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
      alert("Une erreur est survenue lors de l'envoi de votre message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="bg-muted border-b border-border py-16 md:py-20 relative overflow-hidden">
        <div className="container-page text-center max-w-4xl mx-auto relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold">
            Échangeons ensemble
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground">
            Nous <span className="text-primary">Contacter</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed">
            Une question sur le festival, un projet de partenariat ou une demande d'information sur
            nos formations ? L'équipe des Blues du Fleuve est à votre écoute.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Informations de contact - Colonne de gauche */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
                Nos Coordonnées
              </span>
              <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
                L'équipe à Podor
              </h2>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed mb-8">
                Basé au cœur du Fouta Toro, le festival rayonne depuis Podor pour célébrer la
                culture Halpulaar.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Adresse</h4>
                  <p className="text-muted-foreground font-serif text-base leading-relaxed">
                    Siège du Festival "Les Blues du Fleuve"
                    <br />
                    Quartier historique, Podor
                    <br />
                    Région de Saint-Louis, Sénégal
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Téléphone</h4>
                  <p className="text-muted-foreground font-serif text-base leading-relaxed">
                    +221 77 496 75 31
                    <br />
                    +221 33 XXX XX XX
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground font-serif text-base leading-relaxed">
                    contact@lesbluesdufleuve.sn
                    <br />
                    presse@lesbluesdufleuve.sn
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact - Colonne de droite */}
          <div className="lg:col-span-7 bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm">
            <h3 className="font-display text-2xl font-bold mb-8 uppercase tracking-tight text-foreground border-b border-border pb-4">
              Envoyez-nous un message
            </h3>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Message envoyé !
                </h3>
                <p className="text-muted-foreground font-serif">
                  Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs
                  délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="nom"
                      className="text-sm font-bold uppercase tracking-wider text-foreground"
                    >
                      Nom complet
                    </label>
                    <input
                      id="nom"
                      type="text"
                      {...register("nom")}
                      className={`w-full bg-background border ${errors.nom ? "border-red-500" : "border-input"} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                      placeholder="Votre nom"
                    />
                    {errors.nom && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.nom.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-bold uppercase tracking-wider text-foreground"
                    >
                      Adresse Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`w-full bg-background border ${errors.email ? "border-red-500" : "border-input"} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                      placeholder="vous@exemple.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="sujet"
                    className="text-sm font-bold uppercase tracking-wider text-foreground"
                  >
                    Sujet de votre message
                  </label>
                  <input
                    id="sujet"
                    type="text"
                    {...register("sujet")}
                    className={`w-full bg-background border ${errors.sujet ? "border-red-500" : "border-input"} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    placeholder="Ex: Demande de partenariat"
                  />
                  {errors.sujet && (
                    <p className="text-red-500 text-sm mt-1">{errors.sujet.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-bold uppercase tracking-wider text-foreground"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message")}
                    className={`w-full bg-background border ${errors.message ? "border-red-500" : "border-input"} rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none`}
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Turnstile
                    siteKey="1x00000000000000000000AA"
                    onSuccess={(token) => {
                      setValue("cfTurnstileResponse", token);
                    }}
                  />
                  {errors.cfTurnstileResponse && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cfTurnstileResponse.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold text-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:opacity-90 transition shadow-md disabled:opacity-70"
                >
                  {loading ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
