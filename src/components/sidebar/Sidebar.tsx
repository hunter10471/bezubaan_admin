'use client';
import React, { useEffect, useState } from 'react';
import Logo from '../logo/Logo';
import SidebarHeading from './SidebarHeading';
import SidebarItem from './SidebarItem';
import { SidebarItems } from '@/data';
import { usePathname } from 'next/navigation';
import blob from '../../../public/blob.svg';
import Image from 'next/image';

const Sidebar = () => {
	const pathname = usePathname();
	const [currentPath, setCurrentPath] = useState('/Admin/Dashboard');
	useEffect(() => {
		if (currentPath !== '' && pathname) {
			setCurrentPath(pathname.split('/')[2]);
		}
	}, [pathname, currentPath]);
	return (
		<div className='fixed w-[250px] p-6 bg-white h-screen overflow-hidden shadow-xl'>
			<Logo />
			<ul className='my-10'>
				{SidebarItems.map((item) =>
					item.isHeading ? (
						<SidebarHeading key={item.title} title={item.title} />
					) : (
						<SidebarItem
							key={item.title}
							isActive={item.title === currentPath}
							title={item.title}
							icon={item.icon}
						/>
					)
				)}
			</ul>
			<Image
				src={blob}
				width={200}
				height={200}
				alt='blob'
				className='absolute top-[20%] right-[-50px] opacity-10 -z-10'
			/>
			<Image
				src={blob}
				width={200}
				height={200}
				alt='blob'
				className='absolute bottom-[-50px] left-[-50px] opacity-10 -z-10'
			/>
		</div>
	);
};

export default Sidebar;
