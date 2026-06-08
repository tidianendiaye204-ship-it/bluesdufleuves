import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Landmark } from "lucide-react";
import { createSeoMeta } from "@/lib/seo";
import baabaConcertImg from "@/assets/baaba-maal-concert.png";
import fleuveImg from "@/assets/fleuve.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import logoNannk from "@/assets/logo-nannk-new.jpg";
import gal1Img from "@/assets/gal1.jpg";
import gal2Img from "@/assets/gal2.jpg";
import gal3Img from "@/assets/gal3.jpg";
import gal4Img from "@/assets/gal4.jpg";
import gal5Img from "@/assets/gal5.jpg";
import { subscribeNewsletterFn } from "@/routes/__root";

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "The Village | Le Complexe Culturel de Podor par Baaba Maal",
      description:
        "Découvrez The Village, le centre culturel et artistique unique de Podor, initié par Baaba Maal. Le festival Blues du Fleuve, la culture Halpulaar et la musique du fleuve Sénégal.",
      ogTitle: "The Village - Complexe Culturel Podor par Baaba Maal",
      ogDescription:
        "The Village, l'épicentre culturel de la vallée du fleuve Sénégal. Musée, espaces de création, formations et le festival Blues du Fleuve, par Baaba Maal.",
      ogImage: "/centre culturel.jpg",
      keywords:
        "The Village, The Village Podor, NANN-k, Centre Culturel Podor, Baaba Maal, Complexe culturel, Fouta Toro, patrimoine Sénégal, Blues du Fleuve",
      canonical: "https://lesbluesdufleuve.sn/",
    });
    return { meta, links };
  },
  component: Home,
});

const articles = [
  {
    to: "/nannka-tv" as const,
    category: "Médias",
    title: "NANN-k TV : Archives et documentaires",
    excerpt:
      "Découvrez des archives inédites et des documentaires exclusifs retraçant l'histoire fascinante de la vallée du fleuve Sénégal.",
    date: "Aujourd'hui",
    img: fleuveImg,
  },
  {
    to: "/nann-k-media" as const,
    category: "Patrimoine",
    title: "Nouvelle exposition au Centre Culturel de Podor",
    excerpt:
      "L'artisanat local mis à l'honneur dans une rétrospective exceptionnelle au cœur de la ville, attirant de nombreux visiteurs.",
    date: "Hier",
    img: "/centre culturel.jpg",
  },
  {
    to: "/blues-du-fleuve" as const,
    category: "Événement",
    title: "Retour sur l'impact économique du festival de cette année",
    excerpt:
      "Comment l'initiative portée par Baaba Maal transforme l'économie locale et booste le tourisme culturel dans la région.",
    date: "17 Mai 2026",
    img: "/photo baba maal.jpg",
  },
];

const instruments = [
  {
    nom: "Le Xalam",
    desc: "Luth traditionnel à quatre ou cinq cordes, instrument emblématique des griots wolof et pulaar. Sa caisse sculptée dans un seul morceau de bois résonne d'histoires séculaires.",
  },
  {
    nom: "Le Sabar",
    desc: "Tambour wolof joué à la main et à la baguette, central dans les cérémonies. Son langage rythmique servait jadis à transmettre des messages à travers les villages.",
  },
  {
    nom: "La Tama",
    desc: "Petit tambour d'aisselle à tension variable, surnommé « tambour parlant ». Le musicien module sa voix en pressant les cordes contre son corps.",
  },
];

function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [showFullBio, setShowFullBio] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
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
      {/* Ticker / Flash Info - More discreet and premium */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-40 hidden md:block w-auto max-w-2xl"
      >
        <div className="glass px-6 py-2 rounded-full border border-white/20 shadow-elegant flex items-center gap-4">
          <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0">
            News
          </span>
          <p className="text-[10px] font-bold text-foreground/80 tracking-tight whitespace-nowrap overflow-hidden">
            La 17ème édition des Blues du Fleuve annoncée sous le signe de l'intégration.
          </p>
        </div>
      </motion.div>

      {/* Hero Section: Le Complexe & Centre Culturel - Grandiose & Apple Style */}
      <section className="relative h-screen min-h-175 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="/centre culturel.jpg"
            alt="Centre Culturel de Podor"
            className="h-full w-full object-cover scale-105"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-background" />
        </div>

        <div className="container-page relative z-10 text-center pt-32 md:pt-40">
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
            L'épicentre culturel de la vallée du fleuve. Un complexe unique regroupant musée,
            espaces de création et de formation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/blues-du-fleuve"
              className="rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white premium-button"
            >
              Découvrir le Festival
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all"
            >
              Nous Contacter
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="rotate-90 text-white/50" size={24} />
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
            <div className="absolute -bottom-6 -right-6 w-36 md:w-44 aspect-3/4 rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)] border-4 border-background">
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
              {showFullBio && (
                <>
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
                    mouvement NANN-K et du complexe culturel The Village à Podor, qui ont pour
                    objectif de promouvoir la culture, l'éducation et le développement durable dans
                    la vallée du fleuve Sénégal.
                  </p>
                </>
              )}

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
      <section className="container-page py-20 border-b border-border">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Nos Activités
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
            Vie Culturelle du Village
          </h2>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Concert */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-4/3 overflow-hidden bg-muted/50">
              <img
                src={gal1Img}
                alt="Concert"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Musical
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Concerts & Spectacles</h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Vivez des moments inoubliables avec des concerts live, des performances d'artistes internationaux et locaux, dans un cadre magique au bord du fleuve Sénégal.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                En savoir plus <ArrowRight size={16} />
              </div>
            </div>
          </article>

          {/* Exposition */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-4/3 overflow-hidden bg-muted/50">
              <img
                src={gal2Img}
                alt="Exposition"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Artistique
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Expositions & Galeries</h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Découvrez des expositions d'art contemporain et traditionnel, valorisant le patrimoine halpulaar et les savoir-faire locaux.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                En savoir plus <ArrowRight size={16} />
              </div>
            </div>
          </article>

          {/* Conférence */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-4/3 overflow-hidden bg-muted/50">
              <img
                src={gal3Img}
                alt="Conférence"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Débat
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Conférences & Tables Rondes</h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Echanges sur le développement durable, la culture, l'éducation et l'avenir de l'Afrique avec des experts et des acteurs du terrain.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                En savoir plus <ArrowRight size={16} />
              </div>
            </div>
          </article>

          {/* Master Class */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-4/3 overflow-hidden bg-muted/50">
              <img
                src={gal4Img}
                alt="Master Class"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Formation
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Master Classes</h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Apprenez auprès des maîtres : ateliers de musique, danse, artisanat, transmission de savoir-faire ancestraux.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                En savoir plus <ArrowRight size={16} />
              </div>
            </div>
          </article>

          {/* Défilé de Mode */}
          <article className="group rounded-3xl overflow-hidden border border-border bg-card shadow-elegant hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-4/3 overflow-hidden bg-muted/50">
              <img
                src={gal5Img}
                alt="Défilé de Mode"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Création
              </span>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">Défilés de Mode</h3>
              <p className="font-serif text-muted-foreground leading-relaxed mb-6">
                Mettez en lumière les créateurs sénégalais et africains avec des défilés de mode traditionnelle et contemporaine.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                En savoir plus <ArrowRight size={16} />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Actualités - Modern News Cards */}
      <section className="bg-muted/30 py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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

          <div className="grid md:grid-cols-3 gap-10">
            {articles.map((article, idx) => (
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
                    <img
                      src={article.img}
                      alt={article.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
      </section>

      {/* Patrimoine & Instruments - Refined layout */}
      <section className="container-page py-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block">
            Héritage
          </span>
          <h2 className="luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter">
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
      <section className="container-page py-24">
        <div className="bg-[#0a0908] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block">
              S'abonner
            </span>
            <h2 className="luxury-text text-4xl md:text-6xl text-white mb-8 uppercase tracking-tighter">
              La Lettre de <span className="text-primary">l'Éditeur</span>
            </h2>
            <p className="text-white/60 mb-10 text-lg">
              Recevez les actualités culturelles et les analyses du projet NANN-k.
            </p>

            <form
              className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
              onSubmit={handleNewsletter}
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white premium-button disabled:opacity-50"
              >
                {newsletterStatus === "loading" ? "..." : "S'abonner"}
              </button>
            </form>
            {newsletterMsg && (
              <p
                className={`mt-4 text-[10px] font-bold uppercase tracking-widest ${newsletterStatus === "success" ? "text-emerald-500" : "text-red-500"}`}
              >
                {newsletterMsg}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
