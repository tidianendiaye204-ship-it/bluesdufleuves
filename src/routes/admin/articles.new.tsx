import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { articles } from "@/db/schema";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, Save, Eye, Edit3 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const createArticleFn = createServerFn({ method: "POST" })
  .validator((data: z.infer<typeof articleSchema>) => articleSchema.parse(data))
  .handler(async ({ data }) => {
    const db = getDb();
    await db.insert(articles).values({
      ...data,
      publishedAt: new Date(),
      createdAt: new Date(),
    });
    return { success: true };
  });

export const Route = createFileRoute("/admin/articles/new")({
  component: CreateArticlePage,
});

function CreateArticlePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Événement",
    excerpt: "",
    content: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createArticleFn({ data: form });
      navigate({ to: "/admin/articles" });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement de l'article : veuillez vérifier les champs.");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/articles"
            className="p-2 border border-border rounded-lg hover:bg-muted transition"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-3xl font-bold font-display uppercase tracking-tight">
            Nouvel article
          </h2>
        </div>

        <div className="flex bg-muted/50 p-1 rounded-lg border border-border w-fit">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${!isPreview ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Edit3 size={16} /> Édition
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${isPreview ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Eye size={16} /> Aperçu
          </button>
        </div>
      </div>

      {!isPreview ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-border rounded-xl p-6"
        >
          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Titre</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                const newTitle = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  title: newTitle,
                  slug: prev.slug || generateSlug(newTitle),
                }));
              }}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                Catégorie
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Événement">Événement</option>
                <option value="Médias">Médias</option>
                <option value="Patrimoine">Patrimoine</option>
                <option value="Formations">Formations</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                URL de l'image
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://..."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Extrait</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Contenu</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              rows={10}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/admin/articles"
              className="px-6 py-3 border border-border rounded-lg font-bold hover:bg-muted transition"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm space-y-8">
          {form.imageUrl && (
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden relative shadow-md">
              <img src={form.imageUrl} alt={form.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider">
              {form.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-display leading-tight">
              {form.title || "Titre de l'article"}
            </h1>
            {form.excerpt && (
              <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary pl-4">
                {form.excerpt}
              </p>
            )}
          </div>
          <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
            {form.content || "Le contenu de votre article s'affichera ici..."}
          </div>

          <div className="flex justify-end pt-8 border-t border-border gap-4">
            <button
              type="button"
              onClick={() => setIsPreview(false)}
              className="px-6 py-3 border border-border rounded-lg font-bold hover:bg-muted transition cursor-pointer"
            >
              Continuer l'édition
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition disabled:opacity-50 cursor-pointer"
            >
              <Save size={18} />
              {loading ? "Enregistrement..." : "Enregistrer et publier"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
