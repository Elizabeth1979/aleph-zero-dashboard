import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LayerTabs } from "./layer-tabs";

const LAYERS = ["Today", "Your world", "Setup"] as const;

describe("LayerTabs", () => {
  it("uses Today as the default selected Android layer", () => {
    render(<LayerTabs layers={LAYERS} onSelect={() => {}} />);

    expect(screen.getByRole("button", { name: "Today" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Your world" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "Setup" })).toHaveAttribute("aria-pressed", "false");
  });

  it("uses native buttons to select another layer", () => {
    const onSelect = vi.fn();
    render(<LayerTabs layers={LAYERS} selectedLayer="Today" onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("button", { name: "Setup" }));

    expect(onSelect).toHaveBeenCalledWith("Setup");
  });
});
