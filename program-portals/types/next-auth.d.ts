import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: "ADMIN" | "STUDENT" | "SUPER_ADMIN";
    };
  }

  interface User {
    role: "ADMIN" | "STUDENT" | "SUPER_ADMIN";
  }
}
