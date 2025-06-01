import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "y/schemas";
import bcrypt from "bcryptjs";
import { db } from "y/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
    interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password: string; 
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      credentials : {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" },
      },
      authorize : async (credentials)=> {
        try{
          const {email, password} = await signInSchema.parseAsync(credentials);
          const user = await db.user.findUnique({
            where: { email },
          });
          const passwordMatch = await bcrypt.compare(password, (user as any)?.password ?? "");
          if (!user || !passwordMatch) {
            throw new Error("Invalid email or password");
          }
          return user as any; // Return the user object, cast to `any` to satisfy type requirements
        }catch(error) {
          return null;
        }
      },
    }),
  ],
      session: {
        strategy: "jwt" as const, // Use JWT for session management
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
      
   
   //// DiscordProvider,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  
  adapter: PrismaAdapter(db),

  ///callback de inicio de secion por token 
 callbacks: {
  session: ({ session, token }) => {
    if (session.user && token.sub) {
      session.user.id = token.sub;
    }
    return session;
  },
  jwt: ({ token, user }) => {
    if (user) {
      token.sub = user.id;
    }
    return token;
  },
},
} satisfies NextAuthConfig;