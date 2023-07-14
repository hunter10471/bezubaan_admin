'use client';
import React from 'react';
import { HashLoader, PuffLoader } from 'react-spinners';

interface LoaderProps {
	isFullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isFullScreen }) => {
	return (
		<div
			className={`h-screen w-screen flex ${
				isFullScreen ? 'bg-primary' : 'bg-transparent'
			} items-center justify-center`}
		>
			{isFullScreen ? (
				<HashLoader color='white' size={100} />
			) : (
				<PuffLoader size={50} color='#127357' />
			)}
		</div>
	);
};

export default Loader;
