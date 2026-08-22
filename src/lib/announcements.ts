import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb, withRetry } from "@/lib/db";
import { announcements } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "@/lib/session-middleware";

// --- Validations ---
const createAnnouncementSchema = z.object({
  message: z.string().min(1, "Le message ne peut pas être vide"),
  type: z.enum(["info", "urgent", "promo", "event"]).default("info"),
  mediaUrl: z.string().optional(),
  actionUrl: z.string().optional(),
  isActive: z.boolean().default(false),
});

const updateAnnouncementSchema = z.object({
  id: z.number(),
  message: z.string().min(1, "Le message ne peut pas être vide").optional(),
  type: z.enum(["info", "urgent", "promo", "event"]).optional(),
  mediaUrl: z.string().optional(),
  actionUrl: z.string().optional(),
  isActive: z.boolean().optional(),
});

const idSchema = z.object({
  id: z.number(),
});

// --- Helper pour l'authentification Admin ---
async function requireAdmin() {
  await requireAuth();
}

// --- Fonctions publiques ---

/**
 * Récupère uniquement les annonces actives (pour l'affichage sur le site)
 */
export const getActiveAnnouncementsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    return await withRetry(async () => {
      return db
        .select()
        .from(announcements)
        .where(eq(announcements.isActive, true))
        .orderBy(desc(announcements.createdAt));
    });
  } catch (e) {
    console.error("Erreur getActiveAnnouncements:", e);
    return [];
  }
});

// --- Fonctions d'administration ---

/**
 * Récupère toutes les annonces (pour le tableau de bord admin)
 */
export const getAllAnnouncementsFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();

  try {
    const db = getDb();
    return await withRetry(async () => {
      return db.select().from(announcements).orderBy(desc(announcements.createdAt));
    });
  } catch (e) {
    console.error("Erreur getAllAnnouncements:", e);
    throw new Error("Erreur lors de la récupération des annonces");
  }
});

/**
 * Crée une nouvelle annonce
 */
export const createAnnouncementFn = createServerFn({ method: "POST" })
  .validator((data: z.infer<typeof createAnnouncementSchema>) =>
    createAnnouncementSchema.parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();

    try {
      const db = getDb();
      await withRetry(async () => {
        await db.insert(announcements).values({
          message: data.message,
          type: data.type,
          mediaUrl: data.mediaUrl || null,
          actionUrl: data.actionUrl || null,
          isActive: data.isActive,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
      return { success: true };
    } catch (e) {
      console.error("Erreur createAnnouncement:", e);
      throw new Error("Erreur lors de la création de l'annonce");
    }
  });

/**
 * Met à jour une annonce (message ou statut actif)
 */
export const updateAnnouncementFn = createServerFn({ method: "POST" })
  .validator((data: z.infer<typeof updateAnnouncementSchema>) =>
    updateAnnouncementSchema.parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();

    try {
      const db = getDb();
      await withRetry(async () => {
        const updateData: Partial<typeof announcements.$inferInsert> = {
          updatedAt: new Date(),
        };

        if (data.message !== undefined) updateData.message = data.message;
        if (data.type !== undefined) updateData.type = data.type;
        if (data.mediaUrl !== undefined) updateData.mediaUrl = data.mediaUrl || null;
        if (data.actionUrl !== undefined) updateData.actionUrl = data.actionUrl || null;
        if (data.isActive !== undefined) updateData.isActive = data.isActive;

        await db.update(announcements).set(updateData).where(eq(announcements.id, data.id));
      });
      return { success: true };
    } catch (e) {
      console.error("Erreur updateAnnouncement:", e);
      throw new Error("Erreur lors de la mise à jour de l'annonce");
    }
  });

/**
 * Supprime une annonce
 */
export const deleteAnnouncementFn = createServerFn({ method: "POST" })
  .validator((data: z.infer<typeof idSchema>) => idSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();

    try {
      const db = getDb();
      await withRetry(async () => {
        await db.delete(announcements).where(eq(announcements.id, data.id));
      });
      return { success: true };
    } catch (e) {
      console.error("Erreur deleteAnnouncement:", e);
      throw new Error("Erreur lors de la suppression de l'annonce");
    }
  });
