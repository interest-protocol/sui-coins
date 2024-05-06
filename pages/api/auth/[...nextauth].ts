import NextAuth, { AuthOptions, Session } from 'next-auth';

const authOptions: AuthOptions = {
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: Session; token: any }) {
      return { ...session, user: token };
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
