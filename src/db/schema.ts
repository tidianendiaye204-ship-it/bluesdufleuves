import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const inscriptions = sqliteTable('inscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  prenom: text('prenom').notNull(),
  nom: text('nom').notNull(),
  email: text('email').notNull(),
  tel: text('tel').notNull(),
  formation: text('formation').notNull(),
  motivation: text('motivation').notNull(),
  dateInscription: integer('date_inscription', { mode: 'timestamp' }).notNull(),
  statut: text('status', { enum: ['en_attente', 'accepte', 'refuse'] }).default('en_attente').notNull(),
});
