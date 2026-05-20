import { S as reactExports, J as jsxRuntimeExports } from "./server-FC8ktUSg.js";
import { f as fleuveImg } from "./fleuve-Bopw1vrN.js";
import { c as createLucideIcon, M as Mail, s as soumettreContact } from "./router-lXS_SB42.js";
import { M as MapPin } from "./map-pin-DB8dEisq.js";
import { S as Send } from "./send-BhIXHSIf.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-DGfzljZx.js";
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    nom: "",
    email: "",
    sujet: "",
    message: ""
  });
  const [sent, setSent] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await soumettreContact({
        data: form
      });
      if (result.success) {
        setSent(true);
        setTimeout(() => {
          setForm({
            nom: "",
            email: "",
            sujet: "",
            message: ""
          });
          setSent(false);
        }, 5e3);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
      alert("Une erreur est survenue lors de l'envoi de votre message.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-muted border-b border-border py-16 md:py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fleuveImg, alt: "Texture", className: "w-full h-full object-cover grayscale" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center max-w-4xl mx-auto relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold", children: "Échangeons ensemble" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground", children: [
          "Nous ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Contacter" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl font-serif text-muted-foreground leading-relaxed", children: "Une question sur le festival, un projet de partenariat ou une demande d'information sur nos formations ? L'équipe des Blues du Fleuve est à votre écoute." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-primary mb-3 block font-bold", children: "Nos Coordonnées" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground", children: "L'équipe à Podor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-muted-foreground text-lg leading-relaxed mb-8", children: "Basé au cœur du Fouta Toro, le festival rayonne depuis Podor pour célébrer la culture Halpulaar." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 24 }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg text-foreground mb-1", children: "Adresse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-serif text-base leading-relaxed", children: [
                'Siège du Festival "Les Blues du Fleuve"',
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Quartier historique, Podor",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Région de Saint-Louis, Sénégal"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 24 }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg text-foreground mb-1", children: "Téléphone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-serif text-base leading-relaxed", children: [
                "+221 77 XXX XX XX",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "+221 33 XXX XX XX"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 24 }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg text-foreground mb-1", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-serif text-base leading-relaxed", children: [
                "contact@lesbluesdufleuve.sn",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "presse@lesbluesdufleuve.sn"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold mb-8 uppercase tracking-tight text-foreground border-b border-border pb-4", children: "Envoyez-nous un message" }),
        sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Message envoyé !" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-serif", children: "Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "nom", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Nom complet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "nom", type: "text", required: true, value: form.nom, onChange: (e) => setForm({
                ...form,
                nom: e.target.value
              }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all", placeholder: "Votre nom" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Adresse Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: form.email, onChange: (e) => setForm({
                ...form,
                email: e.target.value
              }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all", placeholder: "vous@exemple.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "sujet", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Sujet de votre message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "sujet", type: "text", required: true, value: form.sujet, onChange: (e) => setForm({
              ...form,
              sujet: e.target.value
            }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all", placeholder: "Ex: Demande de partenariat" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Votre message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", required: true, rows: 6, value: form.message, onChange: (e) => setForm({
              ...form,
              message: e.target.value
            }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none", placeholder: "Comment pouvons-nous vous aider ?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-primary/90 transition shadow-md disabled:opacity-70", children: loading ? "Envoi en cours..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }),
            "Envoyer le message"
          ] }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
