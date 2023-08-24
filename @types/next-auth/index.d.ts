import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string,
      provider?: string,
      access_token?: string,
      expires_at?: number,
      providerAccountId?: string,
      refresh_token?: string,
    } & DefaultSession["user"]
  }
}