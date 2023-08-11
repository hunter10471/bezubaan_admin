import getAllUsers from '@/app/actions/getAllUsers';
import UserModal from '@/components/modal/UserModal';
import Table from '@/components/table/Table';
import React from 'react';

const Users = async () => {
	const users = await getAllUsers();
	return (
		<div>
			<Table isUsersTable users={users} />
			<UserModal />
		</div>
	);
};

export default Users;
