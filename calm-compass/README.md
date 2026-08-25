# Calm Compass

Private AI-first replacement for Elli's current Hermes dashboard.

## Invariants

- The legacy dashboard at the repository root remains production until Elli explicitly approves cutover.
- The new application lives entirely under `calm-compass/`.
- Personal dashboard snapshots must never be written to `calm-compass/public/` or client-side static bundles.
- The web dashboard is read-only. Discord remains the command and correction surface.
- Hermes Desktop remains the detailed administration surface.

Approved specification: `../docs/specs/2026-08-25-ai-first-calm-compass-dashboard.md`  
Implementation plan: `../docs/plans/2026-08-25-ai-first-calm-compass-implementation.md`
