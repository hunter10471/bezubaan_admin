import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import prisma from '@/app/libs/prismadb';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Invalid credentials');
				}
				const user = await prisma.users.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (!user || !user.password) {
					throw new Error('Invalid credentials');
				}
				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isCorrectPassword) {
					throw new Error('Invalid credentials');
				}
				return user;
			},
		}),
	],
	pages: {
		signIn: '/',
	},
	debug: process.env.NODE_ENV != 'development',
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);