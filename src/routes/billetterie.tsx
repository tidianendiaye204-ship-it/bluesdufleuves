import { createFileRoute } from "@tanstack/react-router";
import { Ticket } from "lucide-react";

export const Route = createFileRoute("/billetterie")({
  component: Billetterie,
});

function Billetterie() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-muted border-b border-border py-16 md:py-20 text-center">
        <div className="container-page">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
            <Ticket size={32} />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tight text-foreground">
            Billetterie <span className="text-primary">Officielle</span>
          </h1>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            Réservez vos pass pour la prochaine édition du festival Blues du
            Fleuve.
          </p>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <div className="max-w-md mx-auto p-8 border border-border bg-card rounded-3xl shadow-sm">
          <h3 className="text-2xl font-bold font-display uppercase mb-4">
            Ouverture Prochaine
          </h3>
          <p className="text-muted-foreground mb-8">
            La billetterie n'est pas encore ouverte. L'intégration de notre
            partenaire de paiement sécurisé (PayDunya / Stripe) est en cours de
            finalisation.
          </p>
          <button
            disabled
            className="w-full bg-primary/50 text-primary-foreground font-bold uppercase tracking-widest px-8 py-4 rounded-full cursor-not-allowed"
          >
            Acheter un Pass
          </button>
        </div>
      </section>
    </div>
  );
}
