import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { users } from '@prisma/client';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const body: users = await request.json();
	const hashedPassword = await bcrypt.hash(body.password, 12);
	const user = await prisma.users.create({
		data: {
			...body,
			password: hashedPassword,
			isAdmin: (body.isAdmin as any) === 'true' ? true : false,
			v: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	return NextResponse.json(user);
}

export async function GET(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const users = await prisma.users.findMany({ orderBy: { createdAt: 'desc' } });
	return NextResponse.json(users);
}
