import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { contacts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Mail, Calendar, CheckCircle2, Archive } from "lucide-react";
import { requireAuth } from "@/lib/session-middleware";

export const getContactsFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAuth();
  const db = getDb();
  const allContacts = await db.select().from(contacts).orderBy(desc(contacts.dateEnvoi));
  return allContacts;
});

export const updateContactStatusFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number; status: "non_lu" | "lu" | "traite" }) => data)
  .handler(async ({ data }) => {
    await requireAuth();
    const db = getDb();
    await db.update(contacts).set({ statut: data.status }).where(eq(contacts.id, data.id));
    return { success: true };
  });

export const Route = createFileRoute("/admin/contacts")({
  loader: async () => await getContactsFn(),
  component: AdminContactsPage,
});

function AdminContactsPage() {
  const allContacts = Route.useLoaderData() as Awaited<ReturnType<typeof getContactsFn>>;

  const handleStatusChange = async (id: number, status: "non_lu" | "lu" | "traite") => {
    await updateContactStatusFn({ data: { id, status } });
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold font-display uppercase tracking-tight">Messages</h2>

      {allContacts.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">Aucun message pour le moment</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {allContacts.map((contact) => (
            <div key={contact.id} className="bg-card border border-border p-6 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    {contact.nom}
                    {contact.statut === "non_lu" && (
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                  >
                    <Mail size={14} />
                    {contact.email}
                  </a>
                </div>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  {new Date(contact.dateEnvoi).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm font-semibold text-primary mb-2">{contact.sujet}</p>
              <p className="text-muted-foreground mb-4">{contact.message}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleStatusChange(contact.id, "lu")}
                  disabled={contact.statut === "lu"}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    contact.statut === "lu"
                      ? "bg-emerald-500/10 text-emerald-600 cursor-default"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  Lu
                </button>
                <button
                  onClick={() => handleStatusChange(contact.id, "traite")}
                  disabled={contact.statut === "traite"}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    contact.statut === "traite"
                      ? "bg-primary/10 text-primary cursor-default"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Archive size={16} />
                  Traité
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
