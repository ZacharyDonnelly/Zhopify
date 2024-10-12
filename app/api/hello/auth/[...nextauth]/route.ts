import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/utils/db/envSchema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
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
        // Add logic to verify credentials here
        if (!credentials) return null;
        const { email, password } = credentials;
        // Fetch user and password hash from your database
        // Example: const user = await getUserByEmail(email)
        if (user && bcrypt.compareSync(password, user.passwordHash)) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async redirect({ url, baseUrl }: RedirectProps): Promise<string> {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
    async session({ session, token, newSession, trigger }: SessionProps): Promise<Session | DefaultSession> {
      session.user = { name: '', email: '', accessToken: '', emailVerified: false };
      if (trigger === 'update' && newSession?.name) {
        session.accessToken = token.jti || '';
        session.user.name = newSession.name;
        session.user.email = newSession.email;
        session.user.accessToken = token.jti || '';
      } else if (session.user) {
        session.user.name = token?.name || '';
        session.user.email = token?.email || '';
        session.user.accessToken = token.jti || '';
        session.accessToken = token.jti || '';
      }

      return session;
    },
    async jwt({ token, user }: JWTProps): Promise<JWT> {
      if (user) {
        token.name = user.name || '';
        token.email = user.email || '';
      }

      return token;
    }
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/api/auth/signin',
    signOut: '/api/auth/signin',
    error: '/api/auth/error',
    verifyRequest: '/api/auth/signin'
  }
};
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
