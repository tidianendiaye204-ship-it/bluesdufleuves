import { test, expect } from "@playwright/test";

test("Contact form should display validation errors for empty fields", async ({ page }) => {
  await page.goto("/contact");

  // Attendre que la page soit chargée et que le formulaire soit visible
  await page.waitForSelector('button[type="submit"]', { state: "visible", timeout: 10000 });

  // Cliquer sur le bouton submit sans remplir les champs
  await page.click('button[type="submit"]');

  // React Hook Form valide de manière asynchrone — attendre l'apparition du message
  await expect(page.getByText("Le nom complet est requis")).toBeVisible({ timeout: 8000 });
});
