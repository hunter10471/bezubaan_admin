'use client';
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import React from 'react';

interface HeadingProps {
	title: string;
	checkPath?: boolean;
}

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '600'],
});

const Heading: React.FC<HeadingProps> = ({ title, checkPath }) => {
	const pathname = usePathname();
	let heading = checkPath && pathname ? pathname.split('/')[2] : title;
	return (
		<h1 className={`${poppins.className} font-bold text-[32px]`}>{heading}</h1>
	);
};

export default Heading;
