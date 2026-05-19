import { createFileRoute } from "@tanstack/react-router";
import baabaImg from "@/assets/baaba-maal.jpg";

export const Route = createFileRoute("/baaba-maal")({
  head: () => ({
    meta: [
      { title: "Biographie de Baaba Maal — The Village" },
      { name: "description", content: "Découvrez la biographie de Baaba Maal, l'enfant prodige de Podor et ambassadeur de la culture peule." },
    ],
  }),
  component: BaabaMaal,
});

function BaabaMaal() {
  return (
    <div className="bg-background min-h-screen">
      <section className="container-page py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-foreground uppercase tracking-tight">
              Baaba <span className="text-primary">Maal</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-serif italic text-muted-foreground mb-8 border-l-4 border-primary pl-4">
              La voix du fleuve Sénégal et ambassadeur culturel de la région de Podor.
            </h2>
            <div className="space-y-6 font-serif text-muted-foreground text-lg leading-relaxed">
              <p>
                Né à Podor, sur les rives du majestueux fleuve Sénégal, Baaba Maal est bien plus qu'une icône mondiale de la musique africaine. C'est l'âme d'une région, un fervent défenseur du développement de sa terre natale et de la culture peule.
              </p>
              <p>
                Son engagement dépasse largement le cadre artistique. À travers des initiatives structurantes comme le festival <strong>Les Blues du Fleuve</strong> et le vaste projet <strong>Nann-K</strong>, il œuvre inlassablement pour l'éducation, l'agriculture durable, et le rayonnement culturel de toute la vallée.
              </p>
              <p>
                Son héritage musical, profondément enraciné dans la tradition du Yéla, a su s'exporter et traverser les frontières. En collaborant avec des artistes internationaux, il a porté la voix et les espoirs de l'Afrique sur les plus grandes scènes du monde, tout en restant fidèle à ses racines à Podor.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
             <div className="aspect-3/4 overflow-hidden border-4 border-background shadow-2xl relative group">
                <img src={baabaImg} alt="Portrait de Baaba Maal" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
