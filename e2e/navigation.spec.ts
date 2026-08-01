import { test, expect } from "@playwright/test";

test.describe("Navigation principale", () => {
  test("devrait pouvoir naviguer sur toutes les pages principales sans erreur", async ({
    page,
  }) => {
    // 1. Page d'accueil
    await page.goto("/");
    // On vérifie que la page charge bien (pas de 404/500)
    await expect(page.locator("header")).toBeVisible();

    // 2. Page Festival
    await page.goto("/blues-du-fleuve");
    await expect(page.locator("main")).toBeVisible();

    // 3. Page Formations
    await page.goto("/formations");
    await expect(page.locator("main")).toBeVisible();

    // 4. Page Contact
    await page.goto("/contact");
    await expect(page.locator("main")).toBeVisible();
  });
});
