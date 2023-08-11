import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { vets } from '@prisma/client';

interface IParams {
	vetId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { vetId } = params;
	if (!vetId || typeof vetId !== 'string') {
		throw new Error('Invalid ID');
	}
	const vet = await prisma.vets.delete({
		where: {
			id: vetId,
		},
	});
	return NextResponse.json(vet);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { vetId } = params;
	if (!vetId || typeof vetId !== 'string') {
		throw new Error('Invalid ID');
	}
	const body: vets = await request.json();
	const vet = await prisma.vets.update({
		where: { id: vetId },
		data: {
			...body,
			isApproved: (body.isApproved as any) === 'true' ? true : false,
			updatedAt: new Date(),
		},
	});
	return NextResponse.json(vet);
}

export async function GET(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { vetId } = params;
	if (!vetId || typeof vetId !== 'string') {
		throw new Error('Invalid ID');
	}
	const vet = await prisma.vets.findUnique({ where: { id: vetId } });
	return NextResponse.json(vet);
}
