import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/d1";
import { contacts } from "@/db/schema";
import { z } from "zod";
import heroImg from "@/assets/fleuve.jpg"; // On réutilise une belle image existante

const contactSchema = z.object({
  nom: z.string().min(1, "Le nom complet est requis"),
  email: z.string().email("Adresse email invalide"),
  sujet: z.string().min(1, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
});

export const soumettreContact = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof contactSchema>) => contactSchema.parse(data))
  .handler(async ({ data, context }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (context as any).env;
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
        dateEnvoi: new Date(),
        statut: "non_lu",
      });

      return { success: true, message: "Votre message a été envoyé avec succès." };
    } catch (error) {
      console.error("Erreur d'insertion DB (Contact):", error);
      throw new Error("Impossible d'envoyer le message. Veuillez réessayer plus tard.");
    }
  });

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contactez-nous — Blues du Fleuve" },
      {
        name: "description",
        content:
          "Prenez contact avec l'équipe du festival Les Blues du Fleuve, situé à Podor, Sénégal.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await soumettreContact({ data: form });
      if (result.success) {
        setSent(true);
        setTimeout(() => {
          setForm({ nom: "", email: "", sujet: "", message: "" });
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
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={heroImg} alt="Texture" className="w-full h-full object-cover grayscale" />
        </div>
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
                    +221 77 XXX XX XX
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
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      required
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
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
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="vous@exemple.com"
                    />
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
                    required
                    value={form.sujet}
                    onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                    className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Ex: Demande de partenariat"
                  />
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
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-primary/90 transition shadow-md disabled:opacity-70"
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
