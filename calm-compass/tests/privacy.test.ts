import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PERSONAL_CANARIES = [
  "Private bank details",
  "Never expose this entry",
  "fixture-oauth-access-token-keep-private",
  "fixture-google-client-secret-keep-private",
];

function filesBelow(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

function assertCanariesAbsent(paths: string[]) {
  for (const path of paths) {
    const content = readFileSync(path, "utf8");
    for (const canary of PERSONAL_CANARIES) {
      expect(content, `${canary} leaked through ${relative(ROOT, path)}`).not.toContain(canary);
    }
  }
}

describe("private source boundaries", () => {
  it("keeps known personal fixture strings out of public files", () => {
    assertCanariesAbsent(filesBelow(join(ROOT, "public")));
  });

  it("keeps known personal fixture strings and private imports out of client components", () => {
    const clientModules = filesBelow(join(ROOT, "src")).filter((path) => {
      if (!/\.[cm]?[jt]sx?$/.test(path)) return false;
      return /^\s*["']use client["'];/m.test(readFileSync(path, "utf8"));
    });

    expect(clientModules.length).toBeGreaterThan(0);
    assertCanariesAbsent(clientModules);
    for (const path of clientModules) {
      const content = readFileSync(path, "utf8");
      expect(content).not.toMatch(/(?:private\/|load\.server|CALM_COMPASS_SNAPSHOT_PATH)/);
    }
  });
});
