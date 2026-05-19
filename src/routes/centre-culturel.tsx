import { createFileRoute } from "@tanstack/react-router";
import { Play, Pause, Landmark } from "lucide-react";
import { useState } from "react";
import centreImg from "@/assets/centre-podor.jpg";
import instrumentsImg from "@/assets/instruments.jpg";

export const Route = createFileRoute("/centre-culturel")({
  head: () => ({
    meta: [
      { title: "Centre Culturel de Podor — The Village" },
      { name: "description", content: "Le Centre Culturel de Podor : musée vivant, scène d'événements et cœur du projet Nannka." },
    ],
  }),
  component: CentreCulturel,
});

const instruments = [
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

const partenaires = [
  "Ministère de la Culture",
  "ASPT",
  "Elydia",
  "UNESCO",
  "OIF",
  "Conseil Départemental de Podor",
];

function CentreCulturel() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0">
          <img src={centreImg} alt="Centre Culturel de Podor" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.85 }} />
        </div>
        <div className="container-page py-20 md:py-28 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <Landmark size={14} /> Podor · Vallée du Fleuve
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold max-w-4xl leading-[1.05]">
            Centre Culturel <span className="text-gradient-gold">de Podor</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            L'épicentre des événements et un musée vivant pour le patrimoine populaire. Un espace de création, de formation et de dialogue pour les artistes et les chercheurs.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Musée Virtuel</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Instruments traditionnels</h2>
          <p className="mt-3 text-muted-foreground">
            Explorez l'âme sonore du fleuve. Écoutez chaque instrument et découvrez son histoire.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {instruments.map((inst) => {
            const isPlaying = playing === inst.nom;
            return (
              <article key={inst.nom} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col transition hover:border-primary">
                <div className="aspect-square relative overflow-hidden">
                  <img src={instrumentsImg} alt={inst.nom} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, oklch(0.15 0.04 250 / 0.85))" }} />
                  <div className="absolute bottom-4 left-4 font-display text-5xl text-primary">
                    {inst.nom.split(" ").pop()?.charAt(0)}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-semibold">{inst.nom}</h3>
                  <p className="mt-3 text-sm text-muted-foreground flex-1">{inst.desc}</p>
                  <button
                    onClick={() => setPlaying(isPlaying ? null : inst.nom)}
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                    {isPlaying ? "Lecture en cours…" : "Écouter le son"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-card/30 py-16 overflow-hidden">
        <div className="container-page mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Partenaires</h2>
          <p className="mt-2 text-sm text-muted-foreground">Avec le soutien institutionnel de :</p>
        </div>

        <div className="relative">
          <div className="flex gap-8 animate-[scroll_40s_linear_infinite] whitespace-nowrap"
            style={{
              animationName: "scroll-x",
            }}
          >
            {[...partenaires, ...partenaires].map((p, i) => (
              <div
                key={i}
                className="flex h-24 min-w-[240px] items-center justify-center rounded-xl border border-border bg-background px-8"
              >
                <span className="font-display text-lg font-semibold text-muted-foreground">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
