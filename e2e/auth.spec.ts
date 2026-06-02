import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("unauthenticated user is redirected from /dashboard to /sign-in", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/sign-in/);
  });

  test("sign-in page renders correctly", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.locator("body")).toBeVisible();
    // Clerk sign-in iframe or form should be present
    await expect(page.locator("[data-clerk-component]").or(page.getByRole("main"))).toBeVisible();
  });

  test("landing page renders hero for unauthenticated users", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByText("Stay on top of your tasks")
    ).toBeVisible();
    await expect(page.getByText("Get started for free")).toBeVisible();
  });

  test("about page renders correctly", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("About Remindly")).toBeVisible();
  });
});
