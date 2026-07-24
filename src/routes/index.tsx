import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Landmark, Music, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { createSeoMeta, createStructuredData } from "@/lib/seo";
import { subscribeNewsletterFn } from "@/routes/__root";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Lightbox } from "@/components/Lightbox";
import { galleryImages, articles, instruments } from "@/data/home-content";
import { MagneticButton } from "@/components/MagneticButton";
import { ActivityCard } from "@/components/ActivityCard";
import { NewsCard } from "@/components/NewsCard";
import { RotatingWelcomeText } from "@/components/RotatingWelcomeText";
import { AnimatedText } from "@/components/AnimatedText";
import { ParallaxImage } from "@/components/ParallaxImage";

export const Route = createFileRoute("/")({
  head: () => {
    // Default to French for SSR to avoid hydration mismatch
    const lang = "fr";

    const { meta, links } = createSeoMeta({
      title:
        lang === "fr"
          ? "The Village - NANN-K - Blues du Fleuves"
          : "The Village - NANN-K - Blues du Fleuves",
      description:
        lang === "fr"
          ? "The Village à Podor, Sénégal : centre culturel unique initié par Baaba Maal. Découvrez le village culturel, le festival Blues du Fleuve, la musique traditionnelle et les formations du centre NANN-k au cœur de la vallée du fleuve Sénégal."
          : "The Village in Podor, Senegal: a unique cultural center initiated by Baaba Maal. Discover the cultural village, the Blues du Fleuve festival, traditional music and training at the NANN-k center in the heart of the Senegal River valley.",
      ogTitle:
        lang === "fr"
          ? "The Village - NANN-K - Blues du Fleuves"
          : "The Village - NANN-K - Blues du Fleuves",
      ogDescription:
        lang === "fr"
          ? "Visitez The Village, l'épicentre culturel de Podor. Festival Blues du Fleuve, musée, formations musicales et artisanales, dans un village authentique au bord du fleuve Sénégal."
          : "Visit The Village, the cultural epicenter of Podor. Blues du Fleuve festival, museum, musical and craft training, in an authentic village on the banks of the Senegal River.",
      ogImage: "/centre culturel.webp",
      keywords:
        lang === "fr"
          ? "The Village, The Village Podor, village Podor, village culturel, centre culturel Podor, Baaba Maal, Blues du Fleuve, festival Sénégal, Fouta Toro, Halpulaar, NANN-k, patrimoine sénégalais"
          : "The Village, The Village Podor, Podor village, cultural village, Podor cultural center, Baaba Maal, Blues du Fleuve, Senegal festival, Fouta Toro, Halpulaar, NANN-k, Senegalese heritage",
      canonical: "https://lesbluesdufleuve.sn/",
    });

    const structuredData = createStructuredData("Organization", {
      name: "The Village Podor",
      url: "https://lesbluesdufleuve.sn/",
      logo: "https://lesbluesdufleuve.sn/logo%20the%20village.webp",
      description:
        lang === "fr"
          ? "Centre culturel unique initié par Baaba Maal au cœur de la vallée du fleuve Sénégal à Podor, regroupant musée, espaces de création et de formation."
          : "A unique cultural center initiated by Baaba Maal in the heart of the Senegal River valley in Podor, bringing together a museum, creation and training spaces.",
      founder: "Baaba Maal",
      city: "Podor",
      country: "Senegal",
      socialLinks: ["https://www.facebook.com/baabamaal", "https://twitter.com/baabamaal"],
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

  const [showFullBio, setShowFullBio] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "40%"]);

  const openLightbox = (images: Array<{ src: string; alt: string }>, index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section: Le Centre Culturel - Grandiose & Apple Style */}
      <section className="relative h-screen min-h-175 flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/centre culturel.webp"
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
        </motion.div>

        <div className="container-page relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8"
          >
            <Landmark size={14} className="text-primary" /> {t("home.heroTag")}
          </motion.div>
          <AnimatedText
            el="h1"
            text="The Village"
            className="luxury-text text-6xl md:text-9xl text-white mb-8"
            delay={0.2}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium leading-relaxed"
          >
            {t("home.heroSubtitle")}
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
                {t("home.discoverFestival")}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="block rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all"
              >
                {t("home.contactUs")}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
          onClick={() =>
            document.getElementById("presentation")?.scrollIntoView({ behavior: "smooth" })
          }
          role="button"
          tabIndex={0}
          aria-label={t("home.scrollLabel")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              document.getElementById("presentation")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <ArrowRight
            className="rotate-90 text-white/50 group-hover:text-primary transition-colors"
            size={24}
          />
        </div>
      </section>

      {/* Section Introductive SEO - The Village */}
      <section id="presentation" className="container-page py-32 border-b border-border/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              {t("home.soulOfRiver")}
            </span>
            <AnimatedText
              el="h2"
              text={t("home.presentation")}
              className="luxury-text text-5xl md:text-7xl uppercase tracking-tighter mb-4"
            />
            <p className="text-xl md:text-2xl font-serif text-muted-foreground tracking-widest italic">
              {t("home.wuroPodor")}
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
              {t("home.introText1")}
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              {t("home.introText2")}
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              {t("home.introText3")}
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              {t("home.introText4")}
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
                  {t("home.statsFestival")}
                </p>
              </div>
              <div>
                <div className="luxury-text text-5xl md:text-6xl text-primary mb-2">19</div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">
                  {t("home.statsEditions")}
                </p>
              </div>
              <div>
                <div className="luxury-text text-5xl md:text-6xl text-primary mb-2">4</div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">
                  {t("home.statsCountries")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Texte de bienvenue rotatif */}
          <RotatingWelcomeText />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8 max-w-3xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              {t("home.introText5")}
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              {t("home.introText6")}
            </p>
            <p className="text-xl md:text-2xl font-serif text-muted-foreground leading-relaxed">
              {t("home.introText7")}
            </p>
            <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
              {t("home.introText8")}
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
              {t("home.ctaDiscoverFestival")}
            </Link>
            <a
              href="#instruments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
            >
              {t("home.ctaViewInstruments")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: Music, title: "home.activityMusic", desc: "home.activityMusicDesc" },
              { icon: GraduationCap, title: "home.activityTraining", desc: "home.activityTrainingDesc" },
              { icon: Calendar, title: "home.activityEvents", desc: "home.activityEventsDesc" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-primary/40"
              >
                {/* Lueur de fond au survol */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-6 shadow-sm">
                    <item.icon size={24} />
                  </div>
                  <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
                    {t(item.title as any)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(item.desc as any)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Baaba Maal - Elevated Typography */}
      <section className="container-page py-32 border-b border-border/10">
        <div className="grid md:grid-cols-2 gap-20 items-start relative">
          {/* Galerie photo biographie - rendue Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative md:sticky md:top-32"
          >
            {/* Photo principale — portrait Baaba Maal */}
            <div className="relative rounded-2xl overflow-hidden shadow-elegant bg-black/20">
              <OptimizedImage
                src="/photo baba maal.webp"
                alt="Portrait Baaba Maal"
                className="w-full h-auto transition-transform duration-700 hover:scale-105"
                objectFit="contain"
                objectPosition="center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-2 block">
                  {t("home.founderLabel")}
                </span>
                <h3 className="luxury-text text-3xl text-white uppercase">Baaba Maal</h3>
              </div>
            </div>
            {/* Photo secondaire — concert — positionnée en bas à droite */}
            <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-40 md:w-56 lg:w-64 aspect-square rounded-2xl overflow-hidden shadow-2xl border-[6px] border-background z-10">
              <OptimizedImage
                src="/Baba.webp"
                alt="Baaba Maal en concert"
                className="w-full h-full transition-transform duration-700 hover:scale-110"
                objectPosition="top"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedText
              el="h2"
              text={t("home.bioTitle")}
              className="luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter"
            />
            <div className="space-y-8 text-muted-foreground text-lg leading-relaxed font-medium">
              <AnimatePresence>
                {showFullBio && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-8"
                  >
                    <p>{t("home.bioFull1")}</p>
                    <p>{t("home.bioFull2")}</p>
                    <p>{t("home.bioFull3")}</p>
                    <p>{t("home.bioFull4")}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="border-l-4 border-primary pl-8 italic text-foreground text-xl">
                {t("home.bioShort")}
              </p>
              <div className="pt-8">
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary hover:gap-5 transition-all"
                >
                  {showFullBio ? t("home.bioCollapse") : t("home.bioExpand")}{" "}
                  <ArrowRight size={16} />
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
            {t("home.activitiesLabel")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
            {t("home.activitiesTitle")}
          </h2>
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
          />
        </div>
      </section>

      {/* Actualités - Modern News Cards */}
      <section className="bg-muted/30 py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 block">
                {t("home.newsLabel")}
              </span>
              <AnimatedText
                el="h2"
                text={t("home.newsTitle")}
                className="luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter"
              />
            </div>
            <Link
              to="/nann-k-media"
              className="text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors"
            >
              {t("home.newsAll")}
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

      {/* Patrimoine & Instruments - Refined layout */}
      <section
        id="instruments"
        className="container-page py-32"
        aria-labelledby="instruments-title"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block">
            {t("home.heritageLabel")}
          </span>
          <h2
            id="instruments-title"
            className="luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter"
          >
            {t("home.heritageTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {instruments.map((inst, idx) => (
            <motion.div
              key={inst.nom}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="luxury-text text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                    {inst.nom}
                  </h4>
                  <span className="font-display text-4xl md:text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-500 select-none">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-serif leading-relaxed">
                  {inst.desc}
                </p>
              </div>

              {/* Decorative corner element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-linear-to-tl from-primary/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
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
