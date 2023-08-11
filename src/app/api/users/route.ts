import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { users } from '@prisma/client';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const body: users = await request.json();
	const user = await prisma.users.create({
		data: {
			...body,
			isAdmin: (body.isAdmin as any) === 'true' ? true : false,
			v: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	return NextResponse.json(user);
}
