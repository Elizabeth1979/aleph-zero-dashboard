export function isAllowedEmail(
  presentedEmail: string | null | undefined,
  allowedEmail: string | null | undefined,
): boolean {
  return Boolean(
    presentedEmail && allowedEmail && presentedEmail === allowedEmail,
  );
}

export function isTestBypassAllowed({
  requested,
  nodeEnv,
  vercelEnv,
}: {
  requested: boolean;
  nodeEnv: string | undefined;
  vercelEnv: string | undefined;
}): boolean {
  return requested && nodeEnv === "test" && vercelEnv !== "production";
}
