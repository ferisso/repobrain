
import NextAuth from 'next-auth/next'
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ||  '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: "jwt",
    maxAge: 200000
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.provider = token.provider
      }
      return session;
    },
    jwt: async ({ user, token, account }: any) => {
      if (user) {
        token.uid = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
  }
});

export { handler as GET, handler as POST };