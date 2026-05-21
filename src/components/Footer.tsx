import { Youtube, Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { newsletter } from "@/db/schema";
import type { Env } from "@/types/env";
import { useState } from "react";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof newsletterSchema>) => newsletterSchema.parse(data))
  .handler(async ({ data, context }) => {
    const env = (context as any).env as Env;
    if (!env || !env.DB) throw new Error("DB not configured");

    const db = getDb(env.DB);
    try {
      await db.insert(newsletter).values({
        email: data.email,
        dateInscription: new Date(),
      });
      return { success: true };
    } catch (e: any) {
      if (e.message?.includes("UNIQUE")) {
        return { error: "Cet email est déjà inscrit." };
      }
      return { error: "Une erreur est survenue." };
    }
  });

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    try {
      const res = await subscribeNewsletter({ data: { email } });
      if (res.error) {
        setStatus("error");
        setMsg(res.error);
      } else {
        setStatus("success");
        setMsg("Merci pour votre inscription !");
        setEmail("");
      }
    } catch (err) {
      setStatus("error");
      setMsg("Erreur inattendue.");
    }
  };

  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="container-page py-14 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl font-bold">
            The <span className="text-gradient-gold">Village</span>
          </h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Hub culturel & numérique du projet NANN-k — Centre Culturel de Podor, vallée du fleuve
            Sénégal.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">
                contact@thevillage.com
              </Link>
            </li>
            <li>Podor, Sénégal</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Abonnez-vous à la newsletter
          </h4>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button disabled={status === "loading"} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-50">
              {status === "loading" ? "..." : "S'abonner"}
            </button>
          </form>
          {msg && (
            <p className={`mt-2 text-xs ${status === "success" ? "text-green-500" : "text-red-500"}`}>
              {msg}
            </p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Suivez-nous</h4>
          <div className="flex gap-3">
            {[
              {
                Icon: Youtube,
                label: "YouTube",
                to: "https://www.youtube.com/@nannktv",
                external: true,
              },
              {
                Icon: Facebook,
                label: "Facebook",
                to: "https://www.facebook.com/festivalbluesdufleuve",
                external: true,
              },
              {
                Icon: Instagram,
                label: "Instagram",
                to: "https://www.instagram.com/nannkmedia",
                external: true,
              },
            ].map(({ Icon, label, to, external }) =>
              external ? (
                <a
                  key={label}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              ) : (
                <Link
                  key={label}
                  to={to}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} The Village — Projet NANN-k. Tous droits réservés.</p>
          <p>Podor, Sénégal · Vallée du Fleuve</p>
        </div>
      </div>
    </footer>
  );
}
