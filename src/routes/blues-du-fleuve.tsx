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
  X,
} from "lucide-react";
import { useState, useRef } from "react";
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
        "Découvrez la 19ème édition du Festival Blues du Fleuve avec Baaba Maal à Podor et Ndioum, et des artistes de la région du Fouta Toro.",
      ogImage: "/festival-baba-maal.webp",
      keywords:
        "Blues du Fleuve, Festival Podor, The Village, Baaba Maal, musique Sénégal, Fouta Toro, festival 2026, culture Halpulaar",
      canonical: "https://levillagepodor.com/blues-du-fleuve",
    });

    const structuredData = createStructuredData("MusicEvent", {
      name: "Blues du Fleuve - 19ème édition",
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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[92vh] overflow-hidden border-b border-amber-500/20 bg-[#050c17]"
      >
        <div className="absolute inset-0 bg-[#050c17] overflow-hidden">
          <iframe
            src="https://www.youtube-nocookie.com/embed/IHAWprBOmzs?autoplay=1&mute=1&loop=1&playlist=IHAWprBOmzs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            title="Festival Background Video"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-75"
            style={{
              width: "max(130vw, 130vh * 9 / 16)",
              height: "max(130vh, 130vw * 16 / 9)",
            }}
          />
          {/* Double overlay cinématique garantissant un contraste parfait en mode clair comme sombre */}
          <div className="absolute inset-0 bg-linear-to-r from-[#040a14]/90 via-[#040a14]/70 to-[#040a14]/45" />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#07111f]" />
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        </div>

        {/* Main content with parallax */}
        <motion.div
          style={{ y, opacity }}
          className="container-page pt-10 pb-24 md:pt-16 md:pb-28 relative grid gap-10 lg:grid-cols-12 lg:items-center z-10"
        >
          {/* Colonne Gauche (7 cols) : Identité, Vision, Compte à rebours & Actions */}
          <div className="lg:col-span-7">
            {/* Écusson Officiel du Festival (intègre élégamment le logo blanc) */}
            <div className="inline-flex flex-wrap items-center gap-4 p-2 pr-6 rounded-2xl bg-[#07111f]/85 backdrop-blur-xl border border-amber-400/35 shadow-[0_15px_40px_rgba(0,0,0,0.5)] mb-7">
              <div className="bg-white rounded-xl px-3.5 py-2 shadow-md border border-amber-400/40 flex items-center justify-center">
                <img
                  src="/logo-festival.webp"
                  alt="Les Blues du Fleuve — Logo officiel"
                  className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col py-1">
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  {t("festival.internationalFestival")}
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/90 mt-1">
                  Podor & Vallée du Fleuve · 19ème Édition
                </span>
              </div>
            </div>

            <AnimatedText
              el="h1"
              text={t("festival.title")}
              className="luxury-text text-4xl sm:text-6xl md:text-7xl xl:text-8xl mb-6 text-white uppercase tracking-tighter drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]"
              delay={0.2}
            />

            <div className="space-y-5 max-w-2xl">
              <p className="text-base sm:text-lg md:text-xl font-light text-white/95 leading-relaxed drop-shadow-md">
                {t("festival.heroDesc1")}{" "}
                <strong className="font-extrabold text-amber-400">Baaba MAAL</strong>
                {t("festival.heroDesc1b")}
              </p>

              {/* Citation / Vision encadrée dans un écrin glassmorphique */}
              <div className="rounded-2xl bg-[#07111f]/75 backdrop-blur-md border border-white/15 border-l-4 border-l-amber-400 p-4 sm:p-5 shadow-xl">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                  {t("festival.heroDesc2")}
                </p>

                <button
                  type="button"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1.5 font-bold uppercase tracking-[0.18em] mt-3 transition-colors"
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
                      className="overflow-hidden space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed pt-3 mt-3 border-t border-white/10"
                    >
                      <p>{t("festival.heroLongDesc1")}</p>
                      <p>{t("festival.heroLongDesc2")}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Badges d'information */}
              <div className="pt-2 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#07111f]/80 backdrop-blur-md border border-white/15 text-white shadow-lg">
                  <MapPin size={16} className="text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide">
                    {FESTIVAL_CONFIG.location}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#07111f]/80 backdrop-blur-md border border-white/15 text-white shadow-lg">
                  <Calendar size={16} className="text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide">
                    {FESTIVAL_CONFIG.dateTexte}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-200 shadow-lg">
                  <Sparkles size={16} className="text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide">
                    Sorano (Dakar) · 27 Nov 2026
                  </span>
                </div>
              </div>

              {/* Compte à rebours */}
              <div className="pt-2">
                <Countdown targetDate={FESTIVAL_CONFIG.startDate} />
              </div>

              {/* Boutons d'action */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <a
                  href="#en-route"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("en-route")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2.5 relative z-50 w-fit btn-gradient-premium px-6 py-3.5 rounded-xl text-white font-bold uppercase tracking-widest text-xs shadow-lg transition-transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(245,158,11,0.35)]"
                >
                  <Sparkles size={15} />
                  <span>En route vers les Blues · 27 Nov</span>
                </a>
                <a
                  href="#billetterie"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("billetterie")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 relative z-50 w-fit px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold uppercase tracking-widest text-xs shadow-lg transition-all"
                >
                  <span>{t("festival.viewProgram")}</span>
                  <ArrowRight size={14} />
                </a>
                <a
                  href="https://lesbluesdufleuve.com/"
                  target="_blank"
                  rel="noopener"
                  title="Site officiel du Festival Les Blues du Fleuve — lesbluesdufleuve.com"
                  className="inline-flex items-center gap-2 relative z-50 w-fit px-5 py-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 backdrop-blur-md border border-amber-400/40 text-amber-300 font-bold uppercase tracking-widest text-xs shadow-lg transition-all"
                >
                  <Globe size={14} />
                  <span>lesbluesdufleuve.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne Droite (5 cols) : Portrait Prestige de Baaba Maal */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              {/* Halo doré d'arrière-plan */}
              <div className="absolute -inset-3 rounded-[2.25rem] bg-linear-to-br from-amber-400/30 via-amber-600/10 to-transparent blur-xl pointer-events-none" />

              <div className="relative rounded-[2rem] p-2 bg-linear-to-br from-amber-400/50 via-white/15 to-amber-500/20 shadow-[0_25px_70px_rgba(0,0,0,0.75)]">
                <div className="relative rounded-[1.6rem] overflow-hidden aspect-4/5 bg-[#07111f]">
                  <OptimizedImage
                    src="/festival-baba-maal.webp"
                    alt="Baaba Maal — Fondateur du Festival Les Blues du Fleuve"
                    className="h-full w-full transition-transform duration-700 hover:scale-105"
                    objectPosition="center 10%"
                    priority
                  />
                  {/* Dégradé inférieur pour la légende */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#040a14] via-[#040a14]/25 to-transparent" />

                  {/* Badge supérieur */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#07111f]/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-lg">
                      <Award size={12} className="text-amber-400" />
                      Fondateur & Visionnaire
                    </span>
                  </div>

                  {/* Carte d'identité en bas du portrait */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#07111f]/85 backdrop-blur-xl border border-white/15 shadow-2xl">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-400 mb-0.5">
                      Roi du Yéla · Ambassadeur du Fouta
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                          Baaba Maal
                        </h2>
                        <p className="text-xs text-white/75 mt-0.5">
                          Initiateur des Blues du Fleuve depuis 2006
                        </p>
                      </div>
                      <a
                        href="#en-route"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("en-route")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="h-10 w-10 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105"
                        title="Voir l'annonce vidéo 2026"
                      >
                        <Play size={16} className="fill-slate-950 ml-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ──────────────────── EN ROUTE VERS LES BLUES DU FLEUVE (SORANO & MARVA GROUP) ──────────────────── */}
      <section
        id="en-route"
        className="relative border-b border-border bg-linear-to-b from-[#07111f] via-[#0b192c] to-background text-white overflow-hidden"
      >
        {/* Ambient golden & river glows */}
        <div className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[26rem] h-[26rem] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="container-page py-16 md:py-24 relative z-10">
          {/* Top Co-Production Banner with MARVA Group & Sorano */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-12 md:mb-16"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-full border border-amber-400/40 bg-amber-500/10 backdrop-blur-md mb-5 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              <Crown size={14} className="text-amber-400 shrink-0" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-extrabold">
                {t("festival.enRoutePartnership")}
              </span>
            </div>

            <h2 className="luxury-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              {t("festival.enRouteTitle1")}{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #fde047 0%, #f59e0b 50%, #ea580c 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t("festival.enRouteTitle2")}
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/80 font-serif max-w-2xl mx-auto leading-relaxed">
              {t("festival.enRouteSubtitle")}
            </p>
          </motion.div>

          {/* Main Grid: Poster + Video & Event Details */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN (5 cols) — Official Poster + MARVA Group Prestige Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col gap-5"
            >
              {/* Official Poster Card */}
              <div
                onClick={() => openLightbox(0)}
                className="group relative rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-black/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-500 hover:border-amber-400/70 hover:shadow-[0_20px_60px_rgba(245,158,11,0.2)]"
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
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                      <Zap size={14} />
                      {t("festival.enRouteZoomPoster")}
                    </span>
                  </div>
                </div>
                {/* Top floating badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                    {t("festival.enRouteBadge")}
                  </span>
                </div>
              </div>

              {/* MARVA GROUP — Strategic Partner Spotlight Card */}
              <div className="relative rounded-2xl p-5 border border-amber-500/30 bg-linear-to-r from-amber-500/15 via-amber-500/5 to-transparent backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
                    <Diamond size={22} className="text-slate-950" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400">
                        {t("festival.enRouteMarvaBadge")}
                      </span>
                    </div>
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

            {/* RIGHT COLUMN (7 cols) — Featured YouTube Video + Key Info Bento + Ticketing */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              {/* Featured YouTube Video Card (https://youtu.be/mzXLB9vo8CQ) */}
              <div className="rounded-3xl overflow-hidden border border-white/15 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
                <div className="px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/[0.03]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                      <Play size={14} className="text-amber-400" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                        {t("festival.enRouteVideoBadge")}
                      </p>
                      <h3 className="font-display text-sm sm:text-base font-bold text-white">
                        {t("festival.enRouteVideoTitle")}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-wider">
                    YouTube Officiel
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

              {/* Event Highlights Bento Grid (Date, Venue, Patron) */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                      {t("festival.enRouteDateLabel")}
                    </p>
                    <p className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                      {t("festival.enRouteDateValue")}
                    </p>
                    <p className="text-xs text-amber-300/90 font-semibold mt-1">
                      Baaba Maal · {t("festival.enRouteEnsemble")}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl p-5 border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-primary">
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

                {/* Patron Card — Full width across the 2 columns */}
                <div className="sm:col-span-2 rounded-2xl p-5 border border-amber-400/25 bg-linear-to-r from-amber-500/10 via-white/[0.03] to-transparent backdrop-blur-md flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400">
                      {t("festival.enRoutePatronLabel")}
                    </p>
                    <p className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                      {t("festival.enRoutePatronValue")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ticket Pricing Strip for Sorano */}
              <div className="rounded-2xl p-5 sm:p-6 border border-white/15 bg-white/[0.05] backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block">
                      {t("festival.enRouteStandard")}
                    </span>
                    <span className="font-display text-xl sm:text-2xl font-black text-white">
                      10.000 <span className="text-xs font-bold text-amber-400">FCFA</span>
                    </span>
                  </div>
                  <div className="h-8 w-px bg-white/15 hidden sm:block" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                      {t("festival.enRouteVip")}
                    </span>
                    <span className="font-display text-xl sm:text-2xl font-black text-amber-400">
                      20.000 <span className="text-xs font-bold text-white">FCFA</span>
                    </span>
                  </div>
                </div>

                <Link
                  to="/billetterie"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs text-slate-950 bg-linear-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 shrink-0"
                >
                  <Ticket size={15} />
                  <span>{t("festival.ticketing")}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────── THEME SECTION ULTRA PREMIUM ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-background via-muted/20 to-background overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-page py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                {t("festival.theme17")}
              </span>
            </div>
            <h2 className="luxury-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
              {t("festival.themeTitle1")}{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t("festival.themeTitle2")}
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground italic font-serif leading-relaxed">
                {t("festival.themeSubtitle")}
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {piliers.map(({ Icon, titre, tag, desc, img }, idx) => (
              <motion.div
                key={titre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative rounded-3xl border border-border/80 bg-card shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                {/* Visual Photography Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <OptimizedImage
                    src={img}
                    alt={titre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    objectPosition="center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

                  {/* Number Badge Top Right */}
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-amber-400 font-display text-xs font-black tracking-widest">
                    PILIER 0{idx + 1}
                  </div>

                  {/* Icon + Tag Overlaid on Bottom of Image */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3.5">
                    <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-300 block">
                        {tag}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
                        {titre}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-linear-to-b from-card to-muted/20">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-serif">
                    {desc}
                  </p>
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      Les Blues du Fleuve
                    </span>
                    <div className="h-1.5 w-12 rounded-full bg-linear-to-r from-primary to-amber-500 group-hover:w-20 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── PRÉSENTATION SECTION ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-background via-muted/15 to-background">
        <div className="container-page py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-2.5">
                  {t("festival.presentation")}
                </p>
                <h2 className="luxury-text text-3xl sm:text-4xl md:text-6xl uppercase tracking-tighter mb-3">
                  {t("festival.presentationTitle1")}{" "}
                  <span className="text-gradient-gold">Podor et Ndioum</span>
                </h2>
                <p className="text-muted-foreground font-serif text-base sm:text-lg max-w-2xl">
                  {t("festival.presentationDesc")} <strong>Baaba Maal</strong>
                  {t("festival.presentationDesc2")}
                </p>
              </div>

              {/* Highlight Parrain 2026 */}
              <div className="inline-flex items-center gap-3.5 px-5 py-3.5 rounded-2xl border border-amber-500/35 bg-linear-to-r from-amber-500/15 via-amber-500/5 to-transparent backdrop-blur-sm shrink-0 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Award size={20} className="text-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                    {t("festival.enRoutePatronLabel")}
                  </span>
                  <span className="font-display text-sm font-bold text-foreground">
                    {t("festival.enRoutePatronValue")}
                  </span>
                </div>
              </div>
            </div>

            {/* Main grid: 2 cols on desktop */}
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* LEFT (6 cols) — Objectifs */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 rounded-3xl border border-border bg-card shadow-xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-sky-400 to-amber-500" />

                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-sky-700 text-white shadow-md shadow-primary/20 flex items-center justify-center shrink-0">
                      <Target size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary block">
                        Vision &amp; Mission
                      </span>
                      <h3 className="font-display text-xl font-black uppercase tracking-tight text-foreground">
                        {t("festival.objectives")}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    04 Axes
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {[
                    {
                      icon: Globe,
                      text: t("festival.obj1"),
                      sub: "Intégration des peuples riverains",
                    },
                    {
                      icon: Music2,
                      text: t("festival.obj2"),
                      sub: "Création & scènes partagées",
                    },
                    {
                      icon: Palette,
                      text: t("festival.obj3"),
                      sub: "Rayonnement du patrimoine culturel",
                    },
                    {
                      icon: Award,
                      text: t("festival.obj4"),
                      sub: "Pôles culturels durables au Fouta",
                    },
                  ].map(({ icon: Icon, text, sub }, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-primary/5 border border-border/70 hover:border-primary/40 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary font-display text-xs font-black flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-bold text-foreground leading-snug">
                          {text}
                        </p>
                        <p className="text-xs text-muted-foreground font-serif mt-0.5">{sub}</p>
                      </div>
                      <Icon
                        size={18}
                        className="text-muted-foreground/50 group-hover:text-primary shrink-0 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {/* Bottom integration highlight strip inside Objectifs */}
                <div className="mt-6 pt-5 border-t border-border/70 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider text-foreground/80">
                    Sénégal · Mauritanie · Mali · Guinée
                  </span>
                  <span className="text-primary font-bold">Vallée du Fleuve</span>
                </div>
              </motion.div>

              {/* RIGHT (6 cols) — Retombées + Activités Phares */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                {/* Retombées */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl border border-border bg-card shadow-xl p-6 sm:p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-400 via-orange-500 to-rose-500" />

                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 block">
                          Impact Territorial
                        </span>
                        <h3 className="font-display text-xl font-black uppercase tracking-tight text-foreground">
                          {t("festival.outcomes")}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        icon: Heart,
                        label: t("festival.outcome1"),
                        sub: "Fraternité & dialogue",
                        iconBg: "bg-rose-500/15 text-rose-500 border-rose-500/25",
                        cardHover: "hover:border-rose-500/40",
                      },
                      {
                        icon: Target,
                        label: t("festival.outcome2"),
                        sub: "Emplois & entrepreneuriat",
                        iconBg: "bg-primary/15 text-primary border-primary/25",
                        cardHover: "hover:border-primary/40",
                      },
                      {
                        icon: MapPin,
                        label: t("festival.outcome3"),
                        sub: "Attractivité de Podor & Ndioum",
                        iconBg: "bg-amber-500/15 text-amber-500 border-amber-500/25",
                        cardHover: "hover:border-amber-500/40",
                      },
                      {
                        icon: TreePine,
                        label: t("festival.outcome4"),
                        sub: "Savoir-faire & écologie",
                        iconBg: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
                        cardHover: "hover:border-emerald-500/40",
                      },
                    ].map(({ icon: Icon, label, sub, iconBg, cardHover }) => (
                      <div
                        key={label}
                        className={`flex items-start gap-3.5 p-4 rounded-2xl bg-muted/40 border border-border/70 transition-all duration-300 ${cardHover}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-bold text-foreground block leading-snug">
                            {label}
                          </span>
                          <span className="text-xs text-muted-foreground font-serif block mt-0.5">
                            {sub}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Activités Phares — Dark Navy & Gold Signature Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-3xl border border-amber-500/30 bg-linear-to-br from-[#081528] via-[#0d2240] to-[#081528] text-white shadow-xl p-6 sm:p-8 flex-1 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                        <Mic size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400 block">
                          Au Cœur de l&apos;Événement
                        </span>
                        <h3 className="font-display text-xl font-black uppercase tracking-tight text-white">
                          {t("festival.keyActivities")}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    {[
                      { icon: Music2, label: t("festival.activity1") },
                      { icon: Palette, label: t("festival.activity2") },
                      { icon: Users, label: t("festival.activity3") },
                    ].map(({ icon: Icon, label }, idx) => (
                      <div
                        key={label}
                        className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
                          <Icon size={16} />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-white/95 font-serif flex-1">
                          {label}
                        </span>
                        <span className="text-[10px] font-display font-black text-amber-400/70">
                          0{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom strip — Bénéficiaires */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 rounded-3xl border border-border bg-linear-to-r from-primary/10 via-card to-amber-500/10 p-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
            >
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary">
                  <Users size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary block">
                    Communautés Impactées
                  </span>
                  <span className="font-display text-sm font-black uppercase tracking-wider text-foreground">
                    {t("festival.beneficiaries")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  t("festival.benMusicians"),
                  t("festival.benArtisans"),
                  t("festival.benWomen"),
                  t("festival.benYouth"),
                  t("festival.benHerders"),
                  t("festival.benFishermen"),
                  t("festival.benFarmers"),
                  t("festival.benLocal"),
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-2xs text-xs font-bold text-foreground hover:border-primary/50 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── MOT DU PRODUCTEUR ULTRA PREMIUM ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-muted/20 via-background to-muted/20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="container-page py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto rounded-3xl border border-border/80 bg-card shadow-2xl overflow-hidden relative"
          >
            {/* Top luxury gold & primary accent bar */}
            <div className="h-1.5 w-full bg-linear-to-r from-amber-400 via-primary to-amber-500" />

            <div className="grid lg:grid-cols-12 items-stretch">
              {/* LEFT / TOP (5 cols) — Portrait Éditorial d'Oumar Wade */}
              <div className="lg:col-span-5 relative bg-[#07111f] flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden">
                {/* Ambient glow behind portrait */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-[10px] font-extrabold uppercase tracking-[0.2em]">
                    <Crown size={13} className="text-amber-400" />
                    <span>{t("festival.producerWord")}</span>
                  </div>
                  <span className="text-[11px] font-display font-bold text-white/50 uppercase tracking-widest">
                    19ème Édition
                  </span>
                </div>

                {/* Portrait Frame */}
                <div className="relative z-10 my-auto">
                  <div className="relative aspect-4/5 w-full max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/35 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                    <img
                      src="/oumar-wade.webp"
                      alt="Oumar Wade — Producteur Exécutif du Festival Blues du Fleuve"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />

                    {/* Name & Title Overlaid at Bottom of Portrait */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-400 mb-1">
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

                {/* Bottom Pillars Strip under Portrait */}
                <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70 font-semibold uppercase tracking-wider">
                  <span>Culture &amp; Paix</span>
                  <span className="text-amber-400">•</span>
                  <span>Podor &amp; Ndioum</span>
                  <span className="text-amber-400">•</span>
                  <span>Fouta Toro</span>
                </div>
              </div>

              {/* RIGHT (7 cols) — La Lettre du Producteur & Citation "YOO WUL WELA !" */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-linear-to-br from-card via-card to-muted/20">
                <div>
                  {/* Editorial Header */}
                  <div className="mb-8">
                    <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-primary mb-2">
                      Tribune Officielle · Édition 2026
                    </p>
                    <h2 className="luxury-text text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tighter leading-tight">
                      {t("festival.producerTitle")}
                      <span
                        className="inline-block"
                        style={{
                          background:
                            "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        Oumar Wade
                      </span>
                    </h2>
                    <div className="h-1 w-20 rounded-full bg-linear-to-r from-amber-500 to-primary mt-4" />
                  </div>

                  {/* Editorial Paragraphs */}
                  <div className="space-y-5 font-serif text-base sm:text-lg leading-relaxed">
                    {/* Lead paragraph with golden vertical bar */}
                    <p className="text-foreground font-medium border-l-4 border-amber-500 pl-4 sm:pl-5 py-1 bg-amber-500/[0.04] rounded-r-xl">
                      {t("festival.producerMsg1")}
                    </p>
                    <p className="text-muted-foreground">{t("festival.producerMsg2")}</p>
                    <p className="text-muted-foreground">{t("festival.producerMsg3")}</p>
                  </div>
                </div>

                {/* Signature Quote Card — "YOO WUL WELA !" */}
                <div className="mt-8 relative rounded-2xl overflow-hidden border border-amber-500/35 bg-linear-to-br from-[#081528] via-[#0c213d] to-[#081528] p-6 sm:p-8 text-white shadow-xl">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-3 right-6 text-7xl text-amber-400/15 font-serif leading-none select-none pointer-events-none">
                    &rdquo;
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                      <p className="font-serif italic text-base sm:text-lg text-white/90 mb-2">
                        « {t("festival.producerQuote")} »
                      </p>
                      <p
                        className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.15em] uppercase"
                        style={{
                          background:
                            "linear-gradient(135deg, #fde047 0%, #f59e0b 55%, #ea580c 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        YOO WUL WELA !
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/15 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                        <Crown size={18} />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-white leading-tight">
                          Oumar Wade
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-amber-300/90 font-bold">
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

      {/* ──────────────────── PROGRAMME & BILLETTERIE ULTRA PREMIUM ──────────────────── */}
      <section
        id="billetterie"
        className="relative border-b border-border bg-linear-to-b from-background via-muted/20 to-background overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t("festival.ticketing")}
              </span>
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
              className="relative rounded-3xl border-2 border-amber-500/40 bg-linear-to-br from-amber-500/10 via-card to-card p-6 sm:p-10 shadow-xl flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 text-xs font-extrabold uppercase tracking-wider">
                    <Sparkles size={13} /> Acte I · Avant-Première Dakar
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Avec MARVA Group
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground mb-2">
                  En route vers les <span className="text-amber-500">Blues du Fleuve</span>
                </h3>
                <p className="text-sm text-muted-foreground font-serif mb-6">
                  Grand concert de lancement avec <strong>Baaba Maal</strong> &amp; l&apos;Ensemble
                  Lyrique Traditionnel au Théâtre National Daniel Sorano.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Calendar size={16} className="text-amber-500 shrink-0" />
                    <span className="font-semibold">Vendredi 27 Novembre 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Clock size={16} className="text-amber-500 shrink-0" />
                    <span>21h00 précises</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <MapPin size={16} className="text-amber-500 shrink-0" />
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
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 block font-bold">
                      VIP
                    </span>
                    <span className="font-display text-lg font-black text-amber-500">
                      20.000 FCFA
                    </span>
                  </div>
                </div>
                <a
                  href="#en-route"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("en-route")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-amber-500 hover:underline flex items-center gap-1"
                >
                  Voir l&apos;affiche &amp; vidéo <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Acte II : Le Festival à Podor & Ndioum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-10 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-extrabold uppercase tracking-wider">
                    <Calendar size={13} /> Acte II · 19ème Édition
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
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4">
              <MagneticButton>
                <Link
                  to="/billetterie"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_10px_40px_rgba(245,158,11,0.5)]"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
                  }}
                >
                  <span className="relative z-10 text-white">{t("festival.bookPass")}</span>
                  <ArrowRight
                    size={16}
                    className="relative z-10 text-white group-hover:translate-x-1 transition-transform"
                  />
                  <span className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                </Link>
              </MagneticButton>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {t("festival.comingSoon")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── ARTISTES ULTRA PREMIUM ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-background via-muted/20 to-background overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span>{t("festival.confirmedArtists")}</span>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {artistes.map((a, idx) => (
              <motion.article
                key={a.nom}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2"
              >
                {/* Image container */}
                <div className="relative aspect-4/5 bg-linear-to-br from-muted to-muted/50 overflow-hidden">
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

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play size={20} className="text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-0 relative flex flex-col flex-1 justify-between">
                  <div>
                    <div className="-mt-8 relative z-10 mb-4 bg-card/95 backdrop-blur-md rounded-2xl p-4 border border-border/70 shadow-lg group-hover:border-primary/40 transition-colors">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {a.nom}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-primary mt-0.5 font-semibold">
                        {a.role}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin size={10} className="text-amber-500 shrink-0" />
                        {a.origine}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground font-serif leading-relaxed line-clamp-3">
                      {a.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedArtist(a)}
                    className="mt-4 pt-3 border-t border-border/60 w-full text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t("festival.readMore")}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── GALERIE & ARCHIVES ULTRA PREMIUM ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-background via-muted/20 to-background overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <Zap size={16} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── ARCHIVES MÉDIA ULTRA PREMIUM ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-background via-muted/20 to-background overflow-hidden">
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
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group rounded-3xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
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
                  {/* Play button overlay */}
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

      {/* ──────────────────── PARTENAIRES ULTRA PREMIUM ──────────────────── */}
      <section className="relative py-24 border-y border-border overflow-hidden bg-linear-to-b from-background via-muted/20 to-background">
        {/* Premium background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
              <Heart size={14} className="text-primary" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                {t("festival.theySupportUs")}
              </span>
            </div>
            <h2 className="luxury-text text-4xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tighter mb-4">
              {t("festival.our")}{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t("festival.partners")}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground font-serif">
              {t("festival.partnersSubtitle")}
            </p>
          </motion.div>

          {/* Strategic & Prestige Partners Tier (MARVA Group, Sorano, Ndioum) */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: "MARVA GROUP",
                role: "Partenaire Officiel & Co-Producteur",
                desc: "Co-organisateur de l'événement « En route vers les Blues du Fleuve »",
                icon: Crown,
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
                className={`group relative rounded-3xl p-6 sm:p-7 border backdrop-blur-md transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  item.highlight
                    ? "border-amber-500/50 bg-linear-to-br from-amber-500/15 via-card to-card shadow-[0_10px_40px_-10px_rgba(245,158,11,0.3)]"
                    : "border-border bg-card/70 hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      item.highlight
                        ? "bg-linear-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25"
                        : "bg-primary/15 text-primary border border-primary/20"
                    }`}
                  >
                    <item.icon size={22} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      item.highlight
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {item.role}
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase tracking-wider text-foreground mb-1.5">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-serif leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Mairie Podor", icon: MapPin },
              { name: "Ministère", icon: Award },
              { name: "NANN-K Media", icon: Globe },
              { name: "ELYDIA", icon: Diamond },
              { name: "FC", icon: Shield },
            ].map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col items-center justify-center h-40 px-4 rounded-3xl border border-border bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/50 hover:shadow-[0_0_40px_-5px_rgba(var(--primary),0.3)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Reflet de brillance au survol */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <partner.icon size={20} className="text-primary" />
                </div>

                <span className="font-display text-sm md:text-base font-bold tracking-widest text-muted-foreground group-hover:text-foreground group-hover:scale-105 transition-all duration-300 uppercase text-center relative z-10">
                  {partner.name}
                </span>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
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
