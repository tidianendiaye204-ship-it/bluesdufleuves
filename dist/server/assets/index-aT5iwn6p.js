import { H as jsxRuntimeExports } from "./server-DQCQGl94.js";
import { c as createLucideIcon, L as Link, M as Mail } from "./router-D4-rYBJG.js";
import { f as fleuveImg } from "./fleuve-Bopw1vrN.js";
import { b as baabaImg } from "./baaba-maal-CFblE9PW.js";
import { c as centreImg } from "./centre-podor-ZV8xvsix.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const articles = [{
  to: "/nann-k-media",
  category: "Médias",
  title: "Nannka TV lance son grand musée virtuel numérique",
  excerpt: "Découvrez des archives inédites et des documentaires exclusifs retraçant l'histoire fascinante de la vallée du fleuve Sénégal.",
  date: "Aujourd'hui",
  img: fleuveImg
}, {
  to: "/centre-culturel",
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
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground py-2 border-b border-border/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex flex-col md:flex-row items-center text-xs font-semibold tracking-wide gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-background text-primary px-3 py-1 rounded-sm uppercase animate-pulse shrink-0", children: "Flash Info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center md:text-left w-full leading-relaxed", children: "La 16ème édition des Blues du Fleuve annoncée sous le signe de l'intégration et de l'environnement. Découvrez le programme complet." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b-2 border-foreground pb-4 mb-8 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold uppercase tracking-tight", children: "À la une" }),
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
              "Le Festival Blues du Fleuve prépare une ",
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex flex-col gap-3", onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "Votre adresse email", className: "w-full bg-background text-foreground border-none px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary rounded-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "bg-primary text-primary-foreground font-bold uppercase tracking-widest px-6 py-4 text-sm hover:bg-primary/90 transition", children: "S'abonner" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-background/50 mt-4 text-center md:text-left uppercase tracking-wider", children: "Votre email est sécurisé." })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
