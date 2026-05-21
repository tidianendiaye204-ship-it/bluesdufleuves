import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, MapPin, Calendar, Music2, Palette, Mic } from "lucide-react";
import { useState } from "react";
import baabaImg from "@/assets/baaba-maal.jpg";
import crowdImg from "@/assets/festival-crowd.jpg";
import fleuveImg from "@/assets/fleuve.jpg";
import instrumentsImg from "@/assets/instruments.jpg";
import piroguesImg from "@/assets/pirogues.jpg";
import centreImg from "@/assets/centre-podor.jpg";
import miaGuissImg from "@/assets/mia-guiss.jpg";
import jeebaImg from "@/assets/jeeba.jpg";
import authentiqueImg from "@/assets/authentique.jpg";
import boyDiarraImg from "@/assets/boydiarra.jpg";
import choupiMballoImg from "@/assets/choupi-mabllo.jpg";
import abdouCamaraImg from "@/assets/ABdou camera.jpg";

export const Route = createFileRoute("/blues-du-fleuve")({
  head: () => ({
    meta: [
      { title: "Blues du Fleuve — The Village" },
      {
        name: "description",
        content:
          "Festival fondé par Baaba Maal, célébrant l'intégration et la solidarité des pays de la vallée du fleuve.",
      },
    ],
  }),
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
    nom: "Mia Guissé",
    role: "Auteure-compositrice",
    origine: "Tambacounda, Sénégal",
    desc: "Née à Tambacounda, au Sénégal, Aïssata Guissé aka Mia Guissé est auteure-compositrice, interprète et styliste naviguant entre mbalax, musique acoustique, folk-pop, afro-pop, afrobeat.",
    img: miaGuissImg,
  },
  {
    nom: "JEEBA",
    role: "Auteur-compositeur",
    origine: "Thiès, Sénégal",
    desc: "Jeeba ou Jeeba Abdn de son vrai nom Djibril Ba, né à Thiès, est un auteur-compositeur-interprète et chanteur sénégalais. Il développe une musique qu'il appelle « Jolofbeats ».",
    img: jeebaImg,
  },
  {
    nom: "Authentique BD",
    role: "Artiste Rappeur",
    origine: "Mauritanie",
    desc: "Authentique Bd artiste rappeur mauritanien.",
    img: authentiqueImg,
  },
  {
    nom: "Boy Diarra",
    role: "Artiste",
    origine: "Sénégal",
    desc: "Artiste Sénégalais.",
    img: boyDiarraImg,
  },
  {
    nom: "Choupi Mballo",
    role: "Artiste Invitée",
    origine: "Sénégal",
    desc: "Artiste invitée pour cette édition du festival.",
    img: choupiMballoImg,
  },
  {
    nom: "Abdou Camara",
    role: "Artiste Invité",
    origine: "Sénégal",
    desc: "Artiste invité pour cette édition du festival.",
    img: abdouCamaraImg,
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
            <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-5">
              Festival International · 15ème & 16ème éditions
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

      {/* 16ème édition theme */}
      <section className="border-b border-border bg-card/30">
        <div className="container-page py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-3">
            Thème · 16ème Édition
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
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn-billetterie opacity-60 cursor-not-allowed"
          >
            Acheter un Pass 3 Jours (Bientôt disponible)
          </a>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Artistes</h2>
            <p className="mt-2 text-muted-foreground">Voix et talents du fleuve.</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <p className="mt-3 text-sm text-muted-foreground">{a.desc}</p>
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
