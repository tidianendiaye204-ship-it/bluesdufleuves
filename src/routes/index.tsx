/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Landmark,
  Music,
  GraduationCap,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
  BookOpen,
  Globe,
  Mic2,
  ExternalLink,
} from "lucide-react";
import { createSeoMeta, createStructuredData } from "@/lib/seo";

import { OptimizedImage } from "@/components/OptimizedImage";
import { Lightbox } from "@/components/Lightbox";
import {
  galleryImages,
  centerFilmstripImages,
  articles,
  instruments,
} from "@/data/home-content";
import { MagneticButton } from "@/components/MagneticButton";
import { ActivityCard } from "@/components/ActivityCard";
import { NewsCard } from "@/components/NewsCard";
import { AnimatedText } from "@/components/AnimatedText";

export const Route = createFileRoute("/")({
  head: () => {
    // Default to French for SSR to avoid hydration mismatch
    const lang = "fr";

    const { meta, links } = createSeoMeta({
      title:
        lang === "fr"
          ? "The Village - NANN-K - Blues du Fleuve"
          : "The Village - NANN-K - Blues du Fleuve",
      description:
        lang === "fr"
          ? "The Village à Podor, Sénégal : centre culturel unique initié par Baaba Maal. Découvrez le village culturel, le festival Blues du Fleuve, la musique traditionnelle et les formations du centre NANN-k au cœur de la vallée du fleuve Sénégal."
          : "The Village in Podor, Senegal: a unique cultural center initiated by Baaba Maal. Discover the cultural village, the Blues du Fleuve festival, traditional music and training at the NANN-k center in the heart of the Senegal River valley.",
      ogTitle:
        lang === "fr"
          ? "The Village - NANN-K - Blues du Fleuve"
          : "The Village - NANN-K - Blues du Fleuve",
      ogDescription:
        lang === "fr"
          ? "Visitez The Village, l'épicentre culturel de Podor. Festival Blues du Fleuve, musée, formations musicales et artisanales, dans un village authentique au bord du fleuve Sénégal."
          : "Visit The Village, the cultural epicenter of Podor. Blues du Fleuve festival, museum, musical and craft training, in an authentic village on the banks of the Senegal River.",
      ogImage: "/logo-the-village.webp",
      keywords:
        lang === "fr"
          ? "The Village, The Village Podor, village Podor, village culturel, centre culturel Podor, Baaba Maal, Blues du Fleuve, festival Sénégal, Fouta Toro, Halpulaar, NANN-k, patrimoine sénégalais"
          : "The Village, The Village Podor, Podor village, cultural village, Podor cultural center, Baaba Maal, Blues du Fleuve, Senegal festival, Fouta Toro, Halpulaar, NANN-k, Senegalese heritage",
      canonical: "https://levillagepodor.com/",
    });

    const structuredData = createStructuredData("Organization", {
      name: "The Village Podor",
      url: "https://levillagepodor.com/",
      logo: "https://levillagepodor.com/logo-the-village.webp",
      description:
        lang === "fr"
          ? "Centre culturel unique initié par Baaba Maal au cœur de la vallée du fleuve Sénégal à Podor, regroupant musée, espaces de création et de formation."
          : "A unique cultural center initiated by Baaba Maal in the heart of the Senegal River valley in Podor, bringing together a museum, creation and training spaces.",
      founder: "Baaba Maal",
      city: "Podor",
      country: "Senegal",
      socialLinks: [
        "https://lesbluesdufleuve.com/",
        "https://www.facebook.com/baabamaal",
        "https://twitter.com/baabamaal",
      ],
    });

    const scripts = [
      {
        type: "application/ld+json",
        innerHTML: structuredData,
      },
    ];

    return { meta, links, scripts };
  },
  component: Home,
});

function Home() {
  const { t } = useTranslation();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // États des carrousels et curseurs dynamiques (style Consortium Jeunesse)
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [heroMottoIdx, setHeroMottoIdx] = useState(0);
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [activeBioChapter, setActiveBioChapter] = useState(0);
  const [activeInstrumentIdx, setActiveInstrumentIdx] = useState(0);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "30%"]);

  const openLightbox = (images: Array<{ src: string; alt: string }>, index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Devises rotatives dans le Hero
  const heroMottos = [
    { word: "PATRIMOINE", sub: "Préserver la mémoire vivante du Fouta Toro et de la vallée" },
    { word: "CRÉATION", sub: "Studios, résidences artistiques et scènes au bord du fleuve" },
    { word: "TRANSMISSION", sub: "Formations musicales, lutherie et savoir-faire avec NANN-K" },
    { word: "RAYONNEMENT", sub: "Berceau du Festival International Les Blues du Fleuve" },
  ];

  // Slides visuels du Hero
  const heroSlides = [
    {
      src: "/centre-culturel.webp",
      tag: "Architecture & Patrimoine · Podor",
      title: "Le Centre Culturel du Fouta",
      desc: "Un village authentique dédié aux arts, au musée et à la création sur les rives du fleuve Sénégal.",
      linkTo: "#presentation",
    },
    {
      src: "/centre-podor.webp",
      tag: "Pôle NANN-K · Jeunesse & Savoirs",
      title: "Espace de Formation & d'Innovation",
      desc: "Ateliers de musique traditionnelle, lutherie, poterie et studios professionnels ouverts aux jeunes talents.",
      linkTo: "/formations",
    },
    {
      src: "/en-route-blues-du-fleuve.webp",
      tag: "27 Novembre 2026 · Théâtre Daniel Sorano",
      title: "En route vers les Blues du Fleuve",
      desc: "Grand concert exceptionnel de Baaba Maal & l'Ensemble Lyrique Traditionnel à Dakar.",
      linkTo: "/blues-du-fleuve",
    },
    {
      src: "/pirogues.webp",
      tag: "4 Pays Unis · 18 Éditions",
      title: "L'Âme de la Vallée du Fleuve",
      desc: "Un carrefour culturel où tradition et modernité se rencontrent pour bâtir l'avenir.",
      linkTo: "/blues-du-fleuve",
    },
  ];

  // Les 3 Piliers interactifs de la section Présentation
  const centerPillars = [
    {
      id: "01",
      icon: Music,
      badge: "Création & Studios",
      title: t("home.activityMusic"),
      desc: t("home.activityMusicDesc"),
      detail:
        "Équipé de salles de répétition et d'un studio d'enregistrement, The Village accueille musiciens traditionnels et artistes contemporains pour documenter et réinventer les sonorités du fleuve.",
      image: "/gal1.webp",
      ctaText: "Découvrir nos studios & médias",
      ctaLink: "/nann-k-media",
    },
    {
      id: "02",
      icon: GraduationCap,
      badge: "Pôle Éducatif NANN-K",
      title: t("home.activityTraining"),
      desc: t("home.activityTrainingDesc"),
      detail:
        "Six parcours d'excellence encadrés par des maîtres griots et artisans : pratique instrumentale (xalam, tama, flûte peule), lutherie, musicologie, poterie et entrepreneuriat culturel.",
      image: "/gal4.webp",
      ctaText: "Explorer les formations",
      ctaLink: "/formations",
    },
    {
      id: "03",
      icon: Calendar,
      badge: "Rencontres & Festival",
      title: t("home.activityEvents"),
      desc: t("home.activityEventsDesc"),
      detail:
        "Point d'ancrage du Festival International Les Blues du Fleuve, le centre vibre toute l'année au rythme des concerts, expositions, conférences citoyennes et défilés de mode.",
      image: "/centre-culturel.webp",
      ctaText: "Voir le Festival Les Blues du Fleuve",
      ctaLink: "/blues-du-fleuve",
    },
  ];

  // Les 4 Chapitres de la biographie de Baaba Maal
  const bioChapters = [
    {
      num: "01",
      label: "Racines & Héritage",
      title: "L'Enfant du Fleuve et la Tradition Pulaar",
      icon: Compass,
      text: t("home.bioFull1"),
      highlight: "Podor · Fouta Toro · Maîtrise du Hoddu & des chants traditionnels",
    },
    {
      num: "02",
      label: "L'Envol Artistique",
      title: "De Dakar aux Scènes Africaines",
      icon: Mic2,
      text: t("home.bioFull2"),
      highlight: "Années 1970 · Fusion des mélodies peules et des sonorités modernes",
    },
    {
      num: "03",
      label: "Rayonnement Mondial",
      title: "Ambassadeur Planétaire de la Culture Africaine",
      icon: Globe,
      text: t("home.bioFull3"),
      highlight: "Tournées mondiales · Collaborations internationales & distinctions",
    },
    {
      num: "04",
      label: "Vision Humaniste",
      title: "Fondateur de NANN-K & The Village à Podor",
      icon: Sparkles,
      text: t("home.bioFull4"),
      highlight: "Culture · Éducation · Développement durable de la vallée du fleuve",
    },
  ];

  // Auto-rotation des devises du Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroMottoIdx((prev) => (prev + 1) % heroMottos.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [heroMottos.length]);

  // Auto-rotation des slides photos du Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-rotation des 3 piliers du Centre Culturel
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillarIdx((prev) => (prev + 1) % centerPillars.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [centerPillars.length]);

  const currentHeroSlide = heroSlides[heroSlideIdx];
  const currentPillar = centerPillars[activePillarIdx];
  const currentBio = bioChapters[activeBioChapter];
  const currentInstrument = instruments[activeInstrumentIdx];

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      {/* =====================================================================
          HERO SECTION : LE CENTRE CULTUREL (DYNAMIQUE & ÉDITORIAL)
      ===================================================================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#04111f]">
        {/* Vidéo d'arrière-plan avec parallaxe isolé */}
        <motion.div className="absolute inset-0 bg-[#04111f] overflow-hidden" style={{ y: heroY }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/centre-culturel.webp"
            className="absolute inset-0 h-full w-full object-cover scale-105"
          >
            <source src="/video-the-village.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-[#04111f]/85 via-[#061a2e]/60 to-[#04111f]/40" />
          <div className="absolute inset-0 bg-linear-to-b from-[#04111f]/50 via-transparent to-[#04111f]" />
        </motion.div>

        <div className="container-page pt-28 pb-16 md:pt-36 md:pb-24 relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Colonne Gauche (7 cols) : Titre, Devise Rotative & Actions */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-sky-300 mb-6"
            >
              <Landmark size={14} className="text-sky-400" />
              <span>{t("home.heroTag")}</span>
            </motion.div>

            <AnimatedText
              el="h1"
              text="THE VILLAGE"
              className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.92] drop-shadow-lg"
              delay={0.1}
            />

            {/* Bandeau rotatif dynamique des piliers du Centre */}
            <div className="mt-6 h-22 sm:h-20 flex flex-col justify-center rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md px-5 py-3 max-w-xl">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-sky-300 mb-1">
                <span>PILIERS DU CENTRE</span>
                <span className="text-white/30">·</span>
                <span>0{heroMottoIdx + 1} / 04</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroMottoIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                >
                  <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">
                    {heroMottos[heroMottoIdx].word}
                  </span>
                  <span className="text-xs sm:text-sm text-white/80 font-medium line-clamp-1">
                    — {heroMottos[heroMottoIdx].sub}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 max-w-2xl text-base md:text-lg text-white/85 font-medium leading-relaxed"
            >
              {t("home.heroSubtitle")}
            </motion.p>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link
                  to="/blues-du-fleuve"
                  className="inline-flex items-center gap-3 rounded-full bg-sky-500 hover:bg-sky-400 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-sky-500/25 transition-all"
                >
                  <span>{t("home.discoverFestival")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/formations"
                  className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#04111f] transition-all"
                >
                  <span>Nos Formations</span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white/90 hover:bg-white/15 transition-all"
                >
                  <span>{t("home.contactUs")}</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Colonne Droite (5 cols) : Carrousel Story / Photos en défilement */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-white/20 bg-[#071c33]/75 backdrop-blur-xl p-4 sm:p-5 shadow-2xl overflow-hidden">
              {/* Barres de progression style Story */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroSlideIdx(idx)}
                    aria-label={`Voir la diapositive ${idx + 1}`}
                    className="h-1.5 rounded-full bg-white/15 overflow-hidden cursor-pointer"
                  >
                    <motion.div
                      className="h-full bg-sky-400"
                      initial={false}
                      animate={{
                        width: idx === heroSlideIdx ? "100%" : idx < heroSlideIdx ? "100%" : "0%",
                        opacity: idx <= heroSlideIdx ? 1 : 0.3,
                      }}
                      transition={{ duration: idx === heroSlideIdx ? 0.4 : 0.2 }}
                    />
                  </button>
                ))}
              </div>

              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#04111f]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroSlide.src}
                    src={currentHeroSlide.src}
                    alt={currentHeroSlide.title}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-linear-to-t from-[#04111f] via-[#04111f]/25 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#04111f]/80 backdrop-blur-md border border-sky-400/30 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-sky-300">
                    {currentHeroSlide.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setHeroSlideIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                      }
                      aria-label="Diapositive précédente"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#04111f]/75 text-white hover:bg-sky-500 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length)}
                      aria-label="Diapositive suivante"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#04111f]/75 text-white hover:bg-sky-500 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHeroSlide.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                    >
                      <h2 className="font-display text-xl sm:text-2xl font-black text-white leading-tight">
                        {currentHeroSlide.title}
                      </h2>
                      <p className="mt-1.5 text-xs sm:text-sm text-white/80 line-clamp-2">
                        {currentHeroSlide.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Pied du carrousel Hero */}
              <div className="mt-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-[11px] font-bold text-white/75">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>Podor · Vallée du Fleuve Sénégal</span>
                </div>
                {currentHeroSlide.linkTo.startsWith("#") ? (
                  <a
                    href={currentHeroSlide.linkTo}
                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-sky-300 hover:text-white transition-colors"
                  >
                    <span>Explorer</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    to={currentHeroSlide.linkTo as any}
                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-sky-300 hover:text-white transition-colors"
                  >
                    <span>Découvrir</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BANDEAU DE DÉFILEMENT CONTINU (MARQUEE)
      ===================================================================== */}
      <div className="relative z-20 overflow-hidden bg-[#071c33] border-y border-sky-400/25 py-3.5">
        <div className="flex whitespace-nowrap animate-[marquee_32s_linear_infinite]">
          {[0, 1].map((loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 mx-4">
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white">
                THE VILLAGE PODOR · CENTRE CULTUREL DU FOUTA
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                INITIÉ PAR BAABA MAAL · L'ÂME DU FLEUVE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white">
                MUSÉE · STUDIOS · FORMATIONS NANN-K · BLUES DU FLEUVE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-sky-300">
                PATRIMOINE · CRÉATION · TRANSMISSION · INTÉGRATION
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          SECTION 1 : PRÉSENTATION DYNAMIQUE & PILIERS INTERACTIFS
      ===================================================================== */}
      <section id="presentation" className="py-24 md:py-32 border-b border-border/40 bg-background">
        <div className="container-page">
          {/* En-tête éditorial + Compteurs d'impact */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end mb-16">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-primary mb-4">
                <Landmark className="h-3.5 w-3.5" />
                <span>{t("home.soulOfRiver")}</span>
              </div>
              <AnimatedText
                el="h2"
                text={t("home.presentation")}
                className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.95]"
              />
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("home.introText1")} {t("home.introText2")} {t("home.introText3")}
              </p>
              <p className="mt-3 text-base md:text-lg text-foreground/85 font-medium leading-relaxed max-w-2xl">
                {t("home.introText5")} {t("home.introText6")} {t("home.introText7")}{" "}
                {t("home.introText8")}
              </p>
            </div>

            {/* Chiffres Clés en cartes architecturales */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-6 text-center">
                <div className="font-display text-3xl sm:text-5xl font-black text-primary tracking-tight">
                  2006
                </div>
                <div className="mt-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                  {t("home.statsFestival")}
                </div>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-6 text-center">
                <div className="font-display text-3xl sm:text-5xl font-black text-primary tracking-tight">
                  18
                </div>
                <div className="mt-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                  {t("home.statsEditions")}
                </div>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-6 text-center">
                <div className="font-display text-3xl sm:text-5xl font-black text-primary tracking-tight">
                  04
                </div>
                <div className="mt-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                  {t("home.statsCountries")}
                </div>
              </div>
            </div>
          </div>

          {/* Showcase interactif des 3 Piliers (Musique, Formations, Événements) */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Sélecteur de Piliers à gauche (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {centerPillars.map((pillar, idx) => {
                const isActive = idx === activePillarIdx;
                const IconComponent = pillar.icon;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarIdx(idx)}
                    className={`group text-left rounded-3xl p-6 transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? "bg-[#04111f] text-white border-[#04111f] shadow-xl"
                        : "bg-card hover:bg-primary/5 text-foreground border-border/70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                            isActive
                              ? "bg-sky-500 text-white"
                              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <span
                            className={`text-[10px] font-black uppercase tracking-[0.24em] block ${
                              isActive ? "text-sky-300" : "text-primary"
                            }`}
                          >
                            {pillar.id} · {pillar.badge}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-5 w-5 transition-transform ${
                          isActive
                            ? "text-sky-400 translate-x-1"
                            : "text-muted-foreground group-hover:translate-x-1"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isActive ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      {pillar.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Scène visuelle dynamique à droite (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative h-full min-h-105 rounded-3xl overflow-hidden border border-border/60 bg-[#04111f] shadow-2xl flex flex-col justify-end p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPillar.image}
                    src={currentPillar.image}
                    alt={currentPillar.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-linear-to-t from-[#04111f] via-[#04111f]/65 to-[#04111f]/20" />

                <div className="relative z-10 max-w-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPillar.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/35 px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-sky-300 mb-4">
                        <span>PILIER {currentPillar.id}</span>
                        <span>·</span>
                        <span>{currentPillar.badge}</span>
                      </span>
                      <h3 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {currentPillar.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
                        {currentPillar.detail}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          to={currentPillar.ctaLink as any}
                          className="inline-flex items-center gap-2.5 rounded-full bg-sky-500 hover:bg-sky-400 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition-all shadow-lg"
                        >
                          <span>{currentPillar.ctaText}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a
                          href="https://lesbluesdufleuve.com/"
                          target="_blank"
                          rel="noopener"
                          title="Site officiel du Festival Les Blues du Fleuve — lesbluesdufleuve.com"
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-[#04111f] transition-all"
                        >
                          <span>lesbluesdufleuve.com</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            PELLICULE PHOTO EN DÉFILEMENT CONTINU (FILMSTRIP)
        =================================================================== */}
        <div className="mt-20">
          <div className="container-page mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-primary">
                Immersion Visuelle · Cliquez sur une photo pour l'agrandir
              </span>
            </div>
            <a
              href="#instruments"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              <span>{t("home.ctaViewInstruments")}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative overflow-hidden py-2">
            <div className="flex gap-5 whitespace-nowrap animate-[marquee_42s_linear_infinite] hover:[animation-play-state:paused]">
              {[...centerFilmstripImages, ...centerFilmstripImages].map((item, idx) => (
                <button
                  key={`${item.src}-${idx}`}
                  type="button"
                  onClick={() =>
                    openLightbox(
                      centerFilmstripImages.map((img) => ({ src: img.src, alt: img.alt })),
                      idx % centerFilmstripImages.length
                    )
                  }
                  className="group relative h-52 sm:h-64 w-76 sm:w-92 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-[#04111f] shadow-md cursor-pointer text-left"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#04111f]/90 via-[#04111f]/20 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 whitespace-normal">
                    <span className="inline-block rounded-full bg-sky-500/25 border border-sky-400/40 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-sky-300 mb-1">
                      {item.tag}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {item.alt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 : BAABA MAAL — PARCOURS INTERACTIF PAR CHAPITRES
      ===================================================================== */}
      <section className="container-page py-24 md:py-32 border-b border-border/40">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Colonne Gauche (5 cols) : Double Portrait Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative lg:sticky lg:top-28"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#04111f] border border-border/50">
              <OptimizedImage
                src="/photo-baba-maal.webp"
                alt="Portrait Baaba Maal"
                className="w-full aspect-4/5 object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#04111f] via-[#04111f]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/40 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-sky-300 mb-2">
                  {t("home.founderLabel")} · NANN-K & The Village
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Baaba Maal
                </h3>
              </div>
            </div>

            {/* Médaillon secondaire */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-36 md:w-44 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-background z-10 -scale-x-100">
              <OptimizedImage
                src="/Baba.webp"
                alt="Baaba Maal en concert"
                className="w-full h-full object-cover"
                objectPosition="right top"
              />
            </div>
          </motion.div>

          {/* Colonne Droite (7 cols) : Biographie Interactive en 4 Chapitres */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-primary mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Biographie & Vision</span>
            </div>

            <AnimatedText
              el="h2"
              text={t("home.bioTitle")}
              className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.95] mb-6"
            />

            {/* Citation signature */}
            <blockquote className="rounded-2xl border-l-4 border-primary bg-primary/5 p-6 italic text-foreground text-lg md:text-xl font-serif leading-relaxed mb-8">
              {t("home.bioShort")}
            </blockquote>

            {/* Onglets des 4 Chapitres */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {bioChapters.map((chap, idx) => {
                const isActive = idx === activeBioChapter;
                return (
                  <button
                    key={chap.num}
                    type="button"
                    onClick={() => setActiveBioChapter(idx)}
                    className={`rounded-2xl p-3.5 text-left transition-all border cursor-pointer ${
                      isActive
                        ? "bg-[#04111f] text-white border-[#04111f] shadow-lg"
                        : "bg-card hover:bg-primary/5 text-foreground border-border/70"
                    }`}
                  >
                    <div
                      className={`text-[10px] font-black uppercase tracking-[0.22em] ${
                        isActive ? "text-sky-400" : "text-primary"
                      }`}
                    >
                      Chapitre {chap.num}
                    </div>
                    <div className="mt-1 font-display text-xs sm:text-sm font-bold line-clamp-1">
                      {chap.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Carte du chapitre actif */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBio.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <currentBio.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary block">
                          CHAPITRE {currentBio.num} · {currentBio.label}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-black text-foreground">
                          {currentBio.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveBioChapter(
                            (prev) => (prev - 1 + bioChapters.length) % bioChapters.length
                          )
                        }
                        aria-label="Chapitre précédent"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-primary hover:text-white transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveBioChapter((prev) => (prev + 1) % bioChapters.length)
                        }
                        aria-label="Chapitre suivant"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-primary hover:text-white transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {currentBio.text}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-primary">{currentBio.highlight}</span>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                      {activeBioChapter + 1} / {bioChapters.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 : ACTIVITÉS CULTURELLES DE THE VILLAGE
      ===================================================================== */}
      <section className="container-page py-24 md:py-32 border-b border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-primary mb-4">
              {t("home.activitiesLabel")}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
              {t("home.activitiesTitle")}
            </h2>
          </div>
          <Link
            to="/blues-du-fleuve"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all self-start md:self-auto"
          >
            <span>Programme du Festival</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ActivityCard
            imageSrc={galleryImages[0].src}
            imageAlt="Concert"
            category={t("home.categoryMusical")}
            title={t("home.activityConcertsTitle")}
            description={t("home.activityConcertsDesc")}
            linkTo="/blues-du-fleuve"
            linkText={t("home.learnMore")}
            onImageClick={() => openLightbox(galleryImages, 0)}
            objectPosition={galleryImages[0].objectPosition}
            className="md:col-span-2 lg:col-span-2"
          />

          <ActivityCard
            imageSrc={galleryImages[1].src}
            imageAlt="Exposition"
            category={t("home.categoryArtistic")}
            title={t("home.activityExhibitionsTitle")}
            description={t("home.activityExhibitionsDesc")}
            linkTo="/nann-k-media"
            linkText={t("home.learnMore")}
            onImageClick={() => openLightbox(galleryImages, 1)}
            objectPosition={galleryImages[1].objectPosition}
          />

          <ActivityCard
            imageSrc={galleryImages[2].src}
            imageAlt="Conférence"
            category={t("home.categoryDebate")}
            title={t("home.activityConferencesTitle")}
            description={t("home.activityConferencesDesc")}
            linkTo="/nann-k-media"
            linkText={t("home.learnMore")}
            onImageClick={() => openLightbox(galleryImages, 2)}
            objectPosition={galleryImages[2].objectPosition}
          />

          <ActivityCard
            imageSrc={galleryImages[3].src}
            imageAlt="Master Class"
            category={t("home.categoryFormation")}
            title={t("home.activityMasterclassTitle")}
            description={t("home.activityMasterclassDesc")}
            linkTo="/formations"
            linkText={t("home.learnMore")}
            onImageClick={() => openLightbox(galleryImages, 3)}
            objectPosition={galleryImages[3].objectPosition}
          />

          <ActivityCard
            imageSrc={galleryImages[4].src}
            imageAlt="Défilé de Mode"
            category={t("home.categoryCreation")}
            title={t("home.activityFashionTitle")}
            description={t("home.activityFashionDesc")}
            linkTo="/nann-k-media"
            linkText={t("home.learnMore")}
            onImageClick={() => openLightbox(galleryImages, 4)}
            objectPosition={galleryImages[4].objectPosition}
          />
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 : ACTUALITÉS & JOURNAL DU CENTRE
      ===================================================================== */}
      <section className="bg-muted/30 py-24 md:py-32 border-b border-border/40">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-primary mb-4">
                {t("home.newsLabel")}
              </span>
              <AnimatedText
                el="h2"
                text={t("home.newsTitle")}
                className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground"
              />
            </div>
            <Link
              to="/nann-k-media"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:text-primary transition-colors"
            >
              <span>{t("home.newsAll")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-10">
            {/* Article à la Une en grand */}
            {articles[0] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <NewsCard
                  to={articles[0].to}
                  imgSrc={articles[0].img}
                  category={articles[0].category}
                  date={articles[0].date}
                  title={articles[0].title}
                  excerpt={articles[0].excerpt}
                  readMoreText={t("home.readMore")}
                  featured
                />
              </motion.div>
            )}

            {/* Autres articles */}
            <div className="grid md:grid-cols-2 gap-8">
              {articles.slice(1).map((article, idx) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="h-full"
                >
                  <NewsCard
                    to={article.to}
                    imgSrc={article.img}
                    category={article.category}
                    date={article.date}
                    title={article.title}
                    excerpt={article.excerpt}
                    readMoreText={t("home.readMore")}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 : HÉRITAGE & INSTRUMENTS DU FOUTA (INTERACTIF BLEU FLEUVE)
      ===================================================================== */}
      <section
        id="instruments"
        className="py-24 md:py-32 bg-[#04111f] text-white relative overflow-hidden"
        aria-labelledby="instruments-title"
      >
        <div className="container-page relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-sky-300 mb-4">
                <Music className="h-3.5 w-3.5" />
                <span>{t("home.heritageLabel")} · Musée & Lutherie</span>
              </span>
              <h2
                id="instruments-title"
                className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-white"
              >
                {t("home.heritageTitle")}
              </h2>
            </div>

            <Link
              to="/formations"
              className="inline-flex items-center gap-2.5 rounded-full bg-sky-500 hover:bg-sky-400 px-7 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-white transition-all self-start md:self-auto shadow-lg"
            >
              <span>Apprendre ces instruments</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Sélecteur des 3 Instruments (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {instruments.map((inst, idx) => {
                const isSelected = idx === activeInstrumentIdx;
                return (
                  <button
                    key={inst.nom}
                    type="button"
                    onClick={() => setActiveInstrumentIdx(idx)}
                    className={`w-full text-left rounded-3xl p-6 transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-sky-500/20 border-sky-400 text-white shadow-xl"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-300">
                        0{idx + 1} · {inst.tag}
                      </span>
                      <span className="font-display text-2xl font-black text-sky-400/40">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-black text-white">{inst.nom}</h3>
                    <p className="text-xs text-sky-200/80 font-medium mt-0.5">{inst.subtitle}</p>
                  </button>
                );
              })}
            </div>

            {/* Vitrine interactive de l'instrument sélectionné (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/15 bg-[#071c33] overflow-hidden shadow-2xl grid md:grid-cols-12">
                <div className="md:col-span-5 relative min-h-64 md:min-h-90 bg-[#04111f]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentInstrument.image}
                      src={currentInstrument.image}
                      alt={currentInstrument.nom}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-linear-to-t from-[#071c33] via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-[#071c33]" />
                </div>

                <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentInstrument.nom}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-block rounded-full bg-sky-500/20 border border-sky-400/30 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-sky-300 mb-3">
                        {currentInstrument.tag}
                      </span>
                      <h3 className="font-display text-3xl sm:text-4xl font-black text-white">
                        {currentInstrument.nom}
                      </h3>
                      <p className="text-sm font-bold text-sky-300 mt-1">
                        {currentInstrument.subtitle}
                      </p>
                      <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
                        {currentInstrument.desc}
                      </p>

                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <Link
                          to="/formations"
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-sky-300 hover:text-white transition-colors"
                        >
                          <span>Formation & Lutherie au Centre</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveInstrumentIdx(
                                (prev) => (prev - 1 + instruments.length) % instruments.length
                              )
                            }
                            aria-label="Instrument précédent"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-sky-500 text-white transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveInstrumentIdx((prev) => (prev + 1) % instruments.length)
                            }
                            aria-label="Instrument suivant"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-sky-500 text-white transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
