import { appointments, pets, users, vets } from '@prisma/client';

export type SafeUser = Omit<users, 'createdAt' | 'updatedAt'> & {
	createdAt: string;
	updatedAt: string;
};

export type SafeVet = Omit<vets, 'createdAt' | 'updatedAt'> & {
	createdAt: string;
	updatedAt: string;
};

export type SafePet = Omit<pets, 'createdAt' | 'updatedAt'> & {
	createdAt: string;
	updatedAt: string;
};

export type SafeAppointment = Omit<
	appointments,
	'createdAt' | 'updatedAt' | 'appointmentDate'
> & {
	createdAt: string;
	updatedAt: string;
	appointmentDate: string;
};
