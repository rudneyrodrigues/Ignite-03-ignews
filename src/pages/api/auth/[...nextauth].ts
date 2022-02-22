import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: {
          scope: 'read:user'
        }
      }
    }),
    // ...add more providers here
  ],
})