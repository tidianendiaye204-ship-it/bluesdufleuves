import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Landmark, Music, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { createSeoMeta } from "@/lib/seo";
import { subscribeNewsletterFn } from "@/routes/__root";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Lightbox } from "@/components/Lightbox";
import { galleryImages, articles, instruments } from "@/data/home-content";
import { MagneticButton } from "@/components/MagneticButton";


export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "The Village Podor | Centre Culturel par Baaba Maal - Festival Blues du Fleuve",
      description:
        "The Village à Podor, Sénégal : centre culturel unique initié par Baaba Maal. Découvrez le village culturel, le festival Blues du Fleuve, la musique traditionnelle et les formations du centre NANN-k au cœur de la vallée du fleuve Sénégal.",
      ogTitle: "The Village - Le Village Culturel de Podor par Baaba Maal",
      ogDescription:
        "Visitez The Village, l'épicentre culturel de Podor. Festival Blues du Fleuve, musée, formations musicales et artisanales, dans un village authentique au bord du fleuve Sénégal.",
      ogImage: "/centre culturel.jpg",
      keywords:
        "The Village, The Village Podor, village Podor, village culturel, centre culturel Podor, Baaba Maal, Blues du Fleuve, festival Sénégal, Fouta Toro, Halpulaar, NANN-k, patrimoine sénégalais",
      canonical: "https://lesbluesdufleuve.sn/",
    });
    return { meta, links };
  },
  component: Home,
});



function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [showFullBio, setShowFullBio] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: Array<{ src: string; alt: string }>, index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("loading");
    setNewsletterMsg("");
    try {
      const res = await subscribeNewsletterFn({ data: { email: newsletterEmail } });
      if (res.error) {
        setNewsletterStatus("error");
        setNewsletterMsg(res.error);
      } else {
        setNewsletterStatus("success");
        setNewsletterMsg("Merci pour votre inscription !");
        setNewsletterEmail("");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMsg("Impossible d'enregistrer votre email. Veuillez réessayer.");
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section: Le Centre Culturel - Grandiose & Apple Style */}
      <section className="relative h-screen min-h-175 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/centre culturel.jpg"
            className="h-full w-full object-cover scale-105"
          >
            <source src="/video the village.mp4" type="video/mp4" />
          </video>
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            animate={{ opacity: [0.4, 0.5, 0.4] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-background" />
        </div>

        <div className="container-page relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8"
          >
            <Landmark size={14} className="text-primary" /> Podor · Vallée du Fleuve
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="luxury-text text-6xl md:text-9xl text-white mb-8"
          >
            The <span className="text-primary">Village</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium leading-relaxed"
          >
            L'épicentre culturel de la vallée du fleuve. Un centre unique regroupant musée, espaces
            de création et de formation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <MagneticButton>
              <Link
                to="/blues-du-fleuve"
                className="block rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white premium-button"
              >
                Découvrir le Festival
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="block rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all"
              >
                Nous Contacter
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
          onClick={() => document.getElementById('presentation')?.scrollIntoView({ behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          aria-label="Défiler vers la présentation"
          onKeyDown={(e) => { if (e.key === 'Enter') document.getElementById('presentation')?.scrollIntoView({ behavior: 'smooth' }) }}
        >
          <ArrowRight className="rotate-90 text-white/50 group-hover:text-primary transition-colors" size={24} />
        </div>
      </section>

      {/* Section Introductive SEO - The Village */}
      <section id="presentation" className="container-page py-32 border-b border-border/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              Présentation
            </span>
            <h2 className="luxury-text text-5xl md:text-7xl uppercase tracking-tighter mb-4">
              L'Âme du <span className="text-primary">Fleuve</span>
            </h2>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground tracking-widest italic">
              Wuro Podor, nde fii ndu jom
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8 max-w-3xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
              The Village est bien plus qu'un centre culturel.
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              C'est un village authentique au cœur de Podor.
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              Dédié à la préservation de la culture Haalpulaar.
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              Et du patrimoine musical du Fleuve Sénégal.
            </p>
          </motion.div>

          {/* Stats clés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="my-16 py-10 border-y border-primary/20 bg-primary/5"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="luxury-text text-5xl md:text-6xl text-primary mb-2">2006</div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">
                  Création du Festival
                </p>
              </div>
              <div>
                <div className="luxury-text text-5xl md:text-6xl text-primary mb-2">17</div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">
                  Éditions du Blues
                </p>
              </div>
              <div>
                <div className="luxury-text text-5xl md:text-6xl text-primary mb-2">4</div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">
                  Pays du Fleuve
                </p>
              </div>
            </div>
          </motion.div>

          {/* Photo intermédiaire */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="my-16"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video border-4 border-border shadow-xl">
              <OptimizedImage
                src="/festival baba maal.jpg"
                alt="Baaba Maal en concert au Blues du Fleuve"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm uppercase tracking-widest mb-1">Baaba Maal</p>
                <p className="luxury-text text-2xl">Le Festival Blues du Fleuve</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8 max-w-3xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              Initié par Baaba Maal.
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              Il offre à la jeunesse du Fouta un lieu.
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              Où tradition et modernité se rencontrent.
            </p>
            <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
              Un espace vivant pour créer, apprendre, partager et célébrer.
            </p>
          </motion.div>

          {/* Double CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/blues-du-fleuve"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              Découvrir le Festival
            </Link>
            <a
              href="#instruments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
            >
              Voir les Instruments
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            <div className="group bg-muted/30 rounded-xl p-6 border border-border/10 transition-all duration-300 hover:bg-muted/40 hover:border-primary/20 hover:shadow-md">
              <div className="mb-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music size={18} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">La Musique</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Au cœur du village, des studios d'enregistrement, des salles de répétition et des
                espaces dédiés à la pratique des instruments traditionnels.
              </p>
            </div>
            <div className="group bg-muted/30 rounded-xl p-6 border border-border/10 transition-all duration-300 hover:bg-muted/40 hover:border-primary/20 hover:shadow-md">
              <div className="mb-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap size={18} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Les Formations</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Des ateliers de musique, d'artisanat, de poterie et de savonnerie pour transmettre
                les savoir-faire ancestraux aux jeunes générations.
              </p>
            </div>
            <div className="group bg-muted/30 rounded-xl p-6 border border-border/10 transition-all duration-300 hover:bg-muted/40 hover:border-primary/20 hover:shadow-md">
              <div className="mb-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar size={18} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Les Événements</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Concerts, expositions, conférences et festivals qui font de The Village un lieu
                culturel dynamique et incontournable de la région.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Baaba Maal - Elevated Typography */}
      <section className="container-page py-32 border-b border-border/10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Galerie photo biographie */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Photo principale — portrait Baaba Maal */}
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-elegant">
              <img
                src="/photo baba maal.jpg"
                alt="Portrait Baaba Maal"
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-2 block">
                  Fondateur
                </span>
                <h3 className="luxury-text text-3xl text-white uppercase">Baaba Maal</h3>
              </div>
            </div>
            {/* Photo secondaire — concert — positionnée en bas à droite */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-28 md:w-36 lg:w-44 aspect-3/4 rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)] border-4 border-background max-w-37.5 md:max-w-45">
              <img
                src="/Baba.jpg"
                alt="Baaba Maal en concert"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter">
              La Voix du <span className="text-primary">Fleuve</span>
            </h2>
            <div className="space-y-8 text-muted-foreground text-lg leading-relaxed font-medium">
              <AnimatePresence>
                {showFullBio && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-8"
                  >
                    <p>
                      Dès son plus jeune âge, il baigne dans la culture musicale traditionnelle. Son
                      père, un fisherman et griot, lui transmet l'amour de la musique et de la culture
                      pulaar. Il étudie la musique traditionnelle et maîtrise plusieurs instruments,
                      notamment le ngoni et la kora.
                    </p>
                    <p>
                      Dans les années 1970, il se rend à Dakar pour poursuivre ses études. C'est là
                      que son parcours musical prend son envol. Il collabore avec divers artistes et
                      enregistre ses premiers albums. Son style unique, mélange de traditions
                      musicales peules et d'influences modernes, lui permet de se faire connaître bien
                      au-delà des frontières du Sénégal.
                    </p>
                    <p>
                      Au cours des décennies suivantes, Baaba Maal devient une figure emblématique de
                      la musique africaine mondiale. Il a collaboré avec de grands artistes
                      internationaux et a donné des concerts dans les plus grandes salles du monde.
                    </p>
                    <p>
                      Mais Baaba Maal n'est pas seulement un musicien : il est aussi un humaniste
                      profondément engagé dans le développement de sa région. Il est le fondateur du
                      mouvement NANN-K et du centre culturel The Village à Podor, qui ont pour
                      objectif de promouvoir la culture, l'éducation et le développement durable dans
                      la vallée du fleuve Sénégal.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="border-l-4 border-primary pl-8 italic text-foreground text-xl">
                "The Village est l'aboutissement d'un rêve : offrir à la jeunesse de Podor un lieu
                où tradition et modernité se rencontrent pour créer l'avenir."
              </p>
              <div className="pt-8">
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary hover:gap-5 transition-all"
                >
                  {showFullBio ? "Réduire" : "Lire la biographie complète"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activités Culturelles Section */}
      <section className="container-page py-32 border-b border-border">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Nos Activités
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
            La Vie Culturelle de <span className="text-primary">The Village</span>
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Concert */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div
              className="aspect-4/3 overflow-hidden bg-muted/50 cursor-pointer"
              onClick={() => openLightbox(galleryImages, 0)}
            >
              <img
                src={galleryImages[0].src}
                alt="Concert"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Musical
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Concerts & Spectacles
              </h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Vivez des moments inoubliables avec des concerts live, des performances d'artistes
                internationaux et locaux, dans un cadre magique au bord du fleuve Sénégal.
              </p>
              <Link to="/blues-du-fleuve" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Exposition */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div
              className="aspect-4/3 overflow-hidden bg-muted/50 cursor-pointer"
              onClick={() => openLightbox(galleryImages, 1)}
            >
              <img
                src={galleryImages[1].src}
                alt="Exposition"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Artistique
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Expositions & Galeries
              </h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Découvrez des expositions d'art contemporain et traditionnel, valorisant le
                patrimoine halpulaar et les savoir-faire locaux.
              </p>
              <Link to="/nann-k-media" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Conférence */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div
              className="aspect-4/3 overflow-hidden bg-muted/50 cursor-pointer"
              onClick={() => openLightbox(galleryImages, 2)}
            >
              <img
                src={galleryImages[2].src}
                alt="Conférence"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Débat
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Conférences & Tables Rondes
              </h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Echanges sur le développement durable, la culture, l'éducation et l'avenir de
                l'Afrique avec des experts et des acteurs du terrain.
              </p>
              <Link to="/nann-k-media" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Master Class */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div
              className="aspect-4/3 overflow-hidden bg-muted/50 cursor-pointer"
              onClick={() => openLightbox(galleryImages, 3)}
            >
              <OptimizedImage
                src={galleryImages[3].src}
                alt="Master Class"
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Formation
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Master Classes
              </h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Apprenez auprès des maîtres : ateliers de musique, danse, artisanat, transmission de
                savoir-faire ancestraux.
              </p>
              <Link to="/formations" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Défilé de Mode */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2 md:col-span-2 lg:col-span-1 lg:col-start-2">
            <div
              className="aspect-4/3 overflow-hidden bg-muted/50 cursor-pointer"
              onClick={() => openLightbox(galleryImages, 4)}
            >
              <img
                src={galleryImages[4].src}
                alt="Défilé de Mode"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Création
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                Défilés de Mode
              </h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Mettez en lumière les créateurs sénégalais et africains avec des défilés de mode
                traditionnelle et contemporaine.
              </p>
              <Link to="/nann-k-media" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                En savoir plus <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </div>
      </section>



      {/* Actualités - Modern News Cards */}
      <section className="bg-muted/30 py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 block">
                Journal
              </span>
              <h2 className="luxury-text text-5xl md:text-6xl uppercase tracking-tighter">
                Dernières <span className="text-primary">Nouvelles</span>
              </h2>
            </div>
            <Link
              to="/nann-k-media"
              className="text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors"
            >
              Tout le Journal
            </Link>
          </div>

          <div className="space-y-10">
            {/* Article à la Une en grand */}
            {articles[0] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={articles[0].to}
                  className="group flex flex-col md:flex-row bg-background rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-muted/30">
                    <OptimizedImage
                      src={articles[0].img}
                      alt={articles[0].title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {articles[0].category}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                      {articles[0].date}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6 group-hover:text-primary transition-colors">
                      {articles[0].title}
                    </h3>
                    <p className="text-base text-muted-foreground mb-8 font-medium leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                      Lire la suite <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Autres articles */}
            <div className="grid md:grid-cols-2 gap-10">
              {articles.slice(1).map((article, idx) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <Link
                    to={article.to}
                    className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-muted/30">
                      <OptimizedImage
                        src={article.img}
                        alt={article.title}
                        className="h-full w-full object-contain object-center bg-muted transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-foreground">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        {article.date}
                      </span>
                      <h3 className="font-display text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-6 font-medium leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                        Lire la suite <ChevronRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Patrimoine & Instruments - Refined layout */}
      <section
        id="instruments"
        className="container-page py-32"
        aria-labelledby="instruments-title"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block">
            Héritage
          </span>
          <h2
            id="instruments-title"
            className="luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter"
          >
            Les Instruments du <span className="text-primary">Fouta</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {instruments.map((inst, idx) => (
            <motion.div
              key={inst.nom}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 rounded-2xl border border-border/10 bg-muted/20 hover:bg-background hover:shadow-elegant transition-all duration-500"
            >
              <h4 className="luxury-text text-2xl text-primary mb-6">{inst.nom}</h4>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                {inst.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section - Re-added but cleaned */}
      <section className="container-page py-24" aria-labelledby="newsletter-title">
        <div className="bg-[#0a0908] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block">
              S'abonner
            </span>
            <h2
              id="newsletter-title"
              className="luxury-text text-4xl md:text-6xl text-white mb-8 uppercase tracking-tighter"
            >
              La Lettre de <span className="text-primary">l'Éditeur</span>
            </h2>
            <p className="text-white/60 mb-10 text-lg">
              Recevez les actualités culturelles et les analyses du projet NANN-k.
            </p>

            <form
              className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
              onSubmit={handleNewsletter}
              aria-label="Inscription à la newsletter"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white outline-none focus:ring-1 focus:ring-primary transition-all min-h-12"
                aria-label="Votre email pour la newsletter"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white premium-button disabled:opacity-50 min-h-12"
                aria-label={
                  newsletterStatus === "loading"
                    ? "Inscription en cours"
                    : "S'abonner à la newsletter"
                }
              >
                {newsletterStatus === "loading" ? "..." : "S'abonner"}
              </button>
            </form>
            {newsletterMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest ${newsletterStatus === "success" ? "text-emerald-500" : "text-red-500"}`}
              >
                {newsletterStatus === "success" && <CheckCircle2 size={16} />}
                {newsletterMsg}
              </motion.div>
            )}
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
