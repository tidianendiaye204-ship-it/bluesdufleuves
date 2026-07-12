CREATE TABLE IF NOT EXISTS `inscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`prenom` text NOT NULL,
	`nom` text NOT NULL,
	`email` text NOT NULL,
	`tel` text NOT NULL,
	`formation` text NOT NULL,
	`motivation` text NOT NULL,
	`date_inscription` integer NOT NULL,
	`status` text DEFAULT 'en_attente' NOT NULL
);
