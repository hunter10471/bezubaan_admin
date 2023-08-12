import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pets } from '@prisma/client';

interface IParams {
	petId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { petId } = params;
	if (!petId || typeof petId !== 'string') {
		throw new Error('Invalid ID');
	}
	const pet = await prisma.pets.delete({
		where: {
			id: petId,
		},
	});
	return NextResponse.json(pet);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { petId } = params;
	if (!petId || typeof petId !== 'string') {
		throw new Error('Invalid ID');
	}
	const body: pets = await request.json();
	const { id, ...others } = body;
	const pet = await prisma.pets.update({
		where: { id: petId },
		data: {
			...others,
			updatedAt: new Date(),
		},
	});
	return NextResponse.json(pet);
}

export async function GET(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { petId } = params;
	if (!petId || typeof petId !== 'string') {
		throw new Error('Invalid ID');
	}
	const pet = await prisma.pets.findUnique({ where: { id: petId } });
	return NextResponse.json(pet);
}
