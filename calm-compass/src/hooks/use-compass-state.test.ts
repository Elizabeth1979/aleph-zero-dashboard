import { act, renderHook } from "@testing-library/react";
import { useCompassState } from "./use-compass-state";

function setUrl(url: string) {
  window.history.replaceState({}, "", url);
}

describe("useCompassState", () => {
  beforeEach(() => {
    setUrl("/");
  });

  it("restores the selected node from the URL", () => {
    setUrl("/?compass=To-dos");

    const { result } = renderHook(() => useCompassState());

    expect(result.current.selectedLabel).toBe("To-dos");
  });

  it("adds a selected node to browser history and clears it on close", () => {
    const { result } = renderHook(() => useCompassState());

    act(() => result.current.select("Calendar"));
    expect(result.current.selectedLabel).toBe("Calendar");
    expect(window.location.search).toBe("?compass=Calendar");

    act(() => result.current.close());
    expect(result.current.selectedLabel).toBeNull();
    expect(window.location.search).toBe("");
  });

  it("restores the sheet from a browser back navigation event", () => {
    const { result } = renderHook(() => useCompassState());

    act(() => result.current.select("Email"));
    act(() => result.current.close());
    act(() => {
      window.history.replaceState({}, "", "/?compass=Email");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.selectedLabel).toBe("Email");
  });
});
