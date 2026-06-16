import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Music,
  Wrench,
  Sprout,
  HandMetal,
  Monitor,
  Send,
  Play,
  Clock,
  Users,
  Star,
  Globe,
  Award,
  ChevronRight,
  Check,
} from "lucide-react";
import { useState } from "react";
// Centre culturel image from public folder
const centreCulturelImg = "/centre culturel.jpg";
import instrumentsImg from "@/assets/instruments.jpg";
const baabaVideo =
  "https://raw.githubusercontent.com/tidianendiaye204-ship-it/bluesdufleuves/main/src/assets/baaba-maal-helping-francais-compressed.mp4";
import { createServerFn } from "@tanstack/react-start";
import { getDb, withRetry } from "@/lib/db";
import { inscriptions } from "@/db/schema";
import { z } from "zod";

import { createSeoMeta } from "@/lib/seo";
import { Turnstile } from "@marsidev/react-turnstile";

export const inscriptionSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  tel: z.string().min(1, "Le téléphone est requis"),
  formation: z.string().min(1, "La formation est requise"),
  motivation: z.string().min(10, "La motivation doit faire au moins 10 caractères"),
});

export const soumettreInscription = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof inscriptionSchema>) => inscriptionSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    try {
      await withRetry(
        async () =>
          db.insert(inscriptions).values({
            prenom: data.prenom,
            nom: data.nom,
            email: data.email,
            tel: data.tel,
            formation: data.formation,
            motivation: data.motivation,
            dateInscription: new Date(),
            statut: "en_attente",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }) as Promise<any>,
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
      title: "Formations & Recherche | The Village Podor",
      description:
        "Formations au The Village Podor : musiques traditionnelles, lutherie, artisanat, poterie et savonnerie. Centre de formation professionnelle à Podor.",
      ogTitle: "Formations NANN-k — The Village Podor",
      ogDescription:
        "Découvrez les formations proposées par le centre NANN-k au The Village Podor : musique traditionnelle, artisanat, techniques numériques et plus.",
      ogImage: centreCulturelImg,
      keywords:
        "The Village, formations, musique traditionnelle, luterie, artisanat, Podor, NANN-k, centre culturel, Sénégal",
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
    desc: "Apprentissage et perfectionnement sur des instruments séculaires (hoddu, riti, tama, flûte peule), encadrés par des maîtres griots.",
    duree: "3 à 24 mois",
    niveau: "Tous niveaux",
    couleur: "from-blue-600/20 to-sky-500/10",
    iconBg: "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
    tag: "Musique",
  },
  {
    icon: Wrench,
    titre: "Lutherie Traditionnelle",
    desc: "Transmission des techniques ancestrales de fabrication, d'entretien et de restauration des instruments de musique locaux.",
    duree: "6 à 18 mois",
    niveau: "Intermédiaire",
    couleur: "from-amber-600/20 to-orange-500/10",
    iconBg: "bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
    tag: "Artisanat",
  },
  {
    icon: BookOpen,
    titre: "Musicologie & Recherche",
    desc: "Initiation à l'ethnomusicologie, documentation, transcription et analyse des répertoires, avec des résidences ouvertes aux chercheurs.",
    duree: "12 à 24 mois",
    niveau: "Avancé",
    couleur: "from-emerald-600/20 to-teal-500/10",
    iconBg: "bg-emerald-600/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
    tag: "Recherche",
  },
  {
    icon: Monitor,
    titre: "Techniques d'Enregistrement",
    desc: "Formation aux techniques d'enregistrement et de production musicale au sein du studio professionnel du centre.",
    duree: "3 à 12 mois",
    niveau: "Tous niveaux",
    couleur: "from-violet-600/20 to-purple-500/10",
    iconBg: "bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400",
    tag: "Numérique",
  },
  {
    icon: HandMetal,
    titre: "Poterie & Céramique",
    desc: "Ateliers pratiques valorisant le travail de la terre cuite, selon les méthodes traditionnelles des artisans de la région du Fouta.",
    duree: "3 à 9 mois",
    niveau: "Débutant",
    couleur: "from-red-600/20 to-rose-500/10",
    iconBg: "bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400",
    tag: "Artisanat",
  },
  {
    icon: Sprout,
    titre: "Savonnerie & Artisanat",
    desc: "Formation aux techniques de fabrication de savons artisanaux et autres produits locaux, favorisant l'entrepreneuriat et l'autonomie.",
    duree: "1 à 6 mois",
    niveau: "Débutant",
    couleur: "from-lime-600/20 to-green-500/10",
    iconBg: "bg-lime-600/10 text-lime-600 dark:bg-lime-400/10 dark:text-lime-400",
    tag: "Entrepreneuriat",
  },
];

const stats = [
  { value: "6", label: "Programmes de formation", icon: BookOpen },
  { value: "3+", label: "Partenaires académiques", icon: Globe },
  { value: "50+", label: "Apprenants formés", icon: Users },
  { value: "20+", label: "Ans d'expertise", icon: Award },
];

const avantages = [
  "Encadrement par des maîtres griots et artisans reconnus",
  "Accès au studio d'enregistrement professionnel",
  "Résidences de recherche internationales",
  "Certificats de formation reconnus",
  "Hébergement disponible sur place",
  "Bourse d'études pour les talents locaux",
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

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
        // Ouvre le client email pour notifier l'équipe
        const emailTo = "contact@lesbluesdufleuve.sn";
        const subject = `Nouvelle inscription de ${form.prenom} ${form.nom}`;
        const body = `Prénom: ${form.prenom}\nNom: ${form.nom}\nEmail: ${form.email}\nTéléphone: ${form.tel}\nFormation: ${form.formation}\n\nMotivation:\n${form.motivation}`;
        window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

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

  const filteredProgrammes =
    activeTab ? programmes.filter((p) => p.tag === activeTab) : programmes;

  const allTags = [...new Set(programmes.map((p) => p.tag))];

  return (
    <div className="bg-background min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src={centreCulturelImg}
            alt="Centre Culturel The Village"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Décoration ornemental */}
        <div className="absolute top-12 right-12 w-64 h-64 rounded-full border border-white/5 hidden lg:block" />
        <div className="absolute top-20 right-20 w-48 h-48 rounded-full border border-white/5 hidden lg:block" />
        <div className="absolute bottom-12 right-32 w-32 h-32 rounded-full border border-amber-400/10 hidden lg:block" />

        <div className="container-page relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-semibold">
                Apprentissage & Transmission
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Formations &{" "}
              <span className="text-gradient-gold">Recherche</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl font-serif">
              Un centre d'excellence au{" "}
              <Link
                to="/"
                className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4 transition-colors"
              >
                The Village Podor
              </Link>{" "}
              dédié à la préservation des savoir-faire ancestraux et à la formation des artistes,
              artisans et chercheurs du monde entier.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 btn-gradient-gold font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl shadow-lg"
              >
                Découvrir les programmes
                <ChevronRight size={16} />
              </a>
              <a
                href="#inscription"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl transition-all"
              >
                Candidater
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="border-b border-border bg-card">
        <div className="container-page py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-2 py-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                  <stat.icon size={22} />
                </div>
                <span className="font-display text-4xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRÉSENTATION + VIDÉO ===== */}
      <section className="container-page py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Texte */}
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-bold">
              Objectif Stratégique (OS3)
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight text-foreground">
              Création d'un Centre de Formation et de Recherche
            </h2>
            <div className="font-serif text-muted-foreground text-base leading-relaxed space-y-5">
              <p>
                L'un des piliers majeurs de{" "}
                <span className="text-foreground font-semibold">The Village</span> est de
                réhabiliter à Podor un Centre de Recherche-Action et de Formation sur les Musiques
                Traditionnelles de la Vallée du Fleuve Sénégal. Son but : documenter, préserver,
                enseigner et promouvoir le patrimoine musical de la région.
              </p>
              <p>
                Ce pôle éducatif est ouvert aux jeunes de la région désireux de s'approprier leur
                culture, ainsi qu'aux chercheurs, ethnomusicologues et étudiants internationaux.
                Il propose un programme complet allant de la pratique d'instruments (hoddu, riti,
                tama, flûte peule) à la lutherie, en passant par l'artisanat local.
              </p>
              <p>
                Des partenariats académiques stratégiques sont en cours de développement avec
                l'UCAD, l'Université Gaston Berger de Saint-Louis et des conservatoires européens.
              </p>
            </div>

            {/* Avantages */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {avantages.map((avantage, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Check size={12} />
                  </div>
                  <span className="text-sm text-muted-foreground">{avantage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vidéo */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-border shadow-2xl aspect-video relative">
              {isVideoPlaying ? (
                <video
                  src={baabaVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  onEnded={() => setIsVideoPlaying(false)}
                />
              ) : (
                <>
                  <img
                    src={instrumentsImg}
                    alt="Apprentissage des instruments"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    aria-label="Lancer la vidéo"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_40px_rgba(12,74,110,0.5)] group-hover:scale-110 transition-transform duration-300">
                      <Play size={28} className="ml-1" fill="currentColor" />
                    </div>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                      Témoignage vidéo
                    </p>
                    <h3 className="text-white font-display text-xl font-bold">
                      Baaba Maal — Formation des Artistes
                    </h3>
                  </div>
                </>
              )}
            </div>

            {/* Badge flottant */}
            <div className="absolute -bottom-5 -right-5 hidden md:flex bg-card border border-border rounded-2xl p-4 shadow-xl items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Award size={22} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reconnu par</p>
                <p className="text-sm font-bold text-foreground">UCAD & Univ. Gaston Berger</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CITATION BAABA MAAL ===== */}
      <section className="relative overflow-hidden py-20 bg-primary">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
          <svg
            className="w-12 h-12 mx-auto mb-8 text-white/30"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H8c0-1.105.895-2 2-2V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6c0-1.105.895-2 2-2V8z" />
          </svg>
          <blockquote className="font-display text-2xl md:text-3xl font-bold text-white leading-relaxed italic mb-8">
            "La musique de la vallée du fleuve est un héritage vivant. Il est de notre devoir de
            la transmettre, de la faire grandir et de l'offrir au monde entier."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img
              src="/festival baba maal.jpg"
              alt="Baaba Maal"
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/50"
            />
            <div className="text-left">
              <p className="font-bold text-white text-base">Baaba Maal</p>
              <p className="text-white/60 text-sm">Fondateur du The Village · Podor</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMMES ===== */}
      <section id="programmes" className="container-page py-20">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-bold">
            Nos Programmes (R3)
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Choisissez votre voie
          </h2>
          <p className="text-muted-foreground font-serif text-lg max-w-xl mx-auto">
            Six parcours de formation pour s'immerger dans le patrimoine culturel de la vallée.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab(null)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
              activeTab === null
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            Tous
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTab(activeTab === tag ? null : tag)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                activeTab === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grille des cartes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.map((prog, idx) => (
            <article
              key={idx}
              className={`group relative rounded-3xl border border-border bg-gradient-to-br ${prog.couleur} bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 overflow-hidden`}
            >
              {/* Tag */}
              <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-background/80 text-muted-foreground border border-border">
                {prog.tag}
              </span>

              {/* Icône */}
              <div className={`w-14 h-14 rounded-2xl ${prog.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <prog.icon size={26} />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-tight">
                {prog.titre}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-serif mb-6">
                {prog.desc}
              </p>

              {/* Métadonnées */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock size={13} />
                  <span className="text-xs font-semibold">{prog.duree}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users size={13} />
                  <span className="text-xs font-semibold">{prog.niveau}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#inscription"
            className="inline-flex items-center gap-2 btn-gradient-premium text-white font-bold uppercase tracking-widest px-10 py-5 text-sm rounded-xl shadow-lg"
          >
            S'inscrire à une formation
            <ChevronRight size={16} />
          </a>
        </div>
      </section>

      {/* ===== FORMULAIRE D'INSCRIPTION ===== */}
      <section id="inscription" className="py-20 bg-muted/30 border-t border-border">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">

            {/* En-tête */}
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-bold">
                Rejoindre le Centre
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground mb-4">
                Formulaire d'inscription
              </h2>
              <p className="font-serif text-muted-foreground text-lg">
                Prêt(e) à développer vos talents ? Remplissez ce formulaire pour soumettre votre
                candidature à l'un de nos programmes.
              </p>
            </div>

            {/* Card formulaire */}
            <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
              {/* Bandeau de couleur en haut */}
              <div className="h-2 bg-gradient-to-r from-primary via-sky-500 to-amber-500" />

              <div className="p-8 md:p-10">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      Candidature envoyée !
                    </h3>
                    <p className="text-muted-foreground font-serif text-lg">
                      Merci de votre intérêt. Notre équipe pédagogique va examiner votre demande
                      et vous contactera très prochainement.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Prénom + Nom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="prenom"
                          className="text-xs font-bold uppercase tracking-wider text-foreground"
                        >
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="prenom"
                          type="text"
                          required
                          value={form.prenom}
                          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="nom"
                          className="text-xs font-bold uppercase tracking-wider text-foreground"
                        >
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="nom"
                          type="text"
                          required
                          value={form.nom}
                          onChange={(e) => setForm({ ...form, nom: e.target.value })}
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    {/* Email + Téléphone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-xs font-bold uppercase tracking-wider text-foreground"
                        >
                          Adresse Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                          placeholder="vous@exemple.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="tel"
                          className="text-xs font-bold uppercase tracking-wider text-foreground"
                        >
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="tel"
                          type="tel"
                          required
                          value={form.tel}
                          onChange={(e) => setForm({ ...form, tel: e.target.value })}
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                          placeholder="+221 XX XXX XX XX"
                        />
                      </div>
                    </div>

                    {/* Formation souhaitée */}
                    <div className="space-y-2">
                      <label
                        htmlFor="formation"
                        className="text-xs font-bold uppercase tracking-wider text-foreground"
                      >
                        Programme de formation souhaité <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="formation"
                          required
                          value={form.formation}
                          onChange={(e) => setForm({ ...form, formation: e.target.value })}
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
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
                        <ChevronRight
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Motivation */}
                    <div className="space-y-2">
                      <label
                        htmlFor="motivation"
                        className="text-xs font-bold uppercase tracking-wider text-foreground"
                      >
                        Vos motivations <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="motivation"
                        required
                        rows={5}
                        value={form.motivation}
                        onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                        className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder:text-muted-foreground/50"
                        placeholder="Expliquez-nous brièvement pourquoi vous souhaitez rejoindre ce programme..."
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {form.motivation.length} / min. 10 caractères
                      </p>
                    </div>

                    {/* Captcha */}
                    <div className="space-y-2">
                      <Turnstile
                        siteKey="1x00000000000000000000AA"
                        onSuccess={(token) => setTurnstileToken(token)}
                      />
                    </div>

                    {/* Bouton envoi */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 btn-gradient-premium text-white font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl shadow-lg transition-all"
                    >
                      <Send size={16} />
                      Soumettre ma candidature
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      En soumettant ce formulaire, vous acceptez que vos données soient utilisées
                      pour le traitement de votre candidature.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Lien contact */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Une question ?{" "}
              <Link
                to="/contact"
                className="text-primary font-semibold hover:underline underline-offset-4"
              >
                Contactez notre équipe pédagogique →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
