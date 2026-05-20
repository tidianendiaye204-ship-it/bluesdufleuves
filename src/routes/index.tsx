import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ChevronRight, Mail, Landmark, Play, Pause } from "lucide-react";
import { useState } from "react";
import fleuveImg from "@/assets/fleuve.jpg";
import baabaImg from "@/assets/baaba-maal.jpg";
import centreImg from "@/assets/centre-podor.jpg";
import instrumentsImg from "@/assets/instruments.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Le Complexe NANN-k — The Village" },
      { name: "description", content: "Présentation du projet NANN-k, de Baaba Maal, du Centre Culturel et de l'actualité de la vallée du fleuve." },
    ],
  }),
  component: Home,
});

const articles = [
  {
    to: "/nannka-tv" as const,
    category: "Médias",
    title: "NANN-k TV : Archives et documentaires",
    excerpt: "Découvrez des archives inédites et des documentaires exclusifs retraçant l'histoire fascinante de la vallée du fleuve Sénégal.",
    date: "Aujourd'hui",
    img: fleuveImg,
  },
  {
    to: "/nann-k-media" as const,
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

const espaces = [
  { nom: "Musée Numérique", desc: "Exposition interactive du patrimoine matériel et immatériel." },
  { nom: "Studio Nann-k", desc: "Studio de production et d'enregistrement pour les artistes de la vallée." },
  { nom: "Salle de Spectacle", desc: "Espace de diffusion pour les concerts, le théâtre et les arts vivants." },
  { nom: "Bibliothèque", desc: "Médiathèque et centre de documentation sur l'histoire du Fouta." },
  { nom: "Espace d'Exposition", desc: "Galerie dédiée aux arts plastiques et à l'artisanat local." },
  { nom: "Résidence d'Artistes", desc: "Lieu d'accueil et de création pour les artistes en immersion." },
  { nom: "Salles de Formation", desc: "Espaces dédiés à l'apprentissage (musique, numérique, artisanat)." },
  { nom: "Jardin & Plein Air", desc: "Espace de convivialité, de rencontres et de petits spectacles." },
];

function Home() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen">
      {/* Ticker / Flash Info */}
      <div className="bg-primary text-primary-foreground py-2 border-b border-border/10">
        <div className="container-page flex flex-col md:flex-row items-center text-xs font-semibold tracking-wide gap-3">
          <span className="bg-background text-primary px-3 py-1 rounded-sm uppercase animate-pulse shrink-0">Flash Info</span>
          <p className="text-center md:text-left w-full leading-relaxed">La 16ème édition des Blues du Fleuve annoncée sous le signe de l'intégration et de l'environnement. Découvrez le programme complet.</p>
        </div>
      </div>

      {/* Hero Section: Le Complexe & Centre Culturel */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <img src={centreImg} alt="Centre Culturel de Podor" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.85 }} />
        </div>
        <div className="container-page py-20 md:py-28 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <Landmark size={14} /> Podor · Vallée du Fleuve
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold max-w-4xl leading-[1.05]">
            Le Projet <span className="text-gradient-gold">NANN-k</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            L'épicentre culturel de la vallée du fleuve. Un complexe unique regroupant musée, espaces de création, de formation et de dialogue pour les artistes, porté par la vision de Baaba Maal.
          </p>
        </div>
      </section>

      {/* Section Baaba Maal (Biographie) */}
      <section className="container-page py-16 md:py-24 border-b border-border">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="order-2 md:order-1">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
              Baaba <span className="text-primary">Maal</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-serif italic text-muted-foreground mb-8 border-l-4 border-primary pl-4">
              La voix du fleuve Sénégal et ambassadeur culturel de la région de Podor.
            </h3>
            <div className="space-y-6 font-serif text-muted-foreground text-lg leading-relaxed">
              <p>
                Né le 12 novembre 1953 à Podor, Mamadou Aliou Bah, dit <strong>Baaba Maal</strong>, est l'un des artistes africains les plus reconnus internationalement. Fils d'un pêcheur de l'ethnie Haalpulaar, il a grandi immergé dans la richesse musicale et spirituelle de la vallée du fleuve Sénégal, bercé par les chants du Fouta et les rythmes des griots de sa ville natale.
              </p>
              <p>
                Après des études musicales à Dakar, notamment à l'École Nationale des Arts, il poursuit sa formation au Conservatoire National de Musique de Paris, où il acquiert une maîtrise académique de la musique tout en restant profondément ancré dans ses racines. C'est là qu'il approfondit sa réflexion sur la valorisation des musiques traditionnelles d'Afrique de l'Ouest.
              </p>
              <p>
                De retour au Sénégal, Baaba Maal forme avec son ami d'enfance Mansour Seck, musicien non-voyant, le duo fondateur de sa carrière. Ensemble, ils sillonnent les villages du Fouta Toro, collectant chansons, mélodies et instruments traditionnels, travail ethnomusicologique d'une importance capitale pour la préservation du patrimoine musical Haalpulaar.
              </p>

              <div>
                <h4 className="font-display text-2xl font-bold text-foreground mb-4 mt-10">Son parcours discographique et ses distinctions</h4>
                <p className="mb-4">
                  La carrière discographique de Baaba Maal s'étend sur plus de quatre décennies avec une cinquantaine d'albums dont les plus emblématiques sont :
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6 marker:text-primary">
                  <li><strong>Djam Leelii (1984)</strong> — collaboration intime avec Mansour Seck, considérée comme un chef-d'œuvre de la musique africaine acoustique</li>
                  <li><strong>Baayo (1991)</strong> — album qui l'impose sur la scène internationale</li>
                  <li><strong>Firin' in Fouta (1994)</strong> — production phare alliant sonorités traditionnelles et world music</li>
                  <li><strong>Missing You (Mi Yeewnii) (2001)</strong> — explorations électroniques</li>
                  <li><strong>Television (2009)</strong> — album engagé sur les mutations sociales</li>
                  <li><strong>The River (2017)</strong> — retour aux sources, dédié au fleuve Sénégal</li>
                </ul>
                <p>
                  Parmi ses distinctions : Prix Kora de la Meilleure Musique Africaine, nomination aux Grammy Awards, Ambassadeur de Bonne Volonté du PNUD, Chevalier de l'Ordre des Arts et Lettres de France. Il a collaboré avec Peter Gabriel, Youssou N'Dour, Damon Albarn (Gorillaz) et de nombreux artistes internationaux.
                </p>
              </div>

              <div>
                <h4 className="font-display text-2xl font-bold text-foreground mb-4 mt-10">Son engagement pour la culture Pulaar</h4>
                <p className="mb-4">
                  Au-delà de sa carrière artistique, Baaba Maal s'est imposé comme un défenseur infatigable de la culture et des langues du Fouta. Ses concerts, qu'ils se tiennent à Londres, New York ou Podor, portent invariablement la langue Pulaar et les sonorités du fleuve Sénégal. Il est co-fondateur du festival « Les Blues du Fleuve » à Podor, devenu un rendez-vous culturel incontournable qui rassemble artistes locaux et internationaux autour du patrimoine musical de la vallée.
                </p>
                <p>
                  Son projet de centre de recherche et de formation à Podor s'inscrit dans la continuité logique de cet engagement : ancrer dans sa ville natale une institution pérenne capable de former les générations futures aux musiques traditionnelles du Fouta Toro.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 md:sticky md:top-32">
             <div className="aspect-3/4 overflow-hidden border-4 border-background shadow-2xl relative group">
                <img src={baabaImg} alt="Portrait de Baaba Maal" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Les 8 Espaces du Complexe */}
      <section className="bg-card/30 py-20 border-b border-border">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Infrastructure</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Les 8 espaces du complexe</h2>
            <p className="mt-4 text-muted-foreground">
              Le complexe NANN-k est structuré autour de 8 pôles majeurs conçus pour préserver, créer et transmettre le patrimoine culturel.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {espaces.map((espace, idx) => (
              <div key={idx} className="bg-background border border-border p-6 rounded-2xl hover:border-primary transition-colors group">
                <div className="text-3xl font-display text-primary/30 group-hover:text-primary mb-4 transition-colors">0{idx + 1}</div>
                <h3 className="font-bold text-lg mb-2">{espace.nom}</h3>
                <p className="text-sm text-muted-foreground">{espace.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments du Fouta Tooro */}
      <section className="container-page py-20 border-b border-border">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Patrimoine Sonore</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Instruments du Fouta Tooro</h2>
          <p className="mt-3 text-muted-foreground">
            Explorez l'âme sonore du fleuve. Écoutez chaque instrument et découvrez son histoire.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {instruments.map((inst) => {
            const isPlaying = playing === inst.nom;
            return (
              <article key={inst.nom} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col transition hover:border-primary">
                <div className="aspect-square relative overflow-hidden">
                  <img src={instrumentsImg} alt={inst.nom} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, oklch(0.15 0.04 250 / 0.85))" }} />
                  <div className="absolute bottom-4 left-4 font-display text-5xl text-primary">
                    {inst.nom.split(" ").pop()?.charAt(0)}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-semibold">{inst.nom}</h3>
                  <p className="mt-3 text-sm text-muted-foreground flex-1">{inst.desc}</p>
                  <button
                    onClick={() => setPlaying(isPlaying ? null : inst.nom)}
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                    {isPlaying ? "Lecture en cours…" : "Écouter le son"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Actualités Section */}
      <div className="container-page py-20">
        <div className="border-b-2 border-foreground pb-4 mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">Actualités</h2>
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
