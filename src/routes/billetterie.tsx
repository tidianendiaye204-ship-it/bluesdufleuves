import { createFileRoute } from "@tanstack/react-router";
import { Ticket, Calendar, Clock, MapPin, CheckCircle2, ChevronDown, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createSeoMeta } from "@/lib/seo";
import { subscribeNewsletterFn } from "@/routes/__root";
import { FESTIVAL_CONFIG } from "@/config/festival";

// Import images
import crowdImg from "@/assets/festival-crowd.jpg";

export const Route = createFileRoute("/billetterie")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "Billetterie | The Village Podor - Blues du Fleuve",
      description:
        "Réservez vos billets pour le festival Blues du Fleuve au The Village Podor. Billetterie officielle avec pass 3 jours et accès aux concerts.",
      ogTitle: "Billetterie — The Village Podor",
      ogDescription:
        "Billetterie officielle du festival Blues du Fleuve au The Village Podor. Réservez vos pass pour vivre l'expérience du festival.",
      keywords:
        "The Village, billetterie, festival, Blues du Fleuve, pass, tickets, Podor, Sénégal",
      canonical: "https://lesbluesdufleuve.sn/billetterie",
    });
    return { meta, links };
  },
  component: Billetterie,
});

// --- Components ---

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-4 text-sm text-muted-foreground font-serif leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Billetterie() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  // Target date for countdown
  useEffect(() => {
    const targetDate = new Date(FESTIVAL_CONFIG.startDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await subscribeNewsletterFn({ data: { email } });
      if (res.error) {
        setStatus("error");
        setMsg(res.error);
      } else {
        setStatus("success");
        setMsg("Vous serez notifié dès l'ouverture !");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMsg("Une erreur est survenue.");
    }
  };

  const passes = [
    {
      name: "Pass Jour",
      price: "Bientôt disponible",
      desc: "Accès à une journée complète du festival",
      features: [
        "Accès au site du festival (The Village)",
        "Accès à tous les concerts de la journée",
        "Accès aux expositions et ateliers",
      ],
      color: "from-sky-500/10 to-blue-500/5",
      border: "border-sky-500/20",
    },
    {
      name: "Pass 3 Jours",
      price: "Bientôt disponible",
      desc: "L'expérience complète du Blues du Fleuve",
      features: [
        "Accès complet aux 3 jours du festival",
        "Accès prioritaire aux concerts",
        "Rencontres avec les artistes",
        "Cadeau de bienvenue",
      ],
      color: "from-primary/20 to-primary/5",
      border: "border-primary",
      popular: true,
    },
    {
      name: "Pass VIP",
      price: "Bientôt disponible",
      desc: "Vivez le festival dans des conditions exclusives",
      features: [
        "Accès complet aux 3 jours",
        "Accès à l'espace VIP avec vue imprenable",
        "Boissons et catering inclus",
        "Parking réservé",
        "Accès backstage (selon disponibilités)",
      ],
      color: "from-amber-500/20 to-orange-500/5",
      border: "border-amber-500/30",
    },
  ];

  const faqs = [
    {
      q: "Quels sont les moyens de paiement acceptés ?",
      a: "Nous accepterons les paiements par carte bancaire (Visa, Mastercard), Orange Money, Wave et Free Money via notre partenaire PayDunya.",
    },
    {
      q: "Les billets sont-ils remboursables ?",
      a: "Les billets ne sont pas remboursables, sauf en cas d'annulation du festival de notre part. Ils peuvent cependant être cédés à une autre personne.",
    },
    {
      q: "L'accès est-il gratuit pour les enfants ?",
      a: "L'accès est gratuit pour les enfants de moins de 12 ans accompagnés d'un adulte muni d'un billet valide.",
    },
    {
      q: "Comment récupérer mon billet ?",
      a: "Suite à votre achat, vous recevrez un e-billet avec un QR code par email. Vous pourrez le présenter sur votre smartphone ou l'imprimer pour accéder au festival.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* ──────────────── HERO SECTION ──────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a1628]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${crowdImg})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a1628]/80 via-[#0a1628]/60 to-background" />

        <div className="relative z-10 container-page text-center py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/20 backdrop-blur-md mb-8"
          >
            <Ticket className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-white font-bold">
              Édition {FESTIVAL_CONFIG.editionYear}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 uppercase tracking-tight text-white drop-shadow-lg"
          >
            Billetterie <span className="text-primary">Officielle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 font-serif max-w-2xl mx-auto mb-12"
          >
            Préparez-vous à vivre une expérience inoubliable au cœur du Fouta Toro. Les pass pour le prochain festival Les Blues du Fleuve seront bientôt disponibles.
          </motion.p>

          {/* Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm font-medium uppercase tracking-widest"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Bientôt</span>
            </div>
            <div className="hidden sm:block text-white/30">•</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Podor, Sénégal</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── COUNTDOWN & NOTIFICATION ──────────────── */}
      <section id="notify-form" className="container-page -mt-16 relative z-20 mb-24">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Countdown */}
            <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-border pb-8 md:pb-0 md:pr-12">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground mb-6">
                Ouverture dans
              </h2>
              <div className="flex justify-center md:justify-start gap-4">
                {[
                  { label: "Jours", value: timeLeft.days },
                  { label: "Heures", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Sec", value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-2xl flex items-center justify-center mb-2 shadow-inner border border-border/50">
                      <span className="font-display text-3xl md:text-4xl font-black text-primary">
                        {item.value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notify Form */}
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground mb-4">
                Soyez les premiers informés
              </h2>
              <p className="text-sm text-muted-foreground font-serif mb-6">
                Inscrivez-vous pour recevoir une alerte par email dès l'ouverture officielle de la billetterie.
              </p>
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-primary text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? "..." : "M'avertir"}
                </button>
              </form>
              {msg && (
                <p
                  className={`mt-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    status === "success" ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {status === "success" && <CheckCircle2 className="w-4 h-4" />}
                  {msg}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── PRICING CARDS ──────────────── */}
      <section className="container-page py-16">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-primary mb-3 block font-bold">
            Les Tarifs
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
            Choisissez votre <span className="text-primary">Pass</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {passes.map((pass, i) => (
            <motion.div
              key={pass.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative bg-card rounded-3xl p-8 border-2 ${pass.border} shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col`}
            >
              {pass.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Le plus demandé
                </div>
              )}
              <div className="text-center pb-8 border-b border-border mb-8">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                  {pass.name}
                </h3>
                <p className="text-sm text-muted-foreground font-serif min-h-10 mb-6">
                  {pass.desc}
                </p>
                <div className="luxury-text text-3xl md:text-4xl text-primary mb-2">
                  {pass.price}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Tarif indicatif
                </span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {pass.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground font-serif leading-relaxed">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('notify-form')?.scrollIntoView({ behavior: 'smooth' });
                  document.getElementById('email-input')?.focus();
                }}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 cursor-pointer ${
                  pass.popular
                    ? "bg-primary text-white border border-primary shadow-lg"
                    : "bg-card text-primary border-2 border-primary hover:bg-primary/5"
                }`}
              >
                M'avertir de l'ouverture
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="bg-muted/30 border-t border-border py-24 mt-16">
        <div className="container-page max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              Des questions ?
            </span>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
              Foire Aux Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
