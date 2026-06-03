import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { articles } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { useState } from "react";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const getArticlesFn = createServerFn({ method: "GET" }).handler(async () => {
  const db = getDb();
  const allArticles = await db.select().from(articles).orderBy(desc(articles.publishedAt));
  return allArticles;
});

export const deleteArticleFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    const db = getDb();
    await db.delete(articles).where(eq(articles.id, data.id));
    return { success: true };
  });

export const Route = createFileRoute("/admin/articles")({
  loader: async () => await getArticlesFn(),
  component: AdminArticlesList,
});

function AdminArticlesList() {
  const allArticles = Route.useLoaderData();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    setIsDeleting(id);
    try {
      await deleteArticleFn({ data: { id } });
      window.location.reload();
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-display uppercase tracking-tight">Articles</h2>
        <Link
          to="/admin/articles/new"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition"
        >
          <Plus size={18} />
          Nouvel article
        </Link>
      </div>

      {allArticles.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">Aucun article pour le moment</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {allArticles.map((article) => (
            <div
              key={article.id}
              className="bg-card border border-border p-4 rounded-xl flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-foreground">{article.title}</h3>
                  <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                    {article.category}
                  </span>
                  {article.isPublished ? (
                    <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded-full">
                      Publié
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-600 rounded-full">
                      Brouillon
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-muted-foreground hover:text-primary transition"
                  onClick={() => alert("Fonctionnalité édition à implémenter !")}
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  disabled={isDeleting === article.id}
                  className="p-2 text-muted-foreground hover:text-red-500 transition disabled:opacity-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
