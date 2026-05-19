import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Music, Wrench, Sprout, HandMetal } from "lucide-react";
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
    desc: "Apprentissage et perfectionnement sur des instruments séculaires tels que le Xalam, le Sabar, la Tama et la Kora, encadrés par des maîtres griots.",
  },
  {
    icon: Wrench,
    titre: "Lutherie Traditionnelle",
    desc: "Transmission des techniques ancestrales de fabrication, d'entretien et de restauration des instruments de musique locaux.",
  },
  {
    icon: BookOpen,
    titre: "Musicologie & Recherche",
    desc: "Un espace académique dédié à l'étude, la collecte et l'analyse du patrimoine musical de la vallée, ouvert aux chercheurs nationaux et internationaux.",
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
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Texte explicatif */}
          <div>
            <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
              Création d'un Centre de Formation et de Recherche
            </h2>
            <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
              Le projet Nann-k s'engage profondément dans la transmission du patrimoine à travers l'établissement d'un programme pédagogique complet. Notre centre a pour vocation de devenir le cœur battant de l'apprentissage des pratiques traditionnelles dans la vallée du fleuve Sénégal.
            </p>
            <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
              Ce pôle éducatif est ouvert aux jeunes de la région désireux de s'approprier leur culture, ainsi qu'aux chercheurs, ethnomusicologues et étudiants internationaux souhaitant étudier la richesse de notre patrimoine immatériel et matériel.
            </p>
            
            <div className="aspect-video overflow-hidden border-4 border-background shadow-xl mt-10">
               <img src={instrumentsImg} alt="Apprentissage des instruments" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>

          {/* Liste des formations */}
          <div className="bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm">
            <h3 className="font-display text-2xl font-bold mb-8 uppercase tracking-tight text-foreground border-b border-border pb-4">
              Nos Programmes
            </h3>
            
            <div className="space-y-8">
              {programmes.map((prog, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <prog.icon size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground mb-2">{prog.titre}</h4>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <button className="bg-primary text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-primary/90 transition shadow-md">
                S'inscrire à un programme
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
