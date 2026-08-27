import "@testing-library/jest-dom/vitest";
import { readFileSync } from "node:fs";
import { fireEvent, render, screen, within } from "@testing-library/react";
import HomePage from "../../app/page";
import { Compass } from "./compass";
import styles from "./compass.module.css";

const EXPECTED_NODE_LABELS = [
  "To-dos",
  "Calendar",
  "Email",
  "New resources",
  "System health",
  "Someday",
  "Projects",
  "Knowledge",
  "Portfolio",
  "Progress",
  "Ideas and learnings",
  "Personal patterns",
  "Automations",
  "Workers",
  "Models",
  "Memory",
  "Integrations",
  "Skills",
  "Gateway",
  "Private access",
] as const;

const compassStyles = readFileSync("src/components/compass/compass.module.css", "utf8");

function ruleFor(className: string): string {
  const match = compassStyles.match(new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`));
  expect(match, `Expected .${className} CSS rule`).not.toBeNull();
  return match?.[1] ?? "";
}

describe("Compass", () => {
  it("renders the visible SVG Start here centre label", () => {
    render(<Compass />);
    const canvas = screen.getByRole("img", { name: /Elli’s Calm Compass/ });

    expect(within(canvas).getByText("Start here", { selector: "text" })).toBeVisible();
  });

  it("renders every independently specified stable node as an accessible button", () => {
    render(<Compass />);

    for (const label of EXPECTED_NODE_LABELS) {
      expect(screen.getByRole("button", { name: new RegExp(label, "i") })).toBeVisible();
    }
  });

  it("keeps all visible SVG labels at least 14 physical pixels at the shortest desktop viewport", () => {
    for (const className of ["nodeText", "nodeValue", "centreLabel", "centreText"]) {
      const fontSize = Number(ruleFor(className).match(/font-size:\s*(\d+)px/)?.[1]);

      expect(fontSize * ((600 - 84) / 900), `${className} physical font size`).toBeGreaterThanOrEqual(14);
    }
  });

  it("fits the complete canvas inside a 600-pixel desktop viewport", () => {
    expect(ruleFor("compass")).not.toMatch(/min-height/);
    expect(ruleFor("canvas")).toContain("height: calc(100vh - 5.25rem)");
    expect(ruleFor("canvas")).not.toMatch(/min-height/);
  });

  it("uses the task-scoped full-viewport page layout", () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector("main")).toHaveClass(styles.page);
  });

  it("selects a node from the keyboard and exposes its selected state", () => {
    render(<Compass />);
    const todo = screen.getByRole("button", { name: /To-dos/i });

    todo.focus();
    fireEvent.keyDown(todo, { key: "Enter" });

    expect(todo).toHaveAttribute("aria-pressed", "true");
  });

  it("also selects a node with Space", () => {
    render(<Compass />);
    const calendar = screen.getByRole("button", { name: /Calendar/i });

    fireEvent.keyDown(calendar, { key: " " });

    expect(calendar).toHaveAttribute("aria-pressed", "true");
  });

  it("clears the selected node with Fit all", () => {
    render(<Compass />);
    const todo = screen.getByRole("button", { name: /To-dos/i });

    fireEvent.click(todo);
    fireEvent.click(screen.getByRole("button", { name: "Fit all" }));

    expect(todo).toHaveAttribute("aria-pressed", "false");
  });
});
