import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

import { isAllowedEmail } from "./auth-policy";

const PRIVATE_SNAPSHOT_PATHS = new Set([
  "/dashboard-snapshot.json",
  "/private/dashboard-snapshot.json",
  "/dashboard-snapshot.example.json",
]);

export { isAllowedEmail, isTestBypassAllowed } from "./auth-policy";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth: session, request }) {
      if (PRIVATE_SNAPSHOT_PATHS.has(request.nextUrl.pathname)) {
        return new NextResponse(null, { status: 404 });
      }
      return isAllowedEmail(session?.user?.email, process.env.AUTH_ALLOWED_EMAIL);
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
