import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { appointments } from '@prisma/client';

interface IParams {
	appointmentId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { appointmentId } = params;
	if (!appointmentId || typeof appointmentId !== 'string') {
		throw new Error('Invalid ID');
	}
	const pet = await prisma.appointments.delete({
		where: {
			id: appointmentId,
		},
	});
	return NextResponse.json(pet);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { appointmentId } = params;
	if (!appointmentId || typeof appointmentId !== 'string') {
		throw new Error('Invalid ID');
	}
	const body: appointments = await request.json();
	const appointment = await prisma.appointments.update({
		where: { id: appointmentId },
		data: {
			...body,
			updatedAt: new Date(),
		},
	});
	return NextResponse.json(appointment);
}

export async function GET(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	if (!currentUser || !currentUser.isAdmin) {
		return NextResponse.error();
	}
	const { appointmentId } = params;
	if (!appointmentId || typeof appointmentId !== 'string') {
		throw new Error('Invalid ID');
	}
	const appointment = await prisma.appointments.findUnique({
		where: { id: appointmentId },
	});
	return NextResponse.json(appointment);
}
