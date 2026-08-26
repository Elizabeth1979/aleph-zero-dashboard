import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { isAllowedEmail } from "./auth-policy";

export { isAllowedEmail, isTestBypassAllowed } from "./auth-policy";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth: session }) {
      return isAllowedEmail(session?.user?.email, process.env.AUTH_ALLOWED_EMAIL);
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
