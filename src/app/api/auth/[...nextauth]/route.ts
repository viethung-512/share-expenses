import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { userAdapter } from "@/adapter/user-adapter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // assign userId to JWT token and get it back in session
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.id) {
        session.user!.id = token.id as string;
      }
      return session;
    },
    async signIn({ user }) {
      const id = user?.id ?? user?.email;
      if (!id) {
        return false;
      }

      try {
        await userAdapter.saveToDb(id, {
          username: user.name || "",
          email: user.email || "",
          avatarUrl: user.image || "",
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
