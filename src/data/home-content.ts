export const galleryImages = [
  { src: "/gal1.webp", alt: "Concert", objectPosition: "top" },
  { src: "/gal2.webp", alt: "Exposition", objectPosition: "top" },
  { src: "/gal3.webp", alt: "Conférence", objectPosition: "top" },
  { src: "/gal4.webp", alt: "Master Class", objectPosition: "top" },
  { src: "/gal5.webp", alt: "Défilé de Mode", objectPosition: "top" },
];

export const centerFilmstripImages = [
  { src: "/centre-culturel.webp", alt: "The Village — Centre Culturel de Podor", tag: "Architecture & Lieu" },
  { src: "/centre-podor.webp", alt: "Espaces de vie au cœur de Podor", tag: "Vie du Centre" },
  { src: "/pirogues.webp", alt: "Rives du Fleuve Sénégal à Podor", tag: "Vallée du Fleuve" },
  { src: "/gal1.webp", alt: "Concerts & Performances Live", tag: "Scène Musicale" },
  { src: "/gal2.webp", alt: "Expositions & Savoir-faire Halpulaar", tag: "Arts & Musée" },
  { src: "/gal3.webp", alt: "Conférences & Dialogues Citoyens", tag: "Débats & Idées" },
  { src: "/gal4.webp", alt: "Master Classes & Transmission", tag: "Formations NANN-K" },
  { src: "/gal5.webp", alt: "Création & Défilés de Mode", tag: "Création Contemporaine" },
];

export const articles = [
  {
    to: "/blues-du-fleuve" as const,
    category: "Événement Spécial · 27 Nov 2026",
    title: "En route vers les Blues du Fleuve : Grand Concert au Théâtre National Daniel Sorano",
    excerpt:
      "Baaba Maal et l'Ensemble Lyrique Traditionnel vous donnent rendez-vous le vendredi 27 novembre 2026 à 21h à Dakar, sous le parrainage du Dr. Cheikh Oumar Anne.",
    date: "À la Une",
    img: "/en-route-blues-du-fleuve.webp",
    featured: true,
  },
  {
    to: "/blues-du-fleuve" as const,
    category: "Festival International",
    title: "La 18ème édition des Blues du Fleuve annoncée sous le signe de l'intégration",
    excerpt:
      "Une édition historique qui réunira les cultures des quatre pays du fleuve pour célébrer l'unité, le patrimoine et la fraternité à Podor et Ndioum.",
    date: "Édition 18",
    img: "/festival-baba-maal.webp",
  },
  {
    to: "/nann-k-media" as const,
    category: "Patrimoine & Musée",
    title: "Nouvelle exposition permanente au Centre Culturel The Village de Podor",
    excerpt:
      "L'artisanat local, les instruments anciens du Fouta et les archives du fleuve mis à l'honneur dans une scénographie vivante au cœur de Podor.",
    date: "Patrimoine",
    img: "/centre-culturel.webp",
  },
];

export const instruments = [
  {
    nom: "Le Xalam (Hoddu)",
    subtitle: "Luth des Griots du Fouta",
    image: "/gal4.webp",
    tag: "Cordes Traditionnelles",
    desc: "Luth traditionnel à quatre ou cinq cordes, instrument emblématique des griots wolof et pulaar. Sa caisse sculptée dans un seul morceau de bois résonne d'histoires séculaires et accompagne les grandes épopées du fleuve.",
  },
  {
    nom: "Le Sabar",
    subtitle: "Percussion Royale & Messagère",
    image: "/gal1.webp",
    tag: "Percussions",
    desc: "Tambour joué à la main et à la baguette, central dans les cérémonies et rassemblements. Son langage rythmique codifié servait jadis à transmettre des messages d'un village à l'autre le long de la vallée.",
  },
  {
    nom: "Le Tama",
    subtitle: "Le Tambour Parlant",
    image: "/gal2.webp",
    tag: "Rythme & Mélodie",
    desc: "Petit tambour d'aisselle à tension variable, surnommé « tambour parlant ». Le musicien module sa hauteur sonore en pressant les cordes de cuir contre son corps pour imiter les intonations de la voix humaine.",
  },
];

