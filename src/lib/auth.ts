import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";

export const authOptions: NextAuthOptions= {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn:'/sign-in',
    },

    providers: [
        CredentialsProvider({

          name: "Credentials",
          credentials: {
            username: { label: "Email", type: "email", placeholder: "test1@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
            if (user) {
              
              return user
            } else {
              return null
      
            }
          }
        })
      ]

}