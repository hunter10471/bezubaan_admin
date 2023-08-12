import React from 'react';
import TableClient from './TableClient';
import getAllPets from '@/app/actions/getAllPets';

const Pets = async () => {
	const pets = await getAllPets();
	return <TableClient pets={pets} />;
};

export default Pets;
