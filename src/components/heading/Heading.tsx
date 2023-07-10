import { Poppins } from 'next/font/google';
import React from 'react';

interface HeadingProps {
	title: string;
}

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '600'],
});

const Heading: React.FC<HeadingProps> = ({ title }) => {
	return (
		<h1 className={`${poppins.className} font-bold text-[32px]`}>{title}</h1>
	);
};

export default Heading;
