import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const inscriptions = sqliteTable("inscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  prenom: text("prenom").notNull(),
  nom: text("nom").notNull(),
  email: text("email").notNull(),
  tel: text("tel").notNull(),
  formation: text("formation").notNull(),
  motivation: text("motivation").notNull(),
  dateInscription: integer("date_inscription", { mode: "timestamp" }).notNull(),
  statut: text("status", { enum: ["en_attente", "accepte", "refuse"] })
    .default("en_attente")
    .notNull(),
});

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nom: text("nom").notNull(),
  email: text("email").notNull(),
  sujet: text("sujet").notNull(),
  message: text("message").notNull(),
  dateEnvoi: integer("date_envoi", { mode: "timestamp" }).notNull(),
  statut: text("status", { enum: ["non_lu", "lu", "traite"] })
    .default("non_lu")
    .notNull(),
});

export const newsletter = sqliteTable("newsletter", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  dateInscription: integer("date_inscription", { mode: "timestamp" }).notNull(),
});

export const admins = sqliteTable("admins", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  adminId: text("admin_id")
    .notNull()
    .references(() => admins.id),
  expiresAt: integer("expires_at").notNull(),
});

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  isPublished: integer("is_published", { mode: "boolean" }).default(true).notNull(),
});
