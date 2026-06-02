import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Remindly" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("about page loads", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveURL(/\/about/);
});
