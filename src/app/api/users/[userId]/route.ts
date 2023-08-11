import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { userId } = params;
	if (!userId || typeof userId !== 'string') {
		throw new Error('Invalid ID');
	}
	const user = await prisma.users.delete({
		where: {
			id: userId,
		},
	});
	return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { userId } = params;
	if (!userId || typeof userId !== 'string') {
		throw new Error('Invalid ID');
	}
	const body = await request.json();
	const user = await prisma.users.update({ where: { id: userId }, data: body });
	return NextResponse.json(user);
}

export async function GET(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { userId } = params;
	if (!userId || typeof userId !== 'string') {
		throw new Error('Invalid ID');
	}
	const user = await prisma.users.findUnique({ where: { id: userId } });
	return NextResponse.json(user);
}
