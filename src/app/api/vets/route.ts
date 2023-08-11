import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { vets } from '@prisma/client';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const body: vets = await request.json();
	const hashedPassword = await bcrypt.hash(body.password, 12);
	const vet = await prisma.vets.create({
		data: {
			...body,
			password: hashedPassword,
			isApproved: (body.isApproved as any) === 'true' ? true : false,
			v: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	return NextResponse.json(vet);
}

export async function GET(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const vets = await prisma.vets.findMany({ orderBy: { createdAt: 'desc' } });
	return NextResponse.json(vets);
}
