import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, X, Leaf, Cpu, Palette, ChevronRight, ChevronLeft, TreePine, Users, Heart, Globe } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { createSeoMeta } from "@/lib/seo";

import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import fleuveImg from "@/assets/fleuve.jpg";
import logoNannk from "@/assets/logo-nannk-new.jpg";
import agri1Img from "@/assets/nann-k-agri1.jpg";
import agri2Img from "@/assets/nann-k-agri2.jpg";
import agri3Img from "@/assets/nann-k-agri3.jpg";
import agri4Img from "@/assets/nann-k-agri4.jpg";
import agri5Img from "@/assets/nann-k-agri5.jpg";
import agri6Img from "@/assets/nann-k-agri6.jpg";
import agri7Img from "@/assets/nann-k-agri7.jpg";
import agri8Img from "@/assets/nann-k-agri8.jpg";

const thumbs = [instrumentsImg, crowdImg, piroguesImg, fleuveImg];

const agriImages = [
  { src: agri1Img, alt: "Agriculture NANN-K – Champs irrigués" },
  { src: agri2Img, alt: "Agriculture NANN-K – Cultures maraîchères" },
  { src: agri3Img, alt: "Agriculture NANN-K – Récolte" },
  { src: agri4Img, alt: "Agriculture NANN-K – Irrigation fleuve" },
  { src: agri5Img, alt: "Agriculture NANN-K – Femmes cultivatrices" },
  { src: agri6Img, alt: "Agriculture NANN-K – Marché local" },
  { src: agri7Img, alt: "Agriculture NANN-K – Pépinière" },
  { src: agri8Img, alt: "Agriculture NANN-K – Reboisement" },
];

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

const categories = [
  {
    titre: "Émissions Culturelles",
    items: [
      { name: "Mémoires du fleuve", id: "No0IoqGSiLw" },
      { name: "Paroles de griots", id: "V5RcwQAl-_g" },
      { name: "Voix de Podor", id: "JuBhFrMD-G0" },
      { name: "Récits pulaar", id: "Mig1P7pQMh0" },
    ],
  },
  {
    titre: "Concerts Live",
    items: [
      { name: "Baaba Maal · Acoustique", id: "cGUML8xR5UU" },
      { name: "Nuit Jolofbeats", id: "Qtm-Wry-8cc" },
      { name: "Soirée Yéla", id: "uHHKBJBvvPg" },
      { name: "Hommage à Mansour Seck", id: "yNgDR1cTi_I" },
    ],
  },
  {
    titre: "Instruments Traditionnels",
    items: [
      { name: "Le Xalam", id: "wl-zb8FPvzo" },
      { name: "Le Sabar", id: "V5RcwQAl-_g" },
      { name: "La Tama", id: "JuBhFrMD-G0" },
      { name: "La Kora", id: "No0IoqGSiLw" },
    ],
  },
];

const stats = [
  { icon: TreePine, value: 180, suffix: "+", label: "Plants reboisés" },
  { icon: Users, value: 3, suffix: "", label: "Villages touchés" },
  { icon: Heart, value: 5, suffix: "M+", label: "CFA investis", prefix: "" },
  { icon: Globe, value: 3, suffix: "", label: "Piliers d'action" },
];

const pillars = [
  {
    icon: Leaf,
    title: "Agriculture",
    color: "from-emerald-500 to-green-700",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    description:
      "Garantir la sécurité alimentaire, valoriser les terroirs et faire de l'agriculture un véritable levier de croissance inclusive.",
  },
  {
    icon: Palette,
    title: "Artisanat",
    color: "from-amber-500 to-orange-700",
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    border: "border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    description:
      "Redorer le savoir-faire local, créer des filières rentables et offrir des perspectives économiques à la jeunesse.",
  },
  {
    icon: Cpu,
    title: "Technologies (TIC)",
    color: "from-sky-500 to-blue-700",
    bg: "bg-sky-500/10 dark:bg-sky-500/20",
    border: "border-sky-500/30",
    iconColor: "text-sky-600 dark:text-sky-400",
    description:
      "Connecter la vallée aux innovations du monde, faciliter l'accès à l'information et accélérer l'entrepreneuriat.",
  },
];

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

function StatCard({ icon: Icon, value, suffix, prefix = "", label }: {
  icon: typeof TreePine; value: number; suffix: string; prefix?: string; label: string;
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
        {prefix}{count}{suffix}
      </span>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</span>
    </motion.div>
  );
}

function NannkMedia() {
  const [activeVideo, setActiveVideo] = useState<{
    name: string;
    id: string;
    isLocal?: boolean;
  } | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  
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
  const nextLightboxImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % agriImages.length);
    }
  }, [lightboxIndex]);

  const prevLightboxImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + agriImages.length) % agriImages.length);
    }
  }, [lightboxIndex]);

  return (
    <div className="bg-background min-h-screen">

      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a1628]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${fleuveImg})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0a1628]/60 via-[#0a1628]/40 to-[#0a1628]" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-sky-500/10 blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />

        <div className="relative z-10 container-page text-center max-w-4xl mx-auto py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
              Mouvement Culturel & Économique
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
                background: "linear-gradient(135deg, #ffffff 0%, #7dd3fc 40%, #38bdf8 70%, #0ea5e9 100%)",
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
            className="text-lg md:text-xl text-slate-300 leading-relaxed mb-4 max-w-2xl mx-auto font-serif"
          >
            Dans la langue peulh, <em className="text-sky-300">"NANN-K"</em> vient du verbe{" "}
            <em className="text-sky-300">"nanni"</em> — «&nbsp;ouïr&nbsp;». Faire entendre,
            comprendre, agir.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">Culture</span>
            <span className="text-primary font-black">·</span>
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">Savoir</span>
            <span className="text-primary font-black">·</span>
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">Travail</span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── STATS ──────────────────── */}
      <section className="container-page py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ──────────────────── MISSION ──────────────────── */}
      <section className="container-page py-12 border-t border-border">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              L'initiative de Baaba Maal
            </span>
            <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
              Notre Mission
            </h2>
            <p className="font-serif text-muted-foreground mb-6 text-lg leading-relaxed">
              NANN-K est un mouvement citoyen qui insuffle une dynamique nouvelle au cœur de la
              vallée du fleuve Sénégal. Il promeut trois piliers essentiels : une{" "}
              <strong>agriculture durable</strong> nourricière, un{" "}
              <strong>artisanat valorisé</strong> et des <strong>technologies modernes</strong>{" "}
              accessibles.
            </p>
            <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
              Notre credo ? <strong>«&nbsp;Culture – Savoir – Travail&nbsp;»</strong>. Nous construisons une
              conscience citoyenne active pour que chaque habitant de la vallée devienne
              acteur de son propre avenir.
            </p>
            {/* Pillars */}
            <div className="space-y-4">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    key={p.title}
                    className={`flex items-start gap-4 p-4 rounded-2xl border ${p.border} ${p.bg} transition-all duration-300 hover:shadow-md`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/50 dark:bg-white/10`}>
                      <Icon className={`w-5 h-5 ${p.iconColor}`} />
                    </div>
                    <div>
                      <strong className={`block mb-0.5 font-sans uppercase tracking-wider text-xs ${p.iconColor}`}>
                        {p.title}
                      </strong>
                      <span className="text-sm text-muted-foreground font-serif">{p.description}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
                className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-1000"
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

      {/* ──────────────────── POURQUOI NANN-K ──────────────────── */}
      <section className="py-16 bg-muted/50 border-y border-border mt-8">
        <div className="container-page max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              Notre raison d'être
            </span>
            <h2 className="font-display text-3xl font-bold mb-10 uppercase tracking-tight text-foreground">
              Pourquoi NANN-K ?
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Le défi du développement",
                text: "L'Afrique fait face à des défis colossaux. Les initiatives institutionnelles ne prennent pas toujours racine dans les réalités du terrain. NANN-K naît de ce constat : le changement doit venir des citoyens eux-mêmes.",
              },
              {
                num: "02",
                title: "Une réponse aux populations",
                text: "Emplois, revenus, sécurité alimentaire : les besoins sont criants. NANN-K donne les outils : formations, accès au financement, équipements et visibilité médiatique forte.",
              },
              {
                num: "03",
                title: "L'agriculture, priorité nationale",
                text: "Le Sénégal a fait de l'agriculture son moteur de croissance. NANN-K est l'alternative concrète : un accompagnement terrain, proche des agriculteurs.",
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
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-serif text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── NANN-K TV (MOVED HIGHER) ──────────────────── */}
      <section className="container-page py-20">
        {/* TV Header card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-[180px_1fr] gap-8 items-center mb-12 bg-card border border-border p-8 rounded-3xl shadow-sm"
        >
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-2xl overflow-hidden bg-white border border-border/50 flex items-center justify-center p-2 shadow-sm">
              <img src={logoNannk} alt="NANN-k TV Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">
                Espace de Diffusion
              </span>
              <h2 className="font-display text-4xl font-bold uppercase tracking-tight">
                NANN-k TV
              </h2>
            </div>
            <div className="space-y-4 font-serif text-muted-foreground text-base leading-relaxed">
              <p>
                <strong>NANN-k TV</strong> est le canal audiovisuel de The Village — voix du
                patrimoine musical de la vallée du Fleuve Sénégal. Documentaires, concerts en live,
                émissions culturelles, portraits de griots et masterclasses d'instruments
                traditionnels.
              </p>
              <p>
                Disponible sur toutes les plateformes numériques, NANN-k TV ambitionne d'être la
                mémoire vivante et diffusée du Fouta Toro — accessible depuis Podor comme depuis
                Paris, New York ou Dakar.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl mb-16"
        >
          <div className="aspect-video relative bg-black">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="wait">
            {categories[activeTab].items.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setActiveVideo({ name: item.name, id: item.id })}
                className="group rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={thumbs[i % thumbs.length]}
                    alt={item.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play size={20} className="text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-serif">Nannka TV</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ──────────────────── NANNK TRUST ──────────────────── */}
      <section className="container-page py-14 border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Un engagement concret
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            NANNK TRUST soutient la lutte contre la désertification
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
                La fondation NANNK TRUST, initiée par l'artiste planétaire Baaba Maal, a remis un
                chèque de plus de <strong>5 millions de francs CFA</strong> à l'association{" "}
                <strong>Podor Vert</strong>, marquant une étape clé dans leur partenariat pour
                l'environnement.
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Cette contribution constitue la deuxième tranche du financement engagé par la
                fondation pour soutenir les actions de reboisement et de restauration des
                écosystèmes locaux.
              </p>

              {/* Quote premium */}
              <div className="relative bg-linear-to-br from-primary/5 to-sky-500/5 border border-primary/20 rounded-2xl p-6 mt-4">
                <div className="absolute -top-3 left-6 text-5xl text-primary font-serif leading-none select-none">"</div>
                <blockquote className="pt-4 italic font-serif text-foreground text-base leading-relaxed">
                  La protection de l'environnement est une urgence et une responsabilité
                  collective. En soutenant Podor Vert, nous investissons dans un avenir durable
                  pour nos communautés et pour les générations futures.
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
      <section className="container-page py-14 border-t border-border">
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
                Journée citoyenne
              </span>
              <h2 className="font-display text-3xl font-bold mb-4 uppercase tracking-tight text-foreground">
                Reboisement à Mbolo Birame
              </h2>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Dans le cadre de la journée nationale de l'arbre initiée par le Président Bassirou
                Diomaye Faye, le département de Podor s'est manifesté à travers le député Ismaela
                Wone et l'Association Podor Vert par une grande journée de reboisement dans la
                commune de <strong>Mbolo Birame</strong> le dimanche 31 août 2025.
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Les villages de Lougué Sebbé, Lougué Toroobé et Lougué Fulbé ont bénéficié de{" "}
                <strong>180 plants ombragés et fruitiers</strong> issus des pépinières de Fanaye et
                de Mery.
              </p>
              <p className="font-serif text-lg leading-relaxed font-semibold text-primary">
                Ensemble, œuvrons pour un Podor Vert et durable.
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
                <video className="w-full h-full" src="/podor%20vert.mp4" controls preload="metadata">
                  Votre navigateur ne supporte pas la vidéo.
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
                Développement Local
              </span>
              <h2 className="font-display text-3xl font-bold mb-4 uppercase tracking-tight text-foreground">
                Espace Agricole de NANN-K
              </h2>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                L'espace agricole NANN-K est le cœur de notre pilier agriculture. Il sert de modèle d'exploitation durable, intégrant des techniques modernes d'irrigation et de culture pour maximiser les rendements tout en préservant les ressources de la vallée du fleuve Sénégal.
              </p>
              <ul className="space-y-2 mt-4 text-muted-foreground font-serif">
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Sécurité alimentaire</li>
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Autonomisation des femmes</li>
                <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" /> Techniques agroécologiques</li>
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
                En images
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
                L'Agriculture NANN-K
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
                aria-label={`Aller à l'image ${i + 1}`}
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
              Rejoignez le <span className="text-primary">Mouvement</span>
            </h2>
            <p className="font-serif text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Que vous soyez un acteur local, un partenaire potentiel ou simplement passionné par le développement de la vallée, votre voix compte.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Nous Contacter
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
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
            
            {/* Nav Prev */}
            <button
              onClick={prevLightboxImg}
              className="absolute left-4 md:left-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition cursor-pointer border border-white/20"
              aria-label="Précédent"
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
              aria-label="Suivant"
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
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition cursor-pointer"
                aria-label="Fermer"
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
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold">Nannka TV Média</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

