import "server-only";

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  DashboardSnapshotSchema,
  type DashboardSnapshot,
} from "./schema";

export type SnapshotLoadError =
  | "missing"
  | "invalid_json"
  | "invalid_schema"
  | "unavailable";

export type SnapshotLoadResult =
  | { snapshot: DashboardSnapshot; error?: never }
  | { error: SnapshotLoadError; snapshot?: never };

function snapshotPath(): string {
  return (
    process.env.CALM_COMPASS_SNAPSHOT_PATH ??
    resolve(process.cwd(), "private/dashboard-snapshot.json")
  );
}

export async function loadDashboardSnapshot(): Promise<SnapshotLoadResult> {
  let serializedSnapshot: string;

  try {
    serializedSnapshot = await readFile(snapshotPath(), "utf8");
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return { error: "missing" };
    }

    return { error: "unavailable" };
  }

  let candidate: unknown;
  try {
    candidate = JSON.parse(serializedSnapshot);
  } catch {
    return { error: "invalid_json" };
  }

  const parsed = DashboardSnapshotSchema.safeParse(candidate);
  if (!parsed.success) {
    return { error: "invalid_schema" };
  }

  return { snapshot: parsed.data };
}
