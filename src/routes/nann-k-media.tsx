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

const heroPoster = logoNannk;
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
  const [activeVideo, setActiveVideo] = useState<{ name: string; id: string; isLocal?: boolean } | null>(null);

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
              L'initiative de Baaba Maal
            </span>
            <h2 className="font-display text-3xl font-bold mb-6 uppercase tracking-tight text-foreground">
              Notre Mission
            </h2>
            <p className="font-serif text-muted-foreground mb-6 text-lg leading-relaxed">
              NANN-K est un mouvement citoyen qui insuffle une dynamique nouvelle au cœur de la
              vallée du fleuve Sénégal. Il promeut trois piliers essentiels : une <strong>agriculture
              durable</strong> nourricière, un <strong>artisanat valorisé</strong> et des <strong>technologies
              modernes</strong> accessibles. Ces secteurs à haut potentiel créent les conditions
              d'un épanouissement collectif et d'une participation active à la vie économique.
            </p>
            <p className="font-serif text-muted-foreground mb-6 text-lg leading-relaxed">
              Dans la langue peulh, "NANN-K" vient du verbe <em>"nanni"</em> : "ouïr". Ce mot
              porte toute notre ambition : <strong>faire entendre et comprendre</strong>. Grâce à
              notre bras culturel — musique, chants, troupe folklorique — nous transformons les
              messages de développement en récits vivants, en émotions partagées, en mobilisations
              populaires.
            </p>
            <p className="font-serif text-muted-foreground mb-8 text-lg leading-relaxed">
              Notre credo ? <strong>"Culture – Savoir – Travail"</strong>. Nous construisons une
              conscience citoyenne active, pour que chaque femme, chaque homme de la vallée
              devienne acteur de son propre avenir, et de l'émergence sociale et économique de
              toute la région.
            </p>
            <div className="space-y-6 font-serif text-muted-foreground">
              <div className="flex items-start gap-4">
                <span className="bg-primary w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_var(--color-primary)]"></span>
                <div>
                  <strong className="block text-foreground mb-1 font-sans uppercase tracking-wider text-xs">
                    Agriculture
                  </strong>
                  <span className="text-sm">
                    Garantir la sécurité alimentaire, valoriser les terroirs et faire de
                    l'agriculture un véritable levier de croissance inclusive.
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
                    Redorer le savoir-faire local, créer des filières rentables et offrir des
                    perspectives économiques à la jeunesse.
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
                    Connecter la vallée aux innovations du monde, faciliter l'accès à l'information
                    et accélérer l'entrepreneuriat.
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
            Notre raison d'être
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            Pourquoi NANN-K ?
          </h2>
          <div className="space-y-8">
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Le défi du développement</h3>
              <p className="font-serif text-muted-foreground text-base leading-relaxed">
                L'Afrique fait face à des défis colossaux. Trop souvent, les initiatives restent
                institutionnelles et ne prennent pas racine dans les réalités du terrain. NANN-K
                naît de ce constat : <strong>le changement doit venir des citoyens eux-mêmes</strong>.
              </p>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Une réponse à l'attente des populations</h3>
              <p className="font-serif text-muted-foreground text-base leading-relaxed">
                Emplois, revenus, sécurité alimentaire : les besoins sont criants. Les populations
                n'attendent plus, elles agissent. NANN-K leur donne les outils : formations, accès
                au financement, équipements et surtout une visibilité médiatique forte.
              </p>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">L'agriculture, priorité nationale</h3>
              <p className="font-serif text-muted-foreground text-base leading-relaxed">
                Le Sénégal a fait de l'agriculture son moteur de croissance — mais les rouages
                grippent. NANN-K est l'alternative concrète : un accompagnement terrain, proche
                des agriculteurs, pour transformer les politiques en résultats tangibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NANNK TRUST & Podor Vert Section */}
      <section className="container-page py-20 border-b border-border bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Un engagement concret
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            NANNK TRUST de Baaba Maal soutient la lutte contre la désertification à Podor
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
              <div className="aspect-video relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/atzGZYV3PaY?autoplay=0"
                  title="NANNK TRUST - Lutte contre la désertification à Podor"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Podor, Sénégal – La fondation NANNK TRUST, initiée par l’artiste planétaire Baaba Maal, a remis un chèque d’un montant de plus de 5 millions de francs CFA à l’association Podor Vert, marquant ainsi une étape importante dans leur partenariat en faveur de l’environnement.
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Cette contribution constitue la deuxième tranche du financement engagé par la fondation pour soutenir les actions de l’association, qui se consacre depuis plusieurs années à la lutte contre la désertification et la restauration des écosystèmes locaux.
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Lors de la remise officielle, les responsables des deux structures ont réaffirmé leur volonté commune de renforcer la résilience environnementale dans le département de Podor, particulièrement touché par l’avancée du désert.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 italic">
                « La protection de l’environnement est une urgence et une responsabilité collective. En soutenant Podor Vert, nous investissons dans un avenir durable pour nos communautés et pour les générations futures. »
                <footer className="mt-2 text-sm font-semibold text-primary">Baaba Maal</footer>
              </blockquote>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                L’association Podor Vert a salué ce geste de confiance et a annoncé la mise en œuvre de nouvelles initiatives de reboisement, de sensibilisation et de formation des jeunes aux pratiques agricoles durables, rendues possibles grâce à cet appui financier.
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Ce partenariat exemplaire entre une organisation culturelle de renommée internationale et un acteur local engagé dans l’environnement illustre l’importance de la synergie entre la culture, la communauté et le développement durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journée de Reboisement Section */}
      <section className="container-page py-20 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Journée citoyenne
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            Journée de Reboisement à Mbolo Birame
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
              <div className="aspect-video relative bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F1JGnqFa8VY%2F&show_text=false&width=1000&height=1000"
                  title="Journée de Reboisement à Mbolo Birame"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                  frameBorder="0"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Dans le cadre de la journée nationale de l’arbre initiée par le Président de la République Bassirou Diomaye Faye, le département de Podor s’est manifesté à travers le député Ismaela Wone et l’Association Podor Vert par une grande journée de reboisement et sensibilisation dans la commune de Mbolo Birame le dimanche 31 août 2025.
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                Les villages de Lougué Sebbé, Lougué Toroobé et Lougué Fulbé ont été retenus dans le cadre de cette activité citoyenne. Ainsi, Podor vert a mis à leur disposition 180 plants ombragés et fruitiers qui sont de la production des pépinières de Fanaye et de Mery.
              </p>
              <p className="font-serif text-muted-foreground text-lg leading-relaxed">
                L’Agence Sénégalaise de la Reforestation et de la Grande Muraille verte a participé activement à la réussite de cette activité.
              </p>
              <p className="font-serif text-lg leading-relaxed font-semibold text-foreground">
                Ensemble, œuvrons pour un Podor Vert et durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Espace Agricole NANN-K Section */}
      <section className="container-page py-20 border-b border-border bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Notre espace agricole
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            Espace Agricole de NANN-K
          </h2>
          <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
            <div className="aspect-video relative bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/aF-3SIAeoOk"
                title="Espace Agricole de NANN-K"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Baaba Maal Video Section */}
      <section className="container-page py-20 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
            Baaba Maal
          </span>
          <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-tight text-foreground">
            Baaba Maal à Mborobirane
          </h2>
          <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
            <div 
              className="aspect-video relative bg-black cursor-pointer group"
              onClick={() => setActiveVideo({ 
                name: "Baaba Maal à Mborobirane", 
                id: "/baaba-maal-a-mborobirane.mp4", 
                isLocal: true 
              })}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/baaba-maal-a-mborobirane.mp4"
                controls
                muted
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                <Play size={48} className="text-primary-foreground" fill="currentColor" />
              </div>
            </div>
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
          <div className="aspect-video relative bg-black">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/L0HX8udwCeg"
              title="NANN-K en action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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
              {activeVideo.isLocal ? (
                <video
                  className="w-full h-full"
                  src={activeVideo.id}
                  controls
                  autoPlay
                />
              ) : (
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                  title={activeVideo.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
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
