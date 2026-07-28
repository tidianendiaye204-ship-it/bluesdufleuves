import { test, expect } from "@playwright/test";

test.use({ locale: 'fr-FR' });

test("Contact form should display validation errors for empty fields", async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto("/contact");

  // Attendre que la page soit chargée et que le bouton de contact soit visible
  const submitButton = page.getByRole('button', { name: /envoyer le message/i });
  await expect(submitButton).toBeVisible({ timeout: 10000 });

  // Attendre que React ait le temps d'hydrater et splash screen fade
  await page.waitForTimeout(2500);

  // Cliquer sur le bouton submit spécifique au formulaire de contact
  await submitButton.click();

  // React Hook Form valide de manière asynchrone — attendre l'apparition du message
  await expect(page.getByText("Le nom complet est requis")).toBeVisible({ timeout: 8000 });
});
