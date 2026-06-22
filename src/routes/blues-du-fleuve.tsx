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
  Clock,
  Star,
  ArrowRight,
  Zap,
  Flame,
  Waves,
  Compass,
  Shield,
  Lightbulb,
  Trophy,
  Crown,
  Diamond,
  Infinity,
  X,
} from "lucide-react";
import { useState, useRef } from "react";
import logoFestival from "@/assets/logo-festival.png";
import { createSeoMeta, createStructuredData } from "@/lib/seo";
import crowdImg from "@/assets/festival-crowd.jpg";
import { PageSkeleton } from "@/components/PageSkeleton";
import { OptimizedImage } from "@/components/OptimizedImage";
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
        "Découvrez la 17ème édition du Festival Blues du Fleuve avec Baaba Maal au The Village, le centre culturel de Podor, et des artistes de la région du Fouta Toro.",
      ogImage: crowdImg,
      keywords:
        "Blues du Fleuve, Festival Podor, The Village, Baaba Maal, musique Sénégal, Fouta Toro, festival 2026, culture Halpulaar",
      canonical: "https://lesbluesdufleuve.sn/blues-du-fleuve",
    });

    const structuredData = createStructuredData("MusicEvent", {
      name: "Blues du Fleuve - 17ème édition",
      startDate: "2025-12-05T18:00:00",
      endDate: "2025-12-07T23:59:59",
      locationName: "The Village Podor",
      city: "Podor",
      country: "Sénégal",
      description: "Festival Blues du Fleuve au The Village, le centre culturel de Podor, fondé par Baaba Maal. Célébration de l'intégration, de la solidarité et de la culture de la vallée du fleuve Sénégal.",
      image: crowdImg,
      url: "https://lesbluesdufleuve.sn/blues-du-fleuve",
      performers: artistes.map(artist => ({ name: artist.nom })),
      organizer: "The Village Podor",
      organizerUrl: "https://lesbluesdufleuve.sn",
      ticketUrl: "https://lesbluesdufleuve.sn/blues-du-fleuve#billetterie",
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
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<typeof artistes[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-black overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/IHAWprBOmzs?autoplay=1&mute=1&loop=1&playlist=IHAWprBOmzs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            title="Festival Background Video"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
            style={{
              width: "max(130vw, 130vh * 9 / 16)",
              height: "max(130vh, 130vw * 16 / 9)",
            }}
          />
          {/* Overlay élégant */}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
        </div>

        {/* Main content with parallax */}
        <motion.div 
          style={{ y, opacity }}
          className="container-page py-20 md:py-32 relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center z-10">
          <div>
            {/* Logo du Festival */}
            <div className="mb-6">
              <img
                src={logoFestival}
                alt="Les Blues du Fleuve — Logo officiel"
                className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.5))" }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80 mb-5">
              Festival International · 17ème édition
            </p>
            <h1 className="luxury-text text-6xl md:text-8xl mb-6 text-white uppercase tracking-tighter">
              Blues du <span className="text-gradient-gold">Fleuve</span>
            </h1>
            <div className="mt-8 space-y-6 max-w-2xl">
              <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
                Porté sur les fonds baptismaux par l’artiste international Sénégalais <strong className="font-bold text-gradient-gold">Baaba MAAL</strong>, le festival les Blues du fleuve célèbre sa 17ème édition.
              </p>
              
              <div className="h-px w-24 bg-linear-to-r from-amber-400 to-transparent"></div>
              
              <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium">
                Seul Festival d’intégration en Afrique de l’ouest, le Blues du Fleuve symbolise la solidarité des pays riverains du fleuve Sénégal.
              </p>

              <div className="md:hidden">
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-amber-400 text-sm flex items-center gap-2 font-semibold uppercase tracking-wider mt-4"
                >
                  {showFullDescription ? (
                    <>
                      <ChevronUp size={16} /> Fermer
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} /> Découvrir la vision
                    </>
                  )}
                </button>
              </div>

              <div className="hidden md:block space-y-4 text-sm md:text-base text-white/70 leading-relaxed">
                <p>
                  Le Festival consacre ses éditions à travers diverses expressions des peuples dont la culture est fortement influencée par l’eau. Cette culture est représentée essentiellement par les arts vivants : musique, danse, spectacles traditionnels et artisanat. Ce patrimoine populaire et les préoccupations de développement sont aussi représentés à travers des expositions thématiques et des conférences.
                </p>
                <p>
                  Cette manifestation sera inscrite cette année d’une part sous le sceau de la paix et l’harmonie sociale pour le vivre ensemble Africain dans l’unité et la diversité, d’autre part sur l’émergence du Sénégal.
                </p>
              </div>

              <div className="md:hidden">
                <AnimatePresence>
                  {showFullDescription && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-4 text-sm text-white/70 leading-relaxed mt-4"
                    >
                      <p>
                        Le Festival consacre ses éditions à travers diverses expressions des peuples dont la culture est fortement influencée par l’eau. Cette culture est représentée essentiellement par les arts vivants : musique, danse, spectacles traditionnels et artisanat. Ce patrimoine populaire et les préoccupations de développement sont aussi représentés à travers des expositions thématiques et des conférences.
                      </p>
                      <p>
                        Cette manifestation sera inscrite cette année d’une part sous le sceau de la paix et l’harmonie sociale pour le vivre ensemble Africain dans l’unité et la diversité, d’autre part sur l’émergence du Sénégal.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Badges d'information */}
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <MapPin size={18} className="text-amber-400" /> 
                  <span className="text-sm font-semibold tracking-wide">{FESTIVAL_CONFIG.location}</span>
                </div>
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <Calendar size={18} className="text-amber-400" /> 
                  <span className="text-sm font-semibold tracking-wide">{FESTIVAL_CONFIG.dateTexte}</span>
                </div>
              </div>

              {/* Compte à rebours */}
              <div className="mt-8">
                <Countdown targetDate={FESTIVAL_CONFIG.startDate} />
              </div>

              <div className="mt-8">
                <MagneticButton>
                  <a
                    href="#billetterie"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('billetterie')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-block btn-gradient-premium px-8 py-4 rounded-xl text-white font-bold uppercase tracking-widest text-xs shadow-lg transition-all hover:shadow-[0_10px_30px_rgba(245,158,11,0.3)]"
                  >
                    Voir le Programme
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/20 aspect-4/5 shadow-2xl">
            <OptimizedImage
              src="/festival baba maal.jpg"
              alt="Baaba Maal"
              className="h-full w-full"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* ──────────────────── THEME SECTION ULTRA PREMIUM ──────────────────── */}
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
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                Thème · 17ème Édition
              </span>
            </div>
            <h2 className="luxury-text text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
              Les Rives de{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                l'Harmonie
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-muted-foreground italic font-serif leading-relaxed">
                « Culture – Sécurité – Environnement et Solidarité autour du Fleuve Sénégal »
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {piliers.map(({ Icon, titre, desc }, idx) => (
              <motion.div
                key={titre}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {titre}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-serif">{desc}</p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── PRÉSENTATION SECTION ULTRA PREMIUM ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-background via-muted/10 to-background">
        <div className="container-page py-20">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Présentation</p>
            <h2 className="luxury-text text-4xl md:text-6xl mb-12 uppercase tracking-tighter">
              Le Festival et la Ville de <span className="text-gradient-gold">Podor</span>
            </h2>

            {/* Introduction Card */}
            <div className="rounded-2xl border border-border bg-card p-8 mb-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    Introduction
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Le festival « Les Blues du Fleuve » est un cadre idéal pour l'épanouissement
                    culturel et le développement, axé sur diverses expressions des cultures
                    influencées par l'eau, notamment les arts vivants (musique, danse, spectacles
                    traditionnels), l'artisanat et le patrimoine populaire. Il est organisé par une
                    association créée à Podor à l'initiative de Baaba Maal, qui en est le président
                    d'honneur.
                  </p>
                </div>
              </div>
            </div>

            {/* Bénéficiaires Card */}
            <div className="rounded-2xl border border-border bg-card p-8 mb-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    Bénéficiaires
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Les musiciens de Podor, du Sénégal et de la sous-région ouest-africaine, les
                    associations locales de femmes, de jeunes, d'artisans, d'éleveurs, de pêcheurs,
                    d'agriculteurs et l'ensemble de la population autour de Podor.
                  </p>
                </div>
              </div>
            </div>

            {/* Objectifs Grid */}
            <div className="mb-6">
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target size={20} />
                </div>
                Les Grands Objectifs du Festival
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Globe className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Établir une forte communauté culturelle unie par le fleuve Sénégal, favorisant
                      l'intégration sous-régionale.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Music2 className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Stimuler les échanges locaux, sous-régionaux et internationaux entre artistes
                      (musiciens, danseurs, artisans) et promouvoir des partenariats offrant une
                      meilleure visibilité à leurs œuvres.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Palette className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Revaloriser et promouvoir diverses formes d'expressions artistiques africaines
                      (musique, arts de la scène, danse, artisanat).
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Award className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Favoriser l'installation durable d'infrastructures culturelles à Podor comme
                      point de convergence pour les artistes africains et internationaux.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats Grid */}
            <div className="mb-6">
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                Les Résultats Attendus
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Heart className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Le festival renforce la coopération culturelle et promeut des partenariats
                      durables.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Target className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Il crée des opportunités économiques pour les populations locales et les
                      prestataires de services.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Il bénéficie considérablement à l'industrie touristique à moyen terme.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <TreePine className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Il met en valeur la richesse artisanale et agricole de la sous-région.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activités Phares Card */}
            <div className="rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Mic size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    Les Activités Phares
                  </h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Music2 className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-muted-foreground leading-relaxed">
                    Grands concerts attirant un public important des localités environnantes et de
                    la Diaspora.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Palette className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-muted-foreground leading-relaxed">
                    Événements traditionnels et expositions artisanales mettant en valeur la
                    diversité créative des populations de la sous-région à travers des spectacles
                    folkloriques, chants et danses, ainsi que le savoir-faire technique et
                    esthétique de divers peuples.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-muted-foreground leading-relaxed">
                    Conférences et caravanes éducatives, d'information et de sensibilisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── MOT DU PRODUCTEUR ULTRA PREMIUM ──────────────────── */}
      <section className="relative border-b border-border bg-linear-to-b from-muted/20 via-background to-muted/20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
        
        <div className="container-page py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Texte - gauche */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.4em] text-primary font-bold">
                    Mot du Producteur
                  </span>
                </div>
                <h2 className="luxury-text text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">
                  Le message d'
                  <span
                    className="relative inline-block"
                    style={{
                      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Oumar Wade
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 font-serif text-muted-foreground text-lg leading-relaxed">
                <p className="text-foreground/90">
                  Oui, le Festival des Blues du Fleuve est devenu un souffle, un moteur, un moment
                  faste où Podor vit et sourit davantage. Tenir chaque année un festival est un défi
                  majeur.
                </p>
                <p>
                  Chers festivaliers venus du Sénégal, des pays voisins, du reste de l'Afrique et de
                  l'extérieur, vous êtes chez vous ici, sur cette terre où le fleuve porte notre
                  histoire, notre culture et nos traditions ancestrales.
                </p>
                <p>
                  Bienvenue à Podor Wuro Njaak Buubu et Baaba Maal, où la musique nous rassemble et
                  nous unit ; où la voix chaleureuse de Baaba réjouit nos cœurs et éveillent nos
                  esprits.
                </p>
              </div>
              
              {/* Citation premium */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden border border-primary/20"
                style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)" }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="relative px-8 py-10 text-white">
                  <div className="absolute top-4 left-6 text-6xl text-white/20 font-serif leading-none">"</div>
                  <p className="luxury-text text-2xl md:text-3xl font-bold mb-4 uppercase tracking-tight">
                    Je vous souhaite un magnifique festival.
                  </p>
                  <p className="text-3xl md:text-4xl font-black tracking-widest mt-4">YOO WUL WELA !</p>
                  <div className="mt-8 border-t border-white/30 pt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Crown size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Oumar Wade</p>
                      <p className="text-sm opacity-80 uppercase tracking-wider">
                        Producteur Exécutif
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Photo - droite */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Décoration premium derrière la photo */}
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -inset-6 rounded-3xl bg-linear-to-br from-primary/20 to-amber-500/20 blur-2xl -z-10"
                />
                <div className="relative w-72 md:w-96 aspect-4/5 rounded-3xl overflow-hidden border-4 border-background shadow-2xl group">
                  <img
                    src="/oumar-wade.jpg"
                    alt="Oumar Wade — Producteur Exécutif du Festival Blues du Fleuve"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Badge flottant premium */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl px-6 py-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-amber-500 flex items-center justify-center">
                      <Crown size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-primary font-bold">
                        Producteur Exécutif
                      </p>
                      <p className="font-display font-bold text-foreground">Oumar Wade</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Decorative corner elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-amber-500/30 rounded-bl-3xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── PROGRAMME & BILLETTERIE ULTRA PREMIUM ──────────────────── */}
      <section id="billetterie" className="relative border-b border-border bg-linear-to-b from-background via-muted/20 to-background overflow-hidden">
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
              Programme &{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Billetterie
              </span>
            </h2>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
              Trois jours de musique, de culture et de célébration au cœur de Podor
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                day: "Jour 1",
                title: "Ouverture & Traditions",
                date: "5 Décembre 2025",
                location: "Centre Culturel de Podor",
                events: [
                  { time: "10:00", event: "Cérémonie d'ouverture" },
                  { time: "15:00", event: "Course de pirogues traditionnelles" },
                  { time: "21:00", event: "Concert acoustique (Baaba Maal & Invités)" },
                ],
                gradient: "from-emerald-500/20 to-emerald-500/5",
                border: "border-emerald-500/30",
                icon: Sparkles,
              },
              {
                day: "Jour 2",
                title: "La Nuit du Fleuve",
                date: "6 Décembre 2025",
                location: "Scène Principale",
                events: [
                  { time: "10:00", event: "Panels et conférences (Environnement)" },
                  { time: "16:00", event: "Animations artistiques dans la ville" },
                  { time: "22:00", event: "Grand Concert (Mia Guissé, Jeeba...)" },
                ],
                gradient: "from-sky-500/20 to-sky-500/5",
                border: "border-sky-500/30",
                icon: Waves,
              },
              {
                day: "Jour 3",
                title: "Clôture & Daande Lenol",
                date: "7 Décembre 2025",
                location: "Scène Principale",
                events: [
                  { time: "09:00", event: "Exposition artisanale" },
                  { time: "15:00", event: "Danse et folklore Halpulaar" },
                  { time: "22:00", event: "Concert de Clôture (Baaba Maal & Le Daande Lenol)" },
                ],
                gradient: "from-amber-500/20 to-amber-500/5",
                border: "border-amber-500/30",
                icon: Trophy,
              },
            ].map((day, idx) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-linear-to-br ${day.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-8">
                  {/* Day badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${day.border} border bg-white/5 mb-4`}>
                    <day.icon size={14} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">{day.day}</span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {day.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{day.date}</p>
                  <p className="text-xs text-muted-foreground/70 mb-6 flex items-center gap-2">
                    <MapPin size={12} />
                    {day.location}
                  </p>
                  
                  <div className="space-y-3">
                    {day.events.map((evt, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/50 group-hover:border-primary/30 transition-colors">
                        <Clock size={14} className="text-primary mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-primary">{evt.time}</span>
                          <p className="text-sm text-foreground mt-0.5">{evt.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </motion.div>
            ))}
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
                  <span className="relative z-10 text-white">Réserver mon Pass 3 Jours</span>
                  <ArrowRight size={16} className="relative z-10 text-white group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                </Link>
              </MagneticButton>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Bientôt disponible</p>
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
                  Line-up
                </span>
              </div>
              <h2 className="luxury-text text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter mb-4">
                Artistes
              </h2>
              <p className="text-lg text-muted-foreground font-serif">Voix et talents du fleuve.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span>Artistes confirmés</span>
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
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                <div className="p-5 relative">
                  <div className="absolute -top-6 left-5 right-5">
                    <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-border/50 shadow-lg">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {a.nom}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-primary mt-1 font-semibold">{a.role}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin size={10} />
                        {a.origine}
                      </p>
                    </div>
                  </div>
                  <p className="mt-8 text-sm text-muted-foreground font-serif leading-relaxed line-clamp-3">{a.desc}</p>
                  <button
                    onClick={() => setSelectedArtist(a)}
                    className="mt-3 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    Lire la suite <ChevronRight size={12} />
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
                Mémoires visuelles
              </span>
            </div>
            <h2 className="luxury-text text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter mb-4">
              Galerie d'images
            </h2>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
              Une immersion visuelle au cœur du festival
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl overflow-hidden border border-border relative group cursor-pointer ${img.span || ""}`}
              >
                <OptimizedImage
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full transition duration-700 group-hover:scale-110"
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
                src={crowdImg}
                alt="Foule au festival"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-4">
                  <Play size={14} className="text-white" />
                  <span className="text-xs uppercase tracking-wider text-white font-bold">
                    Archives en direct
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                  Archives média
                </h2>
                <p className="text-white/80 mt-2 font-serif">Revivez les moments forts du festival</p>
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
                    src={`https://www.youtube.com/embed/${v.id}`}
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${v.id}?autoplay=1><img src=https://img.youtube.com/vi/${v.id}/hqdefault.jpg alt='${v.title}'><span>▶</span></a>`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
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
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Archive vidéo</p>
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
                Ils nous soutiennent
              </span>
            </div>
            <h2 className="luxury-text text-4xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tighter mb-4">
              Nos{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Partenaires
              </span>
            </h2>
            <p className="text-lg text-muted-foreground font-serif">
              Ensemble pour la culture et le développement
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "ELYDIA", icon: Diamond },
              { name: "FC", icon: Shield },
              { name: "Ministère", icon: Award },
              { name: "NANN-K Media", icon: Globe },
              { name: "Mairie Podor", icon: MapPin },
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

      <section className="container-page py-12 border-t border-border bg-card/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Nous Contacter</h2>
          <p className="mt-4 text-muted-foreground">
            Nous sommes à votre disposition. Notre back office se chargera de répondre à vos
            demandes.
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Adresse
              </span>
              <span className="text-lg font-medium">Dakar, Dakar - Sénégal</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Téléphone
              </span>
              <a
                href="tel:+221774967531"
                className="text-lg font-medium hover:text-primary transition whitespace-nowrap"
              >
                +221 77 496 75 31
              </a>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Email
              </span>
              <a
                href="mailto:contact@bluesdufleuve.sn"
                className="text-lg font-medium hover:text-primary transition"
              >
                contact@bluesdufleuve.sn
              </a>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-6">
            <a
              href="https://www.facebook.com/festivalbluesdufleuve"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/nannkmedia"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@nannktv"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              Youtube
            </a>
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
                    <img src={selectedArtist.img} alt={selectedArtist.nom} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-6xl text-primary/20">{selectedArtist.nom.charAt(0)}</div>
                  )}
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-display text-3xl font-bold text-foreground mb-1">{selectedArtist.nom}</h3>
                  <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-4">{selectedArtist.role} · {selectedArtist.origine}</p>
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
    </>
  );
}
