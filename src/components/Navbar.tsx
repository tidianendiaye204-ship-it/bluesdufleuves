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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
  const textColor = isTransparent ? "text-white" : "text-foreground";
  const borderColor = isTransparent ? "border-white/10" : "border-border";
  const bgColor = isTransparent
    ? "bg-transparent"
    : "bg-background/80 backdrop-blur-lg border-b shadow-elegant";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor} ${isTransparent ? "py-2 md:py-4" : "py-1 md:py-2"}`}
    >
      {/* Top bar (News style) */}
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
        <div className="flex items-center justify-between h-12 md:h-20 gap-4 md:gap-8">
          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <button
              className={`md:hidden inline-flex h-8 w-8 items-center justify-center border-none transition-colors duration-500 ${textColor}`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="flex flex-col items-start group" onClick={() => setOpen(false)}>
              <span
                className={`luxury-text text-lg md:text-4xl uppercase tracking-tighter transition-colors duration-500 ${isTransparent ? "text-white group-hover:text-white/80" : "group-hover:text-primary"}`}
              >
                The <span className={isTransparent ? "text-white" : "text-primary"}>Village</span>
              </span>
              <span
                className={`text-[6px] md:text-[9px] uppercase tracking-[0.4em] font-bold font-sans transition-colors duration-500 ${isTransparent ? "text-white/50" : "text-muted-foreground"}`}
              >
                blues des fleuves · NANN-K
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
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

          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <div
              className={`hidden md:flex items-center gap-2 border-r pr-6 transition-colors duration-500 ${isTransparent ? "border-white/10" : "border-border/20"}`}
            >
              <button
                onClick={() => i18n.changeLanguage("fr")}
                className={`text-[10px] font-black tracking-widest transition-colors ${i18n.language === "fr" ? (isTransparent ? "text-white" : "text-primary") : isTransparent ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                FR
              </button>
              <span
                className={`text-[10px] transition-colors ${isTransparent ? "text-white/20" : "text-muted-foreground/30"}`}
              >
                |
              </span>
              <button
                onClick={() => i18n.changeLanguage("en")}
                className={`text-[10px] font-black tracking-widest transition-colors ${i18n.language === "en" ? (isTransparent ? "text-white" : "text-primary") : isTransparent ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </button>
            </div>

            <button
              className={`inline-flex h-8 w-8 items-center justify-center transition-colors duration-500 ${isTransparent ? "text-white hover:text-white/70" : "text-foreground hover:text-primary"}`}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden bg-background animate-in fade-in duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <Link to="/" className="flex flex-col items-start" onClick={() => setOpen(false)}>
                <span className="luxury-text text-xl uppercase tracking-tighter text-foreground">
                  The <span className="text-primary">Village</span>
                </span>
              </Link>
              <button
                className="inline-flex h-10 w-10 items-center justify-center text-foreground"
                onClick={() => setOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-8 px-8 flex flex-col gap-6">
              {links.map((l, idx) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-display font-black uppercase tracking-tighter text-foreground animate-in slide-in-from-left-4 duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-border bg-muted/30">
              <div className="flex justify-between items-center">
                <div className="flex gap-6">
                  <button
                    onClick={() => {
                      i18n.changeLanguage("fr");
                      setOpen(false);
                    }}
                    className={`font-black text-sm tracking-widest ${i18n.language === "fr" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => {
                      i18n.changeLanguage("en");
                      setOpen(false);
                    }}
                    className={`font-black text-sm tracking-widest ${i18n.language === "en" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    EN
                  </button>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
