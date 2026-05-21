import { S as reactExports, J as jsxRuntimeExports } from "./server-C17troPO.js";
import { a as createLucideIcon, c as centreImg, L as Link, f as fleuveImg, M as Mail, e as soumettreNewsletter } from "./router-Dybtw34y.js";
import { b as baabaImg } from "./baaba-maal-CFblE9PW.js";
import { i as instrumentsImg } from "./instruments-i2gV3lym.js";
import { P as Play } from "./play-DAOFO0ad.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-DGfzljZx.js";
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$4);
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M10 18v-7", key: "wt116b" }],
  [
    "path",
    {
      d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
      key: "1m329m"
    }
  ],
  ["path", { d: "M14 18v-7", key: "vav6t3" }],
  ["path", { d: "M18 18v-7", key: "aexdmj" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M6 18v-7", key: "1ivflk" }]
];
const Landmark = createLucideIcon("landmark", __iconNode$1);
const __iconNode = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
];
const Pause = createLucideIcon("pause", __iconNode);
const articles = [{
  to: "/nannka-tv",
  category: "Médias",
  title: "NANN-k TV : Archives et documentaires",
  excerpt: "Découvrez des archives inédites et des documentaires exclusifs retraçant l'histoire fascinante de la vallée du fleuve Sénégal.",
  date: "Aujourd'hui",
  img: fleuveImg
}, {
  to: "/nann-k-media",
  category: "Patrimoine",
  title: "Nouvelle exposition au Centre Culturel de Podor",
  excerpt: "L'artisanat local mis à l'honneur dans une rétrospective exceptionnelle au cœur de la ville, attirant de nombreux visiteurs.",
  date: "Hier",
  img: centreImg
}, {
  to: "/blues-du-fleuve",
  category: "Événement",
  title: "Retour sur l'impact économique du festival de cette année",
  excerpt: "Comment l'initiative portée par Baaba Maal transforme l'économie locale et booste le tourisme culturel dans la région.",
  date: "17 Mai 2026",
  img: baabaImg
}];
const instruments = [{
  nom: "Le Xalam",
  desc: "Luth traditionnel à quatre ou cinq cordes, instrument emblématique des griots wolof et pulaar. Sa caisse sculptée dans un seul morceau de bois résonne d'histoires séculaires."
}, {
  nom: "Le Sabar",
  desc: "Tambour wolof joué à la main et à la baguette, central dans les cérémonies. Son langage rythmique servait jadis à transmettre des messages à travers les villages."
}, {
  nom: "La Tama",
  desc: "Petit tambour d'aisselle à tension variable, surnommé « tambour parlant ». Le musicien module sa voix en pressant les cordes contre son corps."
}];
const espaces = [{
  nom: "Musée Numérique",
  desc: "Exposition interactive du patrimoine matériel et immatériel."
}, {
  nom: "Studio Nann-k",
  desc: "Studio de production et d'enregistrement pour les artistes de la vallée."
}, {
  nom: "Salle de Spectacle",
  desc: "Espace de diffusion pour les concerts, le théâtre et les arts vivants."
}, {
  nom: "Bibliothèque",
  desc: "Médiathèque et centre de documentation sur l'histoire du Fouta."
}, {
  nom: "Espace d'Exposition",
  desc: "Galerie dédiée aux arts plastiques et à l'artisanat local."
}, {
  nom: "Résidence d'Artistes",
  desc: "Lieu d'accueil et de création pour les artistes en immersion."
}, {
  nom: "Salles de Formation",
  desc: "Espaces dédiés à l'apprentissage (musique, numérique, artisanat)."
}, {
  nom: "Jardin & Plein Air",
  desc: "Espace de convivialité, de rencontres et de petits spectacles."
}];
function Home() {
  const [playing, setPlaying] = reactExports.useState(null);
  const [newsletterEmail, setNewsletterEmail] = reactExports.useState("");
  const [newsletterStatus, setNewsletterStatus] = reactExports.useState("idle");
  const [newsletterMsg, setNewsletterMsg] = reactExports.useState("");
  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("loading");
    try {
      const result = await soumettreNewsletter({
        data: {
          email: newsletterEmail
        }
      });
      if (result.alreadySubscribed) {
        setNewsletterMsg("Vous êtes déjà inscrit(e) à notre lettre d'information !");
      } else {
        setNewsletterMsg("Merci ! Vous êtes maintenant abonné(e) à La Lettre de l'Éditeur.");
      }
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterMsg("Une erreur est survenue. Veuillez réessayer.");
      setNewsletterStatus("error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground py-2 border-b border-border/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex flex-col md:flex-row items-center text-xs font-semibold tracking-wide gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-background text-primary px-3 py-1 rounded-sm uppercase animate-pulse shrink-0", children: "Flash Info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center md:text-left w-full leading-relaxed", children: "La 16ème édition des Blues du Fleuve annoncée sous le signe de l'intégration et de l'environnement. Découvrez le programme complet." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-b border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: centreImg, alt: "Centre Culturel de Podor", className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
          background: "var(--gradient-hero)",
          opacity: 0.85
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-20 md:py-28 relative text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { size: 14 }),
          " Podor · Vallée du Fleuve"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-bold max-w-4xl leading-[1.05]", children: [
          "Le Projet ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "NANN-k" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-white/90", children: "L'épicentre culturel de la vallée du fleuve. Un complexe unique regroupant musée, espaces de création, de formation et de dialogue pour les artistes, porté par la vision de Baaba Maal." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16 md:py-24 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 md:order-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight", children: [
          "Baaba ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Maal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl font-serif italic text-muted-foreground mb-8 border-l-4 border-primary pl-4", children: "La voix du fleuve Sénégal et ambassadeur culturel de la région de Podor." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 font-serif text-muted-foreground text-lg leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Né le 12 novembre 1953 à Podor, Mamadou Aliou Bah, dit ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Baaba Maal" }),
            ", est l'un des artistes africains les plus reconnus internationalement. Fils d'un pêcheur de l'ethnie Haalpulaar, il a grandi immergé dans la richesse musicale et spirituelle de la vallée du fleuve Sénégal, bercé par les chants du Fouta et les rythmes des griots de sa ville natale."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Après des études musicales à Dakar, notamment à l'École Nationale des Arts, il poursuit sa formation au Conservatoire National de Musique de Paris, où il acquiert une maîtrise académique de la musique tout en restant profondément ancré dans ses racines. C'est là qu'il approfondit sa réflexion sur la valorisation des musiques traditionnelles d'Afrique de l'Ouest." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "De retour au Sénégal, Baaba Maal forme avec son ami d'enfance Mansour Seck, musicien non-voyant, le duo fondateur de sa carrière. Ensemble, ils sillonnent les villages du Fouta Toro, collectant chansons, mélodies et instruments traditionnels, travail ethnomusicologique d'une importance capitale pour la préservation du patrimoine musical Haalpulaar." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-2xl font-bold text-foreground mb-4 mt-10", children: "Son parcours discographique et ses distinctions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "La carrière discographique de Baaba Maal s'étend sur plus de quatre décennies avec une cinquantaine d'albums dont les plus emblématiques sont :" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-6 space-y-2 mb-6 marker:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Djam Leelii (1984)" }),
                " — collaboration intime avec Mansour Seck, considérée comme un chef-d'œuvre de la musique africaine acoustique"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Baayo (1991)" }),
                " — album qui l'impose sur la scène internationale"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Firin' in Fouta (1994)" }),
                " — production phare alliant sonorités traditionnelles et world music"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Missing You (Mi Yeewnii) (2001)" }),
                " — explorations électroniques"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Television (2009)" }),
                " — album engagé sur les mutations sociales"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "The River (2017)" }),
                " — retour aux sources, dédié au fleuve Sénégal"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Parmi ses distinctions : Prix Kora de la Meilleure Musique Africaine, nomination aux Grammy Awards, Ambassadeur de Bonne Volonté du PNUD, Chevalier de l'Ordre des Arts et Lettres de France. Il a collaboré avec Peter Gabriel, Youssou N'Dour, Damon Albarn (Gorillaz) et de nombreux artistes internationaux." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-2xl font-bold text-foreground mb-4 mt-10", children: "Son engagement pour la culture Pulaar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Au-delà de sa carrière artistique, Baaba Maal s'est imposé comme un défenseur infatigable de la culture et des langues du Fouta. Ses concerts, qu'ils se tiennent à Londres, New York ou Podor, portent invariablement la langue Pulaar et les sonorités du fleuve Sénégal. Il est co-fondateur du festival « Les Blues du Fleuve » à Podor, devenu un rendez-vous culturel incontournable qui rassemble artistes locaux et internationaux autour du patrimoine musical de la vallée." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Son projet de centre de recherche et de formation à Podor s'inscrit dans la continuité logique de cet engagement : ancrer dans sa ville natale une institution pérenne capable de former les générations futures aux musiques traditionnelles du Fouta Toro." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-1 md:order-2 md:sticky md:top-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-3/4 overflow-hidden border-4 border-background shadow-2xl relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: baabaImg, alt: "Portrait de Baaba Maal", className: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card/30 py-20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary mb-3", children: "Infrastructure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold", children: "Les 8 espaces du complexe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Le complexe NANN-k est structuré autour de 8 pôles majeurs conçus pour préserver, créer et transmettre le patrimoine culturel." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: espaces.map((espace, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border p-6 rounded-2xl hover:border-primary transition-colors group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-display text-primary/30 group-hover:text-primary mb-4 transition-colors", children: [
          "0",
          idx + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-2", children: espace.nom }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: espace.desc })
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-20 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary mb-3", children: "Patrimoine Sonore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold", children: "Instruments du Fouta Tooro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Explorez l'âme sonore du fleuve. Écoutez chaque instrument et découvrez son histoire." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: instruments.map((inst) => {
        const isPlaying = playing === inst.nom;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card overflow-hidden flex flex-col transition hover:border-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: instrumentsImg, alt: inst.nom, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
              background: "linear-gradient(180deg, transparent, oklch(0.15 0.04 250 / 0.85))"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 font-display text-5xl text-primary", children: inst.nom.split(" ").pop()?.charAt(0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex-1 flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold", children: inst.nom }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground flex-1", children: inst.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPlaying(isPlaying ? null : inst.nom), className: "mt-5 inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition", children: [
              isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 14, fill: "currentColor" }),
              isPlaying ? "Lecture en cours…" : "Écouter le son"
            ] })
          ] })
        ] }, inst.nom);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b-2 border-foreground pb-4 mb-8 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold uppercase tracking-tight", children: "Actualités" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground hidden md:inline-flex capitalize", children: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "lg:col-span-8 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blues-du-fleuve", className: "block relative overflow-hidden aspect-video mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: baabaImg, alt: "Baaba Maal", className: "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1", children: "Culture & Société" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                " Il y a 2 heures"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Par La Rédaction" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blues-du-fleuve", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold leading-[1.1] mb-4 group-hover:text-primary transition-colors text-foreground", children: [
              "Le Festival Blues du Fleuve prépare une",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "16ème édition" }),
              " historique"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-6 font-serif", children: "« Les Rives de l'Harmonie » : c'est le thème choisi cette année par l'artiste Baaba Maal pour célébrer la culture, la sécurité, l'environnement et la solidarité. Un événement majeur pour le rayonnement international de Podor et de toute la région." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blues-du-fleuve", className: "inline-flex items-center text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors border-b border-foreground hover:border-primary pb-1", children: [
              "Lire l'article complet ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "ml-1" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 flex flex-col gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold border-b border-border pb-2 uppercase text-foreground", children: "En Continu" }),
          articles.map((article, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex flex-col gap-3 pb-6 border-b border-border last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: article.to, className: "block overflow-hidden aspect-video mb-1 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.img, alt: article.title, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 bg-background text-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-sm", children: article.category })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                " ",
                article.date
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: article.to, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold leading-snug group-hover:text-primary transition-colors text-foreground", children: article.title }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 line-clamp-2 font-serif", children: article.excerpt })
            ] })
          ] }, idx))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted border-y border-border py-16 mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10 border-b-2 border-foreground pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-bold uppercase tracking-tight flex items-center gap-3 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary w-3 h-8 inline-block" }),
          "Dossier Spécial : L'Impact Nannka"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "text-sm font-semibold text-foreground hover:text-primary hidden sm:flex items-center uppercase tracking-wider text-[11px]", children: [
          "Voir tout le dossier ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "ml-1" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 md:order-1 bg-background p-8 border border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block", children: "Analyse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-bold mb-4 text-foreground leading-tight", children: "Une stratégie de développement local ambitieuse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 font-serif text-lg leading-relaxed", children: "Le projet Nannka ne se limite pas à l'événementiel. À travers ses trois piliers (Le Festival, Nannka TV, et le Centre Culturel), il vise des objectifs concrets pour la période 2025-2026." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [{
            label: "Intégration Sociale",
            value: 95
          }, {
            label: "Impact Économique Local",
            value: 80
          }, {
            label: "Préservation Environnementale",
            value: 75
          }].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                stat.value,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary", style: {
              width: `${stat.value}%`
            } }) })
          ] }, stat.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-1 md:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-4/3 overflow-hidden border-4 border-background shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fleuveImg, alt: "Le Fleuve Sénégal", className: "w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-foreground text-background p-10 md:p-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-10 w-10 text-primary mb-4 mx-auto md:mx-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold mb-3", children: "La Lettre de l'Éditeur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-background/70 font-serif leading-relaxed", children: "Recevez chaque semaine une sélection de nos meilleurs articles, décryptages et reportages concernant le développement de la vallée." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
        newsletterStatus === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-600/20 border border-emerald-400/40 rounded-md px-5 py-4 text-sm text-emerald-300 font-medium", children: [
          "✓ ",
          newsletterMsg
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex flex-col gap-3", onSubmit: handleNewsletter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: newsletterEmail, onChange: (e) => setNewsletterEmail(e.target.value), placeholder: "Votre adresse email", className: "w-full bg-background text-foreground border-none px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary rounded-none" }),
          newsletterStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-xs", children: newsletterMsg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: newsletterStatus === "loading", className: "bg-gold text-foreground font-bold uppercase tracking-widest px-6 py-4 text-sm hover:opacity-90 transition disabled:opacity-60", children: newsletterStatus === "loading" ? "Inscription en cours..." : "S'abonner" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-background/50 mt-4 text-center md:text-left uppercase tracking-wider", children: "Votre email est sécurisé." })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
