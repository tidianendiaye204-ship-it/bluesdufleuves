import { L as jsxRuntimeExports } from "./server-Ci9T_1RX.js";
import { a as createLucideIcon } from "./router-CauDO54G.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./styles-DAnF-_po.js";
import "./types-DGfzljZx.js";
const __iconNode = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode);
function Billetterie() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted border-b border-border py-16 md:py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 32 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tight text-foreground", children: [
        "Billetterie ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Officielle" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-serif max-w-2xl mx-auto", children: "Réservez vos pass pour la prochaine édition du festival Blues du Fleuve." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto p-8 border border-border bg-card rounded-3xl shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold font-display uppercase mb-4", children: "Ouverture Prochaine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "La billetterie n'est pas encore ouverte. L'intégration de notre partenaire de paiement sécurisé (PayDunya / Stripe) est en cours de finalisation." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: true, className: "w-full bg-primary/50 text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 rounded-full cursor-not-allowed", children: "Acheter un Pass" })
    ] }) })
  ] });
}
export {
  Billetterie as component
};
