import { SafeVet } from '../types';
import getCurrentUser from './getCurrentUser';
import prisma from '@/app/libs/prismadb';

export default async function getAllVets(): Promise<SafeVet[] | null> {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser || !currentUser.isAdmin) {
			return null;
		}
		const pets = await prisma.vets.findMany();
		if (pets.length === 0) {
			return null;
		}
		const safeVets = pets.map((vet) => ({
			...vet,
			createdAt: vet.createdAt.toISOString(),
			updatedAt: vet.updatedAt.toISOString(),
		}));
		return safeVets;
	} catch (error) {
		return null;
	}
}
