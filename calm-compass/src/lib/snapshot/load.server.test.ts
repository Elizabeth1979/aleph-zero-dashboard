import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadDashboardSnapshot } from "./load.server";

const validSnapshot = readFileSync(
  resolve("private/dashboard-snapshot.example.json"),
  "utf8",
);

let temporaryDirectory: string;

beforeEach(() => {
  temporaryDirectory = mkdtempSync(join(tmpdir(), "calm-compass-loader-"));
});

afterEach(() => {
  delete process.env.CALM_COMPASS_SNAPSHOT_PATH;
  rmSync(temporaryDirectory, { recursive: true, force: true });
});

function useSnapshot(contents: string): void {
  const snapshotPath = join(temporaryDirectory, "dashboard-snapshot.json");
  writeFileSync(snapshotPath, contents, "utf8");
  process.env.CALM_COMPASS_SNAPSHOT_PATH = snapshotPath;
}

describe("loadDashboardSnapshot", () => {
  it("loads the committed private snapshot by default", async () => {
    delete process.env.CALM_COMPASS_SNAPSHOT_PATH;

    const result = await loadDashboardSnapshot();

    expect(result.snapshot?.focus.id).toBe("task-1");
  });

  it("loads a valid private snapshot", async () => {
    useSnapshot(validSnapshot);

    const result = await loadDashboardSnapshot();

    expect(result).toHaveProperty("snapshot");
    if (result.snapshot !== undefined) {
      expect(result.snapshot.focus.id).toBe("task-1");
    }
  });

  it("returns a non-sensitive code for invalid JSON", async () => {
    useSnapshot('{"email_body":"private words"');

    await expect(loadDashboardSnapshot()).resolves.toEqual({
      error: "invalid_json",
    });
  });

  it("returns a non-sensitive code for an invalid schema", async () => {
    useSnapshot('{"email_body":"private words"}');

    await expect(loadDashboardSnapshot()).resolves.toEqual({
      error: "invalid_schema",
    });
  });

  it("returns a non-sensitive code when the file is missing", async () => {
    process.env.CALM_COMPASS_SNAPSHOT_PATH = join(
      temporaryDirectory,
      "missing.json",
    );

    await expect(loadDashboardSnapshot()).resolves.toEqual({
      error: "missing",
    });
  });
});
