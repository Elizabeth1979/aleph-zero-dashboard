import { expect, test } from "@playwright/test";

const SNAPSHOT_TEXT = "Review the Calm Compass contract";
const PERSONAL_TEXT = "Private bank details";
const STATIC_SNAPSHOT_PATHS = [
  "/dashboard-snapshot.json",
  "/private/dashboard-snapshot.json",
  "/dashboard-snapshot.example.json",
];

test("unauthenticated root renders only the sign-in experience", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/sign-in\?callbackUrl=/);
  await expect(page.getByRole("heading", { name: "Calm Compass sign-in" })).toBeVisible();
  await expect(page.getByText(SNAPSHOT_TEXT)).toHaveCount(0);
  await expect(page.getByText(PERSONAL_TEXT)).toHaveCount(0);
});

for (const path of STATIC_SNAPSHOT_PATHS) {
  test(`${path} is not a public asset`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });

    expect(response.status()).toBe(404);
    const body = await response.text();
    expect(body).not.toContain(SNAPSHOT_TEXT);
    expect(body).not.toContain(PERSONAL_TEXT);
  });
}
