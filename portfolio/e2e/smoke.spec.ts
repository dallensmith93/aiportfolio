import { expect, test } from "@playwright/test";

test("open home, search project, open detail", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "AI Apps Portfolio" })).toBeVisible();

  await page.getByRole("link", { name: "Explore Projects" }).click();
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

  await page.getByLabel("Search").fill("rule engine");
  await page.getByRole("link", { name: "View details" }).first().click();

  await expect(page.getByRole("heading", { name: "Rule Engine Studio" })).toBeVisible();
});

test("direct navigation to project slug works (refresh-safe)", async ({ page }) => {
  await page.goto("/projects/rule-engine-studio");
  await expect(page.getByRole("heading", { name: "Rule Engine Studio" })).toBeVisible();

  // Simulate hard refresh behavior against static hosting fallback.
  await page.reload();
  await expect(page.getByRole("heading", { name: "Rule Engine Studio" })).toBeVisible();
});
