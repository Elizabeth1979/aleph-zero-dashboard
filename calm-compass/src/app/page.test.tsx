import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders the Calm Compass product identity", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: /Elli’s Calm Compass/i })).toBeVisible();
});
