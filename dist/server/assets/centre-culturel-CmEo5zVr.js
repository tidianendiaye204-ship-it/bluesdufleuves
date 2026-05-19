import { P as reactExports, H as jsxRuntimeExports } from "./server-DQCQGl94.js";
import { c as centreImg } from "./centre-podor-ZV8xvsix.js";
import { i as instrumentsImg, P as Play } from "./instruments-BP6xbc3a.js";
import { c as createLucideIcon } from "./router-D4-rYBJG.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
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
const partenaires = ["Ministère de la Culture", "ASPT", "Elydia", "UNESCO", "OIF", "Conseil Départemental de Podor"];
function CentreCulturel() {
  const [playing, setPlaying] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-b border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: centreImg, alt: "Centre Culturel de Podor", className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
          background: "var(--gradient-hero)",
          opacity: 0.85
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-20 md:py-28 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { size: 14 }),
          " Podor · Vallée du Fleuve"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-bold max-w-4xl leading-[1.05]", children: [
          "Centre Culturel ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "de Podor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground", children: "L'épicentre des événements et un musée vivant pour le patrimoine populaire. Un espace de création, de formation et de dialogue pour les artistes et les chercheurs." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-primary mb-3", children: "Musée Virtuel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold", children: "Instruments traditionnels" }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "border-t border-border bg-card/30 py-16 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold", children: "Partenaires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Avec le soutien institutionnel de :" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-8 animate-[scroll_40s_linear_infinite] whitespace-nowrap", style: {
        animationName: "scroll-x"
      }, children: [...partenaires, ...partenaires].map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-24 min-w-[240px] items-center justify-center rounded-xl border border-border bg-background px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold text-muted-foreground", children: p }) }, i)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      ` })
  ] });
}
export {
  CentreCulturel as component
};
