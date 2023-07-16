import { SafeUser } from '../types';
import getCurrentUser from './getCurrentUser';
import prisma from '@/app/libs/prismadb';

export default async function getAllUsers(): Promise<SafeUser[] | null> {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser || !currentUser.isAdmin) {
			return null;
		}
		const users = await prisma.users.findMany();
		if (users.length === 0) {
			return null;
		}
		const safeUsers = users.map((user) => ({
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
		}));
		return safeUsers;
	} catch (error) {
		return null;
	}
}
