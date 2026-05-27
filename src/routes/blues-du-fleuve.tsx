import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Play,
  MapPin,
  Calendar,
  Music2,
  Palette,
  Mic,
  Users,
  Target,
  Award,
  Sparkles,
  Globe,
  Heart,
  TreePine,
} from "lucide-react";
import { useState } from "react";
import logoFestival from "@/assets/logo-festival.png";
import { createSeoMeta } from "@/lib/seo";
import baabaImg from "@/assets/baaba-maal.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import fleuveImg from "@/assets/fleuve.jpg";
import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import centreImg from "@/assets/centre-podor.jpg";
import gal1Img from "@/assets/gal1.jpg";
import gal2Img from "@/assets/gal2.jpg";
import gal3Img from "@/assets/gal3.jpg";
import gal4Img from "@/assets/gal4.jpg";
import gal5Img from "@/assets/gal5.jpg";
import gal6Img from "@/assets/gal6.jpg";
import gal7Img from "@/assets/gal7.jpg";
import gal8Img from "@/assets/gal8.jpg";
import gal9Img from "@/assets/gal9.jpg";
import joeKeitaImg from "@/assets/joe keita.jpg";
import dembaGuisseImg from "@/assets/dembaguisse.jpg";
import bintaImg from "@/assets/binta.jpg";
import kaneDialloImg from "@/assets/kanediallo.jpg";

import { PageSkeleton } from "@/components/PageSkeleton";

export const Route = createFileRoute("/blues-du-fleuve")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "Festival Blues du Fleuve | 17ème édition 2026",
      description:
        "Festival fondé par Baaba Maal, célébrant l'intégration, la solidarité et l'environnement des pays de la vallée du fleuve Sénégal.",
      ogTitle: "Blues du Fleuve — Festival Baaba Maal",
      ogDescription:
        "Découvrez la 17ème édition du Festival Blues du Fleuve avec Baaba Maal et des artistes de la région du Fouta Toro.",
      ogImage: crowdImg,
      keywords:
        "Blues du Fleuve, Festival Podor, Baaba Maal, musique Sénégal, Fouta Toro, festival 2026, culture Halpulaar",
      canonical: "https://lesbluesdufleuve.sn/blues-du-fleuve",
    });
    return { meta, links };
  },
  pendingComponent: PageSkeleton,
  component: BluesDuFleuve,
});

const artistes = [
  {
    nom: "Baaba Maal",
    role: "Fondateur · Légende",
    origine: "Podor, Sénégal",
    desc: "Baaba Maal est né 1953 à Podor dans la province du Fouta au Sénégal. Il fait partie du peuple Toucouleur ou Haalpulaar (ceux qui parlent le pulaar), des Peuls du nord du pays.",
    img: baabaImg,
  },
  {
    nom: "Joe Keita",
    role: "Jobalart · Visionnaire",
    origine: "Rosso, Mauritanie",
    desc: "Jobalart, de son véritable nom Badara Aldiouma Keita, est l'une des figures les plus marquantes et durables de la scène musicale mauritanienne. Depuis plus de deux décennies, il incarne et fait vivre la culture musicale à Rosso. Artiste complet musicien, rappeur, et compositeur, Jobalart est un 'old school vivant', reconnu pour avoir été l'un des fondateurs du mouvement hip-hop local dès 1994. Sa discographie comprend deux albums marquants, enregistrés à Dakar: Boul Tayi et Guëstou Guiss. Son style musical est une exploration riche et éclectique de la World Music, fusionnant le rap, le reggae et la soul. Cette versatilité lui a ouvert les portes de nombreuses collaborations artistiques de haut niveau en Afrique de l'Ouest, notamment avec des voix majeures comme Fafadi, Amadyan, Titi Yoro, Pacotille, Simon PSL, Demba Guissé, et Am Bongo.",
    img: joeKeitaImg,
  },
  {
    nom: "Demba Guissé",
    role: "Artiste Musicien",
    origine: "Sénégal",
    desc: "Issu d'une famille artistique, Demba Guissé est un artiste musicien compositeur sénégalais. Il a débuté sa carrière par des concours de chant partout au Sénégal et dans la sous région et s'en est toujours sorti vainqueur. Depuis son bas âge il imitait la légende, le roi du Yela Baba Maal et depuis il est resté fidèle à lui parce qu'il s'inspire de lui. Demba ne cesse de suivre les traces de son idole Baaba et représente le Sénégal avec brio partout et du mieux qu'il peut, il essaie de promouvoir la culture peul. Il produit aussi bien qu'en Afrique qu'en Europe parce qu'il est très souvent sollicité pour aller représenter la culture sénégalaise en général et la culture peul en particulier à travers de grands festivals et événements culturels.",
    img: dembaGuisseImg,
  },
  {
    nom: "Binta Diallo",
    role: "Laaly Junior · Actrice",
    origine: "Bouaké, Côte d'Ivoire",
    desc: "Binta Diallo, alias « Laaly Junior », est née à Bouaké, en République de Côte d'Ivoire, de parents originaires de Timbo, la capitale historique du Fouta théocratique. Elle commence ses études primaires à Abidjan, logée chez son cousin à Treichville. C'est dans ce domicile familial, véritable carrefour culturel où séjournent de nombreux artistes venus de Guinée, du Mali et du Burkina Faso, qu'elle baigne très tôt dans l'art. Sur le chemin du retour de l'école, elle fréquente régulièrement le centre de loisirs « Djocko ». Géré par le Sénégalais Djiby Thiam, ce lieu accueille les répétitions de plusieurs compagnies de théâtre et de musique, éveillant définitivement sa vocation culturelle. De retour en Guinée avec ses parents, son talent est repéré lors d'un casting pour la troupe Lewrou Djéré de la Télévision Nationale (RTG). Elle s'impose rapidement comme une actrice majeure et incontournable des courts-métrages à succès de la chaîne. Elle y incarne des rôles marquants : la femme fidèle face à un mari vagabond, la fille du roi, ou encore la femme de vérité. Grâce à sa prestance et à sa beauté naturelle de femme peule, elle attire l'œil des grands réalisateurs de clips vidéo. Elle intègre ensuite le monde musical, d'abord comme choriste et danseuse, puis comme lead-vocaliste suppléante. Elle collabore avec les figures de proue de la musique pastorale et tradi-moderne du Fouta, notamment Boul Diallo.",
    img: bintaImg,
  },
  {
    nom: "Kane Diallo",
    role: "Welma · Artiste",
    origine: "Dakar, Sénégal",
    desc: "Kane Diallo Welma, un jeune artiste sénégalais né à Dakar le 20 Décembre 1990, fils de Feu Mbassou Niang, l'ancien manager de Baaba Maal. Il a entamé la musique en 2010. Welma a fait sa première apparition dans une chaîne de télévision avec son père qui faisait sa présentation. Il a fait ses études jusqu'en classe de seconde suivie d'une formation en infographie et montage. Kane Diallo a son groupe qui s'appelle « WELMA » créé avec son ami et frère guitariste Seydou Ba. Son premier single « Liné si mane » est sorti en novembre 2015 suivi d'un autre single « Oyiro » une chanson traditionnelle en pulaar sortie en janvier 2017. Le jeune artiste se lance dans une nouvelle mélodie une chanson et un clip qui fait échos dans la musique sénégalaise et Africaine très connu « Foone Ma » sortie en Août 2017. « Foone Ma » a été nominé « best french mal newcomer » en Ouganda et le dernier single une chanson d'amour classique « Guiss beugue » sortie en Août 2018.",
    img: kaneDialloImg,
  },
];

const piliers = [
  {
    Icon: Music2,
    titre: "Arts Vivants",
    desc: "Musique et danses traditionnelles représentatives de la richesse Halpular et Toucouleur.",
  },
  {
    Icon: Palette,
    titre: "Artisanat",
    desc: "Exposition du savoir-faire local et des objets d'art traditionnels de la vallée.",
  },
  {
    Icon: Mic,
    titre: "Conférences",
    desc: "Panels de développement et réflexions thématiques sur les préoccupations des populations.",
  },
];

const videos = [
  { title: "Festival Les Blues du Fleuve", id: "cGUML8xR5UU" },
  { title: "Festival Les Blues du Fleuve", id: "V5RcwQAl-_g" },
  { title: "Festival Les Blues du Fleuve", id: "No0IoqGSiLw" },
  { title: "Festival Les Blues du Fleuve", id: "Mig1P7pQMh0" },
  { title: "Festival Les Blues du Fleuve", id: "Qtm-Wry-8cc" },
  { title: "Festival Les Blues du Fleuve", id: "uHHKBJBvvPg" },
  { title: "Festival Les Blues du Fleuve", id: "JuBhFrMD-G0" },
  { title: "Festival Les Blues du Fleuve", id: "yNgDR1cTi_I" },
  { title: "Festival Les Blues du Fleuve", id: "wl-zb8FPvzo" },
];

const galleryImages = [
  { id: 1, src: crowdImg, alt: "Foule au festival", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: baabaImg, alt: "Baaba Maal", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: fleuveImg, alt: "Le fleuve Sénégal", span: "md:col-span-1 md:row-span-1" },
  {
    id: 4,
    src: instrumentsImg,
    alt: "Instruments traditionnels",
    span: "md:col-span-1 md:row-span-1",
  },
  { id: 5, src: piroguesImg, alt: "Pirogues sur le fleuve", span: "md:col-span-2 md:row-span-1" },
  { id: 6, src: centreImg, alt: "Centre Culturel", span: "md:col-span-1 md:row-span-1" },
  { id: 7, src: gal1Img, alt: "Galerie 1", span: "md:col-span-1 md:row-span-1" },
  { id: 8, src: gal2Img, alt: "Galerie 2", span: "md:col-span-1 md:row-span-1" },
  { id: 9, src: gal3Img, alt: "Galerie 3", span: "md:col-span-1 md:row-span-1" },
  { id: 10, src: gal4Img, alt: "Galerie 4", span: "md:col-span-1 md:row-span-1" },
  { id: 11, src: gal5Img, alt: "Galerie 5", span: "md:col-span-1 md:row-span-1" },
  { id: 12, src: gal6Img, alt: "Galerie 6", span: "md:col-span-1 md:row-span-1" },
  { id: 13, src: gal7Img, alt: "Galerie 7", span: "md:col-span-1 md:row-span-1" },
  { id: 14, src: gal8Img, alt: "Galerie 8", span: "md:col-span-1 md:row-span-1" },
  { id: 15, src: gal9Img, alt: "Galerie 9", span: "md:col-span-1 md:row-span-1" },
];

function BluesDuFleuve() {
  const [form, setForm] = useState({ nom: "", media: "", email: "", tel: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border text-white">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container-page py-20 md:py-28 relative grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            {/* Logo du Festival */}
            <div className="mb-6">
              <img
                src={logoFestival}
                alt="Les Blues du Fleuve — Logo officiel"
                className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.5))" }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-5">
              Festival International · 15ème & 17ème éditions
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold max-w-4xl leading-[1.05]">
              Blues du <span className="text-gradient-gold">Fleuve</span>
            </h1>
            <div className="mt-6 space-y-4 max-w-2xl text-lg text-white/90">
              <p>
                Porté sur les fonds baptismaux par l’artiste international Sénégalais{" "}
                <span className="text-white font-medium">Baaba MAAL</span> le festival les Blues du
                fleuve célèbre sa 15ème édition du 13 au 15 Décembre 2024 à Podor (Sénégal).
              </p>
              <p>
                Seul Festival d’intégration en Afrique de l’ouest le Blues du Fleuve symbolise la
                solidarité des pays riverains du fleuve Sénégal.
              </p>
              <p>
                Le Festival les Blues du Fleuve consacre ses éditions à travers diverses expressions
                des peuples dont la culture est fortement influencée par l’eau. Cette culture est
                représentée essentiellement par les arts vivants : musique, danse spectacle
                traditionnels, Festival multicolores, l’artisanat, ce patrimoine populaire et les
                préoccupations de développement des populations sont représenté aussi à travers des
                expositions thématiques et des conférences.
              </p>
              <p>
                Cette manifestation sera inscrite cette année d’une part sous le sceau de la paix et
                l’harmonie sociale pour le vivre ensemble Africain dans l’unité, la convivialité
                autour des peuples unis par le fleuve dans la diversité, d’autre part sur
                l’émergence du Sénégal.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-white" /> Podor, Sénégal
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} className="text-white" /> 13–15 Décembre 2024
              </span>
            </div>
            <div className="mt-8">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn-billetterie opacity-60 cursor-not-allowed"
              >
                Réserver mon Pass Festival (Bientôt disponible)
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border/20 aspect-4/5 shadow-(--shadow-elegant)">
            <img
              src={baabaImg}
              alt="Baaba Maal"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 17ème édition theme */}
      <section className="border-b border-border bg-card/30">
        <div className="container-page py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-3">
            Thème · 17ème Édition
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold max-w-3xl">
            Les Rives de <span className="text-gradient-gold">l'Harmonie</span>
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground italic">
            « CULTURE – SECURITE – ENVIRONNEMENT ET SOLIDARITE AUROUR DU FLEUVE SENEGAL »
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {piliers.map(({ Icon, titre, desc }) => (
              <div key={titre} className="rounded-2xl border border-border bg-background p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl font-semibold">{titre}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Présentation du Festival */}
      <section className="border-b border-border bg-background">
        <div className="container-page py-20">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Présentation</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
              Le Festival et la Ville de <span className="text-gradient-gold">Podor</span>
            </h2>

            {/* Introduction Card */}
            <div className="rounded-2xl border border-border bg-card p-8 mb-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    Introduction
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Le festival « Les Blues du Fleuve » est un cadre idéal pour l'épanouissement
                    culturel et le développement, axé sur diverses expressions des cultures
                    influencées par l'eau, notamment les arts vivants (musique, danse, spectacles
                    traditionnels), l'artisanat et le patrimoine populaire. Il est organisé par une
                    association créée à Podor à l'initiative de Baaba Maal, qui en est le président
                    d'honneur.
                  </p>
                </div>
              </div>
            </div>

            {/* Bénéficiaires Card */}
            <div className="rounded-2xl border border-border bg-card p-8 mb-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    Bénéficiaires
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Les musiciens de Podor, du Sénégal et de la sous-région ouest-africaine, les
                    associations locales de femmes, de jeunes, d'artisans, d'éleveurs, de pêcheurs,
                    d'agriculteurs et l'ensemble de la population autour de Podor.
                  </p>
                </div>
              </div>
            </div>

            {/* Objectifs Grid */}
            <div className="mb-6">
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target size={20} />
                </div>
                Les Grands Objectifs du Festival
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Globe className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Établir une forte communauté culturelle unie par le fleuve Sénégal, favorisant
                      l'intégration sous-régionale.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Music2 className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Stimuler les échanges locaux, sous-régionaux et internationaux entre artistes
                      (musiciens, danseurs, artisans) et promouvoir des partenariats offrant une
                      meilleure visibilité à leurs œuvres.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Palette className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Revaloriser et promouvoir diverses formes d'expressions artistiques africaines
                      (musique, arts de la scène, danse, artisanat).
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Award className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Favoriser l'installation durable d'infrastructures culturelles à Podor comme
                      point de convergence pour les artistes africains et internationaux.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats Grid */}
            <div className="mb-6">
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                Les Résultats Attendus
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Heart className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Le festival renforce la coopération culturelle et promeut des partenariats
                      durables.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <Target className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Il crée des opportunités économiques pour les populations locales et les
                      prestataires de services.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Il bénéficie considérablement à l'industrie touristique à moyen terme.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <TreePine className="text-primary mt-1 shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Il met en valeur la richesse artisanale et agricole de la sous-région.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activités Phares Card */}
            <div className="rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Mic size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    Les Activités Phares
                  </h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Music2 className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-muted-foreground leading-relaxed">
                    Grands concerts attirant un public important des localités environnantes et de
                    la Diaspora.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Palette className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-muted-foreground leading-relaxed">
                    Événements traditionnels et expositions artisanales mettant en valeur la
                    diversité créative des populations de la sous-région à travers des spectacles
                    folkloriques, chants et danses, ainsi que le savoir-faire technique et
                    esthétique de divers peuples.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-muted-foreground leading-relaxed">
                    Conférences et caravanes éducatives, d'information et de sensibilisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mot du Producteur Exécutif */}
      <section className="border-b border-border bg-muted/30">
        <div className="container-page py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte - gauche */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-bold">
                Mot du Producteur
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-foreground">
                Le message d'
                <span className="text-gradient-gold">Oumar Wade</span>
              </h2>
              <div className="space-y-5 font-serif text-muted-foreground text-lg leading-relaxed">
                <p>
                  Oui, le Festival des Blues du Fleuve est devenu un souffle, un moteur, un moment
                  faste où Podor vit et sourit davantage. Tenir chaque année un festival est un défi
                  majeur.
                </p>
                <p>
                  Chers festivaliers venus du Sénégal, des pays voisins, du reste de l'Afrique et de
                  l'extérieur, vous êtes chez vous ici, sur cette terre où le fleuve porte notre
                  histoire, notre culture et nos traditions ancestrales ; où chaque vague murmure la
                  mémoire du passé et l'espoir du futur.
                </p>
                <p>
                  Bienvenue à Podor Wuro Njaak Buubu et Baaba Maal, où la musique nous rassemble et
                  nous unit ; où la voix chaleureuse de Baaba réjouit nos cœurs et éveillent nos
                  esprits.
                </p>
              </div>
              {/* Citation mise en avant */}
              <div className="mt-8 rounded-2xl bg-primary px-8 py-6 text-primary-foreground">
                <p className="font-display text-xl font-bold mb-1">
                  « Je vous souhaite un magnifique festival. »
                </p>
                <p className="text-2xl font-bold tracking-widest mt-2">YOO WUL WELA !</p>
                <div className="mt-4 border-t border-primary-foreground/30 pt-4">
                  <p className="font-bold text-base">Oumar Wade</p>
                  <p className="text-sm opacity-80 uppercase tracking-wider">Producteur Exécutif</p>
                </div>
              </div>
            </div>

            {/* Photo - droite */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Décoration derrière la photo */}
                <div className="absolute -inset-4 rounded-3xl bg-primary/10 -z-10" />
                <div className="w-72 md:w-80 aspect-4/5 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                  <img
                    src="/oumar-wade.jpg"
                    alt="Oumar Wade — Producteur Exécutif du Festival Blues du Fleuve"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                {/* Badge flottant */}
                <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
                  <p className="text-xs uppercase tracking-wider text-primary font-bold">
                    Producteur Exécutif
                  </p>
                  <p className="font-display font-bold text-foreground">Oumar Wade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme du Festival */}

      <section id="billetterie" className="festival-container py-20 border-b border-border">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-10">
          Programme & <span className="text-gradient-gold">Billetterie</span>
        </h2>

        <div className="programme-grid">
          <div className="programme-item">
            <h3 className="font-display text-xl font-bold">Jour 1 : Ouverture & Traditions</h3>
            <p className="text-sm text-muted-foreground mt-2">
              13 Décembre 2024 • Centre Culturel de Podor
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <strong>10:00</strong> - Cérémonie d'ouverture
              </li>
              <li>
                <strong>15:00</strong> - Course de pirogues traditionnelles
              </li>
              <li>
                <strong>21:00</strong> - Concert acoustique (Baaba Maal & Invités)
              </li>
            </ul>
          </div>

          <div className="programme-item">
            <h3 className="font-display text-xl font-bold">Jour 2 : La Nuit du Fleuve</h3>
            <p className="text-sm text-muted-foreground mt-2">
              14 Décembre 2024 • Scène Principale
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <strong>10:00</strong> - Panels et conférences (Environnement)
              </li>
              <li>
                <strong>16:00</strong> - Animations artistiques dans la ville
              </li>
              <li>
                <strong>22:00</strong> - Grand Concert (Mia Guissé, Jeeba...)
              </li>
            </ul>
          </div>

          <div className="programme-item">
            <h3 className="font-display text-xl font-bold">Jour 3 : Clôture & Daande Lenol</h3>
            <p className="text-sm text-muted-foreground mt-2">
              15 Décembre 2024 • Scène Principale
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <strong>09:00</strong> - Exposition artisanale
              </li>
              <li>
                <strong>15:00</strong> - Danse et folklore Halpulaar
              </li>
              <li>
                <strong>22:00</strong> - Concert de Clôture (Baaba Maal & Le Daande Lenol)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/billetterie" className="btn-billetterie opacity-60 hover:opacity-100">
            Acheter un Pass 3 Jours (Bientôt disponible)
          </Link>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Artistes</h2>
            <p className="mt-2 text-muted-foreground">Voix et talents du fleuve.</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {artistes.map((a) => (
            <article
              key={a.nom}
              className="rounded-2xl border border-border bg-card overflow-hidden transition hover:border-primary"
            >
              <div
                className="aspect-4/5 bg-muted relative overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.3 0.04 250), oklch(0.25 0.06 80))",
                }}
              >
                {a.img ? (
                  <img
                    src={a.img}
                    alt={a.nom}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-primary/30">
                    {a.nom.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">{a.nom}</h3>
                <p className="text-xs uppercase tracking-wider text-primary mt-1">{a.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.origine}</p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{a.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-20 border-t border-border">
        <h2 className="font-display text-3xl md:text-4xl font-bold">Galerie d'images</h2>
        <p className="mt-2 text-muted-foreground">Une immersion visuelle au cœur du festival.</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`rounded-2xl overflow-hidden border border-border relative group ${img.span || ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <span className="text-white font-medium">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 border-t border-border">
        <div className="rounded-3xl overflow-hidden border border-border aspect-21/9 mb-12">
          <img
            src={crowdImg}
            alt="Foule au festival"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold">Archives média</h2>
        <p className="mt-2 text-muted-foreground">Revivez les moments forts du festival.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {videos.map((v) => (
            <div key={v.id} className="rounded-2xl overflow-hidden border border-border bg-card">
              <div className="aspect-video bg-black/40 relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${v.id}?autoplay=1><img src=https://img.youtube.com/vi/${v.id}/hqdefault.jpg alt='${v.title}'><span>▶</span></a>`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 text-sm font-medium">{v.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 border-t border-border">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Demande d'accréditation média
          </h2>
          <p className="mt-2 text-muted-foreground">
            Journalistes, photographes et équipes presse — envoyez votre demande pour couvrir
            l'événement ou téléchargez la fiche.
          </p>
          <div className="mt-6">
            <a
              href="https://www.bluesdufleuve.sn/storage/2022/11/accreditation-blues-2021.doc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition"
            >
              Télécharger la fiche d’accréditation
            </a>
          </div>

          <form
            className="mt-10 grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {[
              { k: "nom", label: "Nom complet", type: "text" },
              { k: "media", label: "Nom du Média", type: "text" },
              { k: "email", label: "Email", type: "email" },
              { k: "tel", label: "Téléphone", type: "tel" },
            ].map((f) => (
              <div key={f.k}>
                <label className="block text-sm font-medium mb-2">{f.label}</label>
                <input
                  required
                  type={f.type}
                  value={(form as Record<string, string>)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-foreground px-8 py-3 text-sm font-bold hover:opacity-90 transition self-start"
            >
              <Play size={14} /> Envoyer la demande
            </button>
            {sent && (
              <p className="text-sm text-secondary">Merci, votre demande a bien été enregistrée.</p>
            )}
          </form>
        </div>
      </section>

      <section className="container-page py-20 border-t border-border">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
          Nos partenaires
        </h2>
        <div className="flex flex-wrap justify-center gap-10 items-center opacity-70">
          <span className="text-xl font-bold">ELYDIA</span>
          <span className="text-xl font-bold">FC</span>
          <span className="text-xl font-bold">Ministère</span>
          <span className="text-xl font-bold">nannk media</span>
          <span className="text-xl font-bold">Mairie Podor</span>
        </div>
      </section>

      <section className="container-page py-20 border-t border-border bg-card/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Nous Contacter</h2>
          <p className="mt-4 text-muted-foreground">
            Nous sommes à votre disposition. Notre back office se chargera de répondre à vos
            demandes.
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Adresse
              </span>
              <span className="text-lg font-medium">Dakar, Dakar - Sénégal</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Téléphone
              </span>
              <a
                href="tel:+221774967531"
                className="text-lg font-medium hover:text-primary transition whitespace-nowrap"
              >
                +221 77 496 75 31
              </a>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Email
              </span>
              <a
                href="mailto:contact@bluesdufleuve.sn"
                className="text-lg font-medium hover:text-primary transition"
              >
                contact@bluesdufleuve.sn
              </a>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-6">
            <a
              href="https://www.facebook.com/festivalbluesdufleuve"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/nannkmedia"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@nannktv"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition"
            >
              Youtube
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
