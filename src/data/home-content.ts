import fleuveImg from "@/assets/fleuve.jpg";
import gal1Img from "@/assets/gal1.jpg";
import gal2Img from "@/assets/gal2.jpg";
import gal3Img from "@/assets/gal3.jpg";
import gal4Img from "@/assets/gal4.jpg";
import gal5Img from "@/assets/gal5.jpg";

export const galleryImages = [
  { src: gal1Img, alt: "Concert" },
  { src: gal2Img, alt: "Exposition" },
  { src: gal3Img, alt: "Conférence" },
  { src: gal4Img, alt: "Master Class" },
  { src: gal5Img, alt: "Défilé de Mode" },
];

export const articles = [
  {
    to: "/blues-du-fleuve" as const,
    category: "À la Une",
    title: "La 17ème édition des Blues du Fleuve annoncée sous le signe de l'intégration",
    excerpt:
      "Une édition historique qui réunira les cultures des quatre pays du fleuve pour célébrer l'unité et la fraternité.",
    date: "Aujourd'hui",
    img: "/festival baba maal.jpg",
    featured: true,
  },
  {
    to: "/nannka-tv" as const,
    category: "Médias",
    title: "NANN-k TV : Archives et documentaires",
    excerpt:
      "Découvrez des archives inédites et des documentaires exclusifs retraçant l'histoire fascinante de la vallée du fleuve Sénégal.",
    date: "Aujourd'hui",
    img: fleuveImg,
  },
  {
    to: "/nann-k-media" as const,
    category: "Patrimoine",
    title: "Nouvelle exposition au Centre Culturel de Podor",
    excerpt:
      "L'artisanat local mis à l'honneur dans une rétrospective exceptionnelle au cœur de la ville, attirant de nombreux visiteurs.",
    date: "Hier",
    img: "/centre culturel.jpg",
  },
];

export const instruments = [
  {
    nom: "Le Xalam",
    desc: "Luth traditionnel à quatre ou cinq cordes, instrument emblématique des griots wolof et pulaar. Sa caisse sculptée dans un seul morceau de bois résonne d'histoires séculaires.",
  },
  {
    nom: "Le Sabar",
    desc: "Tambour wolof joué à la main et à la baguette, central dans les cérémonies. Son langage rythmique servait jadis à transmettre des messages à travers les villages.",
  },
  {
    nom: "La Tama",
    desc: "Petit tambour d'aisselle à tension variable, surnommé « tambour parlant ». Le musicien module sa voix en pressant les cordes contre son corps.",
  },
];
