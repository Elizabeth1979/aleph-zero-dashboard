import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DetailSheet } from "./detail-sheet";

describe("DetailSheet", () => {
  it("explains a selection with a left-aligned heading hierarchy", () => {
    render(<DetailSheet selectedLabel="To-dos" onClose={() => undefined} />);

    expect(screen.getByRole("heading", { level: 2, name: "To-dos" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Why this is recommended" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Evidence" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Quick win" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Continue" })).toBeVisible();
  });

  it("states that recommendation evidence is unavailable placeholder guidance", () => {
    render(<DetailSheet selectedLabel="Email" onClose={() => undefined} />);

    expect(screen.getByText(/placeholder guidance/i)).toBeVisible();
    expect(screen.getByText(/live personal data is unavailable/i)).toBeVisible();
    expect(screen.getByText(/freshness is unknown/i)).toBeVisible();
  });

  it("uses a native Close button to dismiss the sheet", () => {
    const onClose = vi.fn();
    render(<DetailSheet selectedLabel="Calendar" onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Close details" }));

    expect(onClose).toHaveBeenCalledOnce();
  });
});
