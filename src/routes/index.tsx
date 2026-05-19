import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ChevronRight, Mail } from "lucide-react";
import fleuveImg from "@/assets/fleuve.jpg";
import baabaImg from "@/assets/baaba-maal.jpg";
import centreImg from "@/assets/centre-podor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Village — L'actualité de la Vallée du Fleuve" },
      { name: "description", content: "Toute l'information culturelle, sociale et économique de Podor et de la vallée du fleuve Sénégal." },
    ],
  }),
  component: Home,
});

const articles = [
  {
    to: "/nann-k-media" as const,
    category: "Médias",
    title: "Nannka TV lance son grand musée virtuel numérique",
    excerpt: "Découvrez des archives inédites et des documentaires exclusifs retraçant l'histoire fascinante de la vallée du fleuve Sénégal.",
    date: "Aujourd'hui",
    img: fleuveImg,
  },
  {
    to: "/centre-culturel" as const,
    category: "Patrimoine",
    title: "Nouvelle exposition au Centre Culturel de Podor",
    excerpt: "L'artisanat local mis à l'honneur dans une rétrospective exceptionnelle au cœur de la ville, attirant de nombreux visiteurs.",
    date: "Hier",
    img: centreImg,
  },
  {
    to: "/blues-du-fleuve" as const,
    category: "Événement",
    title: "Retour sur l'impact économique du festival de cette année",
    excerpt: "Comment l'initiative portée par Baaba Maal transforme l'économie locale et booste le tourisme culturel dans la région.",
    date: "17 Mai 2026",
    img: baabaImg,
  },
];

function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Ticker / Flash Info */}
      <div className="bg-primary text-primary-foreground py-2 border-b border-border/10">
        <div className="container-page flex flex-col md:flex-row items-center text-xs font-semibold tracking-wide gap-3">
          <span className="bg-background text-primary px-3 py-1 rounded-sm uppercase animate-pulse shrink-0">Flash Info</span>
          <p className="text-center md:text-left w-full leading-relaxed">La 16ème édition des Blues du Fleuve annoncée sous le signe de l'intégration et de l'environnement. Découvrez le programme complet.</p>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="border-b-2 border-foreground pb-4 mb-8 flex items-baseline justify-between">
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">À la une</h1>
          <span className="text-sm font-medium text-muted-foreground hidden md:inline-flex capitalize">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Hero Article (Featured) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <article className="lg:col-span-8 group">
            <Link to="/blues-du-fleuve" className="block relative overflow-hidden aspect-video mb-6">
              <img src={baabaImg} alt="Baaba Maal" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                Culture & Société
              </div>
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                <span className="flex items-center gap-1 text-primary"><Clock size={14} /> Il y a 2 heures</span>
                <span>|</span>
                <span className="text-foreground">Par La Rédaction</span>
              </div>
              <Link to="/blues-du-fleuve">
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] mb-4 group-hover:text-primary transition-colors text-foreground">
                  Le Festival Blues du Fleuve prépare une <span className="text-primary italic">16ème édition</span> historique
                </h2>
              </Link>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-serif">
                « Les Rives de l'Harmonie » : c'est le thème choisi cette année par l'artiste Baaba Maal pour célébrer la culture, la sécurité, l'environnement et la solidarité. Un événement majeur pour le rayonnement international de Podor et de toute la région.
              </p>
              <Link to="/blues-du-fleuve" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors border-b border-foreground hover:border-primary pb-1">
                Lire l'article complet <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
          </article>

          {/* Side Articles */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="font-display text-2xl font-bold border-b border-border pb-2 uppercase text-foreground">En Continu</div>
            {articles.map((article, idx) => (
              <article key={idx} className="group flex flex-col gap-3 pb-6 border-b border-border last:border-0">
                <Link to={article.to} className="block overflow-hidden aspect-video mb-1 relative">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-background text-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-sm">
                    {article.category}
                  </div>
                </Link>
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                    <Clock size={12} /> {article.date}
                  </div>
                  <Link to={article.to}>
                    <h3 className="font-display text-xl font-bold leading-snug group-hover:text-primary transition-colors text-foreground">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 font-serif">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Dossier Section */}
      <section className="bg-muted border-y border-border py-16 mt-10">
        <div className="container-page">
          <div className="flex items-center justify-between mb-10 border-b-2 border-foreground pb-4">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight flex items-center gap-3 text-foreground">
              <span className="bg-primary w-3 h-8 inline-block"></span>
              Dossier Spécial : L'Impact Nannka
            </h2>
            <Link to="/" className="text-sm font-semibold text-foreground hover:text-primary hidden sm:flex items-center uppercase tracking-wider text-[11px]">
              Voir tout le dossier <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 bg-background p-8 border border-border shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Analyse</span>
              <h3 className="font-display text-3xl font-bold mb-4 text-foreground leading-tight">Une stratégie de développement local ambitieuse</h3>
              <p className="text-muted-foreground mb-8 font-serif text-lg leading-relaxed">
                Le projet Nannka ne se limite pas à l'événementiel. À travers ses trois piliers (Le Festival, Nannka TV, et le Centre Culturel), il vise des objectifs concrets pour la période 2025-2026.
              </p>
              <div className="space-y-6">
                {[
                  { label: "Intégration Sociale", value: 95 },
                  { label: "Impact Économique Local", value: 80 },
                  { label: "Préservation Environnementale", value: 75 }
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-foreground">
                      <span>{stat.label}</span>
                      <span className="text-primary">{stat.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${stat.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-4/3 overflow-hidden border-4 border-background shadow-md">
                <img src={fleuveImg} alt="Le Fleuve Sénégal" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Abonnement */}
      <section className="container-page py-20">
        <div className="bg-foreground text-background p-10 md:p-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <Mail className="h-10 w-10 text-primary mb-4 mx-auto md:mx-0" />
            <h2 className="font-display text-3xl font-bold mb-3">La Lettre de l'Éditeur</h2>
            <p className="text-background/70 font-serif leading-relaxed">
              Recevez chaque semaine une sélection de nos meilleurs articles, décryptages et reportages concernant le développement de la vallée.
            </p>
          </div>
          <div className="flex-1 w-full">
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="w-full bg-background text-foreground border-none px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary rounded-none"
              />
              <button className="bg-primary text-primary-foreground font-bold uppercase tracking-widest px-6 py-4 text-sm hover:bg-primary/90 transition">
                S'abonner
              </button>
            </form>
            <p className="text-[10px] text-background/50 mt-4 text-center md:text-left uppercase tracking-wider">Votre email est sécurisé.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
