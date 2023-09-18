
import NextAuth from 'next-auth/next'
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import HandleLoginService from '@/service/HandleLoginService';
import HandleUserIdService from '@/service/HandleUserIdService';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ||  '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
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
    maxAge: 20000
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      const userApi = await HandleUserIdService(session.user)
      if (!userApi) {
        throw new Error('Could not find the user')
      }
      if (session?.user) {
        session.user = { ...token.access_token, ...session?.user, id: userApi.id }
      }
      return session;
    },
    jwt: async ({ user, token, account }: any) => {
      if (user) {
        token.uid = user.id;
        token.access_token = account;
      }
      return token;
    },
    redirect: async ({ url }) => {
      return url
    }
  }
});

export { handler as GET, handler as POST };