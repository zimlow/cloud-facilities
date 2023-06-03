import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const authResponse = await fetch("http:localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
        });

        const user = await authResponse.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
