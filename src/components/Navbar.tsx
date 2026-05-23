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
  const bgColor = isTransparent ? "bg-transparent" : "bg-background/80 backdrop-blur-lg border-b shadow-elegant";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor} ${isTransparent ? "py-4" : "py-2"}`}
    >
      {/* Top bar (News style) */}
      <div className={`border-b ${borderColor} py-1 hidden md:block transition-all duration-500 ${isTransparent ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}>
        <div className={`container-page flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${isTransparent ? "text-white/70" : "text-muted-foreground"}`}>
          <span>{dateStr}</span>
          <div className="flex gap-6">
            <Link to="/" className={`transition-colors nav-link ${isTransparent ? "hover:text-white" : "hover:text-primary"}`}>
              S'abonner
            </Link>
            <Link to="/" className={`transition-colors nav-link ${isTransparent ? "hover:text-white" : "hover:text-primary"}`}>
              Connexion
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page">
        <div className="flex items-center justify-between h-16 md:h-20 gap-8">
          <div className="flex items-center gap-8 shrink-0">
            <button
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center border-none transition-colors duration-500 ${textColor}`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              to="/"
              className="flex flex-col items-start group"
              onClick={() => setOpen(false)}
            >
              <span className={`luxury-text text-2xl md:text-4xl uppercase tracking-tighter transition-colors duration-500 ${isTransparent ? "text-white group-hover:text-white/80" : "group-hover:text-primary"}`}>
                The <span className={isTransparent ? "text-white" : "text-primary"}>Village</span>
              </span>
              <span className={`text-[7px] md:text-[9px] uppercase tracking-[0.5em] font-bold font-sans transition-colors duration-500 ${isTransparent ? "text-white/50" : "text-muted-foreground"}`}>
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
                activeProps={{ className: isTransparent ? "text-white !after:w-full" : "text-primary !after:w-full" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <div className={`hidden md:flex items-center gap-2 border-r pr-6 transition-colors duration-500 ${isTransparent ? "border-white/10" : "border-border/20"}`}>
              <button
                onClick={() => i18n.changeLanguage("fr")}
                className={`text-[10px] font-black tracking-widest transition-colors ${i18n.language === "fr" ? (isTransparent ? "text-white" : "text-primary") : (isTransparent ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground")}`}
              >
                FR
              </button>
              <span className={`text-[10px] transition-colors ${isTransparent ? "text-white/20" : "text-muted-foreground/30"}`}>|</span>
              <button
                onClick={() => i18n.changeLanguage("en")}
                className={`text-[10px] font-black tracking-widest transition-colors ${i18n.language === "en" ? (isTransparent ? "text-white" : "text-primary") : (isTransparent ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground")}`}
              >
                EN
              </button>
            </div>
            
            <button
              className={`inline-flex h-10 w-10 items-center justify-center transition-colors duration-500 ${isTransparent ? "text-white hover:text-white/70" : "text-foreground hover:text-primary"}`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="fixed inset-0 top-16 z-50 md:hidden bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="container-page flex flex-col py-8 gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-2xl font-display font-bold uppercase tracking-tighter text-foreground border-b border-border/10 pb-4 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex justify-between items-center mt-4 pt-6 border-t border-border/10">
              <div className="flex gap-4">
                <button onClick={() => i18n.changeLanguage("fr")} className="font-bold text-sm">FR</button>
                <button onClick={() => i18n.changeLanguage("en")} className="font-bold text-sm">EN</button>
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
