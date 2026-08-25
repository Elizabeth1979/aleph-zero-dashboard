import "@testing-library/jest-dom/vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import validFixture from "../../../private/dashboard-snapshot.example.json";
import { DashboardSnapshotSchema } from "./schema";

it("accepts the complete deterministic fallback snapshot", () => {
  expect(DashboardSnapshotSchema.safeParse(validFixture).success).toBe(true);
});

it("rejects a focus deadline without source evidence", () => {
  const invalid = structuredClone(validFixture);
  invalid.focus.due = "2026-09-01";
  invalid.focus.evidence = [];

  expect(DashboardSnapshotSchema.safeParse(invalid).success).toBe(false);
});

it("rejects raw email bodies and credential-shaped fields", () => {
  expect(() =>
    DashboardSnapshotSchema.parse({ ...validFixture, email_body: "secret" }),
  ).toThrow();
  expect(() =>
    DashboardSnapshotSchema.parse({ ...validFixture, oauth_token: "secret" }),
  ).toThrow();
});

it("keeps the generated JSON Schema stable", () => {
  const schemaPath = resolve("schema/dashboard-snapshot.schema.json");
  const before = readFileSync(schemaPath, "utf8");

  execFileSync("npm", ["run", "schema"], { stdio: "pipe" });

  expect(readFileSync(schemaPath, "utf8")).toBe(before);
});
