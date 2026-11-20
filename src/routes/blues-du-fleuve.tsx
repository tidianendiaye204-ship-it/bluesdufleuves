import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Calendar,
  Music2,
  Palette,
  Mic,
  Users,
  Target,
  Award,
  Sparkles,
  Globe,
  Heart,
  TreePine,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Crown,
  Diamond,
  Ticket,
  Clock,
  ExternalLink,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createSeoMeta, createStructuredData } from "@/lib/seo";
import { PageSkeleton } from "@/components/PageSkeleton";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Lightbox } from "@/components/Lightbox";
import { AnimatedText } from "@/components/AnimatedText";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { artistes, piliers, videos, galleryImages } from "@/data/festival-content";
import { MagneticButton } from "@/components/MagneticButton";
import { Countdown } from "@/components/Countdown";
import { FESTIVAL_CONFIG } from "@/config/festival";

export const Route = createFileRoute("/blues-du-fleuve")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "Blues du Fleuve | Festival The Village Podor par Baaba Maal",
      description:
        "Festival Blues du Fleuve au The Village, le centre culturel de Podor, fondé par Baaba Maal. Célébration de l'intégration, de la solidarité et de la culture de la vallée du fleuve Sénégal.",
      ogTitle: "Blues du Fleuve — Festival au The Village Podor",
      ogDescription:
        "Découvrez la 18ème édition du Festival Blues du Fleuve avec Baaba Maal à Podor et Ndioum, et des artistes de la région du Fouta Toro.",
      ogImage: "/festival-baba-maal.webp",
      keywords:
        "Blues du Fleuve, Festival Podor, The Village, Baaba Maal, musique Sénégal, Fouta Toro, festival 2026, culture Halpulaar",
      canonical: "https://levillagepodor.com/blues-du-fleuve",
    });

    const structuredData = createStructuredData("MusicEvent", {
      name: "Blues du Fleuve - 18ème édition",
      startDate: "2026-12-05T18:00:00",
      endDate: "2026-12-07T23:59:59",
      locationName: "The Village Podor",
      city: "Podor et Ndioum",
      country: "Sénégal",
      description:
        "Festival Blues du Fleuve au The Village, le centre culturel de Podor, fondé par Baaba Maal. Célébration de l'intégration, de la solidarité et de la culture de la vallée du fleuve Sénégal.",
      image: "/festival-baba-maal.webp",
      url: "https://levillagepodor.com/blues-du-fleuve",
      sameAs: ["https://lesbluesdufleuve.com/"],
      performers: artistes.map((artist) => ({ name: artist.nom })),
      organizer: "The Village Podor & Festival Les Blues du Fleuve",
      organizerUrl: "https://lesbluesdufleuve.com/",
      ticketUrl: "https://levillagepodor.com/blues-du-fleuve#billetterie",
      price: "5000",
      priceCurrency: "XOF",
    });

    const scripts = [
      {
        type: "application/ld+json",
        innerHTML: structuredData,
      },
    ];

    return { meta, links, scripts };
  },
  pendingComponent: PageSkeleton,
  component: BluesDuFleuve,
});

function BluesDuFleuve() {
  const { t } = useTranslation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<(typeof artistes)[0] | null>(null);

  // Interactive sliders state (inspired by Consortium Jeunesse Sénégal — Bokk | Jang | Ligeey)
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [activePresTab, setActivePresTab] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const heroSlides = [
    {
      badge: "Fondateur & Ambassadeur",
      subtitle: "Roi du Yéla · Voix du Fouta Toro",
      title: "Baaba Maal",
      desc: "Initiateur du Festival International Les Blues du Fleuve depuis 2006 à Podor.",
      img: "/festival-baba-maal.webp",
      bgImg: "/gal19.webp",
      pos: "center 10%",
      word: "CULTURE",
      motto: "Célébrer l'héritage musical et spirituel de la Vallée du Fleuve",
    },
    {
      badge: "Avant-Première · 27 Nov 2026",
      subtitle: "Théâtre National Daniel Sorano · Dakar",
      title: "En route vers les Blues",
      desc: "Grand concert de lancement avec Baaba Maal & l'Ensemble Lyrique Traditionnel en co-production avec MARVA Group.",
      img: "/en-route-blues-du-fleuve.webp",
      bgImg: "/gal10.webp",
      pos: "center",
      word: "SOLIDARITÉ",
      motto: "Unir les peuples riverains du Sénégal, de la Mauritanie, du Mali et de la Guinée",
    },
    {
      badge: "18ème Édition · 04–06 Déc 2026",
      subtitle: "Podor & Ndioum · Fouta Toro",
      title: "Scènes sur le Fleuve",
      desc: "Trois jours de concerts géants, régates de pirogues, expositions artisanales et forums citoyens.",
      img: "/gal19.webp",
      bgImg: "/centre-culturel.webp",
      pos: "center",
      word: "ENVIRONNEMENT",
      motto: "Protéger et valoriser durablement l'écosystème du Fleuve Sénégal",
    },
    {
      badge: "Savoir-Faire & Forums",
      subtitle: "Artisanat · Conférences · Jeunesse",
      title: "Émergence & Patrimoine",
      desc: "Panels thématiques, création contemporaine et transmission intergénérationnelle au cœur du Fouta.",
      img: "/gal12.webp",
      bgImg: "/gal14.webp",
      pos: "center",
      word: "ÉMERGENCE",
      motto: "Former, inspirer et accompagner les talents culturels de demain",
    },
  ];

  const pillarDetails = [
    {
      ...piliers[0],
      wolofPulaar: "Pulaagu · Yéla",
      secondaryImg: "/gal10.webp",
      thirdImg: "/gal14.webp",
      highlights: [
        "Concerts géants sur les berges du fleuve à Podor et Ndioum",
        "Chants traditionnels Pekaan, Yéla et danses Wango",
        "Plateaux artistiques réunissant Sénégal, Mauritanie, Mali et Guinée",
      ],
      statValue: "+30",
      statLabel: "Groupes & Artistes sur scène",
    },
    {
      ...piliers[1],
      wolofPulaar: "Ñeeñal · Création",
      secondaryImg: "/gal16.webp",
      thirdImg: "/gal20.webp",
      highlights: [
        "Village artisanal mettant à l'honneur tisserands, potiers et bijoutiers",
        "Défilés de mode traditionnelle et créations contemporaines du Fouta",
        "Valorisation économique des coopératives féminines de la vallée",
      ],
      statValue: "100%",
      statLabel: "Savoir-faire authentique de la Vallée",
    },
    {
      ...piliers[2],
      wolofPulaar: "Miijo · Dialogue",
      secondaryImg: "/gal17.webp",
      thirdImg: "/gal21.webp",
      highlights: [
        "Panels sur l'environnement, la sécurité et l'intégration sous-régionale",
        "Rencontres intergénérationnelles et ateliers pour la jeunesse",
        "Plaidoyer pour le développement durable du bassin du fleuve Sénégal",
      ],
      statValue: "04",
      statLabel: "Nations réunies autour des tables rondes",
    },
  ];

  // Auto-advance Hero slider every 4.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-advance "Les Rives de l'Harmonie" slider every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePillarIdx((prev) => (prev + 1) % pillarDetails.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [pillarDetails.length]);

  // Auto-advance "Présentation" tabs every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePresTab((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const currentHero = heroSlides[heroSlideIdx];
  const currentPillar = pillarDetails[activePillarIdx];

  return (
    <>
      {/* ──────────────────── HERO : TEXTES & PHOTOS DÉFILANTS (STYLE CJS) ──────────────────── */}
      <section ref={heroRef} className="relative min-h-[90vh] overflow-hidden bg-[#04111f]">
        <motion.div style={{ y: bgY }} className="absolute inset-0 bg-[#04111f] overflow-hidden">
          {/* Fallback local immédiat pendant le chargement du flux YouTube */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/gal19.webp"
            className="absolute inset-0 h-full w-full object-cover scale-105"
          >
            <source src="/videohdfestival.mp4" type="video/mp4" />
          </video>

          {/* Vidéo officielle en arrière-plan (YouTube Short IHAWprBOmzs) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <iframe
              src="https://www.youtube.com/embed/IHAWprBOmzs?autoplay=1&mute=1&loop=1&playlist=IHAWprBOmzs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0"
              title="Les Blues du Fleuve — Vidéo d'arrière-plan officielle"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,56.25vh)] h-[max(177.78vw,100vh)] scale-115 border-0 pointer-events-none"
            />
          </div>

          {/* Voiles cinématiques Bleu Fleuve profond & lumineux */}
          <div className="absolute inset-0 bg-linear-to-r from-[#04111f]/80 via-[#061a2e]/55 to-[#04111f]/35" />
          <div className="absolute inset-0 bg-linear-to-b from-[#04111f]/50 via-transparent to-[#04111f]" />
        </motion.div>

        <div className="container-page pt-24 pb-16 md:pt-36 md:pb-24 relative grid gap-8 lg:gap-10 lg:grid-cols-12 lg:items-center z-10">
          {/* Colonne Gauche (7 cols) : Identité + Texte Rotatif Dynamique + Actions */}
          <div className="lg:col-span-7 min-w-0">
            <div className="mb-4 sm:mb-5">
              <img
                src="/logo-festival.webp"
                alt="Les Blues du Fleuve — Logo officiel"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] sm:tracking-[0.28em] text-sky-300">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse shrink-0" />
                <span>{t("festival.internationalFestival")}</span>
              </div>
            </div>

            <AnimatedText
              el="h1"
              text={t("festival.title")}
              className="luxury-text text-4xl sm:text-6xl md:text-7xl xl:text-8xl mb-4 text-white uppercase tracking-tighter drop-shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
              delay={0.15}
            />

            {/* Bandeau de texte rotatif animé (Style Bokk | Jang | Ligeey) */}
            <div className="my-4 sm:my-5 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-3.5 sm:px-5 sm:py-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-400">
                  Piliers en mouvement
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {heroSlides.map((s, idx) => (
                    <button
                      key={s.word}
                      type="button"
                      onClick={() => setHeroSlideIdx(idx)}
                      className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        idx === heroSlideIdx
                          ? "bg-sky-500 text-white shadow-sm"
                          : "bg-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {s.word}
                    </button>
                  ))}
                </div>
              </div>
              <div className="min-h-12 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.word}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex items-center gap-3 min-w-0"
                  >
                    <span className="h-8 w-1 rounded-full bg-sky-400 shrink-0" />
                    <p className="text-sm sm:text-base md:text-lg font-serif italic text-white/95 break-words">
                      « {currentHero.motto} »
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <p className="text-sm sm:text-lg font-light text-white/90 leading-relaxed">
                {t("festival.heroDesc1")}{" "}
                <strong className="font-extrabold text-sky-300">Baaba MAAL</strong>
                {t("festival.heroDesc1b")}
              </p>

              <button
                type="button"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-sky-300 hover:text-white text-xs flex items-center gap-1.5 font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
              >
                {showFullDescription ? (
                  <>
                    <ChevronUp size={15} /> {t("festival.close")}
                  </>
                ) : (
                  <>
                    <ChevronDown size={15} /> {t("festival.discoverVision")}
                  </>
                )}
              </button>

              <AnimatePresence>
                {showFullDescription && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed p-4 rounded-2xl bg-white/[0.06] border border-white/10"
                  >
                    <p>{t("festival.heroDesc2")}</p>
                    <p>{t("festival.heroLongDesc1")}</p>
                    <p>{t("festival.heroLongDesc2")}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Badges d'information */}
              <div className="pt-1 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
                  <MapPin size={14} className="text-sky-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">
                    {FESTIVAL_CONFIG.location}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
                  <Calendar size={14} className="text-sky-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">
                    {FESTIVAL_CONFIG.dateTexte}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500/20 backdrop-blur-md border border-sky-400/40 text-sky-200">
                  <Sparkles size={14} className="text-sky-300 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold">Sorano (Dakar) · 27 Nov 2026</span>
                </div>
              </div>

              {/* Compte à rebours */}
              <div className="pt-2">
                <Countdown targetDate={FESTIVAL_CONFIG.startDate} />
              </div>

              {/* Boutons d'action */}
              <div className="pt-3 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <a
                  href="#en-route"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("en-route")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 relative z-50 w-full sm:w-fit bg-sky-500 hover:bg-sky-400 px-5 sm:px-6 py-3.5 rounded-full text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5"
                >
                  <Sparkles size={15} className="shrink-0" />
                  <span>En route vers les Blues · 27 Nov</span>
                </a>
                <a
                  href="#billetterie"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("billetterie")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 relative z-50 w-full sm:w-fit px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs transition-all"
                >
                  <span>{t("festival.viewProgram")}</span>
                  <ArrowRight size={14} className="shrink-0" />
                </a>
                <a
                  href="https://lesbluesdufleuve.com/"
                  target="_blank"
                  rel="noopener"
                  title="Site officiel du Festival Les Blues du Fleuve — lesbluesdufleuve.com"
                  className="inline-flex items-center justify-center gap-2 relative z-50 w-full sm:w-fit px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md border border-sky-400/35 text-sky-200 font-bold uppercase tracking-widest text-[11px] sm:text-xs transition-all"
                >
                  <Globe size={14} className="text-sky-400 shrink-0" />
                  <span>lesbluesdufleuve.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne Droite (5 cols) : Carrousel Photo & Story Automatique */}
          <div className="lg:col-span-5 min-w-0">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-[#06182c] shadow-[0_25px_70px_rgba(0,0,0,0.65)] aspect-4/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.img}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <OptimizedImage
                      src={currentHero.img}
                      alt={currentHero.title}
                      className="h-full w-full"
                      objectPosition={currentHero.pos}
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#030d18] via-[#030d18]/35 to-black/20" />
                  </motion.div>
                </AnimatePresence>

                {/* Barres de progression style Story en haut */}
                <div className="absolute top-4 left-4 right-4 z-20 space-y-3">
                  <div className="grid grid-cols-4 gap-1.5">
                    {heroSlides.map((s, idx) => (
                      <button
                        key={s.title}
                        type="button"
                        onClick={() => setHeroSlideIdx(idx)}
                        aria-label={s.title}
                        className="h-1.5 rounded-full bg-white/25 overflow-hidden cursor-pointer"
                      >
                        <motion.div
                          className="h-full bg-sky-400"
                          initial={{ width: idx < heroSlideIdx ? "100%" : "0%" }}
                          animate={{
                            width:
                              idx === heroSlideIdx ? "100%" : idx < heroSlideIdx ? "100%" : "0%",
                          }}
                          transition={{
                            duration: idx === heroSlideIdx ? 4.8 : 0.2,
                            ease: "linear",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04111f]/80 backdrop-blur-md border border-sky-400/35 text-sky-300 text-[10px] font-extrabold uppercase tracking-[0.18em]">
                      <Sparkles size={11} className="text-sky-400" />
                      {currentHero.badge}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setHeroSlideIdx(
                            (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
                          )
                        }
                        aria-label="Diapositive précédente"
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-sky-500 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length)}
                        aria-label="Diapositive suivante"
                        className="h-8 w-8 rounded-full bg-black/50 hover:bg-sky-500 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Légende dynamique en bas de l'image */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 sm:p-5 rounded-2xl bg-[#04111f]/85 backdrop-blur-xl border border-white/15">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHero.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-sky-400 mb-1">
                        {currentHero.subtitle}
                      </p>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                        {currentHero.title}
                      </h2>
                      <p className="text-xs text-white/80 font-serif mt-1.5 line-clamp-2">
                        {currentHero.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── BANDEAU DÉFILANT CONTINU (MARQUEE STYLE CJS) ──────────────────── */}
      <div className="relative z-20 bg-[#071c33] text-white py-4 overflow-hidden border-y border-sky-400/25 shadow-lg select-none">
        <motion.div
          className="flex whitespace-nowrap items-center gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-10">
              {[
                "FESTIVAL INTERNATIONAL LES BLUES DU FLEUVE",
                "18ÈME ÉDITION · 04 AU 06 DÉCEMBRE 2026",
                "PODOR & NDIOUM · VALLÉE DU FLEUVE SÉNÉGAL",
                "AVANT-PREMIÈRE : 27 NOVEMBRE 2026 AU THÉÂTRE DANIEL SORANO",
                "CO-PRODUCTION MARVA GROUP & BAABA MAAL",
                "CULTURE · SÉCURITÉ · ENVIRONNEMENT · SOLIDARITÉ",
              ].map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="inline-flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.25em] text-white/95"
                >
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ──────────────────── EN ROUTE VERS LES BLUES DU FLEUVE (SORANO & MARVA GROUP) ──────────────────── */}
      <section
        id="en-route"
        className="relative border-b border-border bg-linear-to-b from-[#06182c] via-[#092340] to-background text-white overflow-hidden"
      >
        <div className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] bg-sky-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[26rem] h-[26rem] bg-primary/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="container-page py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-12 md:mb-16"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-full border border-sky-400/35 bg-sky-500/10 backdrop-blur-md mb-5">
              <Sparkles size={14} className="text-sky-300 shrink-0" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-sky-200 font-extrabold">
                {t("festival.enRoutePartnership")}
              </span>
            </div>

            <h2 className="luxury-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              {t("festival.enRouteTitle1")}{" "}
              <span className="text-sky-300">{t("festival.enRouteTitle2")}</span>
            </h2>
            <p className="text-base md:text-lg text-white/80 font-serif max-w-2xl mx-auto leading-relaxed">
              {t("festival.enRouteSubtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN (5 cols) — Official Poster + MARVA Group Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col gap-5"
            >
              <div
                onClick={() => openLightbox(0)}
                className="group relative rounded-3xl overflow-hidden border border-sky-400/30 bg-black/50 shadow-[0_20px_60px_rgba(0,0,0,0.55)] cursor-pointer transition-all duration-500 hover:border-sky-300/70"
              >
                <div className="aspect-4/5 w-full relative overflow-hidden">
                  <OptimizedImage
                    src="/en-route-blues-du-fleuve.webp"
                    alt="Affiche officielle En route vers les Blues du Fleuve — Baaba Maal au Théâtre National Daniel Sorano"
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-2">
                      <Zap size={14} />
                      {t("festival.enRouteZoomPoster")}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#04111f]/85 backdrop-blur-md border border-sky-400/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-200">
                    {t("festival.enRouteBadge")}
                  </span>
                </div>
              </div>

              {/* MARVA GROUP — Strategic Partner Spotlight Card */}
              <div className="relative rounded-2xl p-5 border border-sky-400/30 bg-white/[0.06] backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/25">
                    <Diamond size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sky-300 block">
                      {t("festival.enRouteMarvaBadge")}
                    </span>
                    <h3 className="font-display text-lg font-black uppercase tracking-wider text-white mt-0.5">
                      MARVA GROUP &amp; THÉÂTRE DANIEL SORANO
                    </h3>
                    <p className="text-xs text-white/75 font-serif mt-1 leading-relaxed">
                      {t("festival.enRouteMarvaDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN (7 cols) — Featured YouTube Video + Key Info + Ticketing */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#04111f]/85 backdrop-blur-xl shadow-2xl">
                <div className="px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/[0.03]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
                      <Play size={14} className="text-sky-300" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
                        {t("festival.enRouteVideoBadge")}
                      </p>
                      <h3 className="font-display text-sm sm:text-base font-bold text-white">
                        {t("festival.enRouteVideoTitle")}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-[10px] font-bold uppercase tracking-wider">
                    Vidéo Officielle
                  </span>
                </div>

                <div className="aspect-video w-full bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/mzXLB9vo8CQ?rel=0&modestbranding=1"
                    title="En route vers les Blues du Fleuve — Présentation officielle"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 border border-white/10 bg-[#04111f]/70 backdrop-blur-md flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0 text-sky-300">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                      {t("festival.enRouteDateLabel")}
                    </p>
                    <p className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                      {t("festival.enRouteDateValue")}
                    </p>
                    <p className="text-xs text-sky-300 font-semibold mt-1">
                      Baaba Maal · {t("festival.enRouteEnsemble")}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl p-5 border border-white/10 bg-[#04111f]/70 backdrop-blur-md flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0 text-sky-300">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                      {t("festival.enRouteVenueLabel")}
                    </p>
                    <p className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                      {t("festival.enRouteVenueValue")}
                    </p>
                    <p className="text-xs text-white/70 mt-1">Grande soirée de lancement à Dakar</p>
                  </div>
                </div>

                <div className="sm:col-span-2 rounded-2xl p-5 border border-sky-400/25 bg-[#04111f]/75 backdrop-blur-md flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 text-sky-300">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sky-300">
                      {t("festival.enRoutePatronLabel")}
                    </p>
                    <p className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                      {t("festival.enRoutePatronValue")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 sm:p-6 border border-white/15 bg-[#04111f]/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block">
                      {t("festival.enRouteStandard")}
                    </span>
                    <span className="font-display text-xl sm:text-2xl font-black text-white">
                      10.000 <span className="text-xs font-bold text-sky-300">FCFA</span>
                    </span>
                  </div>
                  <div className="h-8 w-px bg-white/15 hidden sm:block" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300 block">
                      {t("festival.enRouteVip")}
                    </span>
                    <span className="font-display text-xl sm:text-2xl font-black text-sky-300">
                      20.000 <span className="text-xs font-bold text-white">FCFA</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://events.in-tickets-sn.com/evenements/les-blues-du-fleuves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs text-white bg-sky-500 hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/25 shrink-0"
                  >
                    <Ticket size={15} />
                    <span>Acheter mon ticket (27 Nov)</span>
                    <ExternalLink size={14} />
                  </a>
                  <Link
                    to="/billetterie"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 transition-all shrink-0"
                  >
                    <span>QR &amp; Détails</span>
                  </Link>
                </div>
              </div>

              {/* Carte QR Code Officiel IN-TICKETS */}
              <div className="rounded-2xl p-4 sm:p-5 border border-sky-400/25 bg-white/[0.04] backdrop-blur-md flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://events.in-tickets-sn.com/evenements/les-blues-du-fleuves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-24 sm:w-28 aspect-4/5 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-lg hover:scale-105 transition-transform"
                >
                  <img
                    src="/en-route-qr-sorano.jpg"
                    alt="QR Code Billetterie Officielle — En route vers les Blues du Fleuve (27 Nov 2026)"
                    className="w-full h-full object-cover"
                  />
                </a>
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-300 block">
                    Billetterie Officielle · IN-TICKETS
                  </span>
                  <h4 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                    Scannez le QR Code ou réservez en ligne
                  </h4>
                  <p className="text-xs text-white/75 font-serif mt-1">
                    Vendredi 27 novembre 2026 à 21h00 au Théâtre National Daniel Sorano (Dakar).
                  </p>
                  <a
                    href="https://events.in-tickets-sn.com/evenements/les-blues-du-fleuves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    <span>events.in-tickets-sn.com/evenements/les-blues-du-fleuves</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────── LES RIVES DE L'HARMONIE : SLIDER INTERACTIF (STYLE BOKK | JANG | LIGEEY) ──────────────────── */}
      <section className="relative border-b border-border bg-background overflow-hidden">
        <div className="container-page py-20 md:py-28 relative z-10">
          {/* En-tête de section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs uppercase tracking-[0.35em] text-primary font-bold">
                  {t("festival.theme17")}
                </span>
              </div>
              <h2 className="luxury-text text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
                {t("festival.themeTitle1")}{" "}
                <span className="text-primary">{t("festival.themeTitle2")}</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground font-serif italic max-w-xl">
              {t("festival.themeSubtitle")}
            </p>
          </div>

          {/* Barre d'onglets interactifs avec jauge de défilement automatique (Bokk | Jang | Ligeey style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {pillarDetails.map((item, idx) => {
              const active = idx === activePillarIdx;
              const PillarIcon = item.Icon;
              return (
                <button
                  key={item.titre}
                  type="button"
                  onClick={() => setActivePillarIdx(idx)}
                  className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    active
                      ? "bg-primary text-white border-primary shadow-xl shadow-primary/15"
                      : "bg-card hover:bg-muted/60 text-foreground border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-[0.25em] ${
                        active ? "text-sky-200" : "text-primary"
                      }`}
                    >
                      0{idx + 1} · {item.wolofPulaar}
                    </span>
                    <PillarIcon
                      size={18}
                      className={active ? "text-sky-200" : "text-muted-foreground"}
                    />
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight">
                    {item.titre}
                  </div>
                  <p
                    className={`text-xs mt-1 line-clamp-1 ${
                      active ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {item.tag}
                  </p>

                  {/* Barre de progression animée en bas de l'onglet actif */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
                    {active && (
                      <motion.div
                        key={`progress-${activePillarIdx}`}
                        className="h-full bg-sky-300"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5.5, ease: "linear" }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Grand panneau animé ( Texte qui glisse à gauche + Photos qui glissent à droite ) */}
          <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.titre}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 items-stretch"
              >
                {/* Texte & Points Clés (6 cols) */}
                <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-primary mb-3">
                      <span>Pilier 0{activePillarIdx + 1}</span>
                      <span>•</span>
                      <span>{currentPillar.tag}</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
                      {currentPillar.titre}
                    </h3>

                    <p className="text-base sm:text-lg text-muted-foreground font-serif leading-relaxed mb-8">
                      {currentPillar.desc}
                    </p>

                    <div className="space-y-3.5">
                      {currentPillar.highlights.map((pt, i) => (
                        <motion.div
                          key={pt}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.15 }}
                          className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-muted/50 border border-border/60"
                        >
                          <span className="h-6 w-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-sm sm:text-base text-foreground font-medium">
                            {pt}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-3xl sm:text-4xl font-black text-primary">
                        {currentPillar.statValue}
                      </span>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        {currentPillar.statLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActivePillarIdx(
                            (prev) => (prev - 1 + pillarDetails.length) % pillarDetails.length,
                          )
                        }
                        aria-label="Pilier précédent"
                        className="h-10 w-10 rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActivePillarIdx((prev) => (prev + 1) % pillarDetails.length)
                        }
                        aria-label="Pilier suivant"
                        className="h-10 w-10 rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Composition Photo Dynamique (6 cols) */}
                <div className="lg:col-span-6 relative min-h-80 sm:min-h-105 bg-slate-950 overflow-hidden">
                  <OptimizedImage
                    src={currentPillar.img}
                    alt={currentPillar.titre}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105"
                    objectPosition="center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#04111f]/90 via-transparent to-black/20" />

                  {/* Mini-galerie flottante en bas de l'image */}
                  <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl h-28 sm:h-32 relative group">
                      <OptimizedImage
                        src={currentPillar.secondaryImg}
                        alt={currentPillar.titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl h-28 sm:h-32 relative group">
                      <OptimizedImage
                        src={currentPillar.thirdImg}
                        alt={currentPillar.titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── RUBAN PHOTOGRAPHIE EN DÉFILEMENT CONTINU (FILMSTRIP) ── */}
        <div className="pb-16 overflow-hidden">
          <div className="container-page mb-4 flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary">
              Instantanes du Fleuve · Défilement en continu
            </span>
            <span className="text-xs text-muted-foreground font-serif italic">
              Cliquez sur une photo pour l&apos;agrandir
            </span>
          </div>
          <motion.div
            className="flex gap-4 w-max px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          >
            {[...galleryImages.slice(0, 10), ...galleryImages.slice(0, 10)].map((img, i) => (
              <div
                key={`strip-${i}-${img.id}`}
                onClick={() => openLightbox(i % 10)}
                className="relative w-64 sm:w-80 aspect-16/10 rounded-2xl overflow-hidden border border-border shadow-md group cursor-pointer shrink-0"
              >
                <OptimizedImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-semibold text-white line-clamp-1">{img.alt}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── PRÉSENTATION : CARROUSEL INTERACTIF PODOR & NDIOUM ──────────────────── */}
      <section className="relative border-b border-border bg-muted/25 overflow-hidden">
        <div className="container-page py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            {/* Header + Chiffres clés animés */}
            <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
              <div className="lg:col-span-7">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-2.5">
                  {t("festival.presentation")}
                </p>
                <h2 className="luxury-text text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-foreground mb-4">
                  {t("festival.presentationTitle1")}{" "}
                  <span className="text-primary">Podor et Ndioum</span>
                </h2>
                <p className="text-muted-foreground font-serif text-base sm:text-lg leading-relaxed">
                  {t("festival.presentationDesc")} <strong>Baaba Maal</strong>
                  {t("festival.presentationDesc2")}
                </p>
              </div>

              {/* Compteurs d'impact style CJS */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-3">
                {[
                  { num: "2006", label: "Création" },
                  { num: "18", label: "Éditions" },
                  { num: "04", label: "Pays Unis" },
                ].map((st) => (
                  <div
                    key={st.label}
                    className="rounded-2xl bg-card border border-border p-4 text-center shadow-sm"
                  >
                    <div className="luxury-text text-2xl sm:text-3xl md:text-4xl text-primary">
                      {st.num}
                    </div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground mt-1">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation par onglets glissants (Objectifs | Retombées | Activités Phares | Bénéficiaires) */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[
                {
                  id: 0,
                  label: t("festival.objectives"),
                  sub: "04 Axes Stratégiques",
                  icon: Target,
                },
                { id: 1, label: t("festival.outcomes"), sub: "Impact Territorial", icon: Sparkles },
                {
                  id: 2,
                  label: t("festival.keyActivities"),
                  sub: "Programmation",
                  icon: Mic,
                },
                {
                  id: 3,
                  label: t("festival.beneficiaries"),
                  sub: "08 Communautés",
                  icon: Users,
                },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = activePresTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePresTab(tab.id)}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-card hover:bg-muted text-foreground border-border"
                    }`}
                  >
                    <TabIcon size={18} className={isSelected ? "text-sky-200" : "text-primary"} />
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                        {tab.label}
                      </div>
                      <div
                        className={`text-[10px] ${
                          isSelected ? "text-sky-200" : "text-muted-foreground"
                        }`}
                      >
                        {tab.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Contenu glissant selon l'onglet actif */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl min-h-85 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activePresTab === 0 && (
                  <motion.div
                    key="tab-objectifs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    {[
                      {
                        icon: Globe,
                        text: t("festival.obj1"),
                        sub: "Rapprocher les peuples riverains du Sénégal, de la Mauritanie, du Mali et de la Guinée",
                        img: "/gal11.webp",
                      },
                      {
                        icon: Music2,
                        text: t("festival.obj2"),
                        sub: "Créer des résidences et des scènes partagées entre jeunes talents et légendes",
                        img: "/gal13.webp",
                      },
                      {
                        icon: Palette,
                        text: t("festival.obj3"),
                        sub: "Faire rayonner la musique, les contes et l'artisanat du Fouta Toro à l'international",
                        img: "/gal15.webp",
                      },
                      {
                        icon: Award,
                        text: t("festival.obj4"),
                        sub: "Bâtir des infrastructures culturelles pérennes à Podor et Ndioum",
                        img: "/gal18.webp",
                      },
                    ].map(({ icon: Icon, text, sub, img }, i) => (
                      <div
                        key={text}
                        className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-muted/30 hover:border-primary/40 transition-all"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                          <OptimizedImage
                            src={img}
                            alt={text}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary mb-1">
                            <Icon size={12} /> Objectif 0{i + 1}
                          </div>
                          <h4 className="font-display text-base font-bold text-foreground leading-snug">
                            {text}
                          </h4>
                          <p className="text-xs text-muted-foreground font-serif mt-1">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activePresTab === 1 && (
                  <motion.div
                    key="tab-retombees"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {[
                      {
                        icon: Heart,
                        label: t("festival.outcome1"),
                        sub: "Dialogue interculturel et cohésion sociale dans le bassin du fleuve",
                        img: "/gal22.webp",
                      },
                      {
                        icon: Target,
                        label: t("festival.outcome2"),
                        sub: "Dynamisation de l'économie locale, de l'hôtellerie et des transports",
                        img: "/gal23.webp",
                      },
                      {
                        icon: MapPin,
                        label: t("festival.outcome3"),
                        sub: "Mise en valeur touristique des quais historiques de Podor et de Ndioum",
                        img: "/gal24.webp",
                      },
                      {
                        icon: TreePine,
                        label: t("festival.outcome4"),
                        sub: "Sensibilisation écologique et promotion des artisans de la vallée",
                        img: "/gal25.webp",
                      },
                    ].map(({ icon: Icon, label, sub, img }) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-border overflow-hidden bg-muted/20 flex flex-col justify-between group"
                      >
                        <div className="h-36 relative overflow-hidden">
                          <OptimizedImage
                            src={img}
                            alt={label}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-3 left-3 h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center">
                            <Icon size={16} />
                          </div>
                        </div>
                        <div className="p-4 flex-1">
                          <h4 className="font-display text-base font-bold text-foreground">
                            {label}
                          </h4>
                          <p className="text-xs text-muted-foreground font-serif mt-1.5 leading-relaxed">
                            {sub}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activePresTab === 2 && (
                  <motion.div
                    key="tab-activites"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid md:grid-cols-3 gap-5"
                  >
                    {[
                      {
                        icon: Music2,
                        label: t("festival.activity1"),
                        desc: "Soirées de gala au Théâtre Daniel Sorano puis grands concerts populaires à Podor et Ndioum.",
                        img: "/gal19.webp",
                      },
                      {
                        icon: Palette,
                        label: t("festival.activity2"),
                        desc: "Foires artisanales, régates de pirogues sur le fleuve Sénégal et défilés de mode traditionnelle.",
                        img: "/gal12.webp",
                      },
                      {
                        icon: Users,
                        label: t("festival.activity3"),
                        desc: "Forums citoyens, ateliers de formation NANN-K et caravanes de sensibilisation.",
                        img: "/gal15.webp",
                      },
                    ].map(({ icon: Icon, label, desc, img }, i) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-border overflow-hidden bg-muted/20 group"
                      >
                        <div className="h-44 relative overflow-hidden">
                          <OptimizedImage
                            src={img}
                            alt={label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                            0{i + 1}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
                            <Icon size={14} /> Activité Phare
                          </div>
                          <h4 className="font-display text-lg font-bold text-foreground">
                            {label}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground font-serif mt-2 leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activePresTab === 3 && (
                  <motion.div
                    key="tab-beneficiaires"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <p className="text-sm sm:text-base text-muted-foreground font-serif max-w-3xl">
                      Le Festival Les Blues du Fleuve agit directement au bénéfice des forces vives
                      de la Vallée du Fleuve Sénégal :
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      {[
                        t("festival.benMusicians"),
                        t("festival.benArtisans"),
                        t("festival.benWomen"),
                        t("festival.benYouth"),
                        t("festival.benHerders"),
                        t("festival.benFishermen"),
                        t("festival.benFarmers"),
                        t("festival.benLocal"),
                      ].map((tag, idx) => (
                        <div
                          key={tag}
                          className="p-4 rounded-2xl border border-border bg-muted/30 flex items-center gap-3 hover:border-primary/50 transition-colors"
                        >
                          <span className="h-8 w-8 rounded-xl bg-primary/10 text-primary font-display text-xs font-black flex items-center justify-center shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pied du carrousel de présentation */}
              <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Award size={18} />
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="text-muted-foreground">
                      {t("festival.enRoutePatronLabel")} :{" "}
                    </span>
                    <strong className="text-foreground">{t("festival.enRoutePatronValue")}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePresTab(idx)}
                      aria-label={`Onglet ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activePresTab === idx ? "w-8 bg-primary" : "w-2 bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── MOT DU PRODUCTEUR (STYLE ÉDITORIAL BLEU FLEUVE & BLANC) ──────────────────── */}
      <section className="relative border-b border-border bg-background overflow-hidden">
        <div className="container-page py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto rounded-3xl border border-border bg-card shadow-2xl overflow-hidden relative"
          >
            {/* Ligne supérieure Bleu Fleuve */}
            <div className="h-1.5 w-full bg-linear-to-r from-primary via-sky-500 to-cyan-400" />

            <div className="grid lg:grid-cols-12 items-stretch">
              {/* LEFT / TOP (5 cols) — Portrait Éditorial d'Oumar Wade */}
              <div className="lg:col-span-5 relative bg-[#04111f] flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/35 text-sky-300 text-[10px] font-extrabold uppercase tracking-[0.2em]">
                    <Award size={13} className="text-sky-400" />
                    <span>{t("festival.producerWord")}</span>
                  </div>
                  <span className="text-[11px] font-display font-bold text-white/60 uppercase tracking-widest">
                    18ème Édition
                  </span>
                </div>

                <div className="relative z-10 my-auto">
                  <div className="relative aspect-4/5 w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                    <img
                      src="/oumar-wade.webp"
                      alt="Oumar Wade — Producteur Exécutif du Festival Blues du Fleuve"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#04111f] via-[#04111f]/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-sky-300 mb-1">
                        {t("festival.executiveProducer")}
                      </p>
                      <h3 className="font-display text-2xl font-black text-white tracking-tight">
                        M. Oumar Wade
                      </h3>
                      <p className="text-xs text-white/75 font-serif mt-0.5">
                        Festival International Les Blues du Fleuve · Podor
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70 font-semibold uppercase tracking-wider">
                  <span>Culture &amp; Paix</span>
                  <span className="text-sky-400">•</span>
                  <span>Podor &amp; Ndioum</span>
                  <span className="text-sky-400">•</span>
                  <span>Fouta Toro</span>
                </div>
              </div>

              {/* RIGHT (7 cols) — La Lettre du Producteur & Citation "YOO WUL WELA !" */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-card">
                <div>
                  <div className="mb-8">
                    <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-primary mb-2">
                      Tribune Officielle · Édition 2026
                    </p>
                    <h2 className="luxury-text text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tighter leading-tight">
                      {t("festival.producerTitle")} <span className="text-primary">Oumar Wade</span>
                    </h2>
                    <div className="h-1 w-20 rounded-full bg-primary mt-4" />
                  </div>

                  <div className="space-y-5 font-serif text-base sm:text-lg leading-relaxed">
                    <p className="text-foreground font-medium border-l-4 border-primary pl-4 sm:pl-5 py-1 bg-primary/[0.04] rounded-r-xl">
                      {t("festival.producerMsg1")}
                    </p>
                    <p className="text-muted-foreground">{t("festival.producerMsg2")}</p>
                    <p className="text-muted-foreground">{t("festival.producerMsg3")}</p>
                  </div>
                </div>

                {/* Signature Quote Card — "YOO WUL WELA !" */}
                <div className="mt-8 relative rounded-2xl overflow-hidden border border-primary/25 bg-[#04111f] p-6 sm:p-8 text-white shadow-xl">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-3 right-6 text-7xl text-sky-400/15 font-serif leading-none select-none pointer-events-none">
                    &rdquo;
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                      <p className="font-serif italic text-base sm:text-lg text-white/90 mb-2">
                        « {t("festival.producerQuote")} »
                      </p>
                      <p className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.15em] uppercase text-sky-300">
                        YOO WUL WELA !
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/15 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                        <Award size={18} />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-white leading-tight">
                          Oumar Wade
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-sky-300 font-bold">
                          {t("festival.executiveProducer")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── PROGRAMME & BILLETTERIE ──────────────────── */}
      <section
        id="billetterie"
        className="relative border-b border-border bg-muted/20 overflow-hidden"
      >
        <div className="container-page py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
              <Calendar size={14} className="text-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                {FESTIVAL_CONFIG.dateTexte}
              </span>
            </div>
            <h2 className="luxury-text text-4xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tighter mb-4">
              {t("festival.programAndTickets")}{" "}
              <span className="text-primary">{t("festival.ticketing")}</span>
            </h2>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
              {t("festival.programDesc")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Acte I : En route vers les Blues du Fleuve — Dakar (Sorano) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-primary/30 bg-card p-6 sm:p-10 shadow-xl flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary text-white text-xs font-extrabold uppercase tracking-wider">
                    <Sparkles size={13} /> Acte I · Avant-Première Dakar
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Avec MARVA Group
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground mb-2">
                  En route vers les <span className="text-primary">Blues du Fleuve</span>
                </h3>
                <p className="text-sm text-muted-foreground font-serif mb-6">
                  Grand concert de lancement avec <strong>Baaba Maal</strong> &amp; l&apos;Ensemble
                  Lyrique Traditionnel au Théâtre National Daniel Sorano.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Calendar size={16} className="text-primary shrink-0" />
                    <span className="font-semibold">Vendredi 27 Novembre 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Clock size={16} className="text-primary shrink-0" />
                    <span>21h00 précises</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <span>Théâtre National Daniel Sorano, Dakar</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-bold">
                      Entrée Unique
                    </span>
                    <span className="font-display text-lg font-black text-foreground">
                      10.000 FCFA
                    </span>
                  </div>
                  <div className="h-6 w-px bg-border" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-primary block font-bold">
                      VIP
                    </span>
                    <span className="font-display text-lg font-black text-primary">
                      20.000 FCFA
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://events.in-tickets-sn.com/evenements/les-blues-du-fleuves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                  >
                    <Ticket size={13} />
                    <span>Acheter sur IN-TICKETS</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="#en-route"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("en-route")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1"
                  >
                    Voir l&apos;affiche &amp; QR <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Acte II : Le Festival à Podor & Ndioum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-extrabold uppercase tracking-wider">
                    <Calendar size={13} /> Acte II · 18ème Édition
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    {FESTIVAL_CONFIG.dateTexte}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground mb-2">
                  Festival <span className="text-primary">Podor &amp; Ndioum</span>
                </h3>
                <p className="text-sm text-muted-foreground font-serif mb-6">
                  Trois jours de concerts géants, régates de pirogues, expositions artisanales,
                  conférences et célébrations au cœur du Fouta Toro.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Award size={16} className="text-primary shrink-0" />
                    <span>
                      Parrain : <strong>Dr. Cheikh Oumar Anne</strong>, Maire de Ndioum
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <span>{FESTIVAL_CONFIG.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Music2 size={16} className="text-primary shrink-0" />
                    <span>Programmation jour par jour bientôt dévoilée</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-border/80 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Pass 3 Jours &amp; Pass VIP
                </span>
                <Link
                  to="/billetterie"
                  className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1"
                >
                  Accéder à la billetterie <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4">
              <MagneticButton>
                <Link
                  to="/billetterie"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/25"
                >
                  <span className="relative z-10">{t("festival.bookPass")}</span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </MagneticButton>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {t("festival.comingSoon")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── ARTISTES (CARTES ÉPURÉES BLEU FLEUVE) ──────────────────── */}
      <section className="relative border-b border-border bg-background overflow-hidden">
        <div className="container-page py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
                <Music2 size={14} className="text-primary" />
                <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                  {t("festival.lineup")}
                </span>
              </div>
              <h2 className="luxury-text text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter mb-4">
                {t("festival.artists")}
              </h2>
              <p className="text-lg text-muted-foreground font-serif">
                {t("festival.artistsSubtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-bold">
              <Star size={16} className="text-primary fill-primary" />
              <span>{t("festival.confirmedArtists")}</span>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {artistes.map((a, idx) => (
              <motion.article
                key={a.nom}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedArtist(a)}
                className="group relative rounded-3xl border border-border bg-card overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-4/5 bg-muted overflow-hidden">
                  {a.img ? (
                    <OptimizedImage
                      src={a.img}
                      alt={a.nom}
                      className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                      objectPosition={a.objectPosition}
                      objectFit="cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-primary/20">
                      {a.nom.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-[#04111f]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300 block">
                      {a.role}
                    </span>
                    <h3 className="font-display text-xl font-bold leading-tight mt-0.5">{a.nom}</h3>
                    <p className="text-xs text-white/75 mt-1 flex items-center gap-1">
                      <MapPin size={11} className="text-sky-400 shrink-0" />
                      {a.origine}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground font-serif leading-relaxed line-clamp-3">
                    {a.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/60 w-full text-xs font-bold uppercase tracking-wider text-primary flex items-center justify-between">
                    <span>{t("festival.readMore")}</span>
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── GALERIE & ARCHIVES PHOTO ──────────────────── */}
      <section className="relative border-b border-border bg-muted/15 overflow-hidden">
        <div className="container-page py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
              <Palette size={14} className="text-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                {t("festival.visualMemories")}
              </span>
            </div>
            <h2 className="luxury-text text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter mb-4">
              {t("festival.imageGallery")}
            </h2>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
              {t("festival.gallerySubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-55">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                className={`rounded-3xl overflow-hidden border border-border relative group cursor-pointer ${img.span || ""}`}
              >
                <OptimizedImage
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full transition duration-700 group-hover:scale-110"
                  objectPosition={img.objectPosition}
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                    <span className="text-white font-medium text-sm">{img.alt}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <Zap size={16} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── ARCHIVES VIDÉO ──────────────────── */}
      <section className="relative border-b border-border bg-background overflow-hidden">
        <div className="container-page py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="rounded-3xl overflow-hidden border border-border shadow-2xl aspect-21/9 relative group">
              <img
                src="/gal19.webp"
                alt="Foule au festival"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-4">
                  <Play size={14} className="text-white" />
                  <span className="text-xs uppercase tracking-wider text-white font-bold">
                    {t("festival.liveArchives")}
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                  {t("festival.mediaArchives")}
                </h2>
                <p className="text-white/80 mt-2 font-serif">
                  {t("festival.mediaArchivesSubtitle")}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {videos.map((v, idx) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-border bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-video bg-black/40 relative overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1><img src=https://img.youtube.com/vi/${v.id}/hqdefault.jpg alt='${v.title}' width='480' height='360'><span>▶</span></a>`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play size={24} className="text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Play size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                        {t("festival.videoArchive")}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── PARTENAIRES AVEC RUBAN DÉFILANT CONTINU ──────────────────── */}
      <section className="relative py-24 border-y border-border overflow-hidden bg-muted/20">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
              <Heart size={14} className="text-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                {t("festival.theySupportUs")}
              </span>
            </div>
            <h2 className="luxury-text text-4xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tighter mb-4">
              {t("festival.our")} <span className="text-primary">{t("festival.partners")}</span>
            </h2>
            <p className="text-lg text-muted-foreground font-serif">
              {t("festival.partnersSubtitle")}
            </p>
          </motion.div>

          {/* Partenaires Stratégiques (MARVA Group, Sorano, Ndioum) */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "MARVA GROUP",
                role: "Partenaire Officiel & Co-Producteur",
                desc: "Co-organisateur de l'événement « En route vers les Blues du Fleuve »",
                icon: Diamond,
                highlight: true,
              },
              {
                name: "THÉÂTRE DANIEL SORANO",
                role: "Partenaire Culturel Officiel",
                desc: "Scène nationale d'accueil du grand concert d'avant-première à Dakar",
                icon: Sparkles,
                highlight: false,
              },
              {
                name: "MAIRIE DE NDIOUM",
                role: "Ville Hôte & Parrainage 2026",
                desc: "Sous le haut parrainage du Dr. Cheikh Oumar Anne, Maire de Ndioum",
                icon: Award,
                highlight: false,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative rounded-3xl p-6 sm:p-7 border transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  item.highlight
                    ? "border-primary bg-primary text-white shadow-xl shadow-primary/20"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      item.highlight
                        ? "bg-white text-primary shadow-md"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <item.icon size={22} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      item.highlight
                        ? "bg-white/15 text-sky-200 border border-white/25"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {item.role}
                  </span>
                </div>
                <h3
                  className={`font-display text-xl font-black uppercase tracking-wider mb-1.5 ${
                    item.highlight ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-serif leading-relaxed ${
                    item.highlight ? "text-white/85" : "text-muted-foreground"
                  }`}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Défilement continu des partenaires institutionnels (Marquee Style CJS) */}
        <div className="relative overflow-hidden py-4">
          <motion.div
            className="flex gap-6 w-max px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-6">
                {[
                  { name: "MARVA GROUP", icon: Diamond },
                  { name: "THÉÂTRE DANIEL SORANO", icon: Sparkles },
                  { name: "MAIRIE DE NDIOUM", icon: Award },
                  { name: "MAIRIE DE PODOR", icon: MapPin },
                  { name: "MINISTÈRE DE LA CULTURE", icon: Award },
                  { name: "NANN-K MEDIA", icon: Globe },
                  { name: "THE VILLAGE PODOR", icon: Crown },
                  { name: "ELYDIA", icon: Diamond },
                  { name: "FLEUVE CULTURE", icon: Shield },
                ].map((partner) => (
                  <div
                    key={`${dup}-${partner.name}`}
                    className="flex items-center gap-3.5 px-7 py-5 rounded-2xl border border-border bg-card shadow-sm shrink-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <partner.icon size={18} />
                    </div>
                    <span className="font-display text-sm font-black uppercase tracking-widest text-foreground">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── MODAL ARTISTE ──────────────────── */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtist(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-2xl w-full relative overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden bg-muted">
                  {selectedArtist.img ? (
                    <img
                      src={selectedArtist.img}
                      alt={selectedArtist.nom}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: selectedArtist.objectPosition || "top" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-6xl text-primary/20">
                      {selectedArtist.nom.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-display text-3xl font-bold text-foreground mb-1">
                    {selectedArtist.nom}
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-4">
                    {selectedArtist.role} · {selectedArtist.origine}
                  </p>
                  <div className="h-px w-full bg-border mb-4" />
                  <p className="text-muted-foreground font-serif leading-relaxed">
                    {selectedArtist.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        images={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
