'use client';
import React, { useCallback } from 'react';
import Modal from './Modal';
import useConfirmModal from '@/hooks/useConfirmModal';
import Button from '../button/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ConfirmModalProps {
	heading: string;
	description: string;
	fetchData: () => void;
	rowId: string;
	type: 'users' | 'vets' | 'pets';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	heading,
	description,
	fetchData,
	rowId,
	type,
}) => {
	const confirmModal = useConfirmModal();
	const deleteRow = useCallback(async () => {
		try {
			await axios.delete(`/api/${type}/${rowId}`);
			fetchData();
			confirmModal.onClose();
			toast.success('Row deleted successfully.');
		} catch (error) {
			console.log(error);
			toast.error('There was an error deleting the row.');
		}
	}, [rowId, fetchData, type, confirmModal]);
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
				<Button primary={false} red onClick={deleteRow} title='Delete' />
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
		/>
	);
};

export default ConfirmModal;
