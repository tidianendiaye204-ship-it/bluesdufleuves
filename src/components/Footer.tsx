import {
  Youtube,
  Facebook,
  Instagram,
  Mail,
  ArrowUp,
  Heart,
  MapPin,
  Phone,
  ExternalLink,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { subscribeNewsletterFn } from "@/routes/__root";

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    try {
      const res = await subscribeNewsletterFn({ data: { email } });
      if (res.error) {
        setStatus("error");
        setMsg(res.error);
      } else {
        setStatus("success");
        setMsg(t("footer.thankYou"));
        setEmail("");
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setMsg(t("footer.unexpectedError"));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { to: "/", labelKey: "footer.centerLabel" },
    { to: "/blues-du-fleuve", labelKey: "footer.festivalLabel" },
    { to: "/billetterie", labelKey: "footer.ticketsLabel" },
    { to: "/nann-k-media", labelKey: "footer.nannkLabel" },
    { to: "/formations", labelKey: "footer.formationsLabel" },
    { to: "/contact", labelKey: "footer.contactLabel" },
  ];

  return (
    <footer className="relative bg-[#04111f] text-white overflow-hidden">
      {/* Ligne supérieure Bleu Fleuve */}
      <div className="h-1 w-full bg-linear-to-r from-primary via-sky-500 to-cyan-400" />

      {/* Halos décoratifs discrets */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="container-page py-16 md:py-20 relative z-10">
        {/* Grille principale 12 colonnes */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Colonne 1 : Identité & Coordonnées (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3.5 group" onClick={scrollToTop}>
              <img
                src="/logo-the-village.webp"
                alt="The Village Podor"
                className="h-12 w-12 rounded-xl object-contain bg-white/95 p-1 shadow-md"
              />
              <div className="flex flex-col">
                <span className="luxury-text text-2xl sm:text-3xl uppercase tracking-tighter text-white group-hover:text-sky-300 transition-colors">
                  The <span className="text-sky-400">Village</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-sky-300/80 font-bold">
                  Blues du Fleuve · NANN-K
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/75 leading-relaxed font-serif max-w-sm">
              {t("footer.brandDesc")}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-white/75 pt-2">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 border border-white/10 text-sky-400">
                  <MapPin size={15} />
                </span>
                <span>Avenue Cheikh Oumar TALL, Podor, Sénégal</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 border border-white/10 text-sky-400">
                  <Phone size={15} />
                </span>
                <a href="tel:+221339179481" className="hover:text-sky-300 transition-colors">
                  +221 33 917 94 81
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 border border-white/10 text-sky-400">
                  <Mail size={15} />
                </span>
                <a
                  href="mailto:contact@levillagepodor.com"
                  className="hover:text-sky-300 transition-colors break-all"
                >
                  contact@levillagepodor.com
                </a>
              </div>
            </div>
          </div>

          {/* Colonne 2 : Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-300 mb-5">
              {t("footer.navigation")}
            </h2>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors py-1"
                  >
                    <span className="w-0 h-px bg-sky-400 group-hover:w-3 transition-all duration-300" />
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Temps Forts & Liens Officiels (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-300 mb-5">
              Temps Forts 2026
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/blues-du-fleuve"
                  onClick={scrollToTop}
                  className="block rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-3 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-sky-300">
                    <Sparkles size={11} /> 27 Nov 2026
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-white">
                    Théâtre Daniel Sorano
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blues-du-fleuve"
                  onClick={scrollToTop}
                  className="block rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-3 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-sky-300">
                    <Calendar size={11} /> 04–06 Déc 2026
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-white">
                    18ème Édition · Podor
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="https://lesbluesdufleuve.com/"
                  target="_blank"
                  rel="noopener"
                  title="Site officiel du Festival Les Blues du Fleuve"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-white transition-colors pt-1"
                >
                  <span>lesbluesdufleuve.com</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter & Réseaux Sociaux (4 cols) */}
          <div id="newsletter" className="lg:col-span-4 space-y-8">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 sm:p-6">
              <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-300 mb-2">
                {t("footer.editorLetter")}
              </h2>
              <p className="text-xs sm:text-sm text-white/75 mb-5 font-serif leading-relaxed">
                {t("footer.newsletterDesc")}
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
                <div className="relative flex-1 group">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-sky-400 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.placeholder")}
                    className="w-full rounded-full border border-white/15 bg-white/8 pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 focus:bg-white/12 transition-all text-white placeholder:text-white/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative overflow-hidden rounded-full bg-sky-500 hover:bg-sky-400 px-6 py-3 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-sky-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "loading" ? t("footer.sending") : t("footer.subscribe")}
                  </span>
                </button>
              </form>
              {msg && (
                <p
                  className={`mt-3 text-xs font-bold flex items-center gap-2 ${status === "success" ? "text-emerald-400" : "text-red-400"}`}
                >
                  {status === "success" && <Heart size={13} className="fill-current" />}
                  {msg}
                </p>
              )}
            </div>

            {/* Réseaux Sociaux */}
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-300 mb-4">
                {t("footer.followAdventure")}
              </h2>
              <div className="flex items-center gap-3">
                {[
                  {
                    Icon: Youtube,
                    label: "YouTube",
                    to: "https://www.youtube.com/@nannktv",
                    hoverClass: "hover:bg-red-600 hover:border-red-600",
                  },
                  {
                    Icon: Facebook,
                    label: "Facebook",
                    to: "https://www.facebook.com/festivalbluesdufleuve",
                    hoverClass: "hover:bg-blue-600 hover:border-blue-600",
                  },
                  {
                    Icon: Instagram,
                    label: "Instagram",
                    to: "https://www.instagram.com/nannkmedia",
                    hoverClass: "hover:bg-pink-600 hover:border-pink-600",
                  },
                ].map(({ Icon, label, to, hoverClass }) => (
                  <a
                    key={label}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:text-white hover:-translate-y-0.5 ${hoverClass}`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre inférieure */}
      <div className="border-t border-white/10 relative z-10 bg-[#030c17]">
        <div className="container-page py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 text-center md:text-left">
              © {new Date().getFullYear()} The Village — Projet NANN-k. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Podor, Sénégal
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {t("footer.riverValley")}
              </span>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={t("footer.backToTop")}
              className="group inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/75 hover:text-sky-300 transition-colors py-2 px-4 border border-white/15 rounded-full hover:border-sky-400/40 cursor-pointer"
            >
              <span>{t("footer.topOfPage")}</span>
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
