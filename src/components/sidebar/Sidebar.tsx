'use client';
import React, { useEffect, useState } from 'react';
import Logo from '../logo/Logo';
import SidebarHeading from './SidebarHeading';
import SidebarItem from './SidebarItem';
import { SidebarItems } from '@/data';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
	const pathname = usePathname();
	const [currentPath, setCurrentPath] = useState('');
	useEffect(() => {
		if (currentPath !== '') {
			setCurrentPath(pathname.split('/')[0]);
		}
	}, [pathname, currentPath]);
	return (
		<aside className='w-[250px] p-6 bg-white min-h-screen'>
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
		</aside>
	);
};

export default Sidebar;
