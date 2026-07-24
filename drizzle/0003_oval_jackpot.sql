CREATE TABLE IF NOT EXISTS `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`category` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`image_url` text NOT NULL,
	`published_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`is_published` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `articles_slug_unique` ON `articles` (`slug`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `articles_slug_idx` ON `articles` (`slug`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `articles_published_at_idx` ON `articles` (`published_at`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `articles_category_idx` ON `articles` (`category`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `articles_is_published_idx` ON `articles` (`is_published`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `admins_email_idx` ON `admins` (`email`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `contacts_email_idx` ON `contacts` (`email`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `contacts_date_idx` ON `contacts` (`date_envoi`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `contacts_status_idx` ON `contacts` (`status`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `inscriptions_email_idx` ON `inscriptions` (`email`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `inscriptions_date_idx` ON `inscriptions` (`date_inscription`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `inscriptions_status_idx` ON `inscriptions` (`status`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `newsletter_email_idx` ON `newsletter` (`email`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `sessions_admin_id_idx` ON `sessions` (`admin_id`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `sessions_expires_at_idx` ON `sessions` (`expires_at`);