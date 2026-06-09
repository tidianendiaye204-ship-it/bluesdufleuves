import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Centre Culturel" },
  { to: "/blues-du-fleuve", label: "Le Festival" },
  { to: "/formations", label: "Formations" },
  { to: "/nann-k-media", label: "NANN-k" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dateStr, setDateStr] = useState("");
  const location = useLocation();

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
    setDateStr(
      new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-2xl border-b border-border shadow-sm">
        <div className="container-page">
          <div className="flex items-center justify-between h-14 md:h-20 gap-4 md:gap-8">
            {/* Logo / titre */}
            <div className="flex items-center shrink-0 gap-3">
              <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
                <img
                  src="/logo the village.jpg"
                  alt="Logo The Village"
                  className="h-9 md:h-14 w-auto object-contain"
                />
                <div className="flex flex-col items-start">
                  <span className="luxury-text text-lg md:text-3xl xl:text-4xl uppercase tracking-tighter text-foreground">
                    The <span className="text-gradient-river">Village</span>
                  </span>
                  <span className="text-[5px] md:text-[6px] xl:text-[7px] uppercase tracking-[0.4em] font-semibold font-sans text-muted-foreground">
                    blues des fleuves · NANN-k
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation desktop */}
            <nav
              className="hidden lg:flex items-center justify-center gap-7 xl:gap-10 flex-1"
              aria-label="Navigation principale"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] transition-all nav-link whitespace-nowrap min-h-10 flex items-center text-foreground hover:text-primary"
                  activeProps={{
                    className: "text-primary !after:w-full",
                  }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
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
              <div className="hidden md:flex items-center gap-2 border-r border-border pr-4 text-foreground">
                <button
                  onClick={() => i18n.changeLanguage("fr")}
                  className={`text-[8px] font-semibold tracking-widest transition-all ${
                    i18n.language === "fr"
                      ? "text-primary font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  FR
                </button>
                <span className="text-[8px] text-muted-foreground/30">|</span>
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`text-[8px] font-semibold tracking-widest transition-all ${
                    i18n.language === "en"
                      ? "text-primary font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Recherche desktop */}
              <button
                className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-foreground/5 transition-all duration-300"
                aria-label="Rechercher"
              >
                <Search size={16} strokeWidth={1.5} />
              </button>

              {/* Theme toggle desktop */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Hamburger mobile — toujours visible */}
              <button
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground hover:bg-foreground/5 transition-all"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
              >
                {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile — slide depuis la droite, z-index > header */}
      <div
        className={`fixed inset-0 z-200 lg:hidden flex flex-col bg-card text-card-foreground transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* En-tête du menu mobile */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img
              src="/logo the village.jpg"
              alt="Logo The Village"
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col items-start">
              <span className="luxury-text text-xl uppercase tracking-tighter text-foreground">
                The <span className="text-gradient-river">Village</span>
              </span>
              <span className="text-[5px] uppercase tracking-[0.4em] font-semibold font-sans text-muted-foreground">
                blues des fleuves · NANN-k
              </span>
            </div>
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground hover:bg-foreground/10 transition-all"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Liens */}
        <nav
          className="flex-1 overflow-y-auto py-6 px-5 flex flex-col"
          aria-label="Navigation mobile"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="flex items-center text-sm font-semibold uppercase tracking-widest text-foreground py-5 min-h-12 border-b border-border/30 transition-all hover:text-primary hover:pl-3 duration-200"
              activeProps={{ className: "!text-primary !pl-3" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Pied du menu mobile */}
        <div className="p-5 border-t border-border/50 bg-muted/30 shrink-0">
          <div className="flex items-center">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Langue :
            </span>
            <div className="flex items-center bg-muted/50 rounded-full p-1 ml-3">
              <button
                onClick={() => {
                  i18n.changeLanguage("fr");
                  setOpen(false);
                }}
                className={`text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full transition-all ${
                  i18n.language === "fr"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                  setOpen(false);
                }}
                className={`text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full transition-all ${
                  i18n.language === "en"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fond semi-transparent derrière le menu */}
      {open && (
        <div
          className="fixed inset-0 z-199 lg:hidden bg-black/60 backdrop-blur-md"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
