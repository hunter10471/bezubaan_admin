import getAllVets from '@/app/actions/getAllVets';
import React from 'react';
import TableClient from './TableClient';

const Vets = async () => {
	const vets = await getAllVets();
	return <TableClient vets={vets} />;
};

export default Vets;
