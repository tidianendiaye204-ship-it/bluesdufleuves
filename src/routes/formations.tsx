import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
  AlertCircle,
} from "lucide-react";
import { useState, useRef } from "react";
// Centre culturel image from public folder
const centreCulturelImg = "/centre culturel.jpg";
import instrumentsImg from "@/assets/instruments.jpg";
const baabaVideo =
  "https://raw.githubusercontent.com/tidianendiaye204-ship-it/bluesdufleuves/main/src/assets/baaba-maal-helping-francais-compressed.mp4";
import { createServerFn } from "@tanstack/react-start";
import { getDb, withRetry } from "@/lib/db";
import { inscriptions } from "@/db/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSeoMeta } from "@/lib/seo";
import { Turnstile } from "@marsidev/react-turnstile";
import { MagneticButton } from "@/components/MagneticButton";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export const inscriptionSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  tel: z.string().min(1, "Le téléphone est requis"),
  formation: z.string().min(1, "La formation est requise"),
  motivation: z.string().min(10, "La motivation doit faire au moins 10 caractères"),
  csrfToken: z.string().optional(),
});

type InscriptionFormData = z.infer<typeof inscriptionSchema>;

export const soumettreInscription = createServerFn({ method: "POST" })
  .inputValidator((data: InscriptionFormData) => inscriptionSchema.parse(data))
  .handler(async ({ data }) => {
    // CSRF verification would go here in a real production app with session management

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
      title: "Formations | The Village Podor",
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

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Course",
            "name": "Pratique d'Instruments Traditionnels",
            "description": "Apprentissage et perfectionnement sur des instruments séculaires (hoddu, riti, tama, flûte peule), encadrés par des maîtres griots.",
            "provider": {
              "@type": "Organization",
              "name": "Centre Culturel NANN-k",
              "sameAs": "https://lesbluesdufleuve.sn"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Course",
            "name": "Lutherie Traditionnelle",
            "description": "Transmission des techniques ancestrales de fabrication, d'entretien et de restauration des instruments de musique locaux.",
            "provider": {
              "@type": "Organization",
              "name": "Centre Culturel NANN-k",
              "sameAs": "https://lesbluesdufleuve.sn"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Course",
            "name": "Musicologie & Recherche",
            "description": "Initiation à l'ethnomusicologie, documentation, transcription et analyse des répertoires, avec des résidences ouvertes aux chercheurs.",
            "provider": {
              "@type": "Organization",
              "name": "Centre Culturel NANN-k",
              "sameAs": "https://lesbluesdufleuve.sn"
            }
          }
        }
      ]
    };

    const scripts = [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(structuredData),
      },
    ];

    return { meta, links, scripts };
  },
  pendingComponent: PageSkeleton,
  component: Formations,
});

function Formations() {
  const { t } = useTranslation();
  
  const programmes = [
    {
      icon: Music,
      titre: t("formations.prog1Title"),
      desc: t("formations.prog1Desc"),
      duree: t("formations.prog1Duration"),
      niveau: t("formations.prog1Level"),
      couleur: "from-blue-600/20 to-sky-500/10",
      iconBg: "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
      tag: t("formations.prog1Tag"),
    },
    {
      icon: Wrench,
      titre: t("formations.prog2Title"),
      desc: t("formations.prog2Desc"),
      duree: t("formations.prog2Duration"),
      niveau: t("formations.prog2Level"),
      couleur: "from-amber-600/20 to-orange-500/10",
      iconBg: "bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
      tag: t("formations.prog2Tag"),
    },
    {
      icon: BookOpen,
      titre: t("formations.prog3Title"),
      desc: t("formations.prog3Desc"),
      duree: t("formations.prog3Duration"),
      niveau: t("formations.prog3Level"),
      couleur: "from-emerald-600/20 to-teal-500/10",
      iconBg: "bg-emerald-600/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
      tag: t("formations.prog3Tag"),
    },
    {
      icon: Monitor,
      titre: t("formations.prog4Title"),
      desc: t("formations.prog4Desc"),
      duree: t("formations.prog4Duration"),
      niveau: t("formations.prog4Level"),
      couleur: "from-violet-600/20 to-purple-500/10",
      iconBg: "bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400",
      tag: t("formations.prog4Tag"),
    },
    {
      icon: HandMetal,
      titre: t("formations.prog5Title"),
      desc: t("formations.prog5Desc"),
      duree: t("formations.prog5Duration"),
      niveau: t("formations.prog5Level"),
      couleur: "from-red-600/20 to-rose-500/10",
      iconBg: "bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400",
      tag: t("formations.prog5Tag"),
    },
    {
      icon: Sprout,
      titre: t("formations.prog6Title"),
      desc: t("formations.prog6Desc"),
      duree: t("formations.prog6Duration"),
      niveau: t("formations.prog6Level"),
      couleur: "from-lime-600/20 to-green-500/10",
      iconBg: "bg-lime-600/10 text-lime-600 dark:bg-lime-400/10 dark:text-lime-400",
      tag: t("formations.prog6Tag"),
    },
  ];

  const stats = [
    { value: "6", label: t("formations.stat1"), icon: BookOpen },
    { value: "3+", label: t("formations.stat2"), icon: Globe },
    { value: "50+", label: t("formations.stat3"), icon: Users },
    { value: "20+", label: t("formations.stat4"), icon: Award },
  ];

  const avantages = [
    t("formations.adv1"),
    t("formations.adv2"),
    t("formations.adv3"),
    t("formations.adv4"),
    t("formations.adv5"),
    t("formations.adv6"),
  ];
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InscriptionFormData>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      email: "",
      tel: "",
      formation: "",
      motivation: "",
      csrfToken: "dummy-csrf-token",
    },
  });

  const [sent, setSent] = useState(false);
  const [sentFormation, setSentFormation] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formationOpen, setFormationOpen] = useState(false);
  const selectedFormation = watch("formation");

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], ["0%", "40%"]);

  const motivationLength = watch("motivation")?.length || 0;

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof InscriptionFormData)[] = [];
    if (step === 1) fieldsToValidate = ["prenom", "nom", "email", "tel"];
    if (step === 2) fieldsToValidate = ["formation"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: InscriptionFormData) => {
    setFormError(null);
    if (!turnstileToken && import.meta.env.PROD) {
      setFormError("Veuillez valider le captcha de sécurité.");
      return;
    }
    try {
      const result = await soumettreInscription({ data });
      if (result.success) {
        setSentFormation(data.formation);
        setSent(true);
        setTimeout(() => {
          reset();
          setSent(false);
          setSentFormation(null);
          setStep(1);
        }, 8000);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      setFormError(
        "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.",
      );
    }
  };

  const filteredProgrammes = activeTab ? programmes.filter((p) => p.tag === activeTab) : programmes;

  const allTags = [...new Set(programmes.map((p) => p.tag))];

  return (
    <div className="bg-background min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Image de fond */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={centreCulturelImg}
            alt="Centre Culturel The Village"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>

        {/* Décoration ornemental */}
        <div className="absolute top-12 right-12 w-64 h-64 rounded-full border border-white/5 hidden lg:block" />
        <div className="absolute top-20 right-20 w-48 h-48 rounded-full border border-white/5 hidden lg:block" />
        <div className="absolute bottom-12 right-32 w-32 h-32 rounded-full border border-amber-400/10 hidden lg:block" />

        <div className="container-page relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-semibold">
                {t("formations.subtitle")}
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              {t("formations.title")}
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl font-serif">
              {t("formations.heroSubtitle")}{" "}
              <Link
                to="/"
                className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4 transition-colors"
              >
                The Village Podor
              </Link>{" "}
              {t("formations.heroDesc")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 btn-gradient-gold font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl shadow-lg"
              >
                {t("formations.discoverPrograms")}
                <ChevronRight size={16} />
              </a>
              <a
                href="#inscription"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl transition-all"
              >
                {t("formations.apply")}
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
              <div key={i} className="flex flex-col items-center text-center gap-2 py-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                  <stat.icon size={22} />
                </div>
                <span className="font-display text-4xl font-bold text-foreground">
                  {stat.value}
                </span>
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
              {t("formations.strategicObjective")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight text-foreground">
              {t("formations.centerTitle")}
            </h2>
            <div className="font-serif text-muted-foreground text-base leading-relaxed space-y-5">
              <p>
                {t("formations.centerDesc1")}{" "}
                <span className="text-foreground font-semibold">The Village</span> {t("formations.centerDesc1b")}
              </p>
              <p>
                {t("formations.centerDesc2")}
              </p>
              <p>
                {t("formations.centerDesc3")}
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
            <div
              className="rounded-3xl overflow-hidden shadow-2xl aspect-video relative group cursor-pointer bg-black"
              onClick={toggleVideo}
            >
              <video
                ref={videoRef}
                src={baabaVideo}
                poster={instrumentsImg}
                className={`w-full h-full object-cover transition-all duration-700 ${!isVideoPlaying && "grayscale opacity-80"}`}
                onEnded={() => setIsVideoPlaying(false)}
                playsInline
              />

              {/* Overlay sombre conditionnel */}
              <div
                className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isVideoPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
              />

              {/* Bouton Play/Pause Custom */}
              <button
                type="button"
                aria-label={isVideoPlaying ? "Mettre en pause la vidéo" : "Lire la vidéo"}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500 cursor-pointer ${isVideoPlaying ? "scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100" : "scale-100 opacity-100"}`}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground flex items-center justify-center shadow-[0_0_40px_rgba(12,74,110,0.5)] transition-transform duration-300 group-hover:scale-110">
                  {isVideoPlaying ? (
                    <div className="flex gap-2">
                      <div className="w-2 h-8 bg-white rounded-full"></div>
                      <div className="w-2 h-8 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <Play size={32} className="ml-2" fill="currentColor" />
                  )}
                </div>
              </button>

              {/* Informations vidéo */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-opacity duration-500 pointer-events-none ${isVideoPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
              >
                <p className="text-xs md:text-sm uppercase tracking-widest text-amber-400 font-bold mb-2">
                  Témoignage vidéo
                </p>
                <h3 className="text-white font-display text-2xl md:text-3xl font-bold drop-shadow-lg">
                  Baaba Maal — Formation des Artistes
                </h3>
              </div>
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
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
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
            "La musique de la vallée du fleuve est un héritage vivant. Il est de notre devoir de la
            transmettre, de la faire grandir et de l'offrir au monde entier."
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
              className={`group relative rounded-3xl border border-border bg-linear-to-br ${prog.couleur} glass-dark p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 overflow-hidden`}
            >
              {/* Tag */}
              <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-background/80 text-muted-foreground border border-border">
                {prog.tag}
              </span>

              {/* Icône */}
              <div
                className={`w-14 h-14 rounded-2xl ${prog.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
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
              <div className="h-2 bg-linear-to-r from-primary via-sky-500 to-amber-500" />

              <div className="p-8 md:p-10">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12 space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
                    >
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                        Candidature envoyée !
                      </h3>
                      <p className="text-muted-foreground font-serif text-base max-w-xs mx-auto">
                        Merci de votre intérêt. Notre équipe pédagogique va examiner votre demande et
                        vous contactera très prochainement.
                      </p>
                    </div>
                    {sentFormation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-2xl text-primary font-semibold text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.08 12.08 0 0121 13c0 5.523-4.477 10-10 10S1 18.523 1 13c0-.607.076-1.196.214-1.78L12 14z" />
                        </svg>
                        Formation : {sentFormation}
                      </motion.div>
                    )}
                  </motion.div>

                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Stepper Indicator */}
                    <div className="flex items-center justify-between mb-8 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full z-0" />
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                      />
                      {[1, 2, 3].map((num) => (
                        <div
                          key={num}
                          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all duration-300 ${step >= num ? "bg-primary text-white shadow-md" : "bg-card border-2 border-muted text-muted-foreground"}`}
                        >
                          {step > num ? <Check size={14} /> : num}
                        </div>
                      ))}
                    </div>

                    {formError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-sm font-medium flex items-center gap-3">
                        <AlertCircle size={18} className="shrink-0" />
                        {formError}
                      </div>
                    )}

                    {/* Step 1: Prénom + Nom + Email + Téléphone */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label
                              htmlFor="prenom"
                              className="text-xs font-bold uppercase tracking-wider text-foreground flex justify-between"
                            >
                              <span>
                                Prénom <span className="text-red-500">*</span>
                              </span>
                              {errors.prenom && (
                                <span className="text-red-500 font-normal normal-case">
                                  {errors.prenom.message}
                                </span>
                              )}
                            </label>
                            <input
                              id="prenom"
                              type="text"
                              {...register("prenom")}
                              className={`w-full bg-transparent border-0 border-b-2 ${errors.prenom ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"} focus:ring-0 px-0 py-3 text-sm transition-all placeholder:text-muted-foreground/50`}
                              placeholder="Votre prénom"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="nom"
                              className="text-xs font-bold uppercase tracking-wider text-foreground flex justify-between"
                            >
                              <span>
                                Nom <span className="text-red-500">*</span>
                              </span>
                              {errors.nom && (
                                <span className="text-red-500 font-normal normal-case">
                                  {errors.nom.message}
                                </span>
                              )}
                            </label>
                            <input
                              id="nom"
                              type="text"
                              {...register("nom")}
                              className={`w-full bg-transparent border-0 border-b-2 ${errors.nom ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"} focus:ring-0 px-0 py-3 text-sm transition-all placeholder:text-muted-foreground/50`}
                              placeholder="Votre nom"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="text-xs font-bold uppercase tracking-wider text-foreground flex justify-between"
                            >
                              <span>
                                Adresse Email <span className="text-red-500">*</span>
                              </span>
                              {errors.email && (
                                <span className="text-red-500 font-normal normal-case">
                                  {errors.email.message}
                                </span>
                              )}
                            </label>
                            <input
                              id="email"
                              type="email"
                              {...register("email")}
                              className={`w-full bg-transparent border-0 border-b-2 ${errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"} focus:ring-0 px-0 py-3 text-sm transition-all placeholder:text-muted-foreground/50`}
                              placeholder="vous@exemple.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="tel"
                              className="text-xs font-bold uppercase tracking-wider text-foreground flex justify-between"
                            >
                              <span>
                                Téléphone <span className="text-red-500">*</span>
                              </span>
                              {errors.tel && (
                                <span className="text-red-500 font-normal normal-case">
                                  {errors.tel.message}
                                </span>
                              )}
                            </label>
                            <input
                              id="tel"
                              type="tel"
                              {...register("tel")}
                              className={`w-full bg-transparent border-0 border-b-2 ${errors.tel ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"} focus:ring-0 px-0 py-3 text-sm transition-all placeholder:text-muted-foreground/50`}
                              placeholder="+221 XX XXX XX XX"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Formation souhaitée */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="formation"
                            className="text-xs font-bold uppercase tracking-wider text-foreground flex justify-between"
                          >
                            <span>
                              Programme de formation souhaité{" "}
                              <span className="text-red-500">*</span>
                            </span>
                            {errors.formation && (
                              <span className="text-red-500 font-normal normal-case">
                                {errors.formation.message}
                              </span>
                            )}
                          </label>
                          <div className="relative group">
                            <input type="hidden" {...register("formation")} />
                            <button
                              type="button"
                              onClick={() => setFormationOpen(!formationOpen)}
                              className={`w-full text-left bg-transparent border-0 border-b-2 ${
                                errors.formation
                                  ? "border-red-500"
                                  : "border-border hover:border-primary/50"
                              } px-0 py-3 text-sm transition-all cursor-pointer ${
                                selectedFormation ? "text-foreground" : "text-muted-foreground/50"
                              }`}
                            >
                              {selectedFormation || "Sélectionnez une formation..."}
                            </button>
                            <ChevronRight
                              size={16}
                              className={`absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none transition-transform duration-300 ${
                                formationOpen ? "-rotate-90" : "rotate-90"
                              }`}
                            />

                            <AnimatePresence>
                              {formationOpen && (
                                <motion.ul
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto"
                                >
                                  {programmes.map((prog, idx) => (
                                    <li key={idx}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setValue("formation", prog.titre, {
                                            shouldValidate: true,
                                          });
                                          setFormationOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer ${
                                          selectedFormation === prog.titre
                                            ? "bg-primary/5 text-primary font-semibold"
                                            : "text-foreground"
                                        }`}
                                      >
                                        {prog.titre}
                                      </button>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Motivation */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="motivation"
                            className="text-xs font-bold uppercase tracking-wider text-foreground flex justify-between"
                          >
                            <span>
                              Vos motivations <span className="text-red-500">*</span>
                            </span>
                            {errors.motivation && (
                              <span className="text-red-500 font-normal normal-case">
                                {errors.motivation.message}
                              </span>
                            )}
                          </label>
                          <textarea
                            id="motivation"
                            rows={4}
                            {...register("motivation")}
                            className={`w-full bg-background border ${errors.motivation ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary"} focus:ring-1 rounded-xl px-4 py-4 text-sm transition-all resize-none placeholder:text-muted-foreground/50`}
                            placeholder="Expliquez-nous brièvement pourquoi vous souhaitez rejoindre ce programme..."
                          />
                          <p
                            className={`text-xs text-right ${motivationLength < 10 && motivationLength > 0 ? "text-red-500" : "text-muted-foreground"}`}
                          >
                            {motivationLength} / min. 10 caractères
                          </p>
                        </div>

                        {/* Captcha */}
                        <div className="space-y-2 flex justify-center">
                          <Turnstile
                            siteKey={
                              import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"
                            }
                            onSuccess={(token) => setTurnstileToken(token)}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex-1 bg-muted hover:bg-border text-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl transition-all cursor-pointer"
                        >
                          Retour
                        </button>
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex-1 btn-gradient-premium text-white font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                        >
                          Suivant
                        </button>
                      ) : (
                        <MagneticButton className="flex-1">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full inline-flex items-center justify-center gap-2 btn-gradient-premium text-white font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-xl shadow-[0_10px_40px_rgba(245,158,11,0.3)] hover:shadow-[0_10px_60px_rgba(245,158,11,0.5)] transition-all cursor-pointer ${isSubmitting ? "opacity-70 pointer-events-none" : ""}`}
                          >
                            <Send size={16} />
                            {isSubmitting ? "Envoi en cours..." : "Soumettre"}
                          </button>
                        </MagneticButton>
                      )}
                    </div>
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
