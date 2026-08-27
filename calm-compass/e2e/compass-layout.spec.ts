import { expect, test, type Locator } from "@playwright/test";

type Box = { x: number; y: number; width: number; height: number };

function overlaps(a: Box, b: Box, tolerance = 1): boolean {
  return (
    a.x + tolerance < b.x + b.width &&
    a.x + a.width > b.x + tolerance &&
    a.y + tolerance < b.y + b.height &&
    a.y + a.height > b.y + tolerance
  );
}

async function boxesFor(locator: Locator): Promise<Box[]> {
  return locator.evaluateAll((elements) =>
    elements.map((element) => {
      const box = (element as SVGGraphicsElement).getBoundingClientRect();
      return { x: box.x, y: box.y, width: box.width, height: box.height };
    }),
  );
}

test.describe("Calm Compass visual layout", () => {
  test.use({ viewport: { width: 1366, height: 600 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in/test-compass");
    await expect(page.getByRole("img", { name: "Elli’s Calm Compass" })).toBeVisible();
  });

  test("renders every ring as a stroked outline", async ({ page }) => {
    const ringStyles = await page.locator("svg > circle").evaluateAll((rings) =>
      rings.slice(0, 3).map((ring) => {
        const style = getComputedStyle(ring);
        return { fill: style.fill, strokeWidth: style.strokeWidth };
      }),
    );

    expect(ringStyles).toHaveLength(3);
    for (const style of ringStyles) {
      expect(style.fill).toBe("none");
      expect(style.strokeWidth).toBe("2px");
    }
  });

  test("keeps text readable, visible, and collision-free", async ({ page }) => {
    const canvas = page.getByRole("img", { name: "Elli’s Calm Compass" });
    const labels = canvas.locator('g[role="button"] > text:first-of-type');
    const values = canvas.locator('g[role="button"] > text:nth-of-type(2)');
    const centreLines = canvas.locator(":scope > text");

    await expect(labels).toHaveCount(20);
    await expect(values).toHaveCount(0);
    await expect(centreLines).toHaveCount(3);

    const fontSizes = await labels.evaluateAll((elements) =>
      elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
    );
    expect(Math.min(...fontSizes)).toBeGreaterThanOrEqual(14);

    const textBoxes = await boxesFor(labels);
    const centreBoxes = await boxesFor(centreLines);
    expect(Math.min(...textBoxes.map((box) => box.height))).toBeGreaterThanOrEqual(14);
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();

    for (const box of [...textBoxes, ...centreBoxes]) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport!.width);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport!.height);
    }

    const allTextBoxes = [...textBoxes, ...centreBoxes];
    for (let left = 0; left < allTextBoxes.length; left += 1) {
      for (let right = left + 1; right < allTextBoxes.length; right += 1) {
        expect(overlaps(allTextBoxes[left], allTextBoxes[right]), `text ${left} and ${right} overlap`).toBe(false);
      }
    }

    const centreCircle = (await boxesFor(canvas.locator(":scope > circle:nth-of-type(4)")))[0];
    for (const box of centreBoxes) {
      expect(
        box.x >= centreCircle.x &&
          box.y >= centreCircle.y &&
          box.x + box.width <= centreCircle.x + centreCircle.width &&
          box.y + box.height <= centreCircle.y + centreCircle.height,
      ).toBe(true);
    }

    const documentOverflow = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight - document.documentElement.clientHeight,
    }));
    expect(documentOverflow.width).toBe(0);
    expect(documentOverflow.height).toBe(0);
  });
});
