import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { IUser, UserDetails } from "@/types/types";
import { login } from "../../axios/api";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials.password) return null;
        const user: UserDetails = await login(credentials);

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser;
      session.user = user;

      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
