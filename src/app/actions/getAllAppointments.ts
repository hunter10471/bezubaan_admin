import { SafeAppointment } from '../types';
import getCurrentUser from './getCurrentUser';
import prisma from '@/app/libs/prismadb';

export default async function getAllAppointments(): Promise<
	SafeAppointment[] | null
> {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser || !currentUser.isAdmin) {
			return null;
		}
		const appointments = await prisma.appointments.findMany({
			orderBy: { createdAt: 'desc' },
		});
		if (appointments.length === 0) {
			return null;
		}
		const safeAppointments = appointments.map((appointment) => ({
			...appointment,
			appointmentDate: appointment.appointmentDate.toISOString(),
			createdAt: appointment.createdAt.toISOString(),
			updatedAt: appointment.updatedAt.toISOString(),
		}));
		return safeAppointments;
	} catch (error) {
		return null;
	}
}
