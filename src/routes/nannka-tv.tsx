import { createFileRoute } from "@tanstack/react-router";
import { Play, X } from "lucide-react";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { createSeoMeta } from "@/lib/seo";
import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import fleuveImg from "@/assets/fleuve.jpg";

const heroPoster = fleuveImg;
const thumbs = [instrumentsImg, crowdImg, piroguesImg, fleuveImg];

export const Route = createFileRoute("/nannka-tv")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "NANN-k TV | The Village Podor",
      description:
        "Chaîne média de The Village Podor : émissions culturelles, concerts live, archives festivals et documentaires de la vallée du fleuve.",
      ogTitle: "NANN-k TV — The Village Podor",
      ogDescription:
        "Archives et documentaires exclusifs de The Village retraçant l'histoire fascinante de la vallée du fleuve Sénégal.",
      ogImage: fleuveImg,
      keywords:
        "The Village, NANN-k TV, patrimoine, documentaires, archives, musique, Podor, vallée du fleuve, livestream, concerts",
      canonical: "https://lesbluesdufleuve.sn/nannka-tv",
    });
    return { meta, links };
  },
  component: NannkaTV,
});

function VideoCarousel({ category, thumbs, setActiveVideo, t }: any) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div key={category.titre}>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold">{category.titre}</h2>
        <span className="text-sm text-muted-foreground hidden md:inline">{t("tv.viewAll")}</span>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {category.items.map((item: any, i: number) => (
            <div key={item.name} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_23%]">
              <article
                onClick={() => setActiveVideo({ name: item.name, id: item.id })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveVideo({ name: item.name, id: item.id });
                  }
                }}
                className="group h-full rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition hover:border-primary cursor-pointer flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden bg-muted/30">
                  <img
                    src={thumbs[i % thumbs.length]}
                    alt={item.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play
                        size={20}
                        className="text-primary-foreground ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Nannka TV</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NannkaTV() {
  const { t } = useTranslation();
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ name: string; id: string } | null>(null);

  const categories = [
    {
      titre: t("tv.cat1"),
      items: [
        { name: t("nannk.vid1Name", "Mémoires du fleuve"), id: "No0IoqGSiLw" },
        { name: t("nannk.vid2Name", "Paroles de griots"), id: "V5RcwQAl-_g" },
        { name: t("nannk.vid3Name", "Voix de Podor"), id: "JuBhFrMD-G0" },
        { name: t("nannk.vid4Name", "Récits pulaar"), id: "Mig1P7pQMh0" },
      ],
    },
    {
      titre: t("tv.cat2"),
      items: [
        { name: t("nannk.vid5Name", "Baaba Maal · Acoustique"), id: "cGUML8xR5UU" },
        { name: t("nannk.vid6Name", "Nuit Jolobeats"), id: "Qtm-Wry-8cc" },
        { name: t("nannk.vid7Name", "Soirée Yéla"), id: "uHHKBJBvvPg" },
        { name: t("nannk.vid8Name", "Hommage à Mansour Seck"), id: "yNgDR1cTi_I" },
      ],
    },
    {
      titre: t("tv.cat3"),
      items: [
        { name: t("nannk.vid9Name", "Le Xalam"), id: "wl-zb8FPvzo" },
        { name: t("nannk.vid10Name", "Le Sabar"), id: "V5RcwQAl-_g" },
        { name: t("nannk.vid11Name", "La Tama"), id: "JuBhFrMD-G0" },
        { name: t("nannk.vid12Name", "La Kora"), id: "No0IoqGSiLw" },
      ],
    },
  ];

  return (
    <>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-page py-16 md:py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-5">{t("tv.heritage")}</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold">
            {t("tv.title")} <span className="text-gradient-gold">{t("tv.titleAccent")}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("tv.subtitle")}</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-(--shadow-elegant)">
          <div className="aspect-video relative flex items-center justify-center overflow-hidden bg-black">
            {isHeroPlaying ? (
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/No0IoqGSiLw?autoplay=1"
                title={t("tv.featuredTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={heroPoster}
                  alt={t("tv.featured")}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <button
                  onClick={() => setIsHeroPlaying(true)}
                  aria-label={t("common.play", "Play")}
                  className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-(--shadow-glow) hover:scale-105 transition cursor-pointer"
                >
                  <Play size={28} className="ml-1" fill="currentColor" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-black/90 to-transparent">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">
                    {t("tv.featured")}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {t("tv.featuredTitle")}
                  </h2>
                  <p className="text-sm text-white/80 mt-1">{t("tv.featuredMeta")}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container-page pb-16 space-y-16 overflow-hidden">
        {categories.map((cat) => (
          <VideoCarousel
            key={cat.titre}
            category={cat}
            thumbs={thumbs}
            setActiveVideo={setActiveVideo}
            t={t}
          />
        ))}
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl scale-100 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition cursor-pointer"
              aria-label={t("tv.close")}
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
