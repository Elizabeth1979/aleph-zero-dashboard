import { describe, expect, it } from "vitest";
import { isAllowedEmail, isTestBypassAllowed } from "./auth-policy";

const allowedEmail = "el.patrick79@gmail.com";

describe("isAllowedEmail", () => {
  it("accepts Elli's exact configured email", () => {
    expect(isAllowedEmail(allowedEmail, allowedEmail)).toBe(true);
  });

  it("rejects a different email", () => {
    expect(isAllowedEmail("someone@example.com", allowedEmail)).toBe(false);
  });

  it("rejects a missing presented email", () => {
    expect(isAllowedEmail(undefined, allowedEmail)).toBe(false);
  });

  it("rejects access when the allowed email is missing", () => {
    expect(isAllowedEmail(allowedEmail, undefined)).toBe(false);
  });

  it("rejects uppercase variants rather than normalizing identity", () => {
    expect(isAllowedEmail("EL.PATRICK79@GMAIL.COM", allowedEmail)).toBe(false);
  });

  it("rejects whitespace variants rather than trimming identity", () => {
    expect(isAllowedEmail(` ${allowedEmail} `, allowedEmail)).toBe(false);
  });
});

describe("isTestBypassAllowed", () => {
  it("permits an explicitly requested bypass only in test outside Vercel production", () => {
    expect(
      isTestBypassAllowed({
        requested: true,
        nodeEnv: "test",
        vercelEnv: "preview",
      }),
    ).toBe(true);
  });

  it("rejects a test bypass in Vercel production", () => {
    expect(
      isTestBypassAllowed({
        requested: true,
        nodeEnv: "test",
        vercelEnv: "production",
      }),
    ).toBe(false);
  });

  it("rejects a test bypass outside test mode", () => {
    expect(
      isTestBypassAllowed({
        requested: true,
        nodeEnv: "production",
        vercelEnv: "preview",
      }),
    ).toBe(false);
  });
});
