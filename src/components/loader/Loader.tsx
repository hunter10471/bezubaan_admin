'use client';
import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className='h-screen w-screen flex bg-primary items-center justify-center'>
			<HashLoader color='white' size={100} />
		</div>
	);
};

export default Loader;
