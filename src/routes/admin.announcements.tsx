import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getAllAnnouncementsFn,
  createAnnouncementFn,
  updateAnnouncementFn,
  deleteAnnouncementFn,
} from "@/lib/announcements";
import { Megaphone, Plus, Trash2, Power, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/announcements")({
  loader: async () => await getAllAnnouncementsFn(),
  component: AdminAnnouncements,
});

function AdminAnnouncements() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const announcements = Route.useLoaderData();
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState<"info" | "urgent" | "promo" | "event">("info");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newActionUrl, setNewActionUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    try {
      await createAnnouncementFn({
        data: {
          message: newMessage.trim(),
          type: newType,
          mediaUrl: newMediaUrl.trim() || undefined,
          actionUrl: newActionUrl.trim() || undefined,
          isActive: false,
        },
      });
      setNewMessage("");
      setNewType("info");
      setNewMediaUrl("");
      setNewActionUrl("");
      toast.success("Annonce créée avec succès");
      router.invalidate();
      queryClient.invalidateQueries({ queryKey: ["activeAnnouncements"] });
    } catch {
      toast.error("Erreur lors de la création de l'annonce");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await updateAnnouncementFn({
        data: { id, isActive: !currentStatus },
      });
      toast.success(currentStatus ? "Annonce désactivée" : "Annonce activée");
      router.invalidate();
      queryClient.invalidateQueries({ queryKey: ["activeAnnouncements"] });
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      try {
        await deleteAnnouncementFn({ data: { id } });
        toast.success("Annonce supprimée");
        router.invalidate();
        queryClient.invalidateQueries({ queryKey: ["activeAnnouncements"] });
      } catch {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "urgent":
        return {
          label: "Urgent",
          emoji: "🚨",
          color: "text-red-500 bg-red-500/10 border-red-500/20",
        };
      case "promo":
        return {
          label: "Partenaire",
          emoji: "🌟",
          color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
        };
      case "event":
        return {
          label: "Événement",
          emoji: "🎤",
          color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        };
      default:
        return {
          label: "Info",
          emoji: "ℹ️",
          color: "text-primary bg-primary/10 border-primary/20",
        };
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display uppercase tracking-tight flex items-center gap-3">
            <Megaphone className="text-primary" />
            Annonces en Direct
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gérez le bandeau "Breaking News" affiché en haut du site.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Nouvelle annonce</h3>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as "info" | "urgent" | "promo" | "event")}
              className="px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all sm:w-48"
              disabled={isSubmitting}
            >
              <option value="info">ℹ️ Info Standard</option>
              <option value="urgent">🚨 Urgent / Alerte</option>
              <option value="promo">🌟 Pub / Partenaire</option>
              <option value="event">🎤 Événement / Live</option>
            </select>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ex: Baaba Maal monte sur scène dans 15 minutes !"
              className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isSubmitting}
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Plus size={18} />
              Ajouter
            </button>
          </div>
          {newType === "promo" && (
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <input
                type="text"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="URL de l'image (ex: https://...) ou ID YouTube"
                className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                disabled={isSubmitting}
              />
              <input
                type="text"
                value={newActionUrl}
                onChange={(e) => setNewActionUrl(e.target.value)}
                placeholder="Lien vers le site du partenaire (optionnel)"
                className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                disabled={isSubmitting}
              />
            </div>
          )}
        </form>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Liste des annonces</h3>
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
            {announcements.length} au total
          </span>
        </div>

        {announcements.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border flex flex-col items-center">
            <AlertCircle className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground font-medium">Aucune annonce pour le moment.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Créez votre première annonce ci-dessus.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map(
              (announcement: {
                id: number;
                type?: string;
                isActive: boolean;
                message: string;
                createdAt: string;
              }) => {
                const typeData = getTypeLabel(announcement.type || "info");
                return (
                  <div
                    key={announcement.id}
                    className={`p-4 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      announcement.isActive
                        ? "bg-primary/5 border-primary/30 shadow-sm"
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`w-2 h-2 rounded-full ${announcement.isActive ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
                        ></span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1 ${typeData.color}`}
                        >
                          <span>{typeData.emoji}</span> {typeData.label}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {new Date(announcement.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p
                        className={`text-sm md:text-base font-medium mt-2 ${announcement.isActive ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {announcement.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleActive(announcement.id, announcement.isActive)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border ${
                          announcement.isActive
                            ? "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500 hover:text-white"
                            : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                        }`}
                        title={announcement.isActive ? "Désactiver l'annonce" : "Activer l'annonce"}
                      >
                        <Power size={14} />
                        {announcement.isActive ? "En direct" : "Hors ligne"}
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="p-1.5 text-red-500 bg-red-500/10 border border-transparent hover:border-red-500/20 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </div>
  );
}
