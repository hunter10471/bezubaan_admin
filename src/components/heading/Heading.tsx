'use client';
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import React from 'react';

interface HeadingProps {
	title: string;
	checkPath?: boolean;
	className?: string;
	small?: boolean;
	subtitle?: string;
}

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '600'],
});

const Heading: React.FC<HeadingProps> = ({
	title,
	checkPath,
	className,
	small,
	subtitle,
}) => {
	const pathname = usePathname();
	let heading = checkPath && pathname ? pathname.split('/')[2] : title;
	return (
		<div>
			<h1
				className={`${poppins.className} font-bold  ${
					small ? 'text-[24px]' : 'text-[32px]'
				} ${className} `}
			>
				{heading}
			</h1>
			<span className='text-sm font-medium text-neutral-400'>{subtitle}</span>
		</div>
	);
};

export default Heading;
