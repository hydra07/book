import axios, { axiosWithAuth } from '@/lib/axios';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const _user = {
            email: credentials?.email,
            password: credentials?.password,
          };
          const res = await axios.post('/auth/login', _user);
          const { token, message, user } = res.data;
          // console.log(token);
          if (res.data) {
            // return { token, message };
            // return Promise.resolve({ token, message });
            console.log('res.data ', JSON.stringify(res.data));
            return res.data;
            // return { id: token, name: message, email: credentials?.email };
          }
          return null;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    Credentials({
      name: 'Register',
      id: 'register',
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const _user = {
            name: credentials?.name,
            email: credentials?.email,
            password: credentials?.password,
          };
          const res = await axios.post('/auth/register', _user);
          const { token, message, user } = res.data;
          if (res.data) {
            // return { token, message };
            // return Promise.resolve({ token, message });
            console.log('res.data ', JSON.stringify(res.data));
            return res.data;
            // return { id: token, name: message, email: credentials?.email };
          }
          return null;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      // console.log('account ', user);
      if (account?.provider === 'google') {
        const data = {
          name: user.name,
          email: user.email,
          avatar: user.image,
        };
        const res = await axios.post(`/auth/google`, data);
        if (res.data) {
          // console.log('res.data ', JSON.stringify(res.data));
          (user as any).token = res.data.token;
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
        // console.log(`${JSON.stringify(user)}`);
      }
      // console.log(`[2]day la token ${JSON.stringify(token)}`);
      return { ...token, ...user };
      // return token;
    },
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken as string;
      // console.log(`[-]day la user ${JSON.stringify(user)}`);
      const getUser = await axiosWithAuth(session.user.accessToken).get(
        `/user/getUser`,
      );
      const _user = await getUser.data;
      session.user = {
        ...session.user,
        id: _user.id as number,
        email: _user.email as string,
        name: _user.name as string,
        image: _user.image as string,
        phone: _user.phone as string,
        gender: _user.gender as boolean,
      };

      // session.user.id = _user.id as number;
      // session.user.email = _user.email as string;
      // session.user.name = _user.name as string;
      // session.user.image = _user.image as string;
      // session.user.gender = _user.gender as boolean;
      // console.log(`[3]day la session ${JSON.stringify(session)}`);
      return session;
    },
  },

  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
};

// export const refreshToken = async (token: string)  => {
//   try {
//     const res = await axiosWithAuth(token).post(`/auth/refresh`)
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
