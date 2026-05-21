import { U as reactExports, K as jsxRuntimeExports } from "./server-co7iUJes.js";
import { i as instrumentsImg } from "./instruments-i2gV3lym.js";
import { p as piroguesImg } from "./pirogues-BR-IZ-pT.js";
import { f as fleuveImg, b as crowdImg, X } from "./router-BBT351A8.js";
import { P as Play } from "./play-BjRA7XZi.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-DLNE6-nO.js";
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
function NannkaTV() {
  const [isHeroPlaying, setIsHeroPlaying] = reactExports.useState(false);
  const [activeVideo, setActiveVideo] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border", style: {
      background: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-16 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary mb-5", children: "Patrimoine en images" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl font-bold", children: [
        "NANN-k ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "TV Média" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-lg text-muted-foreground", children: "Documentaires, concerts live et préservation des traditions de la vallée du fleuve." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl overflow-hidden border border-border bg-card shadow-(--shadow-elegant)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video relative flex items-center justify-center overflow-hidden bg-black", children: isHeroPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { className: "absolute inset-0 w-full h-full border-0", src: "https://www.youtube.com/embed/No0IoqGSiLw?autoplay=1", title: "Podor, mémoire vivante du fleuve", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroPoster, alt: "En vedette", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsHeroPlaying(true), "aria-label": "Lecture", className: "relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-(--shadow-glow) hover:scale-105 transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 28, className: "ml-1", fill: "currentColor" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-black/90 to-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-primary mb-2", children: "En vedette" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-white", children: "Podor, mémoire vivante du fleuve" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 mt-1", children: "Documentaire · 42 min" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-16 space-y-16", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold", children: cat.titre }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground hidden md:inline", children: "Voir tout" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: cat.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { onClick: () => setActiveVideo({
        name: item.name,
        id: item.id
      }), className: "group rounded-xl overflow-hidden border border-border bg-card transition hover:border-primary cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbs[i % thumbs.length], alt: item.name, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 32, className: "text-primary-foreground", fill: "currentColor" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Nannka TV" })
        ] })
      ] }, item.name)) })
    ] }, cat.titre)) }),
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
  NannkaTV as component
};
