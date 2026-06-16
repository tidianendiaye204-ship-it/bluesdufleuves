import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const inscriptions = sqliteTable(
  "inscriptions",
  {
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
  },
  (table) => ({
    emailIdx: index("inscriptions_email_idx").on(table.email),
    dateIdx: index("inscriptions_date_idx").on(table.dateInscription),
    statusIdx: index("inscriptions_status_idx").on(table.statut),
  }),
);

export const contacts = sqliteTable(
  "contacts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nom: text("nom").notNull(),
    email: text("email").notNull(),
    sujet: text("sujet").notNull(),
    message: text("message").notNull(),
    dateEnvoi: integer("date_envoi", { mode: "timestamp" }).notNull(),
    statut: text("status", { enum: ["non_lu", "lu", "traite"] })
      .default("non_lu")
      .notNull(),
  },
  (table) => ({
    emailIdx: index("contacts_email_idx").on(table.email),
    dateIdx: index("contacts_date_idx").on(table.dateEnvoi),
    statusIdx: index("contacts_status_idx").on(table.statut),
  }),
);

export const newsletter = sqliteTable(
  "newsletter",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    dateInscription: integer("date_inscription", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    emailIdx: index("newsletter_email_idx").on(table.email),
  }),
);

export const admins = sqliteTable(
  "admins",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
  },
  (table) => ({
    emailIdx: index("admins_email_idx").on(table.email),
  }),
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    adminId: text("admin_id")
      .notNull()
      .references(() => admins.id),
    expiresAt: integer("expires_at").notNull(),
  },
  (table) => ({
    adminIdIdx: index("sessions_admin_id_idx").on(table.adminId),
    expiresAtIdx: index("sessions_expires_at_idx").on(table.expiresAt),
  }),
);

export const articles = sqliteTable(
  "articles",
  {
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
  },
  (table) => ({
    slugIdx: index("articles_slug_idx").on(table.slug),
    publishedAtIdx: index("articles_published_at_idx").on(table.publishedAt),
    categoryIdx: index("articles_category_idx").on(table.category),
    isPublishedIdx: index("articles_is_published_idx").on(table.isPublished),
  }),
);
