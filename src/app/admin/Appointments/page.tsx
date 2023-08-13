import React from 'react';
import TableClient from './TableClient';
import getAllAppointments from '@/app/actions/getAllAppointments';

const Appointments = async () => {
	const appointments = await getAllAppointments();
	return <TableClient appointments={appointments} />;
};

export default Appointments;
