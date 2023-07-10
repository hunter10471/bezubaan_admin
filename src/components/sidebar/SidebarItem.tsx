import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

interface SidebarItemProps {
	title: string;
	icon?: IconType;
	isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
	title,
	icon: Icon,
	isActive,
}) => {
	return (
		<Link href={`/${title}`}>
			<div
				className={`my-2 p-2 rounded-xl flex gap-2 items-center text-sm hover:bg-neutral-100 cursor-pointer ${
					isActive ? 'bg-neutral-100' : 'text-neutral-400'
				} transition`}
			>
				{Icon && <Icon size={20} />}
				<span>{title}</span>
			</div>
		</Link>
	);
};

export default SidebarItem;
