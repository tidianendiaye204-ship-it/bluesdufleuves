import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Music, Wrench, Sprout, HandMetal, Globe, ShoppingBag, Calendar, Monitor, Smartphone } from "lucide-react";
import centreImg from "@/assets/centre-podor.jpg";
import instrumentsImg from "@/assets/instruments.jpg";

export const Route = createFileRoute("/formations")({
  head: () => ({
    meta: [
      { title: "Formations & Recherche — The Village" },
      { name: "description", content: "Centre de Formation et de Recherche : musiques traditionnelles, lutherie, artisanat, poterie et savonnerie." },
    ],
  }),
  component: Formations,
});

const programmes = [
  {
    icon: Music,
    titre: "Pratique d'Instruments Traditionnels",
    desc: "Apprentissage et perfectionnement sur des instruments séculaires (hoddu, riti, tama, flûte peule), encadrés par des maîtres griots (cycles de 3 à 24 mois).",
  },
  {
    icon: Wrench,
    titre: "Lutherie Traditionnelle",
    desc: "Transmission des techniques ancestrales de fabrication, d'entretien et de restauration des instruments de musique locaux.",
  },
  {
    icon: BookOpen,
    titre: "Musicologie & Recherche",
    desc: "Initiation à l'ethnomusicologie, documentation, transcription et analyse des répertoires, avec des résidences ouvertes aux chercheurs.",
  },
  {
    icon: Monitor,
    titre: "Techniques d'Enregistrement",
    desc: "Formation aux techniques d'enregistrement et de production musicale au sein du studio professionnel du centre.",
  },
  {
    icon: HandMetal,
    titre: "Poterie & Céramique",
    desc: "Ateliers pratiques valorisant le travail de la terre cuite, selon les méthodes traditionnelles des artisans de la région du Fouta.",
  },
  {
    icon: Sprout,
    titre: "Savonnerie & Artisanat",
    desc: "Formation aux techniques de fabrication de savons artisanaux et autres produits locaux, favorisant l'entrepreneuriat et l'autonomie.",
  },
];

const composantesDigitales = [
  {
    icon: Globe,
    titre: "Musée virtuel (R2-1)",
    desc: "Une application et un site web proposant une galerie d'instruments, le parcours de Baaba Maal et des bornes interactives."
  },
  {
    icon: ShoppingBag,
    titre: "E-commerce instruments (R2-2)",
    desc: "Boutique en ligne intégrée pour vendre à l'international les instruments fabriqués au sein de notre atelier artisanal."
  },
  {
    icon: Calendar,
    titre: "Site du Festival « Blues du Fleuve » (R4-1)",
    desc: "Plateforme événementielle complète incluant billetterie, programmation, médias et informations pratiques."
  },
  {
    icon: BookOpen,
    titre: "Plateforme de formation (R3-1/R3-2)",
    desc: "Système de gestion des inscriptions, diffusion des cours en ligne et suivi pédagogique des apprenants."
  },
  {
    icon: Smartphone,
    titre: "Communication digitale",
    desc: "Déploiement d'une identité visuelle forte et animation des réseaux sociaux (TikTok, Instagram, etc.) pour faire rayonner le projet."
  }
];

function Formations() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="bg-muted border-b border-border py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={centreImg} alt="Texture" className="w-full h-full object-cover" />
        </div>
        <div className="container-page text-center max-w-4xl mx-auto relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold">Apprentissage & Transmission</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground">
            Formations & <span className="text-primary">Recherche</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed">
            Un centre d'excellence dédié à la préservation des savoir-faire et à la formation des jeunes de la région, des artisans et des chercheurs du monde entier.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Texte explicatif - Colonne de gauche (plus large) */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">Objectif Stratégique (OS3)</span>
              <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
                Création d'un Centre de Formation et de Recherche
              </h2>
              <div className="font-serif text-muted-foreground text-lg leading-relaxed space-y-6">
                <p>
                  L'un des piliers majeurs du projet est de réhabiliter à Podor un Centre de Recherche-Action et de Formation sur les Musiques Traditionnelles de la Vallée du Fleuve Sénégal. Son but : documenter, préserver, enseigner et promouvoir le patrimoine musical de la région pour en faire un pôle culturel de référence en Afrique de l'Ouest.
                </p>
                <p>
                  Ce pôle éducatif est ouvert aux jeunes de la région désireux de s'approprier leur culture, ainsi qu'aux chercheurs, ethnomusicologues et étudiants internationaux. Il propose un programme complet allant de la pratique d'instruments (hoddu, riti, tama, flûte peule) à la lutherie, en passant par l'artisanat local (poterie, savonnerie).
                </p>
                <p>
                  Des partenariats académiques stratégiques sont en cours de développement avec l'UCAD, l'Université Gaston Berger de Saint-Louis et des conservatoires européens pour garantir un enseignement de haut niveau et des résidences de recherche de qualité.
                </p>
              </div>
              
              <div className="aspect-video overflow-hidden border-4 border-background shadow-xl mt-10">
                 <img src={instrumentsImg} alt="Apprentissage des instruments" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>

            {/* Composantes Numériques */}
            <div className="mt-16">
              <h3 className="font-display text-2xl font-bold mb-8 uppercase tracking-tight text-foreground border-b border-border pb-4">
                Écosystème Numérique du Projet
              </h3>
              <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
                Le développement du centre s'accompagne d'une forte empreinte digitale pour assurer son rayonnement international et sa gestion moderne :
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {composantesDigitales.map((comp, idx) => (
                  <div key={idx} className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors group">
                    <comp.icon size={24} className="text-primary mb-4" />
                    <h4 className="font-bold text-sm mb-2 text-foreground">{comp.titre}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Liste des formations - Colonne de droite */}
          <div className="lg:col-span-5 bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm sticky top-32">
            <h3 className="font-display text-2xl font-bold mb-8 uppercase tracking-tight text-foreground border-b border-border pb-4">
              Nos Programmes (R3)
            </h3>
            
            <div className="space-y-8">
              {programmes.map((prog, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <prog.icon size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground mb-1">{prog.titre}</h4>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <button className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-primary/90 transition shadow-md">
                Accéder à la plateforme
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
