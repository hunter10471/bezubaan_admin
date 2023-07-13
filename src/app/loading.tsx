import React from 'react';
import { HashLoader } from 'react-spinners';

const loading = () => {
	return (
		<div className='h-screen w-screen flex items-center justify-center'>
			Loading
			<HashLoader color='white' size={100} />
		</div>
	);
};

export default loading;
