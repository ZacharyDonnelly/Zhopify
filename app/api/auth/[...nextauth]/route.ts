import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/utils/db/envSchema";
import type {
  DefaultSession,
  JWT,
  JWTProps,
  RedirectProps,
  Session,
  SessionProps,
} from "@/types/api/auth/callbacks";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  jwt: { secret: process.env.JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/api/auth/signin",
    signOut: "/api/auth/signin",
    error: "/api/auth/error",
    verifyRequest: "/api/auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw Error(
            "Information is not available. Could not log you in. Please try again later.",
          );
        }
        // const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
          },
        });
        if (user) {
          const isMatch = await bcrypt.compare(
            credentials?.password as string,
            user.password as string,
          );

          if (isMatch) {
            const isValid: boolean = bcrypt.compareSync(
              credentials?.password as string,
              user.password as string,
            );

            if (!isValid) {
              throw new Error("Invalid password!");
            }

            return { id: user.id, name: user.name, email: user.email };
          }
        }
        return { id: "", name: "", email: "" };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: RedirectProps): Promise<string> {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
    async session({
      session,
      token,
      newSession,
      trigger,
    }: SessionProps): Promise<Session | DefaultSession> {
      session.user = {
        id: "",
        name: "",
        email: "",
        accessToken: "",
        emailVerified: false,
      };
      if (trigger === "update" && newSession?.name) {
        session.accessToken = token.jti || "";
        session.user.name = newSession.name;
        session.user.email = newSession.email;
        session.user.accessToken = token.jti || "";
      } else if (session.user) {
        session.user.name = token?.name || "";
        session.user.email = token?.email || "";
        session.user.accessToken = token.jti || "";
        session.accessToken = token.jti || "";
      }

      return session;
    },
    async jwt({ token, user }: JWTProps): Promise<JWT> {
      if (user) {
        token.name = user.name || "";
        token.email = user.email || "";
      }

      return token;
    },
  },
  events: {
    async signIn({ user }) {
      // TODO: Add user tracking logic here
      console.log(`Signed in user: ${user.email}`);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
