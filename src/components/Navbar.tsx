import { Link } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "Le Complexe" },
  { to: "/blues-du-fleuve", label: "Le Festival" },
  { to: "/nann-k-media", label: "Nann-k" },
  { to: "/formations", label: "Formations" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dateStr, setDateStr] = useState("");

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
    <header className="sticky top-0 z-50 border-b border-foreground bg-background text-foreground font-sans shadow-sm">
      {/* Top bar (News style) */}
      <div className="border-b border-border py-1 hidden md:block">
        <div className="container-page flex items-center justify-between text-[11px] text-muted-foreground uppercase tracking-widest font-bold">
          <span>Édition du {dateStr}</span>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              S'abonner
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Connexion
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-col md:flex-row md:items-center justify-between py-6 md:h-32">
        <div className="flex items-center justify-between w-full md:w-auto">
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center border-none text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className="flex flex-col items-center md:items-start mx-auto md:mx-0 group"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
              The <span className="text-primary">Village</span>
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground mt-2 font-bold font-sans">
              blues des fleuves - NANN-K
            </span>
          </Link>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center text-foreground"
            aria-label="Search"
          >
            <Search size={22} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors"
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-muted border-none rounded-none pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all w-64 text-foreground font-medium"
            />
          </div>
        </div>
      </div>

      {/* Main Navigation (News Categories) */}
      <nav className="hidden md:block border-t border-border">
        <div className="container-page flex items-center justify-center gap-12 py-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary border-b-2 border-primary pb-1" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container-page flex flex-col py-4 gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-bold uppercase tracking-widest text-foreground border-b border-border/50 hover:text-primary"
                activeProps={{ className: "text-primary bg-muted/50" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
