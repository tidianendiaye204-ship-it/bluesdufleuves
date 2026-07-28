import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", labelKey: "nav.home" },
  { to: "/blues-du-fleuve", labelKey: "nav.festival" },
  { to: "/formations", labelKey: "nav.formations" },
  { to: "/nann-k-media", labelKey: "nav.media" },
  { to: "/contact", labelKey: "nav.contact" },
] as const;

export function Navbar() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isTransparent = !scrolled && !open;

  // Détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu au changement de route
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 ${
          scrolled || open
            ? "bg-background/95 backdrop-blur-2xl border-b border-border/50 shadow-sm py-2"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-14 md:h-20 gap-4 md:gap-8">
            {/* Logo / titre */}
            <div className="flex items-center shrink-0 gap-3">
              <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
                <img
                  src="/logo the village.webp"
                  alt="Logo The Village"
                  className="h-9 md:h-14 w-auto object-contain"
                />
                <div className="flex flex-col items-start">
                  <span
                    className={`luxury-text text-lg md:text-3xl xl:text-4xl uppercase tracking-tighter transition-colors ${isTransparent ? "text-white" : "text-foreground"}`}
                  >
                    The <span className="text-gradient-river">Village</span>
                  </span>
                  <span
                    className={`text-[5px] md:text-[6px] xl:text-[7px] uppercase tracking-[0.4em] font-semibold font-sans transition-colors ${isTransparent ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    blues des fleuves · NANN-k
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation desktop */}
            <nav
              className="hidden lg:flex items-center justify-center gap-7 xl:gap-10 flex-1"
              aria-label="Navigation principale"
              role="navigation"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-all nav-link whitespace-nowrap min-h-10 flex items-center hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-2 py-1 ${isTransparent ? "text-white" : "text-foreground"}`}
                  activeProps={{
                    className: "text-primary !after:w-full",
                  }}
                  activeOptions={{ exact: l.to === "/" }}
                  role="menuitem"
                >
                  {t(l.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Actions droite */}
            <div className="flex items-center gap-2 md:gap-5 shrink-0">
              {/* Theme toggle mobile */}
              <div className="md:hidden">
                <ThemeToggle />
              </div>

              {/* Sélecteur de langue desktop */}
              <div
                className={`hidden md:flex items-center gap-2 border-r pr-4 transition-colors ${isTransparent ? "border-white/20" : "border-border text-foreground"}`}
              >
                <button
                  onClick={() => i18n.changeLanguage("fr")}
                  className={`text-[8px] font-semibold tracking-widest transition-all ${
                    i18n.language === "fr"
                      ? "text-primary font-black"
                      : isTransparent
                        ? "text-white/80 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  FR
                </button>
                <span
                  className={`text-[8px] transition-colors ${isTransparent ? "text-white/30" : "text-muted-foreground/30"}`}
                >
                  |
                </span>
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`text-[8px] font-semibold tracking-widest transition-all ${
                    i18n.language === "en"
                      ? "text-primary font-black"
                      : isTransparent
                        ? "text-white/80 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Recherche desktop */}
              <div className="relative hidden md:flex items-center">
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className={`w-full h-8 px-3 text-sm rounded-l-full border-y border-l focus:outline-none transition-colors ${
                          isTransparent
                            ? "bg-white/10 border-white/20 text-white placeholder-white/50"
                            : "bg-background border-border text-foreground placeholder-muted-foreground"
                        }`}
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`h-8 w-8 items-center justify-center rounded-r-full transition-all duration-300 flex ${
                    searchOpen && isTransparent
                      ? "bg-white/10 border-y border-r border-white/20 text-white"
                      : searchOpen && !isTransparent
                        ? "bg-background border-y border-r border-border text-foreground"
                        : isTransparent
                          ? "text-white hover:bg-white/10 rounded-full"
                          : "text-foreground hover:bg-foreground/5 rounded-full"
                  }`}
                  aria-label="Rechercher"
                >
                  <Search size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Theme toggle desktop */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Hamburger mobile — toujours visible */}
              <button
                ref={menuButtonRef}
                onClick={() => setOpen(!open)}
                className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all ${isTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-foreground/5"}`}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile — Animé avec Framer Motion */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fond semi-transparent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-199 lg:hidden bg-black/60 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Panneau latéral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm z-200 lg:hidden flex flex-col glass-dark border-l border-border/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-white"
              aria-hidden={!open}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
            >
              {/* En-tête du menu mobile */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/20 shrink-0">
                <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                  <div className="flex flex-col items-start">
                    <span className="luxury-text text-2xl uppercase tracking-tighter text-white">
                      The <span className="text-gradient-river">Village</span>
                    </span>
                  </div>
                </Link>
                <button
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Liens avec effet Stagger en cascade */}
              <nav
                className="flex-1 overflow-y-auto py-12 px-8 flex flex-col justify-center gap-8"
                aria-label="Navigation mobile"
              >
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block text-xl font-display font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-2 py-1"
                      activeProps={{ className: "!text-primary" }}
                      activeOptions={{ exact: l.to === "/" }}
                      role="menuitem"
                    >
                      {t(l.labelKey)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Pied du menu mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="p-8 border-t border-white/20 bg-black/20 shrink-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60 uppercase tracking-widest font-bold">
                    Langue
                  </span>
                  <div className="flex items-center bg-white/10 rounded-full p-1">
                    <button
                      onClick={() => {
                        i18n.changeLanguage("fr");
                        setOpen(false);
                      }}
                      className={`text-[10px] font-black tracking-widest px-4 py-2 rounded-full transition-all ${
                        i18n.language === "fr"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      FR
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage("en");
                        setOpen(false);
                      }}
                      className={`text-[10px] font-black tracking-widest px-4 py-2 rounded-full transition-all ${
                        i18n.language === "en"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
