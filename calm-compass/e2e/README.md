# Authentication E2E scope

`auth.spec.ts` runs against a real local Next.js server and verifies every
unauthenticated privacy boundary without Google OAuth credentials. Playwright
sets only a local Auth.js session-signing secret because Auth.js requires one to
start; it is not a Google credential.

A complete authenticated Google OAuth callback cannot be exercised locally
without Elli's real Google client ID/secret and an approved callback URL. That
credential-only check remains gated for the deployment task. Do not add fake
OAuth values: they would test a fiction, which is popular with tests and useless
to humans.
