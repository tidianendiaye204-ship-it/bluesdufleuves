import { Youtube, Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { subscribeNewsletterFn } from "@/routes/__root";

export function Footer() {
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
        setMsg("Merci pour votre inscription !");
        setEmail("");
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setMsg("Erreur inattendue.");
    }
  };

  return (
    <footer className="mt-24 border-t border-border bg-[#0a0908] text-white">
      <div className="container-page py-20 grid gap-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex flex-col items-start group">
            <span className="luxury-text text-3xl uppercase tracking-tighter group-hover:text-primary transition-colors text-white">
              The <span className="text-primary">Village</span>
            </span>
            <span className="text-[7px] uppercase tracking-[0.5em] text-muted-foreground font-bold font-sans">
              blues des fleuves · NANN-K
            </span>
          </Link>
          <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
            L'épicentre culturel de la vallée du fleuve Sénégal. Un projet porté par Baaba Maal pour
            le rayonnement des arts et de la culture.
          </p>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
            Navigation
          </h4>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors text-white/70 hover:text-white"
              >
                Le Complexe
              </Link>
            </li>
            <li>
              <Link
                to="/blues-du-fleuve"
                className="hover:text-primary transition-colors text-white/70 hover:text-white"
              >
                Le Festival
              </Link>
            </li>
            <li>
              <Link
                to="/nann-k-media"
                className="hover:text-primary transition-colors text-white/70 hover:text-white"
              >
                Nann-k Media
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors text-white/70 hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
            La Lettre de l'Éditeur
          </h4>
          <p className="text-sm text-white/70 mb-6">
            Recevez les actualités culturelles de la vallée directement dans votre boîte mail.
          </p>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-full border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary focus:bg-white/10 transition-all text-white"
              />
            </div>
            <button
              disabled={status === "loading"}
              className="rounded-full bg-primary px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary/90 transition-all disabled:opacity-50 premium-button"
            >
              {status === "loading" ? "..." : "S'abonner"}
            </button>
          </form>
          {msg && (
            <p
              className={`mt-4 text-[10px] font-bold uppercase tracking-widest ${status === "success" ? "text-emerald-500" : "text-red-500"}`}
            >
              {msg}
            </p>
          )}

          <div className="mt-12">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
              Suivez l'aventure
            </h4>
            <div className="flex gap-4">
              {[
                { Icon: Youtube, label: "YouTube", to: "https://www.youtube.com/@nannktv" },
                {
                  Icon: Facebook,
                  label: "Facebook",
                  to: "https://www.facebook.com/festivalbluesdufleuve",
                },
                { Icon: Instagram, label: "Instagram", to: "https://www.instagram.com/nannkmedia" },
              ].map(({ Icon, label, to }) => (
                <a
                  key={label}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-primary hover:text-primary hover:bg-primary/5"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-page py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} The Village — Projet NANN-k. Tous droits réservés.</p>
          <div className="flex gap-8">
            <span>Podor, Sénégal</span>
            <span>Vallée du Fleuve</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
