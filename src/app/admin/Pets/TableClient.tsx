'use client';
import { SafePet } from '@/app/types';
import Table from '@/components/table/Table';
import useConfirmModal from '@/hooks/useConfirmModal';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ConfirmModal from '@/components/modal/ConfirmModal';
import CreatePetModal from '@/components/modal/CreatePetModal';
import UpdatePetModal from '@/components/modal/UpdatePetModal';
import useUpdatePetModal from '@/hooks/useUpdatePetModal';

interface TableClientProps {
	pets: SafePet[] | null;
}

const TableClient: React.FC<TableClientProps> = ({ pets }) => {
	const [updatedPets, setUpdatedPets] = useState(pets);
	const [rowId, setRowId] = useState('');
	const [rowData, setRowData] = useState<SafePet | null>(null);
	const updatePetModal = useUpdatePetModal();
	const confirmModal = useConfirmModal();
	const fetchPets = async () => {
		try {
			const response = await axios.get('/api/pets');
			setUpdatedPets([...response.data]);
		} catch (error) {
			toast.error('There was an error fetching updated pets');
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
		async (data: SafePet) => {
			setRowData(data);
			updatePetModal.onOpen();
		},
		[updatePetModal]
	);
	return (
		<div>
			<Table
				deleteRow={deleteRow}
				updateRow={updateRow}
				pets={updatedPets}
				isPetsTable
			/>
			<ConfirmModal
				type='pets'
				heading='Delete Pet'
				fetchData={fetchPets}
				rowId={rowId}
				description='The following action is permanent and cannot be undone. Are you sure ?'
			/>
			<CreatePetModal getPets={fetchPets} />
			<UpdatePetModal rowData={rowData} getPets={fetchPets} />
		</div>
	);
};

export default TableClient;
