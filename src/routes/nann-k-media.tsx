import { createFileRoute } from "@tanstack/react-router";
import { Play, X } from "lucide-react";
import { useState } from "react";
import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import fleuveImg from "@/assets/fleuve.jpg";
import logoNannk from "@/assets/logo-nannk.png";

const heroPoster = fleuveImg;
const thumbs = [instrumentsImg, crowdImg, piroguesImg, fleuveImg];

export const Route = createFileRoute("/nann-k-media")({
  head: () => ({
    meta: [
      { title: "Nann-k — The Village" },
      { name: "description", content: "Nann-k : Pôle de production, communication et musée virtuel numérique de la Vallée." },
    ],
  }),
  component: NannkMedia,
});

const categories = [
  {
    titre: "Émissions Culturelles",
    items: [
      { name: "Mémoires du fleuve", id: "No0IoqGSiLw" },
      { name: "Paroles de griots", id: "V5RcwQAl-_g" },
      { name: "Voix de Podor", id: "JuBhFrMD-G0" },
      { name: "Récits pulaar", id: "Mig1P7pQMh0" },
    ],
  },
  {
    titre: "Concerts Live",
    items: [
      { name: "Baaba Maal · Acoustique", id: "cGUML8xR5UU" },
      { name: "Nuit Jolofbeats", id: "Qtm-Wry-8cc" },
      { name: "Soirée Yéla", id: "uHHKBJBvvPg" },
      { name: "Hommage à Mansour Seck", id: "yNgDR1cTi_I" },
    ],
  },
  {
    titre: "Instruments Traditionnels",
    items: [
      { name: "Le Xalam", id: "wl-zb8FPvzo" },
      { name: "Le Sabar", id: "V5RcwQAl-_g" },
      { name: "La Tama", id: "JuBhFrMD-G0" },
      { name: "La Kora", id: "No0IoqGSiLw" },
    ],
  },
];

function NannkMedia() {
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ name: string; id: string } | null>(null);

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section / Presentation */}
      <section className="bg-muted border-b border-border py-16 md:py-20">
        <div className="container-page text-center max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold">Pôle Stratégique & Diffusion</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground">
            <span className="text-primary">Nann-k</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed">
            Le pôle central de communication, de production audiovisuelle et d'archivage numérique, associé à notre espace de diffusion NANN-k TV.
          </p>
        </div>
      </section>

      {/* Media Office Mission */}
      <section className="container-page py-20 border-b border-border">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div>
             <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">Le Bureau</span>
             <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">Notre Mission</h2>
             <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
               Le pôle Nann-k constitue l'organe nerveux du projet culturel global. Il centralise la production de contenus, assure la couverture médiatique des événements majeurs comme les Blues du Fleuve, et pilote la stratégie de relations publiques.
             </p>
             <div className="space-y-6 font-serif text-muted-foreground">
               <div className="flex items-start gap-4">
                 <span className="bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]"></span>
                 <div>
                   <strong className="block text-foreground mb-1 font-sans uppercase tracking-wider text-xs">Production Audiovisuelle</strong>
                   <span className="text-sm">Création de documentaires, reportages exclusifs, interviews et captations professionnelles de concerts.</span>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <span className="bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]"></span>
                 <div>
                   <strong className="block text-foreground mb-1 font-sans uppercase tracking-wider text-xs">Communication Numérique</strong>
                   <span className="text-sm">Gestion dynamique des plateformes web, des réseaux sociaux et de la stratégie d'influence numérique.</span>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <span className="bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]"></span>
                 <div>
                   <strong className="block text-foreground mb-1 font-sans uppercase tracking-wider text-xs">Archivage & Patrimoine</strong>
                   <span className="text-sm">Numérisation systématique et préservation rigoureuse du patrimoine culturel matériel et immatériel local.</span>
                 </div>
               </div>
             </div>
           </div>
           <div>
              <div className="aspect-4/3 overflow-hidden border-4 border-background shadow-xl group">
                <img src={fleuveImg} alt="Studio Media" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
              </div>
           </div>
        </div>
      </section>

      {/* NANN-k TV Player Section */}
      <section className="container-page py-20">
        <div className="grid md:grid-cols-[180px_1fr] gap-8 items-center mb-12 bg-card border border-border p-8 rounded-3xl shadow-sm">
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-2xl overflow-hidden bg-white border border-border/50 flex items-center justify-center p-2 shadow-sm">
              <img src={logoNannk} alt="NANN-k TV Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">Espace de Diffusion</span>
              <h2 className="font-display text-4xl font-bold uppercase tracking-tight">NANN-k TV</h2>
            </div>
            <div className="space-y-4 font-serif text-muted-foreground text-base leading-relaxed">
              <p>
                <strong>NANN-k TV</strong> est le canal audiovisuel de The Village — voix du patrimoine musical de la vallée du Fleuve Sénégal. Documentaires, concerts en live, émissions culturelles, portraits de griots et masterclasses d'instruments traditionnels.
              </p>
              <p>
                Disponible sur toutes les plateformes numériques, NANN-k TV ambitionne d'être la mémoire vivante et diffusée du Fouta Toro — accessible depuis Podor comme depuis Paris, New York ou Dakar.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-(--shadow-elegant) mb-20">
          <div className="aspect-video relative flex items-center justify-center overflow-hidden bg-black">
            {isHeroPlaying ? (
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/No0IoqGSiLw?autoplay=1"
                title="Podor, mémoire vivante du fleuve"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img src={heroPoster} alt="En vedette" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <button
                  onClick={() => setIsHeroPlaying(true)}
                  aria-label="Lecture"
                  className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-(--shadow-glow) hover:scale-105 transition cursor-pointer"
                >
                  <Play size={28} className="ml-1" fill="currentColor" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-black/90 to-transparent">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">En vedette</p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Podor, mémoire vivante du fleuve</h2>
                  <p className="text-sm text-white/80 mt-1 font-serif">Documentaire · 42 min</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <div key={cat.titre}>
              <div className="flex items-end justify-between mb-6 border-b border-border pb-2">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{cat.titre}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer hidden md:inline">Voir tout</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cat.items.map((item, i) => (
                  <article
                    key={item.name}
                    onClick={() => setActiveVideo({ name: item.name, id: item.id })}
                    className="group rounded-xl overflow-hidden border border-border bg-card transition hover:border-primary cursor-pointer"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img src={thumbs[i % thumbs.length]} alt={item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                        <Play size={32} className="text-primary-foreground" fill="currentColor" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-semibold truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 font-serif">Nannka TV</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition cursor-pointer"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold font-display">{activeVideo.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Nannka TV Média</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
