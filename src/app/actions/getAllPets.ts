import { SafePet } from '../types';
import getCurrentUser from './getCurrentUser';
import prisma from '@/app/libs/prismadb';

export default async function getAllPets(): Promise<SafePet[] | null> {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser || !currentUser.isAdmin) {
			return null;
		}
		const pets = await prisma.pets.findMany({ orderBy: { createdAt: 'desc' } });
		if (pets.length === 0) {
			return null;
		}
		const safePets = pets.map((pet) => ({
			...pet,
			createdAt: pet.createdAt.toISOString(),
			updatedAt: pet.updatedAt.toISOString(),
		}));
		return safePets;
	} catch (error) {
		return null;
	}
}
