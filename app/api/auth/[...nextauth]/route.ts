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
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const MAX_AGE = 1 * 24 * 60 * 60;

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt", maxAge: MAX_AGE },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/api/auth/signin",
  //   signOut: "/api/auth/signin",
  //   error: "/api/auth/error",
  //   verifyRequest: "/api/auth/signin",
  // },
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
        // const { email, password } = credentials;
        if (!credentials) {
          throw Error(
            "Information is not available. Could not log you in. Please try again later.",
          );
        }
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
          let passwordValid: boolean = false;
          try {
            passwordValid = bcrypt.compareSync(
              credentials?.password as string,
              user.password as string,
            );
          } catch (e) {
            console.error("Error in password comparison", e);
            throw new Error("Authentication failed due to server error");
          }

          if (passwordValid) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            return null;
          }
        }
        return { id: "", name: "", email: "" };
      },
    }),
  ],
  jwt: {
    maxAge: MAX_AGE,
    secret: process.env.JWT_SECRET,
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error("Token is undefined");
      }

      const { sub, ...tokenProps } = token;
      // Get the current date in seconds since the epoch
      const nowInSeconds = Math.floor(Date.now() / 1000);

      // Calculate the expiration timestamp
      const expirationTimestamp = nowInSeconds + MAX_AGE;
      const jwtToken = jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: "HS256",
        },
      );
      return jwtToken;
    },
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error("Token is undefined");
      }
      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ["HS256"],
        });
        return decodedToken as JWT;
      } catch (error) {
        console.error("JWT decode error", error);
        return null;
      }
    },
  },
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
      // session.user = {
      //   id: "",
      //   name: "",
      //   email: "",
      //   accessToken: "",
      //   emailVerified: false,
      // };
      if (trigger === "update" && newSession?.name) {
        session.accessToken = token.jti || "";

        session.user = {
          id: newSession.id,
          name: newSession.name,
          email: newSession.email,
          accessToken: token.jti || "",
        };
      } else if (session.user) {
        session.accessToken = token.jti || "";

        session.user = {
          id: newSession.id,
          name: token?.name,
          email: token?.email,
          accessToken: token.jti || "",
        };
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
    async signIn({ profile, user }) {
      user.emailVerified = profile?.email_verified || false;
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
