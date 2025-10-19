import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs";

//having problem that session object is not having username filed so to alter it use this and also need to alter User(of prismaAdapter)
declare module "next-auth" {
  interface User {
    username: string | null
  }

  interface Session {
    user:{
      username?: string ;
    }& DefaultSession["user"]
    // Add your additional properties here:
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      credentials: {
        email: {label: "Email", type: "email"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials){
        if (!credentials.email || !credentials.password) return null;

        // console.log(credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if(!user || !user?.password) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);

        if(!isPasswordValid) return null;

        return {id: user.id, email: user.email, name: user.name, username: user.username};
      }
    })
  ],
  pages:{
    signIn: "/login",
    signOut: "/"
  },
  callbacks:{
    async jwt({token, user}){
      if(user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }
      // console.log(`This is token\n`)
      // console.log(token)
      return token;
      
    },
    async session({session, token}) {
      if(session.user || token){
        session.user.id = token.id as string
        session.user.name = token.name as string;
        session.user.username = token.username as string;
      } 
      // console.log(`This is session\n`)
      // console.log(session)
      return session;
    }
  }
});
