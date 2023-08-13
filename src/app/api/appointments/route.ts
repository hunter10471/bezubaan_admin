import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const appointments = await prisma.appointments.findMany({
		orderBy: { createdAt: 'desc' },
	});
	return NextResponse.json(appointments);
}
