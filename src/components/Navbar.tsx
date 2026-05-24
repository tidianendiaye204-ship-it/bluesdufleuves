import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Le Complexe" },
  { to: "/blues-du-fleuve", label: "Le Festival" },
  { to: "/nann-k-media", label: "Nann-k" },
  { to: "/formations", label: "Formations" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dateStr, setDateStr] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

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

  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;
    const handleScroll = () => {
      setScrolled(scrollContainer.scrollTop > 20);
    };
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  const isTransparent = isHome && !scrolled;
  const borderColor = isTransparent ? "border-white/10" : "border-border";
  const bgColor = isTransparent
    ? "bg-transparent"
    : "bg-background/80 backdrop-blur-lg border-b shadow-elegant";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${bgColor} ${isTransparent ? "py-2 md:py-4" : "py-1 md:py-2"}`}
      >
        {/* Barre supérieure (style journal) */}
        <div
          className={`border-b ${borderColor} py-1 hidden md:block transition-all duration-500 ${isTransparent ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}
        >
          <div
            className={`container-page flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${isTransparent ? "text-white/70" : "text-muted-foreground"}`}
          >
            <span>{dateStr}</span>
            <div className="flex gap-6">
              <Link
                to="/"
                className={`transition-colors nav-link ${isTransparent ? "hover:text-white" : "hover:text-primary"}`}
              >
                S'abonner
              </Link>
              <Link
                to="/"
                className={`transition-colors nav-link ${isTransparent ? "hover:text-white" : "hover:text-primary"}`}
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>

        <div className="container-page">
          <div className="flex items-center justify-between h-14 md:h-20 gap-4 md:gap-8">
            {/* Logo / titre */}
            <div className="flex items-center shrink-0">
              <Link
                to="/"
                className="flex flex-col items-start group"
                onClick={() => setOpen(false)}
              >
                <span
                  className={`luxury-text text-lg md:text-4xl uppercase tracking-tighter transition-colors duration-500 ${isTransparent ? "text-white group-hover:text-white/80" : "text-foreground group-hover:text-primary"}`}
                >
                  The <span className={isTransparent ? "text-white" : "text-primary"}>Village</span>
                </span>
                <span
                  className={`text-[6px] md:text-[9px] uppercase tracking-[0.4em] font-bold font-sans transition-colors duration-500 ${isTransparent ? "text-white/50" : "text-foreground/80"}`}
                >
                  blues des fleuves · NANN-K
                </span>
              </Link>
            </div>

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-12 flex-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all nav-link whitespace-nowrap ${isTransparent ? "text-white hover:text-white/70" : "text-foreground hover:text-primary"}`}
                  activeProps={{
                    className: isTransparent
                      ? "text-white !after:w-full"
                      : "text-primary !after:w-full",
                  }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Actions droite */}
            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              {/* Sélecteur de langue desktop */}
              <div
                className={`hidden md:flex items-center gap-2 border-r pr-6 transition-colors duration-500 ${isTransparent ? "border-white/10 text-white" : "border-border/20 text-foreground"}`}
              >
                <button
                  onClick={() => i18n.changeLanguage("fr")}
                  className={`text-[10px] font-black tracking-widest transition-colors ${
                    i18n.language === "fr"
                      ? isTransparent
                        ? "text-white"
                        : "text-primary"
                      : isTransparent
                        ? "text-white/50 hover:text-white"
                        : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  FR
                </button>
                <span
                  className={`text-[10px] transition-colors ${isTransparent ? "text-white/20" : "text-foreground/30"}`}
                >
                  |
                </span>
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`text-[10px] font-black tracking-widest transition-colors ${
                    i18n.language === "en"
                      ? isTransparent
                        ? "text-white"
                        : "text-primary"
                      : isTransparent
                        ? "text-white/50 hover:text-white"
                        : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Recherche desktop */}
              <button
                className={`hidden md:inline-flex h-8 w-8 items-center justify-center transition-colors duration-500 ${isTransparent ? "text-white hover:text-white/70" : "text-foreground hover:text-primary"}`}
                aria-label="Rechercher"
              >
                <Search size={18} />
              </button>

              {/* Theme toggle desktop */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Hamburger mobile — toujours visible */}
              <button
                className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 ${
                  open
                    ? "bg-foreground/10 text-foreground"
                    : isTransparent
                      ? "text-white hover:bg-white/10"
                      : "text-foreground hover:bg-foreground/10"
                }`}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile — slide depuis la droite, z-index > header */}
      <div
        className={`fixed inset-0 z-[200] lg:hidden flex flex-col bg-background transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* En-tête du menu mobile */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
          <Link
            to="/"
            className="flex flex-col items-start"
            onClick={() => setOpen(false)}
          >
            <span className="luxury-text text-xl uppercase tracking-tighter text-foreground">
              The <span className="text-primary">Village</span>
            </span>
            <span className="text-[7px] uppercase tracking-[0.4em] font-bold font-sans text-muted-foreground">
              blues des fleuves · NANN-K
            </span>
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-foreground/10 transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Liens */}
        <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="flex items-center text-base font-bold uppercase tracking-widest text-foreground py-5 border-b border-border/50 transition-all hover:text-primary hover:pl-2 duration-200"
              activeProps={{ className: "!text-primary !pl-2" }}
              activeOptions={{ exact: l.to === "/" }}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Pied du menu mobile */}
        <div className="p-6 border-t border-border/50 bg-muted/30 shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Langue :
              </span>
              <button
                onClick={() => {
                  i18n.changeLanguage("fr");
                  setOpen(false);
                }}
                className={`font-black text-sm tracking-widest px-2 py-1 rounded transition-colors ${
                  i18n.language === "fr"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FR
              </button>
              <span className="text-muted-foreground/30">|</span>
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                  setOpen(false);
                }}
                className={`font-black text-sm tracking-widest px-2 py-1 rounded transition-colors ${
                  i18n.language === "en"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Fond semi-transparent derrière le menu */}
      {open && (
        <div
          className="fixed inset-0 z-[199] lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
