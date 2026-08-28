import { calculateCompassLayout, RING_DEFINITIONS } from "./geometry";

const viewBox = { width: 900, height: 900 };

describe("calculateCompassLayout", () => {
  it("keeps the three stable rings in Today, Your world, Setup order", () => {
    expect(RING_DEFINITIONS.map((ring) => ring.label)).toEqual([
      "Today",
      "Your world",
      "Setup",
    ]);

    expect(calculateCompassLayout(viewBox).rings.map((ring) => ring.label)).toEqual([
      "Today",
      "Your world",
      "Setup",
    ]);
  });

  it("assigns every stable node a unique angle", () => {
    const nodes = calculateCompassLayout(viewBox).rings.flatMap((ring) => ring.nodes);
    const angles = nodes.map((node) => node.angle);

    expect(new Set(angles).size).toBe(angles.length);
  });

  it("keeps each node circle inside the SVG viewBox", () => {
    const layout = calculateCompassLayout(viewBox);

    for (const node of layout.rings.flatMap((ring) => ring.nodes)) {
      expect(node.x - node.radius).toBeGreaterThanOrEqual(0);
      expect(node.y - node.radius).toBeGreaterThanOrEqual(0);
      expect(node.x + node.radius).toBeLessThanOrEqual(viewBox.width);
      expect(node.y + node.radius).toBeLessThanOrEqual(viewBox.height);
    }
  });

  it("describes the Mac as primary without presenting the VPS as active", () => {
    const setup = RING_DEFINITIONS.find((ring) => ring.label === "Setup");
    const gateway = setup?.nodes.find((node) => node.label === "Gateway");

    expect(gateway?.value).toBe("Mac primary");
    expect(setup?.nodes.map((node) => node.value).join(" ")).not.toMatch(/VPS/i);
  });

  it("preserves the centre at the middle of the viewBox", () => {
    expect(calculateCompassLayout(viewBox).centre).toEqual({ x: 450, y: 450 });
  });

  it("is deterministic when equivalent input keys are ordered differently", () => {
    const first = calculateCompassLayout({ width: 900, height: 900 });
    const second = calculateCompassLayout({ height: 900, width: 900 });

    expect(second).toEqual(first);
  });
});
