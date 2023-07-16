import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';
import { SafeUser } from '../types';

export default async function getCurrentUser(): Promise<SafeUser | null> {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return null;
		}
		const currentUser = await prisma.users.findUnique({
			where: {
				email: session.user.email,
			},
		});
		if (!currentUser) {
			return null;
		}
		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString(),
		};
	} catch (error) {
		console.log(error);
		return null;
	}
}
