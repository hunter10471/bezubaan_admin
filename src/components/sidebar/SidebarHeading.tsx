import React from 'react';
import { Poppins } from 'next/font/google';

interface SidebarHeadingProps {
	title: string;
}

const poppins = Poppins({ subsets: ['latin'], weight: ['500'] });

const SidebarHeading: React.FC<SidebarHeadingProps> = ({ title }) => {
	return (
		<h3
			className={`${poppins.className} text-neutral-400 uppercase font text-xs my-4`}
		>
			{title}
		</h3>
	);
};

export default SidebarHeading;
