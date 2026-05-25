import { U as reactExports, K as jsxRuntimeExports } from "./server-Car75JUd.js";
import { a as createLucideIcon, c as centreImg, L as Link, f as fleuveImg, g as soumettreNewsletter } from "./router-DTR2KcB1.js";
import { b as baabaImg } from "./baaba-maal-ChuGya_i.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DpQda5kq.js";
import "./types-DGfzljZx.js";
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
const __iconNode = [
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
const Landmark = createLucideIcon("landmark", __iconNode);
const baabaConcertImg = "/assets/baaba-maal-concert-CR8MFTc5.png";
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
function Home() {
  const [newsletterEmail, setNewsletterEmail] = reactExports.useState("");
  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await soumettreNewsletter({
        data: {
          email: newsletterEmail
        }
      });
      setNewsletterEmail("");
    } catch {
      console.error("Newsletter subscription error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-24 left-1/2 -translate-x-1/2 z-40 hidden md:block w-auto max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass px-6 py-2 rounded-full border border-white/20 shadow-elegant flex items-center gap-4 animate-reveal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0", children: "News" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-foreground/80 tracking-tight whitespace-nowrap overflow-hidden", children: "La 17ème édition des Blues du Fleuve annoncée sous le signe de l'intégration." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: centreImg, alt: "Centre Culturel de Podor", className: "h-full w-full object-cover scale-105 animate-float" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-[2px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page relative z-10 text-center pt-32 md:pt-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { size: 14, className: "text-primary" }),
          " Podor · Vallée du Fleuve"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "luxury-text text-6xl md:text-9xl text-white mb-8 animate-reveal [animation-delay:200ms]", children: [
          "The ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Village" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-medium leading-relaxed animate-reveal [animation-delay:400ms]", children: "L'épicentre culturel de la vallée du fleuve. Un complexe unique regroupant musée, espaces de création et de formation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col md:flex-row items-center justify-center gap-6 animate-reveal [animation-delay:600ms]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blues-du-fleuve", className: "rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white premium-button", children: "Découvrir le Festival" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all", children: "Nous Contacter" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "rotate-90 text-white/50", size: 24 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-32 border-b border-border/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-20 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative animate-reveal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: baabaConcertImg, alt: "Baaba Maal en concert", className: "h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 left-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-2 block", children: "Fondateur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "luxury-text text-3xl text-white uppercase", children: "Baaba Maal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-6 -right-6 w-36 md:w-44 aspect-[3/4] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)] border-4 border-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: baabaImg, alt: "Portrait Baaba Maal", className: "h-full w-full object-cover transition-transform duration-700 hover:scale-110" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-reveal [animation-delay:200ms]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block", children: "L'Âme du Projet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter", children: [
          "La Voix du ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Fleuve" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 text-muted-foreground text-lg leading-relaxed font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Mamadou Aliou Bah, dit ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Baaba Maal" }),
            ", est bien plus qu'un artiste. C'est le gardien d'un héritage, un bâtisseur qui a su transformer la richesse musicale du Fouta Toro en un levier de développement pour toute la vallée."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border-l-4 border-primary pl-8 italic text-foreground text-xl", children: `"The Village est l'aboutissement d'un rêve : offrir à la jeunesse de Podor un lieu où tradition et modernité se rencontrent pour créer l'avenir."` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blues-du-fleuve", className: "inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-primary hover:gap-5 transition-all", children: [
            "Lire la biographie complète ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-16 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 block", children: "Journal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "luxury-text text-5xl md:text-6xl uppercase tracking-tighter", children: [
            "Dernières ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Nouvelles" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/nann-k-media", className: "text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors", children: "Tout le Journal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-10", children: articles.map((article, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: article.to, className: "group flex flex-col h-full bg-background rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-all duration-500 animate-reveal", style: {
        animationDelay: `${idx * 150}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: article.img, alt: article.title, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-foreground", children: article.category }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4", children: article.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 mb-6 font-medium leading-relaxed", children: article.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary", children: [
            "Lire la suite ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
          ] })
        ] })
      ] }, article.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block", children: "Héritage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "luxury-text text-5xl md:text-7xl mb-8 uppercase tracking-tighter", children: [
          "Les Instruments du ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Fouta" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-12", children: instruments.map((inst, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 rounded-2xl border border-border/10 bg-muted/20 hover:bg-background hover:shadow-elegant transition-all duration-500 animate-reveal", style: {
        animationDelay: `${idx * 100}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "luxury-text text-2xl text-primary mb-6", children: inst.nom }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium leading-relaxed", children: inst.desc })
      ] }, inst.nom)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0a0908] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block", children: "S'abonner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "luxury-text text-4xl md:text-6xl text-white mb-8 uppercase tracking-tighter", children: [
          "La Lettre de ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "l'Éditeur" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mb-10 text-lg", children: "Recevez les actualités culturelles et les analyses du projet NANN-k." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex flex-col md:flex-row gap-4 max-w-md mx-auto", onSubmit: handleNewsletter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: newsletterEmail, onChange: (e) => setNewsletterEmail(e.target.value), placeholder: "votre@email.com", className: "flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white outline-none focus:ring-1 focus:ring-primary transition-all" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white premium-button", children: "S'abonner" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
