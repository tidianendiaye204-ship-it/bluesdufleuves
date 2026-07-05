import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  CheckCircle2,
  ChevronDown,
  User,
  MessageSquare,
} from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { getDb, withRetry } from "@/lib/db";
import { contacts } from "@/db/schema";
import { z } from "zod";
import { createSeoMeta } from "@/lib/seo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { getCSRFToken, validateCSRFTokenServer } from "@/lib/csrf";
import { logger } from "@/lib/logger";

const contactSchema = z.object({
  nom: z.string().min(1, "Le nom complet est requis"),
  email: z.string().email("Adresse email invalide"),
  sujet: z.string().min(1, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
  cfTurnstileResponse: z.string().min(1, "Veuillez valider le captcha"),
  csrfToken: z.string().min(1, "Token de sécurité invalide"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const soumettreContact = createServerFn({ method: "POST" })
  .inputValidator((data: ContactFormValues) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const csrfValidation = await validateCSRFTokenServer({ data: { token: data.csrfToken } });
    if (!csrfValidation.valid) {
      logger.warn("CSRF token validation failed", { email: data.email });
      throw new Error("Token de sécurité invalide. Veuillez réessayer.");
    }

    logger.info("Contact form submission received", { email: data.email, sujet: data.sujet });

    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
      logger.error("TURNSTILE_SECRET_KEY not configured");
      throw new Error("Service de validation temporairement indisponible.");
    }

    try {
      const tsResponse = await fetch(verifyUrl, {
        method: "POST",
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(data.cfTurnstileResponse)}`,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });

      const tsResult = (await tsResponse.json()) as { success: boolean };
      if (!tsResult.success) {
        logger.warn("Turnstile validation failed", { email: data.email });
        throw new Error("Validation Captcha échouée.");
      }
    } catch (error) {
      logger.error("Turnstile verification error", error, { email: data.email });
      throw new Error("Service de validation temporairement indisponible.");
    }

    const db = getDb();

    try {
      await withRetry(async () => {
        await db.insert(contacts).values({
          nom: data.nom,
          email: data.email,
          sujet: data.sujet,
          message: data.message,
          dateEnvoi: new Date(),
          statut: "non_lu",
        });
      });

      logger.info("Contact message saved successfully", { email: data.email });
      return { success: true, message: "Votre message a été envoyé avec succès." };
    } catch (error) {
      logger.error("Erreur d'insertion DB (Contact)", error, { email: data.email });
      throw new Error("Impossible d'envoyer le message. Veuillez réessayer plus tard.");
    }
  });

export const Route = createFileRoute("/contact")({
  head: () => {
    const { meta, links } = createSeoMeta({
      title: "Contactez-nous | The Village Podor",
      description:
        "Prenez contact avec l'équipe de The Village Podor et du festival Les Blues du Fleuve à Podor, Sénégal. Nous sommes à votre écoute pour vos questions, partenariats et formations.",
      ogTitle: "Contactez The Village — Podor",
      ogDescription:
        "L'équipe de The Village et du festival Blues du Fleuve vous accueille à Podor. Formulaire de contact et coordonnées disponibles.",
      keywords:
        "The Village, contact, Blues du Fleuve, Podor, formulaire, email, téléphone, festival Sénégal",
      canonical: "https://lesbluesdufleuve.sn/contact",
    });
    return { meta, links };
  },
  component: ContactPage,
});

// ── Floating-label input ──────────────────────────────────────────────────────
function FloatingInput({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registration,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  registration: object;
}) {
  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        {...registration}
        placeholder=" "
        aria-invalid={error ? "true" : "false"}
        className={`peer w-full bg-background/60 border-2 ${
          error ? "border-red-400" : "border-border group-hover:border-primary/40"
        } rounded-xl px-4 pt-6 pb-3 text-base text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-all duration-200`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground
          peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary
          peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary`}
      >
        {label}
      </label>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/50 pointer-events-none">
        {placeholder}
      </span>
      {error && (
        <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/30 rounded-2xl overflow-hidden glass-dark">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-sm text-white/70 font-serif leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Main component ────────────────────────────────────────────────────────────
function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [sentData, setSentData] = useState<{ nom: string; email: string; sujet: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [sujetOpen, setSujetOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], ["0%", "40%"]);

  const { ref: formRef, visible: formVisible } = useReveal();
  const { ref: infoRef, visible: infoVisible } = useReveal();
  const { ref: faqRef, visible: faqVisible } = useReveal();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: "",
      email: "",
      sujet: "",
      message: "",
      cfTurnstileResponse: "",
      csrfToken: "",
    },
  });

  const selectedSujet = watch("sujet");

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const result = await getCSRFToken();
        setCsrfToken(result.token);
        setValue("csrfToken", result.token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCSRFToken();
  }, [setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    setFormError(null);
    try {
      const result = await soumettreContact({ data });
      if (result.success) {
        setSentData({ nom: data.nom, email: data.email, sujet: data.sujet });
        setSent(true);
        setTimeout(() => {
          reset();
          setSent(false);
          setSentData(null);
        }, 8000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
      setFormError(t("contact.errorMessage") || "Une erreur est survenue lors de l'envoi de votre message.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Adresse",
      lines: [
        'Siège du Festival "Les Blues du Fleuve"',
        "Quartier historique, Podor",
        "Région de Saint-Louis, Sénégal",
      ],
      color: "from-emerald-500/20 to-emerald-500/5",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Phone,
      title: "Téléphone",
      lines: ["+221 77 496 75 31", "+221 33 XXX XX XX"],
      color: "from-sky-500/20 to-sky-500/5",
      iconBg: "bg-sky-500/10",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["contact@lesbluesdufleuve.sn", "presse@lesbluesdufleuve.sn"],
      color: "from-violet-500/20 to-violet-500/5",
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
      icon: Clock,
      title: "Disponibilité",
      lines: ["Lun – Ven : 9h – 18h", "Sam : 9h – 13h"],
      color: "from-amber-500/20 to-amber-500/5",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  const faqs = [
    {
      q: "Comment participer au festival en tant qu'artiste ?",
      a: "Envoyez votre dossier artistique (bio, liens vers vos œuvres, contacts) via le formulaire en sélectionnant 'Candidature artiste'. Notre équipe de programmation examinera votre candidature.",
    },
    {
      q: "Des partenariats sont-ils possibles avec The Village ?",
      a: "Oui ! The Village accueille des partenariats institutionnels, culturels et économiques. Sélectionnez 'Partenariat' dans le formulaire pour entrer en contact avec notre équipe dédiée.",
    },
    {
      q: "Comment accéder aux formations proposées par NANN-K ?",
      a: "Les formations sont ouvertes à tous. Rendez-vous sur la page Formations ou écrivez-nous directement. Nous vous communiquerons le calendrier et les modalités d'inscription.",
    },
    {
      q: "Quel est le délai de réponse habituel ?",
      a: "Notre équipe s'engage à répondre sous 48h ouvrées. Pour les demandes urgentes (presse, accréditations), précisez-le dans votre message.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* ──────────────── HERO ──────────────── */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center py-32">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-110"
          style={{ backgroundImage: "url(/arriereplan-contact.jpg)", y: heroY }}
        />
        {/* Overlay gradient pour mieux fondre l'image */}
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/80 to-background" />
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        {/* Animated dots grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container-page text-center max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
              Échangeons ensemble
            </span>
          </div>
          <h1 className="luxury-text text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none text-foreground">
            Nous <span className="text-gradient-gold">Contacter</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-serif max-w-2xl mx-auto">
            Une question sur le festival, un projet de partenariat ou une demande d'information sur
            nos formations au{" "}
            <Link to="/" className="text-sky-300 hover:underline font-medium">
              The Village Podor
            </Link>{" "}
            ? Notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      {/* ──────────────── CONTACT CARDS ──────────────── */}
      <section className="container-page -mt-8 mb-4 relative z-10">
        <div ref={infoRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`glass-dark border border-border/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500 group ${
                  infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-2">
                  {item.title}
                </h3>
                {item.lines.map((line) => (
                  <p key={line} className="text-sm text-white/70 font-serif">
                    {line}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────── FORM + SOCIAL ──────────────── */}
      <section className="container-page py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left column – context + social */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
                Nos Coordonnées
              </span>
              <h2 className="font-display text-3xl font-bold mb-4 uppercase tracking-tight text-foreground">
                L'équipe à Podor
              </h2>
              <p className="font-serif text-muted-foreground text-base leading-relaxed">
                Basé au cœur du Fouta Toro, le festival rayonne depuis Podor pour célébrer la
                culture Halpulaar et le développement de la vallée du fleuve Sénégal.
              </p>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-border/30 glass-dark shadow-xl h-80">
              <iframe
                title="Localisation Podor, Sénégal"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-14.976%2C16.604%2C-14.929%2C16.638&layer=mapnik&marker=16.621%2C-14.953"
                className="w-full h-full"
                loading="lazy"
              />
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary mb-4 font-bold">
                Suivez-nous
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/lesbluesdufleuve",
                    label: "Facebook",
                    bg: "hover:bg-blue-600",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/lesbluesdufleuve",
                    label: "Instagram",
                    bg: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
                  },
                  {
                    icon: Youtube,
                    href: "https://www.youtube.com/@lesbluesdufleuve",
                    label: "YouTube",
                    bg: "hover:bg-red-600",
                  },
                ].map(({ icon: SocialIcon, href, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-11 h-11 rounded-xl border border-border/30 glass-dark flex items-center justify-center text-white hover:text-white ${bg} hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                  >
                    <SocialIcon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column – form */}
          <div
            ref={formRef}
            className={`lg:col-span-8 transition-all duration-700 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="glass-dark border border-border/30 rounded-3xl shadow-xl overflow-hidden">
              {/* Form header */}
              <div className="bg-linear-to-r from-primary/10 to-sky-500/10 border-b border-border px-8 py-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  Envoyez-nous un message
                </h3>
                <p className="text-sm text-muted-foreground font-serif mt-1">
                  Réponse garantie sous 48h ouvrées
                </p>
              </div>

              <div className="p-8">
                {sent ? (
                  /* ── Success state ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-10 space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white mb-2">
                        {t("contact.successTitle")}
                      </h3>
                      <p className="text-muted-foreground font-serif max-w-xs mx-auto">
                        {t("contact.successMessage")}
                      </p>
                    </div>
                    {sentData && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-3 border border-border/30"
                      >
                        <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Récapitulatif</p>
                        <div className="flex items-center gap-3 text-sm text-white">
                          <User size={14} className="text-white/60 shrink-0" />
                          <span>{sentData.nom}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white">
                          <Mail size={14} className="text-white/60 shrink-0" />
                          <span>{sentData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white">
                          <MessageSquare size={14} className="text-white/60 shrink-0" />
                          <span>{sentData.sujet}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {formError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-sm font-medium">
                        {formError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput
                        id="nom"
                        label="Nom complet *"
                        placeholder="Votre nom"
                        error={errors.nom?.message}
                        registration={register("nom")}
                      />
                      <FloatingInput
                        id="email"
                        type="email"
                        label="Email *"
                        placeholder="vous@exemple.com"
                        error={errors.email?.message}
                        registration={register("email")}
                      />
                    </div>

                    {/* Sujet select-style custom */}
                    <div className="relative group">
                      <input type="hidden" {...register("sujet")} />
                      <button
                        type="button"
                        onClick={() => setSujetOpen(!sujetOpen)}
                        className={`peer w-full text-left bg-background/60 border-2 ${
                          errors.sujet
                            ? "border-red-400"
                            : "border-border group-hover:border-primary/40"
                        } rounded-xl px-4 pt-6 pb-3 text-base text-foreground focus:outline-none focus:border-primary transition-all duration-200 cursor-pointer`}
                      >
                        {selectedSujet || <span className="text-transparent">Sujet</span>}
                      </button>
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none font-semibold uppercase tracking-wider
                          ${selectedSujet || sujetOpen ? "top-1.5 text-xs text-primary" : "top-4 text-sm text-muted-foreground"}
                        `}
                      >
                        Sujet *
                      </label>
                      <ChevronDown
                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none transition-transform duration-300 ${sujetOpen ? "rotate-180" : ""}`}
                      />

                      <AnimatePresence>
                        {sujetOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 glass-dark border border-border/30 rounded-xl shadow-2xl overflow-hidden py-1"
                          >
                            {[
                              "Information générale",
                              "Partenariat",
                              "Candidature artiste",
                              "Formations NANN-K",
                              "Presse / Accréditation",
                              "Billetterie",
                              "Autre",
                            ].map((option) => (
                              <li key={option}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setValue("sujet", option, { shouldValidate: true });
                                    setSujetOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer ${selectedSujet === option ? "bg-white/5 text-primary font-semibold" : "text-white"}`}
                                >
                                  {option}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                      {errors.sujet && (
                        <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium" role="alert">
                          {errors.sujet.message}
                        </p>
                      )}
                    </div>

                    {/* Textarea */}
                    <div className="relative group">
                      <textarea
                        id="message"
                        rows={5}
                        {...register("message")}
                        placeholder=" "
                        aria-invalid={errors.message ? "true" : "false"}
                        className={`peer w-full bg-background/60 border-2 ${
                          errors.message
                            ? "border-red-400"
                            : "border-border group-hover:border-primary/40"
                        } rounded-xl px-4 pt-6 pb-3 text-base text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-all duration-200 resize-none`}
                      />
                      <label
                        htmlFor="message"
                        className={`absolute left-4 top-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200
                          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground
                          peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary
                          peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary`}
                      >
                        Votre message *
                      </label>
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1.5 ml-1 font-medium" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Captcha */}
                    <div className="space-y-1">
                      <Turnstile
                        siteKey={
                          import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"
                        }
                        onSuccess={(token) => {
                          setValue("cfTurnstileResponse", token, { shouldValidate: true });
                        }}
                      />
                      {errors.cfTurnstileResponse && (
                        <p className="text-red-400 text-xs mt-1 font-medium">
                          {errors.cfTurnstileResponse.message}
                        </p>
                      )}
                    </div>

                    <input type="hidden" {...register("csrfToken")} value={csrfToken} />

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={loading}
                      aria-busy={loading}
                      className="relative w-full overflow-hidden group inline-flex items-center justify-center gap-3 font-bold uppercase tracking-widest px-8 py-4 text-sm min-h-13 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
                        color: "#fff",
                        boxShadow: "0 4px 20px rgba(12, 74, 110, 0.4)",
                      }}
                    >
                      {/* Shine effect */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none" />
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send size={16} aria-hidden="true" />
                          {t("contact.submit")}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="bg-muted/10 border-t border-border py-24">
        <div
          ref={faqRef}
          className={`container-page max-w-3xl mx-auto transition-all duration-700 ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-primary mb-3 block font-bold">
              Questions fréquentes
            </span>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
              FAQ
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
