"use client";

import { useCallback, useEffect, useState } from "react";

const selectionParameter = "compass";

function selectionFromLocation(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return new URLSearchParams(window.location.search).get(selectionParameter);
}

function updateLocation(selectedLabel: string | null) {
  const url = new URL(window.location.href);

  if (selectedLabel) {
    url.searchParams.set(selectionParameter, selectedLabel);
  } else {
    url.searchParams.delete(selectionParameter);
  }

  window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function useCompassState() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(selectionFromLocation);

  useEffect(() => {
    const restoreSelection = () => setSelectedLabel(selectionFromLocation());
    window.addEventListener("popstate", restoreSelection);
    return () => window.removeEventListener("popstate", restoreSelection);
  }, []);

  const select = useCallback((label: string) => {
    setSelectedLabel(label);
    updateLocation(label);
  }, []);

  const close = useCallback(() => {
    setSelectedLabel(null);
    updateLocation(null);
  }, []);

  return { selectedLabel, select, close };
}
