import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { inscriptions } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Mail, Calendar, Phone, CheckCircle2, XCircle } from "lucide-react";
import { requireAuth } from "@/lib/session-middleware";

export const getInscriptionsFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAuth();
  const db = getDb();
  const allInscriptions = await db
    .select()
    .from(inscriptions)
    .orderBy(desc(inscriptions.dateInscription));
  return allInscriptions;
});

export const updateInscriptionStatusFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number; status: "en_attente" | "accepte" | "refuse" }) => data)
  .handler(async ({ data }) => {
    await requireAuth();
    const db = getDb();
    await db.update(inscriptions).set({ statut: data.status }).where(eq(inscriptions.id, data.id));
    return { success: true };
  });

export const Route = createFileRoute("/admin/inscriptions")({
  loader: async () => await getInscriptionsFn(),
  component: AdminInscriptionsPage,
});

function AdminInscriptionsPage() {
  const allInscriptions = Route.useLoaderData() as Awaited<ReturnType<typeof getInscriptionsFn>>;

  const handleStatusChange = async (id: number, status: "en_attente" | "accepte" | "refuse") => {
    await updateInscriptionStatusFn({ data: { id, status } });
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold font-display uppercase tracking-tight">
        Inscriptions Formations
      </h2>

      {allInscriptions.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">Aucune inscription pour le moment</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {allInscriptions.map((inscription) => (
            <div key={inscription.id} className="bg-card border border-border p-6 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    {inscription.prenom} {inscription.nom}
                    {inscription.statut === "en_attente" && (
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    )}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                    <a
                      href={`mailto:${inscription.email}`}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Mail size={14} />
                      {inscription.email}
                    </a>
                    <a
                      href={`tel:${inscription.tel}`}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <Phone size={14} />
                      {inscription.tel}
                    </a>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  {new Date(inscription.dateInscription).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-lg font-bold text-primary mb-2">{inscription.formation}</p>
              <p className="text-muted-foreground mb-4">{inscription.motivation}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleStatusChange(inscription.id, "accepte")}
                  disabled={inscription.statut === "accepte"}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    inscription.statut === "accepte"
                      ? "bg-emerald-500/10 text-emerald-600 cursor-default"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  Accepté
                </button>
                <button
                  onClick={() => handleStatusChange(inscription.id, "refuse")}
                  disabled={inscription.statut === "refuse"}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    inscription.statut === "refuse"
                      ? "bg-red-500/10 text-red-600 cursor-default"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <XCircle size={16} />
                  Refusé
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
