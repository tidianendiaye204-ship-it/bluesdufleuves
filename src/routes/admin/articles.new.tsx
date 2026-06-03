import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db";
import { articles } from "@/db/schema";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "@tanstack/react-router";

const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url(),
});

export const createArticleFn = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof articleSchema>) => articleSchema.parse(data))
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
      <div className="flex items-center gap-4">
        <Link
          to="/admin/articles"
          className="p-2 border border-border rounded-lg hover:bg-muted transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-3xl font-bold font-display uppercase tracking-tight">Nouvel article</h2>
      </div>

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
          <label className="block text-sm font-bold uppercase tracking-wide mb-2">Slug (URL)</label>
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
    </div>
  );
}
