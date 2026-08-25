import { z } from "zod";

const EvidenceSchema = z
  .object({
    source: z.string().min(1),
    id: z.string().min(1),
    reason: z.string().min(1),
  })
  .strict();

const ActionSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    due: z.iso.date().nullable(),
    timingReason: z.string().min(1).nullable(),
    effort: z.enum(["quick", "medium", "deep"]),
    why: z.string().min(1),
    evidence: z.array(EvidenceSchema),
  })
  .strict();

const FocusSchema = ActionSchema.superRefine((focus, context) => {
  if (focus.due !== null && focus.evidence.length === 0) {
    context.addIssue({
      code: "custom",
      message: "A focus deadline requires source evidence.",
      path: ["evidence"],
    });
  }
});

const SourceFreshnessSchema = z
  .object({
    source: z.string().min(1),
    checkedAt: z.iso.datetime({ offset: true }),
    status: z.enum(["fresh", "stale", "unavailable"]),
    reason: z.string().min(1).optional(),
  })
  .strict();

const ChangeSchema = z
  .object({
    kind: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    sourceId: z.string().min(1),
    impact: z.enum(["quiet", "attention", "resolved"]),
  })
  .strict();

const ConnectionSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    reason: z.string().min(1),
    sourceIds: z.array(z.string().min(1)).min(2),
    evidence: z.array(EvidenceSchema).min(1),
  })
  .strict();

const AnomalySchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    severity: z.enum(["notice", "warning"]),
    evidence: z.array(EvidenceSchema).min(1),
  })
  .strict();

const UncertaintySchema = z
  .object({
    source: z.string().min(1),
    reason: z.string().min(1),
    stale: z.boolean(),
  })
  .strict();

const RingNodeSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    status: z.enum(["clear", "attention", "stale"]),
    count: z.number().int().nonnegative(),
    summary: z.string().min(1),
    evidence: z.array(EvidenceSchema),
  })
  .strict();

const RingSchema = z
  .object({
    id: z.enum(["today", "world", "setup"]),
    label: z.string().min(1),
    nodes: z.array(RingNodeSchema),
  })
  .strict();

const PersonalizationSummarySchema = z
  .object({
    active: z.boolean(),
    summary: z.string().min(1),
    appliedPreferences: z.array(z.string().min(1)),
  })
  .strict();

export const DashboardSnapshotSchema = z
  .object({
    version: z.literal("1"),
    generatedAt: z.iso.datetime({ offset: true }),
    fallbackMode: z.enum(["ai", "deterministic"]),
    sourceFreshness: z.array(SourceFreshnessSchema),
    focus: FocusSchema,
    quickWin: ActionSchema.nullable(),
    continueItem: ActionSchema.nullable(),
    changes: z.array(ChangeSchema),
    connections: z.array(ConnectionSchema),
    anomalies: z.array(AnomalySchema),
    uncertainty: z.array(UncertaintySchema),
    rings: z.array(RingSchema).length(3),
    personalizationSummary: PersonalizationSummarySchema,
  })
  .strict();

export type DashboardSnapshot = z.infer<typeof DashboardSnapshotSchema>;
