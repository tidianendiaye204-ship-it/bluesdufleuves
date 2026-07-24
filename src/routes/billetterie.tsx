import { createFileRoute } from "@tanstack/react-router";
import {
  Ticket,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Bell,
  X,
  Download,
  ShieldCheck,
  Wallet,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { createSeoMeta, createStructuredData } from "@/lib/seo";
import { subscribeNewsletterFn } from "@/routes/__root";
import { FESTIVAL_CONFIG } from "@/config/festival";
import { OptimizedImage } from "@/components/OptimizedImage";
import { MagneticButton } from "@/components/MagneticButton";

// Import images
import crowdImg from "@/assets/festival-crowd.webp";

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

    const structuredData = createStructuredData("Event", {
      name: "Billetterie Festival Blues du Fleuve 19ème édition",
      startDate: FESTIVAL_CONFIG.startDate,
      endDate: FESTIVAL_CONFIG.endDate,
      locationName: "The Village Podor",
      city: "Podor",
      country: "Sénégal",
      description:
        "Billetterie officielle pour réserver vos pass pour le festival Blues du Fleuve au centre culturel The Village Podor.",
      image: "/festival-crowd.webp",
      url: "https://lesbluesdufleuve.sn/billetterie",
      organizer: "The Village Podor",
      organizerUrl: "https://lesbluesdufleuve.sn",
      ticketUrl: "https://lesbluesdufleuve.sn/billetterie",
      price: "5000",
      priceCurrency: "XOF",
    });

    const scripts = [
      {
        type: "application/ld+json",
        innerHTML: structuredData,
      },
    ];

    return { meta, links, scripts };
  },
  component: Billetterie,
});

// --- Components ---

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const faqId = `faq-ans-${q.replace(/\s+/g, "-").toLowerCase().replace(/[?']/g, "")}`;

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:border-primary/20">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={faqId}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-foreground hover:bg-muted/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={faqId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pt-2 text-sm text-muted-foreground font-serif leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface Pass {
  name: string;
  priceValue: string;
  priceLabel: string;
  desc: string;
  features: string[];
  color: string;
  border: string;
  popular?: boolean;
}

function Billetterie() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], ["0%", "50%"]);

  // Checkout Modal State
  const [selectedPass, setSelectedPass] = useState<Pass | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"wave" | "orange" | "card">("wave");
  const [checkoutStep, setCheckoutStep] = useState<
    "personal_info" | "payment" | "processing" | "success"
  >("personal_info");
  const [generatedTicketId, setGeneratedTicketId] = useState("");

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
        setMsg(t("tickets.notifySuccess") || "Vous serez notifié dès l'ouverture !");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMsg(t("contact.errorMessage"));
    }
  };

  const openCheckout = (pass: Pass) => {
    setSelectedPass(pass);
    setIsCheckoutOpen(true);
    setCheckoutStep("personal_info");
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setSelectedPass(null);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === "personal_info") {
      setCheckoutStep("payment");
      return;
    }
    setCheckoutStep("processing");
    setTimeout(() => {
      setCheckoutStep("success");
      const randomId = `VLG-${FESTIVAL_CONFIG.editionYear}-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedTicketId(randomId);
    }, 2000);
  };

  const downloadTicketSVG = () => {
    const svgEl = document.getElementById("e-ticket-svg");
    if (!svgEl) return;
    const svgString = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `ticket-${firstName.toLowerCase()}-${lastName.toLowerCase()}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const passes: Pass[] = [
    {
      name: t("tickets.passDay"),
      priceValue: "5 000 FCFA",
      priceLabel: "5 000 FCFA",
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
      name: t("tickets.pass3Days"),
      priceValue: "12 000 FCFA",
      priceLabel: "12 000 FCFA",
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
      name: t("tickets.passVIP"),
      priceValue: "30 000 FCFA",
      priceLabel: "30 000 FCFA",
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
      a: "Nous acceptons les paiements en ligne par carte bancaire (Visa, Mastercard), Orange Money, Wave et Free Money.",
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
      a: "Suite à votre achat simulé, vous pouvez télécharger immédiatement votre e-billet au format SVG ou le conserver à l'écran. Il contient un QR code pour valider votre entrée.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* ──────────────── HERO SECTION ──────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a1628]">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 opacity-40 scale-110"
          style={{ y: heroY }}
        >
          <OptimizedImage src={crowdImg} alt="Festival Crowd" className="w-full h-full object-cover" priority />
        </motion.div>
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
            {t("tickets.title").split(" ")[0]}{" "}
            <span className="text-primary">{t("tickets.title").split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 font-serif max-w-2xl mx-auto mb-12"
          >
            Préparez-vous à vivre une expérience inoubliable au cœur du Fouta Toro. Réservez dès
            maintenant vos pass officiels pour le festival Les Blues du Fleuve.
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
              <span>{FESTIVAL_CONFIG.dateTexte}</span>
            </div>
            <div className="hidden sm:block text-white/30">•</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{FESTIVAL_CONFIG.location}</span>
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
                {t("tickets.faqTitle")}
              </h2>
              <p className="text-sm text-muted-foreground font-serif mb-6">
                Inscrivez-vous pour recevoir les dernières actualités et des invitations exclusives
                par email.
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
                    placeholder={t("footer.placeholder")}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-primary text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? "..." : t("footer.subscribe")}
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
            {t("tickets.subtitle").split(" ")[0]}{" "}
            <span className="text-primary">
              {t("tickets.subtitle").split(" ").slice(1).join(" ")}
            </span>
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
              className={`relative glass-dark rounded-3xl p-8 border-2 ${pass.border} shadow-2xl hover:shadow-[0_20px_50px_rgba(202,138,4,0.15)] transition-all duration-500 flex flex-col group hover:-translate-y-2`}
            >
              {pass.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-black text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg shadow-amber-500/20">
                  {t("tickets.popular")}
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
                  TARIF À VENIR
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Prochainement disponible
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

              <MagneticButton className="w-full block">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // openCheckout(pass);
                    // Bientôt disponible - En attente des clés d'API
                  }}
                  disabled={true}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all cursor-not-allowed opacity-70 ${
                    pass.popular
                      ? "bg-primary text-white border border-primary shadow-lg"
                      : "bg-card text-primary border-2 border-primary"
                  }`}
                >
                  Bientôt disponible
                </button>
              </MagneticButton>
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
              {t("tickets.faqTitle")}
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── CHECKOUT MODAL ──────────────── */}
      <AnimatePresence>
        {isCheckoutOpen && selectedPass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCheckout}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                    {checkoutStep === "success"
                      ? t("tickets.paymentSuccess")
                      : t("tickets.checkoutTitle")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("tickets.passTypeLabel")} :{" "}
                    <span className="font-bold text-primary">{selectedPass.name}</span>
                  </p>
                </div>
                <button
                  onClick={closeCheckout}
                  className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 overflow-x-hidden">
                <AnimatePresence mode="wait">
                  {checkoutStep === "personal_info" && (
                    <motion.form
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setCheckoutStep("payment");
                      }}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                            htmlFor="chk-firstname"
                          >
                            {t("tickets.firstName")}
                          </label>
                          <input
                            id="chk-firstname"
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                            htmlFor="chk-lastname"
                          >
                            {t("tickets.lastName")}
                          </label>
                          <input
                            id="chk-lastname"
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                            htmlFor="chk-email"
                          >
                            {t("tickets.email")}
                          </label>
                          <input
                            id="chk-email"
                            type="email"
                            required
                            value={checkoutEmail}
                            onChange={(e) => setCheckoutEmail(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                            htmlFor="chk-phone"
                          >
                            {t("tickets.phone")}
                          </label>
                          <input
                            id="chk-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                            placeholder="+221 ..."
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Continuer</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.form>
                  )}

                  {checkoutStep === "payment" && (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleCheckoutSubmit}
                      className="space-y-6"
                    >
                      <div className="bg-muted/30 p-4 rounded-xl border border-border">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                          Récapitulatif
                        </h4>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-foreground">{selectedPass.name}</span>
                          <span className="text-primary font-black text-lg">
                            {selectedPass.priceLabel}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                          {t("tickets.paymentMethod")}
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            {
                              id: "wave",
                              label: "Wave",
                              color: "bg-blue-600/10 text-blue-600 border-blue-600/30",
                              selectColor: "ring-2 ring-blue-600 border-blue-600",
                            },
                            {
                              id: "orange",
                              label: "Orange",
                              color: "bg-orange-500/10 text-orange-500 border-orange-500/30",
                              selectColor: "ring-2 ring-orange-500 border-orange-500",
                            },
                            {
                              id: "card",
                              label: "Carte",
                              color: "bg-neutral-600/10 text-foreground border-neutral-600/30",
                              selectColor: "ring-2 ring-foreground border-foreground",
                            },
                          ].map((method) => (
                            <div
                              key={method.id}
                              onClick={() =>
                                setPaymentMethod(method.id as "orange" | "wave" | "card")
                              }
                              className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all hover:scale-102 ${paymentMethod === method.id ? method.selectColor : "border-border bg-card"}`}
                            >
                              {method.id === "card" ? (
                                <CreditCard className="w-6 h-6 mb-2" />
                              ) : (
                                <Wallet className="w-6 h-6 mb-2" />
                              )}
                              <span className="text-xs font-bold uppercase tracking-wide">
                                {method.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                        <p className="text-xs text-muted-foreground leading-normal font-serif">
                          Transactions sécurisées.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep("personal_info")}
                          className="flex-1 bg-muted text-foreground font-bold uppercase tracking-widest text-xs py-4 rounded-xl border border-border hover:bg-muted/80 transition-all hover:scale-102 cursor-pointer"
                        >
                          Retour
                        </button>
                        <button
                          type="submit"
                          className="flex-2 bg-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>{t("tickets.processPayment")}</span>
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {checkoutStep === "processing" && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 space-y-4"
                    >
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-semibold tracking-wide text-foreground uppercase animate-pulse">
                        {t("tickets.processing")}
                      </p>
                    </motion.div>
                  )}

                  {checkoutStep === "success" && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-8 flex flex-col items-center py-4"
                    >
                      {/* SVG Premium E-Ticket */}
                      <div className="w-full max-w-md border-4 border-border rounded-3xl overflow-hidden shadow-2xl bg-[#091526] text-white">
                        <svg
                          id="e-ticket-svg"
                          viewBox="0 0 400 600"
                          className="w-full h-auto block"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fef3c7" />
                              <stop offset="50%" stopColor="#d97706" />
                              <stop offset="100%" stopColor="#78350f" />
                            </linearGradient>
                          </defs>
                          {/* Background */}
                          <rect width="400" height="600" fill="#091526" />

                          {/* Inner Border */}
                          <rect
                            x="15"
                            y="15"
                            width="370"
                            height="570"
                            fill="none"
                            stroke="url(#goldGradient)"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                            rx="10"
                          />

                          {/* Top banner / branding */}
                          <text
                            x="200"
                            y="55"
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="900"
                            letterSpacing="5"
                            textAnchor="middle"
                          >
                            THE VILLAGE · PODOR
                          </text>
                          <text
                            x="200"
                            y="80"
                            fill="url(#goldGradient)"
                            fontSize="16"
                            fontWeight="bold"
                            letterSpacing="2"
                            textAnchor="middle"
                          >
                            FESTIVAL BLUES DU FLEUVE
                          </text>

                          {/* Line separation */}
                          <line
                            x1="30"
                            y1="110"
                            x2="370"
                            y2="110"
                            stroke="url(#goldGradient)"
                            strokeWidth="1"
                            opacity="0.6"
                          />

                          {/* Main Event info */}
                          <text
                            x="200"
                            y="150"
                            fill="#94a3b8"
                            fontSize="9"
                            fontWeight="bold"
                            letterSpacing="2"
                            textAnchor="middle"
                          >
                            EVENEMENT
                          </text>
                          <text
                            x="200"
                            y="175"
                            fill="#ffffff"
                            fontSize="18"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            19ÈME ÉDITION 2026
                          </text>

                          <text
                            x="200"
                            y="215"
                            fill="#94a3b8"
                            fontSize="9"
                            fontWeight="bold"
                            letterSpacing="2"
                            textAnchor="middle"
                          >
                            TITULAIRE
                          </text>
                          <text
                            x="200"
                            y="235"
                            fill="#ffffff"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle"
                          >{`${firstName} ${lastName}`}</text>

                          {/* Pass Info Card */}
                          <rect
                            x="50"
                            y="265"
                            width="300"
                            height="80"
                            fill="rgba(202, 138, 4, 0.1)"
                            stroke="rgba(202, 138, 4, 0.3)"
                            strokeWidth="1"
                            rx="8"
                          />
                          <text
                            x="200"
                            y="295"
                            fill="#ca8a04"
                            fontSize="10"
                            fontWeight="bold"
                            letterSpacing="3"
                            textAnchor="middle"
                          >
                            TYPE DE PASS
                          </text>
                          <text
                            x="200"
                            y="325"
                            fill="#ffffff"
                            fontSize="20"
                            fontWeight="900"
                            letterSpacing="1"
                            textAnchor="middle"
                          >
                            {selectedPass.name.toUpperCase()}
                          </text>

                          {/* Barcode/QR Separator */}
                          <line
                            x1="30"
                            y1="380"
                            x2="370"
                            y2="380"
                            stroke="#ca8a04"
                            strokeWidth="1.5"
                            strokeDasharray="8 6"
                            opacity="0.5"
                          />

                          {/* QR Code Pixel Grid Representation */}
                          <g transform="translate(140, 410)">
                            {/* Outer QR box */}
                            <rect width="120" height="120" fill="#ffffff" rx="6" />
                            {/* Top-Left Finder pattern */}
                            <rect x="10" y="10" width="30" height="30" fill="#091526" />
                            <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                            <rect x="20" y="20" width="10" height="10" fill="#091526" />
                            {/* Top-Right Finder pattern */}
                            <rect x="80" y="10" width="30" height="30" fill="#091526" />
                            <rect x="85" y="15" width="20" height="20" fill="#ffffff" />
                            <rect x="90" y="20" width="10" height="10" fill="#091526" />
                            {/* Bottom-Left Finder pattern */}
                            <rect x="10" y="80" width="30" height="30" fill="#091526" />
                            <rect x="15" y="85" width="20" height="20" fill="#ffffff" />
                            <rect x="20" y="90" width="10" height="10" fill="#091526" />
                            {/* Simulated pixels */}
                            <rect x="50" y="20" width="10" height="10" fill="#091526" />
                            <rect x="60" y="30" width="10" height="10" fill="#091526" />
                            <rect x="50" y="50" width="20" height="10" fill="#091526" />
                            <rect x="80" y="50" width="10" height="20" fill="#091526" />
                            <rect x="90" y="80" width="20" height="10" fill="#091526" />
                            <rect x="50" y="80" width="10" height="30" fill="#091526" />
                            <rect x="70" y="90" width="10" height="10" fill="#091526" />
                            <rect x="90" y="100" width="10" height="10" fill="#091526" />
                          </g>

                          {/* Ticket Code */}
                          <text
                            x="200"
                            y="555"
                            fill="#94a3b8"
                            fontSize="11"
                            fontWeight="bold"
                            letterSpacing="4"
                            textAnchor="middle"
                          >
                            {generatedTicketId}
                          </text>
                          <text
                            x="200"
                            y="575"
                            fill="#ca8a04"
                            fontSize="8"
                            fontWeight="bold"
                            letterSpacing="1"
                            textAnchor="middle"
                          >
                            ENTRÉE VALABLE UNIQUE
                          </text>
                        </svg>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button
                          onClick={downloadTicketSVG}
                          className="flex-1 bg-primary text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>{t("tickets.downloadTicket")}</span>
                        </button>
                        <button
                          onClick={closeCheckout}
                          className="flex-1 bg-muted text-foreground font-bold uppercase tracking-widest text-xs py-4 rounded-xl border border-border hover:bg-muted/80 transition-all hover:scale-102 cursor-pointer"
                        >
                          {t("tickets.back")}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
