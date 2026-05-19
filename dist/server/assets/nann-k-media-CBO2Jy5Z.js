import { P as reactExports, H as jsxRuntimeExports } from "./server-DQCQGl94.js";
import { P as Play, i as instrumentsImg } from "./instruments-BP6xbc3a.js";
import { c as crowdImg, p as piroguesImg } from "./festival-crowd-BvJ5twAQ.js";
import { f as fleuveImg } from "./fleuve-Bopw1vrN.js";
import { X } from "./router-D4-rYBJG.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const logoNannk = "/assets/logo-nannk-CsxIUls-.png";
const heroPoster = fleuveImg;
const thumbs = [instrumentsImg, crowdImg, piroguesImg, fleuveImg];
const categories = [{
  titre: "Émissions Culturelles",
  items: [{
    name: "Mémoires du fleuve",
    id: "No0IoqGSiLw"
  }, {
    name: "Paroles de griots",
    id: "V5RcwQAl-_g"
  }, {
    name: "Voix de Podor",
    id: "JuBhFrMD-G0"
  }, {
    name: "Récits pulaar",
    id: "Mig1P7pQMh0"
  }]
}, {
  titre: "Concerts Live",
  items: [{
    name: "Baaba Maal · Acoustique",
    id: "cGUML8xR5UU"
  }, {
    name: "Nuit Jolofbeats",
    id: "Qtm-Wry-8cc"
  }, {
    name: "Soirée Yéla",
    id: "uHHKBJBvvPg"
  }, {
    name: "Hommage à Mansour Seck",
    id: "yNgDR1cTi_I"
  }]
}, {
  titre: "Instruments Traditionnels",
  items: [{
    name: "Le Xalam",
    id: "wl-zb8FPvzo"
  }, {
    name: "Le Sabar",
    id: "V5RcwQAl-_g"
  }, {
    name: "La Tama",
    id: "JuBhFrMD-G0"
  }, {
    name: "La Kora",
    id: "No0IoqGSiLw"
  }]
}];
function NannkMedia() {
  const [isHeroPlaying, setIsHeroPlaying] = reactExports.useState(false);
  const [activeVideo, setActiveVideo] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted border-b border-border py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold", children: "Pôle Stratégique & Diffusion" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground", children: [
        "Nannka ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Media" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl font-serif text-muted-foreground leading-relaxed", children: "Le pôle central de communication, de production audiovisuelle et d'archivage numérique, associé à notre espace de diffusion Nannka TV." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-primary mb-3 block font-bold", children: "Le Bureau des Médias" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground", children: "Notre Mission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-muted-foreground mb-8 text-lg leading-relaxed", children: "Nann-K Media Office constitue l'organe nerveux du projet culturel global. Il centralise la production de contenus, assure la couverture médiatique des événements majeurs comme les Blues du Fleuve, et pilote la stratégie de relations publiques." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 font-serif text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block text-foreground mb-1 font-sans uppercase tracking-wider text-xs", children: "Production Audiovisuelle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Création de documentaires, reportages exclusifs, interviews et captations professionnelles de concerts." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block text-foreground mb-1 font-sans uppercase tracking-wider text-xs", children: "Communication Numérique" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Gestion dynamique des plateformes web, des réseaux sociaux et de la stratégie d'influence numérique." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block text-foreground mb-1 font-sans uppercase tracking-wider text-xs", children: "Archivage & Patrimoine" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Numérisation systématique et préservation rigoureuse du patrimoine culturel matériel et immatériel local." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-4/3 overflow-hidden border-4 border-background shadow-xl group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fleuveImg, alt: "Studio Media", className: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[180px_1fr] gap-8 items-center mb-12 bg-card border border-border p-8 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-40 rounded-2xl overflow-hidden bg-white border border-border/50 flex items-center justify-center p-2 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoNannk, alt: "Nannka TV Logo", className: "w-full h-full object-contain" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-primary mb-2 font-bold", children: "Espace de Diffusion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold uppercase tracking-tight", children: "Nannka TV" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 font-serif text-muted-foreground text-base leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "NannKa TV" }),
              " est le canal audiovisuel de The Village — voix du patrimoine musical de la vallée du Fleuve Sénégal. Documentaires, concerts en live, émissions culturelles, portraits de griots et masterclasses d'instruments traditionnels."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Disponible sur toutes les plateformes numériques, NannKa TV ambitionne d'être la mémoire vivante et diffusée du Fouta Toro — accessible depuis Podor comme depuis Paris, New York ou Dakar." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl overflow-hidden border border-border bg-card shadow-(--shadow-elegant) mb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video relative flex items-center justify-center overflow-hidden bg-black", children: isHeroPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { className: "absolute inset-0 w-full h-full border-0", src: "https://www.youtube.com/embed/No0IoqGSiLw?autoplay=1", title: "Podor, mémoire vivante du fleuve", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroPoster, alt: "En vedette", className: "absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsHeroPlaying(true), "aria-label": "Lecture", className: "relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-(--shadow-glow) hover:scale-105 transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 28, className: "ml-1", fill: "currentColor" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-black/90 to-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-primary mb-2", children: "En vedette" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-white", children: "Podor, mémoire vivante du fleuve" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 mt-1 font-serif", children: "Documentaire · 42 min" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-16", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6 border-b border-border pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold uppercase tracking-tight", children: cat.titre }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer hidden md:inline", children: "Voir tout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: cat.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { onClick: () => setActiveVideo({
          name: item.name,
          id: item.id
        }), className: "group rounded-xl overflow-hidden border border-border bg-card transition hover:border-primary cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbs[i % thumbs.length], alt: item.name, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 32, className: "text-primary-foreground", fill: "currentColor" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold truncate", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-serif", children: "Nannka TV" })
          ] })
        ] }, item.name)) })
      ] }, cat.titre)) })
    ] }),
    activeVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4", onClick: () => setActiveVideo(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveVideo(null), className: "absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition cursor-pointer", "aria-label": "Fermer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { className: "w-full h-full border-0", src: `https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`, title: activeVideo.name, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold font-display", children: activeVideo.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Nannka TV Média" })
      ] })
    ] }) })
  ] });
}
export {
  NannkMedia as component
};
