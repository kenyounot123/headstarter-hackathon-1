import EmailProvider from "next-auth/providers/email";
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma";

const authOptions: any = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};

export { authOptions };