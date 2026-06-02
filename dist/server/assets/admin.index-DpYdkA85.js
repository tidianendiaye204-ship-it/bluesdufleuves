import { L as jsxRuntimeExports } from "./server-DUqS4k7t.js";
import { R as Route } from "./router-CcYlegPB.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./styles-BTO9n2yM.js";
import "./types-DGfzljZx.js";
function AdminDashboard() {
  const {
    recentContacts,
    recentInscriptions
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold font-display uppercase tracking-tight", children: "Tableau de Bord" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl mb-4 border-b border-border pb-2", children: "Derniers Messages (Contact)" }),
        recentContacts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Aucun message pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: recentContacts.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: c.nom }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(c.dateEnvoi).toLocaleDateString("fr-FR") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: c.sujet }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: c.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${c.email}`, className: "text-primary hover:underline", children: c.email }) })
        ] }, c.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl mb-4 border-b border-border pb-2", children: "Inscriptions aux Formations" }),
        recentInscriptions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Aucune inscription pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: recentInscriptions.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              i.prenom,
              " ",
              i.nom
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(i.dateInscription).toLocaleDateString("fr-FR") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary mb-1", children: i.formation }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: i.motivation }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${i.email}`, className: "text-primary hover:underline", children: i.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: i.tel })
          ] })
        ] }, i.id)) })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
