import { expect, test } from "@playwright/test";

const ANDROID_VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
];

for (const viewport of ANDROID_VIEWPORTS) {
  test.describe(`Calm Compass Android at ${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport });

    test.beforeEach(async ({ page }) => {
      await page.goto("/sign-in/test-compass");
      await expect(page.getByRole("region", { name: "Elli’s Calm Compass" })).toBeVisible();
    });

    test("defaults to Today, keeps the centre visible, and shows only its labels", async ({ page }) => {
      const canvas = page.getByRole("img", { name: "Elli’s Calm Compass" });
      const tabs = page.getByRole("navigation", { name: "Compass layers" });

      await expect(tabs.getByRole("button", { name: "Today" })).toHaveAttribute("aria-pressed", "true");
      await expect(canvas.locator("text", { hasText: "Start here" })).toBeVisible();
      await expect(canvas.locator('g[role="button"]:visible')).toHaveCount(6);
      await expect(canvas.getByRole("button", { name: /Projects/i })).toBeHidden();
      await expect(canvas.getByRole("button", { name: /Automations/i })).toBeHidden();

      const labelHeights = await canvas.locator('g[role="button"]:visible text').evaluateAll((labels) =>
        labels.map((label) => label.getBoundingClientRect().height),
      );
      expect(Math.min(...labelHeights)).toBeGreaterThanOrEqual(14);
    });

    test("switches layers through 44px native button targets", async ({ page }) => {
      const tabs = page.getByRole("navigation", { name: "Compass layers" });
      const setup = tabs.getByRole("button", { name: "Setup" });

      const box = await setup.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);

      await setup.click();
      await expect(setup).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByRole("img", { name: "Elli’s Calm Compass" }).locator('g[role="button"]:visible')).toHaveCount(8);
      await expect(page.getByRole("button", { name: /Automations/i })).toBeVisible();
      await expect(page.getByRole("button", { name: /To-dos/i })).toBeHidden();
    });

    test("opens and closes a bottom sheet without horizontal overflow", async ({ page }) => {
      await page.getByRole("button", { name: /To-dos/i }).click();
      const sheet = page.getByRole("complementary", { name: "To-dos" });

      await expect(sheet).toBeVisible();
      const openOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(openOverflow).toBe(0);

      await sheet.getByRole("button", { name: "Close details" }).click();
      await expect(sheet).toBeHidden();
      const closedOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(closedOverflow).toBe(0);
    });
  });
}
