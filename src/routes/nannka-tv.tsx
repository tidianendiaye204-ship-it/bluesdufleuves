import { createFileRoute } from "@tanstack/react-router";
import { Play, X } from "lucide-react";
import { useState } from "react";
import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import fleuveImg from "@/assets/fleuve.jpg";

const heroPoster = fleuveImg;
const thumbs = [instrumentsImg, crowdImg, piroguesImg, fleuveImg];

export const Route = createFileRoute("/nannka-tv")({
  head: () => ({
    meta: [
      { title: "NANN-k TV Média — Conservatoire Numérique de la Vallée" },
      { name: "description", content: "Chaîne média dédiée au patrimoine : émissions, concerts live, archives festivals et musée virtuel." },
    ],
  }),
  component: NannkaTV,
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

function NannkaTV() {
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ name: string; id: string } | null>(null);

  return (
    <>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-page py-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-5">Patrimoine en images</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">
            NANN-k <span className="text-gradient-gold">TV Média</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Documentaires, concerts live et préservation des traditions de la vallée du fleuve.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-(--shadow-elegant)">
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
                  <p className="text-sm text-white/80 mt-1">Documentaire · 42 min</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container-page pb-16 space-y-16">
        {categories.map((cat) => (
          <div key={cat.titre}>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold">{cat.titre}</h2>
              <span className="text-sm text-muted-foreground hidden md:inline">Voir tout</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Nannka TV</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
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
    </>
  );
}
