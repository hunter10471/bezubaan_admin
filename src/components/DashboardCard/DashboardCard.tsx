'use client';
import { Poppins } from 'next/font/google';
import React from 'react';

interface DashboardCardProps {
	value: number;
	title: string;
	color: string;
	icon: JSX.Element;
	textColor: string;
}

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500'] });

const DashboardCard: React.FC<DashboardCardProps> = ({
	value,
	title,
	color,
	icon,
	textColor,
}) => {
	return (
		<div
			style={{ backgroundColor: color, color: textColor }}
			className={`w-[200px] shadow-xl p-4 rounded-xl ${poppins.className} `}
		>
			<p className='text-xl font-bold'>{value}</p>
			<h2 className='mb-10 mt-2 font-light'>{title}</h2>
			<span>{icon}</span>
		</div>
	);
};

export default DashboardCard;
