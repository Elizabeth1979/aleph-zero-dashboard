import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const CLIENT_BUILD = join(ROOT, ".next", "static");
const PRIVATE_CANARIES = [
  "Private bank details",
  "Never expose this entry",
  "fixture-oauth-access-token-keep-private",
  "fixture-google-client-secret-keep-private",
];

function filesBelow(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

it("keeps personal, config, and token canaries out of built client chunks", () => {
  expect(existsSync(join(ROOT, ".next", "BUILD_ID")), "run npm run build before this regression check").toBe(true);
  const chunks = filesBelow(CLIENT_BUILD);
  expect(chunks.length).toBeGreaterThan(0);

  for (const path of chunks) {
    const content = readFileSync(path, "utf8");
    for (const canary of PRIVATE_CANARIES) {
      expect(content, `${canary} leaked through ${relative(ROOT, path)}`).not.toContain(canary);
    }
  }
});
