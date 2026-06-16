import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { contacts, inscriptions, articles as articlesTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { FileText } from "lucide-react";
import { requireAuth } from "@/lib/session-middleware";

const getAdminData = createServerFn({ method: "GET" }).handler(async () => {
  // Validate session
  await requireAuth();

  const db = getDb();

  const recentContacts = await db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.dateEnvoi))
    .limit(10);
  const recentInscriptions = await db
    .select()
    .from(inscriptions)
    .orderBy(desc(inscriptions.dateInscription))
    .limit(10);
  const recentArticles = await db
    .select()
    .from(articlesTable)
    .orderBy(desc(articlesTable.publishedAt))
    .limit(5);

  return { recentContacts, recentInscriptions, recentArticles };
});

export const Route = createFileRoute("/admin/")({
  loader: async () => await getAdminData(),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { recentContacts, recentInscriptions, recentArticles } = Route.useLoaderData();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-display uppercase tracking-tight">
          Tableau de Bord
        </h2>
        <Link
          to="/admin/articles"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition"
        >
          <FileText size={18} />
          Gérer les articles
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-xl mb-4 border-b border-border pb-2">Derniers Articles</h3>
          {recentArticles.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun article pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {recentArticles.map((a) => (
                <div key={a.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold line-clamp-1">{a.title}</span>
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {a.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-xl mb-4 border-b border-border pb-2">
            Derniers Messages (Contact)
          </h3>
          {recentContacts.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun message pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((c) => (
                <div key={c.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">{c.nom}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.dateEnvoi).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">{c.sujet}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{c.message}</p>
                  <div className="mt-2 text-xs">
                    <a href={`mailto:${c.email}`} className="text-primary hover:underline">
                      {c.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-xl mb-4 border-b border-border pb-2">
            Inscriptions aux Formations
          </h3>
          {recentInscriptions.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucune inscription pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {recentInscriptions.map((i) => (
                <div key={i.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">
                      {i.prenom} {i.nom}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(i.dateInscription).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary mb-1">{i.formation}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{i.motivation}</p>
                  <div className="mt-2 text-xs flex gap-4">
                    <a href={`mailto:${i.email}`} className="text-primary hover:underline">
                      {i.email}
                    </a>
                    <span>{i.tel}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
