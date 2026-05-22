import { test, expect } from "@playwright/test";

test("Contact form should display validation errors for empty fields", async ({ page }) => {
  await page.goto("/contact");

  // Try submitting without filling any field
  await page.click('button[type="submit"]');

  // Verify validation messages appear (since they are required natively or via RHF)
  // Assuming the user tries to submit, HTML5 validation will trigger first if 'required' is present,
  // but let's check for custom RHF error classes or texts if they bypass HTML5.

  // As we used required in HTML before and now use RHF, we can check for RHF error messages
  await expect(page.locator("text=Le nom complet est requis")).toBeVisible();
});
