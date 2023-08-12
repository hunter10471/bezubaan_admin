'use client';
import { SafeUser, SafeVet } from '@/app/types';
import Table from '@/components/table/Table';
import useConfirmModal from '@/hooks/useConfirmModal';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CreateVetModal from '@/components/modal/CreateVetModal';
import useCreateVetModal from '@/hooks/useCreateVetModal';
import ConfirmModal from '@/components/modal/ConfirmModal';
import UpdateVetModal from '@/components/modal/UpdateVetModal';
import useUpdateVetModal from '@/hooks/useUpdateVetModal';

interface TableClientProps {
	vets: SafeVet[] | null;
}

const TableClient: React.FC<TableClientProps> = ({ vets }) => {
	const [updatedVets, setUpdatedVets] = useState(vets);
	const [rowId, setRowId] = useState('');
	const [rowData, setRowData] = useState<SafeVet | null>(null);
	const updateVetModal = useUpdateVetModal();
	const confirmModal = useConfirmModal();
	const fetchVets = async () => {
		try {
			const response = await axios.get('/api/vets');
			setUpdatedVets([...response.data]);
		} catch (error) {
			toast.error('There was an error fetching updated users');
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
		async (data: SafeVet) => {
			setRowData(data);
			updateVetModal.onOpen();
		},
		[updateVetModal]
	);
	return (
		<div>
			<Table
				deleteRow={deleteRow}
				updateRow={updateRow}
				vets={updatedVets}
				isVetsTable
			/>
			<ConfirmModal
				type='vets'
				heading='Delete Vet'
				fetchData={fetchVets}
				rowId={rowId}
				description='The following action is permanent and cannot be undone. Are you sure ?'
			/>
			<CreateVetModal getVets={fetchVets} />
			<UpdateVetModal rowData={rowData} getVets={fetchVets} />
		</div>
	);
};

export default TableClient;
