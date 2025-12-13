import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

//having problem that session object is not having username filed so to alter it use this and also need to alter User(of prismaAdapter)
declare module "next-auth" {
  interface User {
    username: string | null;
    googleRefreshToken?: string | null;
  }

  interface Session {
    user: {
      username?: string;
    } & DefaultSession["user"];
    // Add your additional properties here:
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  // Cast the adapter to `Adapter` to avoid type mismatches when multiple
  // copies of `@auth/core` are installed (types under different node_modules
  // paths)
  adapter: PrismaAdapter(prisma) as unknown as Adapter,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events",
          access_type: "offline", //here access type offline makes sure to generate a refresh token
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials){
        if (!credentials.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user?.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user && account) {
        if (account.access_token) token.access_token = account.access_token;
        if (account.refresh_token) token.refresh_token = account.refresh_token;

        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }
      // console.log(`This is token\n`)
      // console.log(token)
      if (trigger === "update") {
        token.username = session.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user || token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
      }
      // console.log(`This is session\n`)
      // console.log(session)
      return session;
    },
  },
  // to persist the generated refresh token in the user database 
  events: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google" && account.refresh_token) {
          await prisma.user.update({
            where: { id: user.id },
            data: { googleRefreshToken: account.refresh_token },
          });
        }
      } catch (error) {
        console.error("Failed to persist refresh token", error);
      }
    },
  },
});
