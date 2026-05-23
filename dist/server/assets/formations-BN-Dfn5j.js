import { U as reactExports, K as jsxRuntimeExports } from "./server-VmAMJTo_.js";
import { a as createLucideIcon, c as centreImg, e as soumettreInscription } from "./router-mrvA85g8.js";
import { i as instrumentsImg } from "./instruments-i2gV3lym.js";
import { S, a as Send } from "./index-B3SU5CFr.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DpQda5kq.js";
import "./types-DGfzljZx.js";
const __iconNode$5 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4", key: "wc6myp" }],
  ["path", { d: "M14 11V9a2 2 0 1 0-4 0v2", key: "94qvcw" }],
  ["path", { d: "M10 10.5V5a2 2 0 1 0-4 0v9", key: "m1ah89" }],
  [
    "path",
    {
      d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",
      key: "t1skq1"
    }
  ]
];
const HandMetal = createLucideIcon("hand-metal", __iconNode$4);
const __iconNode$3 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music = createLucideIcon("music", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
      key: "139s4v"
    }
  ],
  ["path", { d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4", key: "1dlkgp" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Sprout = createLucideIcon("sprout", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
      key: "1ngwbx"
    }
  ]
];
const Wrench = createLucideIcon("wrench", __iconNode);
const programmes = [{
  icon: Music,
  titre: "Pratique d'Instruments Traditionnels",
  desc: "Apprentissage et perfectionnement sur des instruments séculaires (hoddu, riti, tama, flûte peule), encadrés par des maîtres griots (cycles de 3 à 24 mois)."
}, {
  icon: Wrench,
  titre: "Lutherie Traditionnelle",
  desc: "Transmission des techniques ancestrales de fabrication, d'entretien et de restauration des instruments de musique locaux."
}, {
  icon: BookOpen,
  titre: "Musicologie & Recherche",
  desc: "Initiation à l'ethnomusicologie, documentation, transcription et analyse des répertoires, avec des résidences ouvertes aux chercheurs."
}, {
  icon: Monitor,
  titre: "Techniques d'Enregistrement",
  desc: "Formation aux techniques d'enregistrement et de production musicale au sein du studio professionnel du centre."
}, {
  icon: HandMetal,
  titre: "Poterie & Céramique",
  desc: "Ateliers pratiques valorisant le travail de la terre cuite, selon les méthodes traditionnelles des artisans de la région du Fouta."
}, {
  icon: Sprout,
  titre: "Savonnerie & Artisanat",
  desc: "Formation aux techniques de fabrication de savons artisanaux et autres produits locaux, favorisant l'entrepreneuriat et l'autonomie."
}];
function Formations() {
  const [form, setForm] = reactExports.useState({
    prenom: "",
    nom: "",
    email: "",
    tel: "",
    formation: "",
    motivation: ""
  });
  const [sent, setSent] = reactExports.useState(false);
  const [turnstileToken, setTurnstileToken] = reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert("Veuillez valider le captcha.");
      return;
    }
    try {
      const result = await soumettreInscription({
        data: form
      });
      if (result.success) {
        setSent(true);
        setTimeout(() => {
          setForm({
            prenom: "",
            nom: "",
            email: "",
            tel: "",
            formation: "",
            motivation: ""
          });
          setSent(false);
        }, 5e3);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur est survenue lors de l'envoi de votre candidature.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-muted border-b border-border py-16 md:py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: centreImg, alt: "Texture", className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page text-center max-w-4xl mx-auto relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold", children: "Apprentissage & Transmission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground", children: [
          "Formations & ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Recherche" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl font-serif text-muted-foreground leading-relaxed", children: "Un centre d'excellence dédié à la préservation des savoir-faire et à la formation des jeunes de la région, des artisans et des chercheurs du monde entier." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-primary mb-3 block font-bold", children: "Objectif Stratégique (OS3)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground", children: "Création d'un Centre de Formation et de Recherche" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-serif text-muted-foreground text-lg leading-relaxed space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "L'un des piliers majeurs du projet est de réhabiliter à Podor un Centre de Recherche-Action et de Formation sur les Musiques Traditionnelles de la Vallée du Fleuve Sénégal. Son but : documenter, préserver, enseigner et promouvoir le patrimoine musical de la région pour en faire un pôle culturel de référence en Afrique de l'Ouest." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ce pôle éducatif est ouvert aux jeunes de la région désireux de s'approprier leur culture, ainsi qu'aux chercheurs, ethnomusicologues et étudiants internationaux. Il propose un programme complet allant de la pratique d'instruments (hoddu, riti, tama, flûte peule) à la lutherie, en passant par l'artisanat local (poterie, savonnerie)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Des partenariats académiques stratégiques sont en cours de développement avec l'UCAD, l'Université Gaston Berger de Saint-Louis et des conservatoires européens pour garantir un enseignement de haut niveau et des résidences de recherche de qualité." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video overflow-hidden border-4 border-background shadow-xl mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: instrumentsImg, alt: "Apprentissage des instruments", className: "w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm sticky top-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold mb-8 uppercase tracking-tight text-foreground border-b border-border pb-4", children: "Nos Programmes (R3)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: programmes.map((prog, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(prog.icon, { size: 20 }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-base text-foreground mb-1", children: prog.titre }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-serif text-sm leading-relaxed", children: prog.desc })
          ] })
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 pt-8 border-t border-border text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#inscription", className: "w-full inline-block bg-primary text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-primary/90 transition shadow-md", children: "S'inscrire à une formation" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "inscription", className: "container-page py-20 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-primary mb-3 block font-bold", children: "Rejoindre le Centre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground", children: "Formulaire d'inscription" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-serif text-muted-foreground text-lg", children: "Prêt(e) à développer vos talents ? Remplissez ce formulaire pour soumettre votre candidature à l'un de nos programmes de formation." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Candidature envoyée !" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-serif", children: "Merci de votre intérêt. Notre équipe pédagogique va examiner votre demande et vous contactera très prochainement." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "prenom", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Prénom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "prenom", type: "text", required: true, value: form.prenom, onChange: (e) => setForm({
              ...form,
              prenom: e.target.value
            }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all", placeholder: "Votre prénom" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "nom", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Nom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "nom", type: "text", required: true, value: form.nom, onChange: (e) => setForm({
              ...form,
              nom: e.target.value
            }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all", placeholder: "Votre nom" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Adresse Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all", placeholder: "vous@exemple.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "tel", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Téléphone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "tel", type: "tel", required: true, value: form.tel, onChange: (e) => setForm({
              ...form,
              tel: e.target.value
            }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all", placeholder: "+221 XX XXX XX XX" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "formation", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Programme de formation souhaité" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "formation", required: true, value: form.formation, onChange: (e) => setForm({
            ...form,
            formation: e.target.value
          }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Sélectionnez une formation..." }),
            programmes.map((prog, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: prog.titre, children: prog.titre }, idx))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "motivation", className: "text-sm font-bold uppercase tracking-wider text-foreground", children: "Vos motivations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "motivation", required: true, rows: 5, value: form.motivation, onChange: (e) => setForm({
            ...form,
            motivation: e.target.value
          }), className: "w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none", placeholder: "Expliquez-nous brièvement pourquoi vous souhaitez rejoindre ce programme..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(S, { siteKey: "1x00000000000000000000AA", onSuccess: (token) => setTurnstileToken(token) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:opacity-90 transition shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }),
          "Soumettre ma candidature"
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  Formations as component
};
