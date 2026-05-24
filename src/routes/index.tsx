import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronRight, Landmark } from "lucide-react";
import { createSeoMeta } from "@/lib/seo";
import baabaImg from "@/assets/baaba-maal.jpg";
import baabaConcertImg from "@/assets/baaba-maal-concert.png";
import centreImg from "@/assets/centre-podor.jpg";
import fleuveImg from "@/assets/fleuve.jpg";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { newsletter } from "@/db/schema";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

export const soumettreNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof newsletterSchema>) => newsletterSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    try {
      await db.insert(newsletter).values({
        email: data.email,
        dateInscription: new Date(),
      });
      return { success: true };
    } catch (error: unknown) {
      // Email déjà inscrit (contrainte unique)
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message: string }).message === "string" &&
        (error as { message: string }).message.includes("UNIQUE")
      ) {
        return { success: true, alreadySubscribed: true };
      }
      throw new Error("Impossible d'enregistrer votre email. Veuillez réessayer.");
    }
  });

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "Le Complexe NANN-k — The Village",
      description:
        "Présentation du projet NANN-k, de Baaba Maal, du Centre Culturel et de l'actualité de la vallée du fleuve.",
      ogTitle: "NANN-k: Centre Culturel de Podor",
      ogDescription:
        "L'épicentre culturel de la vallée du fleuve. Un complexe unique regroupant musée, espaces de création et de formation.",
      ogImage: centreImg,
      keywords:
        "NANN-k, Centre Culturel Podor, Baaba Maal, Complexe culturel, Fouta Toro, patrimoine Sénégal",
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
    img: centreImg,
  },
  {
    to: "/blues-du-fleuve" as const,
    category: "Événement",
    title: "Retour sur l'impact économique du festival de cette année",
    excerpt:
      "Comment l'initiative portée par Baaba Maal transforme l'économie locale et booste le tourisme culturel dans la région.",
    date: "17 Mai 2026",
    img: baabaImg,
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

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await soumettreNewsletter({ data: { email: newsletterEmail } });
      setNewsletterEmail("");
    } catch {
      console.error("Newsletter subscription error");
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Ticker / Flash Info - More discreet and premium */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 hidden md:block w-auto max-w-2xl">
        <div className="glass px-6 py-2 rounded-full border border-white/20 shadow-elegant flex items-center gap-4 animate-reveal">
          <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0">
            News
          </span>
          <p className="text-[10px] font-bold text-foreground/80 tracking-tight whitespace-nowrap overflow-hidden">
            La 16ème édition des Blues du Fleuve annoncée sous le signe de l'intégration.
          </p>
        </div>
      </div>

      {/* Hero Section: Le Complexe & Centre Culturel - Grandiose & Apple Style */}
      <section className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={centreImg}
            alt="Centre Culturel de Podor"
            className="h-full w-full object-cover scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        </div>

        <div className="container-page relative z-10 text-center pt-32 md:pt-40">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">
            <Landmark size={14} className="text-primary" /> Podor · Vallée du Fleuve
          </div>
          <h1 className="luxury-text text-6xl md:text-9xl text-white mb-8 animate-reveal [animation-delay:200ms]">
            The <span className="text-primary">Village</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium leading-relaxed animate-reveal [animation-delay:400ms]">
            L'épicentre culturel de la vallée du fleuve. Un complexe unique regroupant musée,
            espaces de création et de formation.
          </p>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 animate-reveal [animation-delay:600ms]">
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
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="rotate-90 text-white/50" size={24} />
        </div>
      </section>

      {/* Section Baaba Maal - Elevated Typography */}
      <section className="container-page py-32 border-b border-border/10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Galerie photo biographie */}
          <div className="relative animate-reveal">
            {/* Photo principale — concert */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={baabaConcertImg}
                alt="Baaba Maal en concert"
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-2 block">
                  Fondateur
                </span>
                <h3 className="luxury-text text-3xl text-white uppercase">Baaba Maal</h3>
              </div>
            </div>
            {/* Photo secondaire — portrait — positionnée en bas à droite */}
            <div className="absolute -bottom-6 -right-6 w-36 md:w-44 aspect-[3/4] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)] border-4 border-background">
              <img
                src={baabaImg}
                alt="Portrait Baaba Maal"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>

          <div className="animate-reveal [animation-delay:200ms]">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block">
              L'Âme du Projet
            </span>
            <h2 className="luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter">
              La Voix du <span className="text-primary">Fleuve</span>
            </h2>
            <div className="space-y-8 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>
                Mamadou Aliou Bah, dit <strong>Baaba Maal</strong>, est bien plus qu'un artiste.
                C'est le gardien d'un héritage, un bâtisseur qui a su transformer la richesse
                musicale du Fouta Toro en un levier de développement pour toute la vallée.
              </p>
              <p className="border-l-4 border-primary pl-8 italic text-foreground text-xl">
                "The Village est l'aboutissement d'un rêve : offrir à la jeunesse de Podor un lieu
                où tradition et modernité se rencontrent pour créer l'avenir."
              </p>
              <div className="pt-8">
                <Link
                  to="/blues-du-fleuve"
                  className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary hover:gap-5 transition-all"
                >
                  Lire la biographie complète <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
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
              <Link
                key={article.title}
                to={article.to}
                className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-all duration-500 animate-reveal"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            <div
              key={inst.nom}
              className="p-10 rounded-2xl border border-border/10 bg-muted/20 hover:bg-background hover:shadow-elegant transition-all duration-500 animate-reveal"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h4 className="luxury-text text-2xl text-primary mb-6">{inst.nom}</h4>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                {inst.desc}
              </p>
            </div>
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
                className="rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white premium-button"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
