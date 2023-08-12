import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pets } from '@prisma/client';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const body: pets = await request.json();
	const pet = await prisma.pets.create({
		data: {
			...body,
			v: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	return NextResponse.json(pet);
}

export async function GET(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const pets = await prisma.pets.findMany({ orderBy: { createdAt: 'desc' } });
	return NextResponse.json(pets);
}
