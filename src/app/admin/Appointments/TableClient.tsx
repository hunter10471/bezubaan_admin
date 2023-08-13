'use client';
import { SafeAppointment, SafePet } from '@/app/types';
import Table from '@/components/table/Table';
import useConfirmModal from '@/hooks/useConfirmModal';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ConfirmModal from '@/components/modal/ConfirmModal';
import ConfirmPaymentModal from '@/components/modal/ConfirmPaymentModal';
import useUpdateAppointmentModal from '@/hooks/useUpdateAppointmentModal';

interface TableClientProps {
	appointments: SafeAppointment[] | null;
}

const TableClient: React.FC<TableClientProps> = ({ appointments }) => {
	const [updatedAppointments, setUpdatedAppointments] = useState(appointments);
	const [rowId, setRowId] = useState('');
	const updateAppointmentModal = useUpdateAppointmentModal();
	const confirmModal = useConfirmModal();
	const fetchAppointments = async () => {
		try {
			const response = await axios.get('/api/appointments');
			setUpdatedAppointments([...response.data]);
		} catch (error) {
			toast.error('There was an error fetching updated appointments');
			console.log(error);
		}
	};
	const deleteRow = useCallback(
		async (id: string) => {
			setRowId(id);
			confirmModal.onOpen();
		},
		[confirmModal]
	);

	const updateRow = useCallback(
		async (data: SafeAppointment) => {
			setRowId(data.id);
			updateAppointmentModal.onOpen();
		},
		[updateAppointmentModal]
	);
	return (
		<div>
			<Table
				deleteRow={deleteRow}
				updateRow={updateRow}
				appointments={updatedAppointments}
				isAppointmentsTable
			/>
			<ConfirmModal
				type='appointments'
				heading='Delete Appointment'
				fetchData={fetchAppointments}
				rowId={rowId}
				description='The following action is permanent and cannot be undone. Are you sure ?'
			/>
			<ConfirmPaymentModal
				description='Has the user has successfully paid their dues ?'
				fetchData={fetchAppointments}
				heading='Confirm Payment'
				rowId={rowId}
			/>
		</div>
	);
};

export default TableClient;
