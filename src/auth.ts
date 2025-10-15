import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          name: "Email",
          type: "email",
          placeholder: "username@domain.com",
        },
        password: {
          name: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_API_BASE_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          // callimg api

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Something Went Wrong");
          }
          // else

          const decoded = JSON.parse(atob(data.token.split(".")[1]));

          return {
            id: decoded.id,
            user: data.user,
            token: data.token,
          };
        } catch (error) {
          console.error(error);
          throw new Error((error as Error).message || "Login failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user; // هنا بنرجع بيانات الـ user
     
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
