'use client';
import React, { useCallback } from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useUpdateAppointmentModal from '@/hooks/useUpdateAppointmentModal';

interface ConfirmPaymentModalProps {
	heading: string;
	description: string;
	fetchData: () => void;
	rowId: string;
}

const ConfirmPaymentModal: React.FC<ConfirmPaymentModalProps> = ({
	heading,
	description,
	fetchData,
	rowId,
}) => {
	const confirmModal = useUpdateAppointmentModal();
	const updateRow = useCallback(async () => {
		try {
			await axios.put(`/api/appointments/${rowId}`, { paymentStatus: 'paid' });
			fetchData();
			confirmModal.onClose();
			toast.success('Row updated successfully.');
		} catch (error) {
			console.log(error);
			toast.error('There was an error updating this appointment.');
		}
	}, [rowId, fetchData, confirmModal]);
	const bodyContent = <div>{description}</div>;
	const footerContent = (
		<div className='flex flex-col gap-4'>
			<hr />
			<div className='flex gap-4 items-center justify-end'>
				<Button
					primary={false}
					darkOutline
					onClick={confirmModal.onClose}
					title='Cancel'
				/>
				<Button primary onClick={updateRow} title='Confirm' />
			</div>
		</div>
	);
	return (
		<Modal
			title={heading}
			onClose={confirmModal.onClose}
			body={bodyContent}
			footer={footerContent}
			isOpen={confirmModal.isOpen}
			small
		/>
	);
};

export default ConfirmPaymentModal;
