'use client';
import { SafeUser } from '@/app/types';
import UserModal from '@/components/modal/UserModal';
import Table from '@/components/table/Table';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ConfirmModal from '@/components/modal/ConfirmModal';
import useConfirmModal from '@/hooks/useConfirmModal';
import UpdateUserModal from '@/components/modal/UpdateUserModal';
import useUpdateUserModal from '@/hooks/useUpdateUserModal';

interface TableClientProps {
	users: SafeUser[] | null;
}

const TableClient: React.FC<TableClientProps> = ({ users }) => {
	const [updatedUsers, setUpdatedUsers] = useState(users);
	const [rowId, setRowId] = useState('');
	const [rowData, setRowData] = useState<SafeUser | null>(null);
	const confirmModal = useConfirmModal();
	const updateUserModal = useUpdateUserModal();
	const fetchUsers = async () => {
		try {
			const response = await axios.get('/api/users');
			setUpdatedUsers([...response.data]);
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
		async (data: SafeUser) => {
			setRowData(data);
			updateUserModal.onOpen();
		},
		[updateUserModal]
	);
	return (
		<div>
			<Table
				deleteRow={deleteRow}
				updateRow={updateRow}
				isUsersTable
				users={updatedUsers}
			/>
			<UserModal getUsers={fetchUsers} />
			<UpdateUserModal getUsers={fetchUsers} rowData={rowData} />
			<ConfirmModal
				type='users'
				heading='Delete User'
				fetchData={fetchUsers}
				rowId={rowId}
				description='The following action is permanent and cannot be undone. Are you sure ?'
			/>
		</div>
	);
};

export default TableClient;
