import getAllUsers from '@/app/actions/getAllUsers';
import Table from '@/components/table/Table';
import React from 'react';

const Users = async () => {
	const users = await getAllUsers();
	return (
		<div>
			<Table isUsersTable users={users} />
		</div>
	);
};

export default Users;
