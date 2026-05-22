import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Music, Wrench, Sprout, HandMetal, Monitor, Send } from "lucide-react";
import { useState } from "react";
import centreImg from "@/assets/centre-podor.jpg";
import instrumentsImg from "@/assets/instruments.jpg";
import { createServerFn } from "@tanstack/react-start";
import { getDb, withRetry } from "@/lib/db";
import { inscriptions } from "@/db/schema";
import { z } from "zod";

import { createSeoMeta } from "@/lib/seo";
import { Turnstile } from "@marsidev/react-turnstile";

const inscriptionSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  tel: z.string().min(1, "Le téléphone est requis"),
  formation: z.string().min(1, "La formation est requise"),
  motivation: z.string().min(10, "La motivation doit faire au moins 10 caractères"),
});

export const soumettreInscription = createServerFn({ method: "POST" })
  .inputValidator((data: FormationFormValues) => formationSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    try {
      await withRetry(() =>
        db.insert(inscriptions).values({
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          tel: data.tel,
          formation: data.formation,
          motivation: data.motivation,
          dateInscription: new Date(),
          statut: "en_attente",
        }),
      );
      return { success: true, message: "Votre inscription a été enregistrée avec succès." };
    } catch (error) {
      console.error("Erreur d'insertion DB:", error);
      throw new Error("Impossible d'enregistrer l'inscription. Veuillez réessayer.");
    }
  });

import { PageSkeleton } from "@/components/PageSkeleton";

export const Route = createFileRoute("/formations")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "Formations & Recherche | Centre NANN-k",
      description:
        "Centre de Formation et de Recherche : musiques traditionnelles, lutherie, artisanat, poterie et savonnerie. Formations professionnelles à Podor.",
      ogTitle: "Formations NANN-k — Centre Culturel Podor",
      ogDescription:
        "Découvrez les formations proposées par le centre NANN-k : musique traditionnelle, artisanat, techniques numériques et plus.",
      ogImage: centreImg,
      keywords:
        "formations, musique traditionnelle, luterie, artisanat, Podor, NANN-k, centre culturel, Sénégal",
      canonical: "https://lesbluesdufleuve.sn/formations",
    });
    return { meta, links };
  },
  pendingComponent: PageSkeleton,
  component: Formations,
});

const programmes = [
  {
    icon: Music,
    titre: "Pratique d'Instruments Traditionnels",
    desc: "Apprentissage et perfectionnement sur des instruments séculaires (hoddu, riti, tama, flûte peule), encadrés par des maîtres griots (cycles de 3 à 24 mois).",
  },
  {
    icon: Wrench,
    titre: "Lutherie Traditionnelle",
    desc: "Transmission des techniques ancestrales de fabrication, d'entretien et de restauration des instruments de musique locaux.",
  },
  {
    icon: BookOpen,
    titre: "Musicologie & Recherche",
    desc: "Initiation à l'ethnomusicologie, documentation, transcription et analyse des répertoires, avec des résidences ouvertes aux chercheurs.",
  },
  {
    icon: Monitor,
    titre: "Techniques d'Enregistrement",
    desc: "Formation aux techniques d'enregistrement et de production musicale au sein du studio professionnel du centre.",
  },
  {
    icon: HandMetal,
    titre: "Poterie & Céramique",
    desc: "Ateliers pratiques valorisant le travail de la terre cuite, selon les méthodes traditionnelles des artisans de la région du Fouta.",
  },
  {
    icon: Sprout,
    titre: "Savonnerie & Artisanat",
    desc: "Formation aux techniques de fabrication de savons artisanaux et autres produits locaux, favorisant l'entrepreneuriat et l'autonomie.",
  },
];

function Formations() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    tel: "",
    formation: "",
    motivation: "",
  });
  const [sent, setSent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert("Veuillez valider le captcha.");
      return;
    }
    try {
      const result = await soumettreInscription({ data: form });
      if (result.success) {
        setSent(true);
        setTimeout(() => {
          setForm({ prenom: "", nom: "", email: "", tel: "", formation: "", motivation: "" });
          setSent(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur est survenue lors de l'envoi de votre candidature.");
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="bg-muted border-b border-border py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={centreImg} alt="Texture" className="w-full h-full object-cover" />
        </div>
        <div className="container-page text-center max-w-4xl mx-auto relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold">
            Apprentissage & Transmission
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground">
            Formations & <span className="text-primary">Recherche</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed">
            Un centre d'excellence dédié à la préservation des savoir-faire et à la formation des
            jeunes de la région, des artisans et des chercheurs du monde entier.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Texte explicatif - Colonne de gauche (plus large) */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
                Objectif Stratégique (OS3)
              </span>
              <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
                Création d'un Centre de Formation et de Recherche
              </h2>
              <div className="font-serif text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  L'un des piliers majeurs du projet est de réhabiliter à Podor un Centre de
                  Recherche-Action et de Formation sur les Musiques Traditionnelles de la Vallée du
                  Fleuve Sénégal. Son but : documenter, préserver, enseigner et promouvoir le
                  patrimoine musical de la région pour en faire un pôle culturel de référence en
                  Afrique de l'Ouest.
                </p>
                <p>
                  Ce pôle éducatif est ouvert aux jeunes de la région désireux de s'approprier leur
                  culture, ainsi qu'aux chercheurs, ethnomusicologues et étudiants internationaux.
                  Il propose un programme complet allant de la pratique d'instruments (hoddu, riti,
                  tama, flûte peule) à la lutherie, en passant par l'artisanat local (poterie,
                  savonnerie).
                </p>
                <p>
                  Des partenariats académiques stratégiques sont en cours de développement avec
                  l'UCAD, l'Université Gaston Berger de Saint-Louis et des conservatoires européens
                  pour garantir un enseignement de haut niveau et des résidences de recherche de
                  qualité.
                </p>
              </div>

              <div className="aspect-video overflow-hidden border-4 border-background shadow-xl mt-10">
                <img
                  src={instrumentsImg}
                  alt="Apprentissage des instruments"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>

          {/* Liste des formations - Colonne de droite */}
          <div className="lg:col-span-5 bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm sticky top-32">
            <h3 className="font-display text-2xl font-bold mb-8 uppercase tracking-tight text-foreground border-b border-border pb-4">
              Nos Programmes (R3)
            </h3>

            <div className="space-y-8">
              {programmes.map((prog, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <prog.icon size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground mb-1">{prog.titre}</h4>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <a
                href="#inscription"
                className="w-full inline-block bg-primary text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-primary/90 transition shadow-md"
              >
                S'inscrire à une formation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription (Phase 2) */}
      <section id="inscription" className="container-page py-20 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              Rejoindre le Centre
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
              Formulaire d'inscription
            </h2>
            <p className="mt-4 font-serif text-muted-foreground text-lg">
              Prêt(e) à développer vos talents ? Remplissez ce formulaire pour soumettre votre
              candidature à l'un de nos programmes de formation.
            </p>
          </div>

          <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm">
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
                  Candidature envoyée !
                </h3>
                <p className="text-muted-foreground font-serif">
                  Merci de votre intérêt. Notre équipe pédagogique va examiner votre demande et vous
                  contactera très prochainement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="prenom"
                      className="text-sm font-bold uppercase tracking-wider text-foreground"
                    >
                      Prénom
                    </label>
                    <input
                      id="prenom"
                      type="text"
                      required
                      value={form.prenom}
                      onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                      className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="nom"
                      className="text-sm font-bold uppercase tracking-wider text-foreground"
                    >
                      Nom
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="space-y-2">
                    <label
                      htmlFor="tel"
                      className="text-sm font-bold uppercase tracking-wider text-foreground"
                    >
                      Téléphone
                    </label>
                    <input
                      id="tel"
                      type="tel"
                      required
                      value={form.tel}
                      onChange={(e) => setForm({ ...form, tel: e.target.value })}
                      className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+221 XX XXX XX XX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="formation"
                    className="text-sm font-bold uppercase tracking-wider text-foreground"
                  >
                    Programme de formation souhaité
                  </label>
                  <select
                    id="formation"
                    required
                    value={form.formation}
                    onChange={(e) => setForm({ ...form, formation: e.target.value })}
                    className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" disabled>
                      Sélectionnez une formation...
                    </option>
                    {programmes.map((prog, idx) => (
                      <option key={idx} value={prog.titre}>
                        {prog.titre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="motivation"
                    className="text-sm font-bold uppercase tracking-wider text-foreground"
                  >
                    Vos motivations
                  </label>
                  <textarea
                    id="motivation"
                    required
                    rows={5}
                    value={form.motivation}
                    onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                    className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Expliquez-nous brièvement pourquoi vous souhaitez rejoindre ce programme..."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <Turnstile
                    siteKey="1x00000000000000000000AA"
                    onSuccess={(token) => setTurnstileToken(token)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:opacity-90 transition shadow-md"
                >
                  <Send size={16} />
                  Soumettre ma candidature
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
