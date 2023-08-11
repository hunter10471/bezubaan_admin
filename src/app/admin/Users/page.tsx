import getAllUsers from '@/app/actions/getAllUsers';
import React from 'react';
import TableClient from './TableClient';

const Users = async () => {
	const users = await getAllUsers();
	return <TableClient users={users} />;
};

export default Users;
