import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Compass } from "./compass";
import { RING_DEFINITIONS } from "./geometry";

describe("Compass", () => {
  it("renders the Start here centre label", () => {
    render(<Compass />);

    expect(screen.getByRole("heading", { name: "Start here" })).toBeVisible();
  });

  it("renders every stable node as an accessible button", () => {
    render(<Compass />);

    for (const node of RING_DEFINITIONS.flatMap((ring) => ring.nodes)) {
      expect(screen.getByRole("button", { name: new RegExp(node.label, "i") })).toBeVisible();
    }
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
