CREATE TABLE IF NOT EXISTS `contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nom` text NOT NULL,
	`email` text NOT NULL,
	`sujet` text NOT NULL,
	`message` text NOT NULL,
	`date_envoi` integer NOT NULL,
	`status` text DEFAULT 'non_lu' NOT NULL
);
