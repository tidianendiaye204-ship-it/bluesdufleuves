import { createFileRoute } from "@tanstack/react-router";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { createSeoMeta } from "@/lib/seo";
import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import fleuveImg from "@/assets/fleuve.jpg";
import logoNannk from "@/assets/logo-nannk-new.jpg";
import agri1Img from "@/assets/nann-k-agri1.jpg";
import agri2Img from "@/assets/nann-k-agri2.jpg";
import agri3Img from "@/assets/nann-k-agri3.jpg";
import agri4Img from "@/assets/nann-k-agri4.jpg";
import agri5Img from "@/assets/nann-k-agri5.jpg";
import agri6Img from "@/assets/nann-k-agri6.jpg";
import agri7Img from "@/assets/nann-k-agri7.jpg";
import agri8Img from "@/assets/nann-k-agri8.jpg";

const heroPoster = fleuveImg;
const thumbs = [instrumentsImg, crowdImg, piroguesImg, fleuveImg];

export const Route = createFileRoute("/nann-k-media")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "NANN-k & The Village | Mouvement Culturel & Économique Podor",
      description:
        "Découvrez NANN-k et The Village, l'initiative de Baaba Maal pour la culture, l'agriculture et le développement de la vallée du fleuve Sénégal.",
      ogTitle: "NANN-k & The Village - Baaba Maal Podor",
      ogDescription:
        "NANN-k et The Village : mouvement citoyen pour l'émergence sociale et économique à travers l'agriculture, l'artisanat et la culture Halpulaar.",
      ogImage: logoNannk,
      keywords:
        "The Village, NANN-k, Baaba Maal, agriculture, artisanat, technologies, développement, Sénégal, Afrique, Podor, émergence économique",
      canonical: "https://lesbluesdufleuve.sn/nann-k-media",
    });
    return { meta, links };
  },
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
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold">
            Mouvement Culturel & Économique
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-foreground">
            <span className="text-primary">NANN-K</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed">
            Le mouvement "NANN-K" est né de la volonté de l'artiste Baaba MAAL de répondre par une
            participation effective à l'invitation des plus hautes autorités à la réalisation de la
            croissance de l'économie, et donc le progrès social, au Sénégal puis progressivement en
            Afrique surtout au Sud du Sahara. Cette région concentre les États à faible revenu de
            l'Afrique de l'Ouest, ce qui représente un empêchement pour accélérer la croissance,
            éliminer la pauvreté et la faim dans les pays.
          </p>
        </div>
      </section>

      {/* Media Office Mission */}
      <section className="container-page py-20 border-b border-border">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              Le Fondateur
            </span>
            <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
              Notre Mission
            </h2>
            <p className="font-serif text-muted-foreground mb-6 text-lg leading-relaxed">
              NANNK apporte une nouvelle dynamique active et citoyenne de promotion de l'Agriculture
              au sens large, l'Artisanat et les Technologies modernes (TIC). Ces secteurs à fort
              potentiel offrent des conditions d'un plein épanouissement et d'une participation
              effective à la construction du tissu économique.
            </p>
            <p className="font-serif text-muted-foreground mb-6 text-lg leading-relaxed">
              Dans le langage Peulh, "NANN-K" est une expression populaire qui est utilisée pour la
              plaisanterie et provient du verbe «nanni» c'est à dire Ouïr. C'est pour cette raison
              que le mouvement possède un bras culturel constitué par une troupe folklorique afin de
              faire entendre et comprendre les opérations du développement, dans la musique et la
              mobilisation.
            </p>
            <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
              Donc, le mouvement "NANN-K" se veut asseoir une conscientisation, motivation
              médiatisée pour l'application par responsabilité citoyenne, du triptyque «Culture –
              Savoir – Travail » afin de réaliser le développement de l'Agriculture, l'Artisanat et
              les Technologies en faveur d'une réelle Emergence sociale et économique.
            </p>
            <div className="space-y-6 font-serif text-muted-foreground">
              <div className="flex items-start gap-4">
                <span className="bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]"></span>
                <div>
                  <strong className="block text-foreground mb-1 font-sans uppercase tracking-wider text-xs">
                    Agriculture
                  </strong>
                  <span className="text-sm">
                    Promotion de l'agriculture au sens large pour la sécurité alimentaire et la
                    croissance économique.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]"></span>
                <div>
                  <strong className="block text-foreground mb-1 font-sans uppercase tracking-wider text-xs">
                    Artisanat
                  </strong>
                  <span className="text-sm">
                    Valorisation du savoir-faire artisanal local et création d'opportunités
                    économiques.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]"></span>
                <div>
                  <strong className="block text-foreground mb-1 font-sans uppercase tracking-wider text-xs">
                    Technologies (TIC)
                  </strong>
                  <span className="text-sm">
                    Intégration des technologies modernes pour accélérer le développement et
                    l'innovation.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="aspect-4/3 overflow-hidden border-4 border-border shadow-xl group rounded-2xl bg-white flex items-center justify-center p-8">
              <img
                src={logoNannk}
                alt="Logo NANN-K"
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Context & Justification Section */}
      <section className="container-page py-20 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Contexte & Justification
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            Pourquoi NANN-K ?
          </h2>
          <div className="prose prose-lg max-w-none space-y-6 font-serif text-muted-foreground">
            <p>
              Le développement social et économique en Afrique fait face à des défis majeurs. Le
              manque d'initiatives citoyennes et de réflexions approfondies sur les stratégies pour
              un avenir meilleur constitue un obstacle important.
            </p>
            <p>
              La réponse insuffisante des gouvernements à la demande d'emploi, à la création de
              richesses et à la sécurité alimentaire nécessite une mobilisation citoyenne accrue.
            </p>
            <p>
              Avec la fin de l'initiative "Afrique 2015" et des Objectifs du Millénaire pour le
              Développement, de nombreux émigrants sont contraints de retourner dans leurs pays
              d'origine en raison des crises européennes.
            </p>
            <p>
              Le Sénégal a décidé de faire de l'agriculture un moteur de croissance, mais les
              mesures institutionnelles ralentissent sa mise en œuvre. La population a besoin
              d'alternatives, notamment pour accéder à des informations utiles et au financement,
              acquérir des équipements et des intrants, et bénéficier de renforcement des capacités.
            </p>
          </div>
        </div>
      </section>

      {/* Agriculture Images Section */}
      <section className="container-page py-20 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Agriculture NANN-K
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            Nos Projets Agricoles
          </h2>
          <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
            Découvrez nos initiatives agricoles dans la vallée du fleuve Sénégal.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri1Img}
                alt="Agriculture NANN-K 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri2Img}
                alt="Agriculture NANN-K 2"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri3Img}
                alt="Agriculture NANN-K 3"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri4Img}
                alt="Agriculture NANN-K 4"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri5Img}
                alt="Agriculture NANN-K 5"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri6Img}
                alt="Agriculture NANN-K 6"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri7Img}
                alt="Agriculture NANN-K 7"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border group">
              <img
                src={agri8Img}
                alt="Agriculture NANN-K 8"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
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
              <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">
                Espace de Diffusion
              </span>
              <h2 className="font-display text-4xl font-bold uppercase tracking-tight">
                NANN-k TV
              </h2>
            </div>
            <div className="space-y-4 font-serif text-muted-foreground text-base leading-relaxed">
              <p>
                <strong>NANN-k TV</strong> est le canal audiovisuel de The Village — voix du
                patrimoine musical de la vallée du Fleuve Sénégal. Documentaires, concerts en live,
                émissions culturelles, portraits de griots et masterclasses d'instruments
                traditionnels.
              </p>
              <p>
                Disponible sur toutes les plateformes numériques, NANN-k TV ambitionne d'être la
                mémoire vivante et diffusée du Fouta Toro — accessible depuis Podor comme depuis
                Paris, New York ou Dakar.
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
                <img
                  src={heroPoster}
                  alt="En vedette"
                  className="absolute inset-0 h-full w-full object-cover"
                />
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
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    Podor, mémoire vivante du fleuve
                  </h2>
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
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                  {cat.titre}
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer hidden md:inline">
                  Voir tout
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cat.items.map((item, i) => (
                  <article
                    key={item.name}
                    onClick={() => setActiveVideo({ name: item.name, id: item.id })}
                    className="group rounded-xl overflow-hidden border border-border bg-card transition hover:border-primary cursor-pointer"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={thumbs[i % thumbs.length]}
                        alt={item.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
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
