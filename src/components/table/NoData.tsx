import Image from 'next/image';
import React from 'react';
import image from '../../../public/assets/no-data.png';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: '700' });

const NoData = () => {
	return (
		<div className='flex flex-col justify-center items-center m-10 opacity-50'>
			<Image src={image} alt='not-found' className='h-[200px] w-[200px]' />
			<h2 className={`font-bold text-xl ${poppins.className}`}>
				Your query returned nothing...
			</h2>
		</div>
	);
};

export default NoData;
