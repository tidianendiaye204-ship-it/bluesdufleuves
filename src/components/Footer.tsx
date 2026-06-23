import { Youtube, Facebook, Instagram, Mail, ArrowUp, Globe, Heart } from "lucide-react";
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t border-border/20 bg-gradient-to-b from-[#0a0908] to-[#050404] text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl translate-y-1/2" />

      {/* Animated dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-page py-20 grid gap-16 md:grid-cols-4 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-6">
          <Link to="/" className="flex flex-col items-start group" onClick={scrollToTop}>
            <span className="luxury-text text-3xl uppercase tracking-tighter group-hover:text-primary transition-all duration-300 text-white">
              The <span className="text-primary">Village</span>
            </span>
            <span className="text-[7px] uppercase tracking-[0.5em] text-muted-foreground font-bold font-sans group-hover:text-primary/80 transition-colors">
              blues des fleuves · NANN-K
            </span>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed font-serif">
            L'épicentre culturel de la vallée du fleuve Sénégal. Un projet porté par Baaba Maal pour
            le rayonnement des arts et de la culture.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Globe size={14} />
            <span>Podor, Sénégal</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-gradient-to-r from-primary/50 to-transparent" />
            Navigation
          </h4>
          <ul className="space-y-3">
            {[
              { to: "/", label: "Centre Culturel" },
              { to: "/blues-du-fleuve", label: "Le Festival" },
              { to: "/billetterie", label: "Billetterie" },
              { to: "/nann-k-media", label: "NANN-k" },
              { to: "/formations", label: "Formations" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={scrollToTop}
                  className="group flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-all duration-300 py-1"
                >
                  <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Social Column */}
        <div className="md:col-span-2 space-y-10">
          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              La Lettre de l'Éditeur
            </h4>
            <p className="text-sm text-white/60 mb-6 font-serif">
              Recevez les actualités culturelles de la vallée directement dans votre boîte mail.
            </p>
            <form className="flex gap-3" onSubmit={handleSubscribe}>
              <div className="relative flex-1 group">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-white/30"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-sky-600 px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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
                      Envoi...
                    </>
                  ) : (
                    <>
                      S'abonner
                      <ArrowUp
                        size={12}
                        className="group-hover:-translate-y-0.5 transition-transform"
                      />
                    </>
                  )}
                </span>
                {/* Shine effect */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none" />
              </button>
            </form>
            {msg && (
              <p
                className={`mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${status === "success" ? "text-emerald-400" : "text-red-400"}`}
              >
                {status === "success" && <Heart size={12} className="fill-current" />}
                {msg}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              Suivez l'aventure
            </h4>
            <div className="flex gap-3">
              {[
                {
                  Icon: Youtube,
                  label: "YouTube",
                  to: "https://www.youtube.com/@nannktv",
                  gradient: "hover:from-red-600 hover:to-red-700",
                },
                {
                  Icon: Facebook,
                  label: "Facebook",
                  to: "https://www.facebook.com/festivalbluesdufleuve",
                  gradient: "hover:from-blue-600 hover:to-blue-700",
                },
                {
                  Icon: Instagram,
                  label: "Instagram",
                  to: "https://www.instagram.com/nannkmedia",
                  gradient: "hover:from-purple-600 hover:to-pink-600",
                },
              ].map(({ Icon, label, to, gradient }) => (
                <a
                  key={label}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-transparent hover:text-white hover:scale-110 hover:shadow-lg"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  {/* Gradient overlay on hover */}
                  <span
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <Icon
                    size={20}
                    className="absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="container-page py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              © {new Date().getFullYear()} The Village — Projet NANN-k. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                Podor, Sénégal
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500/50" />
                Vallée du Fleuve
              </span>
            </div>
            <button
              onClick={scrollToTop}
              aria-label="Retour en haut"
              className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-primary transition-colors"
            >
              <span className="hidden md:inline">Haut de page</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
