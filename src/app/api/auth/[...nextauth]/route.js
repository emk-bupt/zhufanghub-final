import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await db.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid input");

        const isCorrectPass = await bcryptjs.compare(password, user.password);
        if (!isCorrectPass) throw new Error("Invalid input");

        // Exclude password from user data
        const { password: _, ...currentUser } = user;

        // Return current user with admin and company status
        return currentUser;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  callbacks: {
    // Add the `isAdmin` and `isCompany` to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.isAdmin || false;  // Ensure isAdmin is in the token
        token.isCompany = user.isCompany || false; // Ensure isCompany is in the token
      }
      return token;
    },
    
    // Ensure the session also includes isAdmin and isCompany
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.isAdmin = token.isAdmin;  // Add isAdmin to the session
      session.user.isCompany = token.isCompany;  // Add isCompany to the session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
