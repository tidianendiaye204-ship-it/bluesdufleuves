import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Play,
  X,
  Leaf,
  Cpu,
  Palette,
  ChevronRight,
  ChevronLeft,
  TreePine,
  Users,
  Heart,
  Globe,
  Waves,
  PawPrint,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { createSeoMeta } from "@/lib/seo";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useTranslation } from "react-i18next";

import instrumentsImg from "@/assets/instruments.webp";
import piroguesImg from "@/assets/pirogues.webp";
import crowdImg from "@/assets/festival-crowd.webp";
import fleuveImg from "@/assets/fleuve.webp";
import logoNannk from "@/assets/logo-nannk-new.webp";
import agri1Img from "@/assets/nann-k-agri1.webp";
import agri2Img from "@/assets/nann-k-agri2.webp";
import agri3Img from "@/assets/nann-k-agri3.webp";
import agri4Img from "@/assets/nann-k-agri4.webp";
import agri5Img from "@/assets/nann-k-agri5.webp";
import agri6Img from "@/assets/nann-k-agri6.webp";
import agri7Img from "@/assets/nann-k-agri7.webp";
import agri8Img from "@/assets/nann-k-agri8.webp";

const thumbs = [instrumentsImg, crowdImg, piroguesImg, fleuveImg];

export const Route = createFileRoute("/nann-k-media")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "NANN-k & The Village | Mouvement Culturel & Économique Podor",
      description:
        "Découvrez NANN-k et The Village, l'initiative de Baaba Maal pour la culture, l'agriculture et le développement de la vallée du fleuve Sénégal.",
      ogTitle: "NANN-k & The Village - Baaba Maal Podor",
      ogDescription:
        "NANN-k et The Village : mouvement citoyen pour l'émergence sociale et économique à travers l'agriculture, l'artisanat et la culture Halpulaar.",
      ogImage: logoNannk,
      keywords:
        "The Village, NANN-k, Baaba Maal, agriculture, artisanat, technologies, développement, Sénégal, Afrique, Podor, émergence économique",
      canonical: "https://lesbluesdufleuve.sn/nann-k-media",
    });
    return { meta, links };
  },
  component: NannkMedia,
});

function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return { count, setStarted };
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  prefix = "",
  label,
}: {
  icon: typeof TreePine;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}) {
  const { count, setStarted } = useCounter(value, 1200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setStarted(true)}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
        <Icon className="text-primary w-6 h-6" />
      </div>
      <span className="font-display text-3xl md:text-4xl font-bold text-foreground">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
        {label}
      </span>
    </motion.div>
  );
}

function VideoCarousel({
  items,
  thumbs,
  setActiveVideo,
}: {
  items: { name: string; id: string }[];
  thumbs: string[];
  setActiveVideo: (video: { name: string; id: string }) => void;
}) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-5">
        {items.map((item, i: number) => (
          <div key={item.name} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_23%]">
            <article
              onClick={() => setActiveVideo({ name: item.name, id: item.id })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveVideo({ name: item.name, id: item.id });
                }
              }}
              className="group h-full rounded-xl overflow-hidden glass-dark border border-border/30 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-muted/30">
                <img
                  src={thumbs[i % thumbs.length]}
                  alt={item.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  style={{ objectPosition: typeof thumbs[i % thumbs.length] === 'string' && thumbs[i % thumbs.length].includes('instruments') ? 'center 15%' : undefined }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play
                      size={20}
                      className="text-primary-foreground ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 font-serif">Nannka TV</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

function NannkMedia() {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState<{
    name: string;
    id: string;
    isLocal?: boolean;
  } | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], ["0%", "40%"]);

  const agriImages = [
    { src: agri1Img, alt: t("nannk.agri1Alt", "Agriculture NANN-K – Champs irrigués") },
    { src: agri2Img, alt: t("nannk.agri2Alt", "Agriculture NANN-K – Cultures maraîchères") },
    { src: agri3Img, alt: t("nannk.agri3Alt", "Agriculture NANN-K – Récolte") },
    { src: agri4Img, alt: t("nannk.agri4Alt", "Agriculture NANN-K – Irrigation fleuve") },
    { src: agri5Img, alt: t("nannk.agri5Alt", "Agriculture NANN-K – Femmes cultivatrices") },
    { src: agri6Img, alt: t("nannk.agri6Alt", "Agriculture NANN-K – Marché local") },
    { src: agri7Img, alt: t("nannk.agri7Alt", "Agriculture NANN-K – Pépinière") },
    { src: agri8Img, alt: t("nannk.agri8Alt", "Agriculture NANN-K – Reboisement") },
  ];

  const categories = [
    {
      titre: t("nannk.cat1", "Émissions Culturelles"),
      items: [
        { name: t("nannk.vid1Name", "Mémoires du fleuve"), id: "No0IoqGSiLw" },
        { name: t("nannk.vid2Name", "Paroles de griots"), id: "V5RcwQAl-_g" },
        { name: t("nannk.vid3Name", "Voix de Podor"), id: "JuBhFrMD-G0" },
        { name: t("nannk.vid4Name", "Récits pulaar"), id: "Mig1P7pQMh0" },
      ],
    },
    {
      titre: t("nannk.cat2", "Concerts Live"),
      items: [
        { name: t("nannk.vid5Name", "Baaba Maal · Acoustique"), id: "cGUML8xR5UU" },
        { name: t("nannk.vid6Name", "Nuit Jolofbeats"), id: "Qtm-Wry-8cc" },
        { name: t("nannk.vid7Name", "Soirée Yéla"), id: "uHHKBJBvvPg" },
        { name: t("nannk.vid8Name", "Hommage à Mansour Seck"), id: "yNgDR1cTi_I" },
      ],
    },
    {
      titre: t("nannk.cat3", "Instruments Traditionnels"),
      items: [
        { name: t("nannk.vid9Name", "Le Xalam"), id: "wl-zb8FPvzo" },
        { name: t("nannk.vid10Name", "Le Sabar"), id: "V5RcwQAl-_g" },
        { name: t("nannk.vid11Name", "La Tama"), id: "JuBhFrMD-G0" },
        { name: t("nannk.vid12Name", "La Kora"), id: "No0IoqGSiLw" },
      ],
    },
  ];

  const stats = [
    { icon: TreePine, value: 180, suffix: "+", label: t("nannk.stat1", "Plants reboisés") },
    { icon: Users, value: 3, suffix: "", label: t("nannk.stat2", "Villages touchés") },
    { icon: Heart, value: 5, suffix: "M+", label: t("nannk.stat3", "CFA investis"), prefix: "" },
    { icon: Globe, value: 5, suffix: "", label: t("nannk.stat4", "Piliers d'action") },
  ];

  const pillars = [
    {
      icon: Leaf,
      title: t("nannk.pillar1Title", "Ndemma (Agriculture)"),
      color: "from-emerald-500 to-green-700",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      description: t(
        "nannk.pillar1Desc",
        "Garantir la sécurité alimentaire, valoriser les terroirs et faire de l'agriculture un levier de croissance inclusive.",
      ),
    },
    {
      icon: Waves,
      title: t("nannk.pillar2Title", "Awo (Pêche)"),
      color: "from-blue-500 to-sky-700",
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      border: "border-blue-500/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      description: t(
        "nannk.pillar2Desc",
        "Valoriser les ressources halieutiques du fleuve Sénégal et soutenir les communautés de pêcheurs artisans.",
      ),
    },
    {
      icon: PawPrint,
      title: t("nannk.pillar3Title", "Ngaynaka (Élevage)"),
      color: "from-amber-500 to-orange-700",
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      border: "border-amber-500/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      description: t(
        "nannk.pillar3Desc",
        "Développer l'élevage pastoral traditionnel, optimiser la gestion des troupeaux et moderniser la filière.",
      ),
    },
    {
      icon: Palette,
      title: t("nannk.pillar4Title", "Nalankagal (Culture)"),
      color: "from-indigo-500 to-purple-700",
      bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
      border: "border-indigo-500/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      description: t(
        "nannk.pillar4Desc",
        "Servir de moteur culturel et social pour l'éducation, l'identité et la transmission dans la vallée.",
      ),
    },
    {
      icon: Cpu,
      title: t("nannk.pillar5Title", "Karalagal (Technologies)"),
      color: "from-rose-500 to-pink-700",
      bg: "bg-rose-500/10 dark:bg-rose-500/20",
      border: "border-rose-500/30",
      iconColor: "text-rose-600 dark:text-rose-400",
      description: t(
        "nannk.pillar5Desc",
        "Moderniser l'ensemble des secteurs d'activité traditionnels par l'apport d'outils numériques innovants.",
      ),
    },
  ];

  // Lightbox state (index of currently open image, null if closed)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Carousel hook
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Lightbox navigation
  const nextLightboxImg = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (lightboxIndex !== null) {
        setLightboxIndex((lightboxIndex + 1) % agriImages.length);
      }
    },
    [lightboxIndex, agriImages.length],
  );

  const prevLightboxImg = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (lightboxIndex !== null) {
        setLightboxIndex((lightboxIndex - 1 + agriImages.length) % agriImages.length);
      }
    },
    [lightboxIndex, agriImages.length],
  );

  return (
    <div className="bg-background min-h-screen">
      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0a1628] py-32">
        <motion.div
          className="absolute inset-0 opacity-40 scale-110"
          style={{ y: heroY }}
        >
          <OptimizedImage src="/arriereplan-nannk.webp" alt="NANN-k Media Background" className="w-full h-full object-cover" priority />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-[#0a1628]/60 via-[#0a1628]/40 to-[#0a1628]" />
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-sky-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />

        <div className="relative z-10 container-page text-center max-w-4xl mx-auto py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
              {t("nannk.culturalMovement")}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl md:text-8xl font-black mb-6 uppercase tracking-tight leading-none"
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #7dd3fc 40%, #38bdf8 70%, #0ea5e9 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              NANN-K
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 leading-relaxed mb-4 max-w-4xl mx-auto font-serif"
          >
            <strong>NANN-K</strong> {t("nannk.heroDesc")} {t("nannk.heroDescFull")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">
              {t("nannk.culture")}
            </span>
            <span className="text-primary font-black">·</span>
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">
              {t("nannk.knowledge")}
            </span>
            <span className="text-primary font-black">·</span>
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">
              {t("nannk.work")}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── SIGNIFICATION DU SIGLE NANN-K ──────────────────── */}
      <section className="container-page py-24 relative overflow-hidden">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-primary mb-3 block font-bold">
            {t("nannk.foundations")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
            {t("nannk.whatMeans")} <span className="text-gradient-gold">NANN-K</span> ?
          </h2>
          <p className="font-serif text-muted-foreground mt-4 text-base md:text-lg max-w-2xl mx-auto">
            {t("nannk.foundationsDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const letter = p.title.charAt(0);
            const peulhWord = p.title.split(" (")[0] || "";
            const frenchWord = p.title.split("(")[1]?.replace(")", "") || "";

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                key={p.title}
                className={`relative flex flex-col justify-between p-6 rounded-3xl border ${p.border} glass-dark hover:shadow-2xl hover:scale-105 transition-all duration-500 group overflow-hidden`}
              >
                {/* Decorative letter background */}
                <span className="absolute -right-4 -bottom-6 font-display text-8xl md:text-9xl font-black opacity-10 select-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                  {letter}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/30 dark:bg-white/10 flex items-center justify-center shadow-sm">
                      <Icon className={`w-6 h-6 ${p.iconColor}`} />
                    </div>
                    <span className="font-display text-3xl font-black opacity-45 group-hover:opacity-100 transition-opacity duration-300">
                      {letter}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                      {peulhWord}
                    </h3>
                    <p className={`text-xs uppercase tracking-wider font-semibold ${p.iconColor}`}>
                      {frenchWord}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────── STATS ──────────────────── */}
      <section className="container-page py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ──────────────────── MISSION ──────────────────── */}
      <section className="container-page py-24 border-t border-border">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              {t("nannk.initiative")}
            </span>
            <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
              {t("nannk.ourMission")}
            </h2>
            <p className="font-serif text-muted-foreground mb-6 text-lg leading-relaxed">
              {t("nannk.missionDesc1")}
              <strong>{t("nannk.agriculture")}</strong>, la <strong>{t("nannk.fishing")}</strong>,
              l'<strong>{t("nannk.livestock")}</strong>, la{" "}
              <strong>{t("nannk.cultureWord")}</strong> et les <strong>{t("nannk.newTech")}</strong>
              .
            </p>
            <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
              {t("nannk.missionDesc2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-primary/10 to-sky-500/10 blur-2xl" />
            <div className="relative aspect-4/3 overflow-hidden border-4 border-border shadow-2xl rounded-3xl bg-white flex items-center justify-center p-8">
              <img
                src={logoNannk}
                alt="Logo NANN-K"
                className="max-w-[70%] max-h-[70%] object-contain hover:scale-110 transition-transform duration-1000"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-lg"
            >
              <p className="text-xs font-bold uppercase tracking-widest">The Village</p>
              <p className="text-xs opacity-75">Podor, Sénégal</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              {t("nannk.ourRaisonDEtre", "Notre raison d'être")}
            </span>
            <h2 className="font-display text-3xl font-bold mb-10 uppercase tracking-tight text-foreground">
              {t("nannk.whyNannk", "Pourquoi NANN-K ?")}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: t("nannk.why1Title", "Le défi du développement"),
                text: t("nannk.why1Text", "L'Afrique fait face à des défis colossaux. Les initiatives institutionnelles ne prennent pas toujours racine dans les réalités du terrain. NANN-K naît de ce constat : le changement doit venir des citoyens eux-mêmes."),
              },
              {
                num: "02",
                title: t("nannk.why2Title", "Une réponse aux populations"),
                text: t("nannk.why2Text", "Emplois, revenus, sécurité alimentaire : les besoins sont criants. NANN-K donne les outils : formations, accès au financement, équipements et visibilité médiatique forte."),
              },
              {
                num: "03",
                title: t("nannk.why3Title", "L'agriculture, priorité nationale"),
                text: t("nannk.why3Text", "Le Sénégal a fait de l'agriculture son moteur de croissance. NANN-K est l'alternative concrète : un accompagnement terrain, proche des agriculteurs."),
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
              >
                <span className="font-display text-4xl font-black text-primary/20 group-hover:text-primary/40 transition-colors block mb-3">
                  {item.num}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-serif text-muted-foreground text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── NANN-K TV (MOVED HIGHER) ──────────────────── */}
      <section className="container-page py-24">
        {/* TV Header card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-[180px_1fr] gap-8 items-center mb-16 glass-dark border border-border/30 p-8 rounded-3xl shadow-xl"
        >
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-2xl overflow-hidden bg-white border border-border/50 flex items-center justify-center p-2 shadow-sm">
              <img src={logoNannk} alt="NANN-k TV Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">
                {t("nannk.tvSpace")}
              </span>
              <h2 className="font-display text-4xl font-bold uppercase tracking-tight">
                NANN-k TV
              </h2>
            </div>
            <div className="space-y-4 font-serif text-muted-foreground text-base leading-relaxed">
              <p>
                <strong>NANN-k TV</strong> {t("nannk.tvDesc1")}
              </p>
              <p>{t("nannk.tvDesc2")}</p>
            </div>
          </div>
        </motion.div>

        {/* Feature video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden border border-border/30 glass-dark shadow-2xl mb-16 p-2"
        >
          <div className="aspect-video relative bg-black rounded-2xl overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/L0HX8udwCeg"
              title="NANN-K en action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Tab navigation for video categories */}
        <div className="mb-8">
          <div className="flex gap-2 border-b border-border overflow-x-auto pb-0 scrollbar-none">
            {categories.map((cat, i) => (
              <button
                key={cat.titre}
                onClick={() => setActiveTab(i)}
                className={`shrink-0 px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 -mb-px cursor-pointer ${
                  activeTab === i
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.titre}
              </button>
            ))}
          </div>
        </div>

        {/* Video grid for active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VideoCarousel
              items={categories[activeTab].items}
              thumbs={thumbs}
              setActiveVideo={setActiveVideo}
            />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ──────────────────── NANNK TRUST ──────────────────── */}
      <section className="container-page py-24 border-t border-border bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            {t("nannk.trustCommitment")}
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            {t("nannk.trustTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl"
            >
              <div className="aspect-video relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/atzGZYV3PaY?autoplay=0"
                  title="NANNK TRUST - Lutte contre la désertification à Podor"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                {t("nannk.trustDesc1")} <strong>{t("nannk.trustAmount")}</strong>{" "}
                {t("nannk.trustDesc1b")} <strong>Podor Vert</strong>
                {t("nannk.trustDesc1c")}
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                {t("nannk.trustDesc2")}
              </p>

              {/* Quote premium */}
              <div className="relative bg-linear-to-br from-primary/5 to-sky-500/5 border border-primary/20 rounded-2xl p-6 mt-4">
                <div className="absolute -top-3 left-6 text-5xl text-primary font-serif leading-none select-none">
                  "
                </div>
                <blockquote className="pt-4 italic font-serif text-foreground text-base leading-relaxed">
                  {t("nannk.trustQuote")}
                </blockquote>
                <footer className="mt-3 text-sm font-bold text-primary uppercase tracking-wider">
                  — Baaba Maal
                </footer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────── REBOISEMENT & ESPACE AGRICOLE (ALTERNATING LAYOUTS) ──────────────────── */}
      <section className="container-page py-24 border-t border-border">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Reboisement */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 md:order-1 space-y-5"
            >
              <span className="text-xs uppercase tracking-widest text-primary mb-1 block font-bold">
                {t("nannk.citizenDay")}
              </span>
              <h2 className="font-display text-3xl font-bold mb-4 uppercase tracking-tight text-foreground">
                {t("nannk.reforestationTitle")}
              </h2>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                {t("nannk.reforestationDesc1")} <strong>Mbolo Birame</strong>{" "}
                {t("nannk.reforestationDate")}
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                {t("nannk.reforestationDesc2")} <strong>{t("nannk.reforestationPlants")}</strong>{" "}
                {t("nannk.reforestationDesc2b")}
              </p>
              <p className="font-serif text-lg leading-relaxed font-semibold text-primary">
                {t("nannk.reforestationCTA")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 md:order-2 rounded-3xl overflow-hidden border border-border bg-card shadow-xl"
            >
              <div className="aspect-video bg-black">
                <video
                  className="w-full h-full"
                  src="/podor%20vert.mp4"
                  controls
                  preload="metadata"
                >
                  {t("nannk.browserNoVideo")}
                </video>
              </div>
            </motion.div>
          </div>

          {/* Espace Agricole */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl"
            >
              <div className="aspect-video relative bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/aF-3SIAeoOk"
                  title="Espace Agricole de NANN-K"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              <span className="text-xs uppercase tracking-widest text-primary mb-1 block font-bold">
                {t("nannk.localDev")}
              </span>
              <h2 className="font-display text-3xl font-bold mb-4 uppercase tracking-tight text-foreground">
                {t("nannk.agriSpaceTitle")}
              </h2>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                {t("nannk.agriSpaceDesc")}
              </p>
              <ul className="space-y-2 mt-4 text-muted-foreground font-serif">
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" /> {t("nannk.foodSecurity")}
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" /> {t("nannk.womenEmpowerment")}
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" /> {t("nannk.agroTech")}
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────── GALERIE AGRICOLE (CAROUSEL) ──────────────────── */}
      <section className="container-page py-20 border-y border-border bg-muted/20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-primary mb-2 block font-bold">
                {t("nannk.inImages")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
                {t("nannk.agriGallery")}
              </h2>
            </div>
            {/* Carousel Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-muted hover:border-primary/50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-muted hover:border-primary/50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Embla Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {agriImages.map((img, i) => (
                <div
                  key={img.alt}
                  onClick={() => setLightboxIndex(i)}
                  className="relative flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] min-w-0 rounded-2xl overflow-hidden border border-border group cursor-pointer aspect-4/3"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">
                      {img.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Pagination (Mobile) */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === selectedIndex ? "bg-primary w-6" : "bg-primary/20"
                }`}
                aria-label={`${t("nannk.goToImage")} ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── FINAL CTA ──────────────────── */}
      <section className="relative py-24 overflow-hidden border-b border-border">
        {/* Background elements */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-sky-500/10" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 container-page max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">
              {t("nannk.joinMovement")} <span className="text-primary">{t("nannk.movement")}</span>
            </h2>
            <p className="font-serif text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("nannk.joinDesc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              {t("nannk.contactUs")}
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── LIGHTBOX ──────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition cursor-pointer border border-white/20"
              aria-label={t("nannk.close")}
            >
              <X size={24} />
            </button>

            {/* Nav Prev */}
            <button
              onClick={prevLightboxImg}
              className="absolute left-4 md:left-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition cursor-pointer border border-white/20"
              aria-label={t("nannk.previous")}
            >
              <ChevronLeft size={32} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={agriImages[lightboxIndex].src}
              alt={agriImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Nav Next */}
            <button
              onClick={nextLightboxImg}
              className="absolute right-4 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition cursor-pointer border border-white/20"
              aria-label={t("nannk.next")}
            >
              <ChevronRight size={32} />
            </button>

            {/* Caption */}
            <div className="absolute bottom-8 left-0 right-0 text-center text-white font-serif tracking-wide text-sm opacity-80 pointer-events-none">
              {agriImages[lightboxIndex].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────── VIDEO MODAL ──────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition cursor-pointer"
                aria-label={t("nannk.close")}
              >
                <X size={20} />
              </button>
              <div className="aspect-video bg-black">
                {activeVideo.isLocal ? (
                  <video className="w-full h-full" src={activeVideo.id} controls autoPlay />
                ) : (
                  <iframe
                    className="w-full h-full border-0"
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                    title={activeVideo.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-display">{activeVideo.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold">
                  Nannka TV Média
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
