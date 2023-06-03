import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const authResponse = await fetch("/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          //body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;
      },
    }),
  ],
});
