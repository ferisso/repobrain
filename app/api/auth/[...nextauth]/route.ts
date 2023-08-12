
import NextAuth from 'next-auth/next'
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import HandleLoginService from '@/service/HandleLoginService';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ||  '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email) {
          throw new Error('Insira um e-mail')
        }
        if (!credentials?.password) {
          throw new Error('Insira a sua senha')
        }
        const user = await HandleLoginService(credentials)
        if (!user) {
          throw new Error('Unauthorized')
        }
        return user
      },

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
        session.user.provider = token.providers
        // const userDb = await verifyUserExists(session.user);
        // session.user.id = userDb.id;
        // session.user.provider = token.provider
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
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/boards`
    },
  }
});

export { handler as GET, handler as POST };