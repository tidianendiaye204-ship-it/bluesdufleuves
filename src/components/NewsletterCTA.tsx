import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeNewsletterFn } from "@/routes/__root";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMsg("");
    try {
      const res = await subscribeNewsletterFn({ data: { email } });
      if (res.error) {
        setStatus("error");
        setMsg(res.error);
      } else {
        setStatus("success");
        setMsg("Merci pour votre inscription ! Vous recevrez nos prochaines actualités.");
        setEmail("");
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setMsg("Une erreur inattendue s'est produite.");
    }
  };

  return (
    <section className="relative overflow-hidden py-24 bg-linear-to-b from-background to-muted/20 border-t border-border/50">
      {/* Éléments de décoration */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-100 h-100 bg-sky-500/5 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" />

      {/* Grille de fond */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-page relative z-10">
        <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-xl border border-border/50 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden relative">
          {/* Lueur interne */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-inner"
            >
              <Mail className="w-8 h-8 text-primary" />
            </motion.div>

            <h2 className="luxury-text text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-6">
              Restez <span className="text-gradient-gold">Connecté</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground font-serif max-w-2xl mx-auto mb-10 leading-relaxed">
              Ne manquez aucune actualité du festival{" "}
              <strong className="text-foreground">Blues du Fleuve</strong>, de nos formations et des
              nouveautés culturelles au Village Podor.
            </p>

            <div className="w-full max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3" />
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium text-lg">
                      {msg}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubscribe}
                    className="relative flex flex-col sm:flex-row gap-3"
                  >
                    <div className="relative flex-1 group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse email..."
                        className="w-full rounded-full border-2 border-border bg-background/50 pl-14 pr-6 py-4 md:py-5 text-base md:text-lg text-foreground outline-none focus:border-primary focus:bg-background transition-all duration-300 shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading" || !email}
                      className="group relative overflow-hidden rounded-full btn-gradient-premium px-10 py-4 md:py-5 text-xs font-black uppercase tracking-widest text-white hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 shrink-0"
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
                            Inscription...
                          </>
                        ) : (
                          <>
                            Rejoindre
                            <Send
                              size={16}
                              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                            />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {status === "error" && msg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 flex items-center justify-center gap-2 text-red-500 font-medium"
                  >
                    <AlertCircle size={16} />
                    <p className="text-sm">{msg}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-8 text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-3">
              <span className="w-8 h-px bg-border" />
              100% Culture · Zéro Spam
              <span className="w-8 h-px bg-border" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
