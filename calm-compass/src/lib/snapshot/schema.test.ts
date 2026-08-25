import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
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

it("rejects unsupported deadlines in the exported JSON Schema", () => {
  const invalid = structuredClone(validFixture);
  invalid.focus.due = "2026-09-01";
  invalid.focus.evidence = [];
  const temporaryDirectory = mkdtempSync(join(tmpdir(), "calm-compass-schema-"));
  const invalidPath = join(temporaryDirectory, "invalid.json");
  writeFileSync(invalidPath, JSON.stringify(invalid), "utf8");

  try {
    expect(() =>
      execFileSync(
        "python3",
        [
          "-c",
          [
            "import json, sys",
            "import jsonschema",
            "with open(sys.argv[1], encoding='utf-8') as instance_file:",
            "    instance = json.load(instance_file)",
            "with open(sys.argv[2], encoding='utf-8') as schema_file:",
            "    schema = json.load(schema_file)",
            "jsonschema.validate(instance, schema)",
          ].join("\n"),
          invalidPath,
          resolve("schema/dashboard-snapshot.schema.json"),
        ],
        { stdio: "pipe" },
      ),
    ).toThrow();
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

it("keeps the generated JSON Schema stable", () => {
  const schemaPath = resolve("schema/dashboard-snapshot.schema.json");
  const before = readFileSync(schemaPath, "utf8");

  execFileSync("npm", ["run", "schema"], { stdio: "pipe" });

  expect(readFileSync(schemaPath, "utf8")).toBe(before);
});
