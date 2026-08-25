import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { z } from "zod";
import { DashboardSnapshotSchema } from "../src/lib/snapshot/schema";

const outputPath = resolve("schema/dashboard-snapshot.schema.json");
const jsonSchema = {
  $id: "https://calm-compass.local/schema/dashboard-snapshot.schema.json",
  ...z.toJSONSchema(DashboardSnapshotSchema, { target: "draft-2020-12" }),
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(jsonSchema, null, 2)}\n`, "utf8");
