import { IconType } from 'react-icons';
import { MdSpaceDashboard, MdNotifications } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { BiSolidDog, BiSolidTimeFive, BiSolidLogOut } from 'react-icons/bi';
import { BsFileBarGraphFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { SafePet } from './app/types';
import moment from 'moment-timezone';
import Image from 'next/image';
import noAvatar from '../public/assets/no-avatar.png';

export const SidebarItems: {
	title: string;
	icon?: IconType;
	isHeading?: boolean;
}[] = [
	{ title: 'Main Menu', isHeading: true },
	{ title: 'Dashboard', icon: MdSpaceDashboard },
	{ title: 'Users', icon: FaUsers },
	{ title: 'Vets', icon: FaUserDoctor },
	{ title: 'Pets', icon: BiSolidDog },
	{ title: 'Appointments', icon: BiSolidTimeFive },
	{ title: 'Admin Tools', isHeading: true },
	{ title: 'Notifications', icon: MdNotifications },
	{ title: 'Analytics', icon: BsFileBarGraphFill },
	{ title: 'Settings', icon: IoSettingsSharp },
	{ title: 'Logout', icon: BiSolidLogOut },
];

export const tableUsersSchema: {
	Header: string;
	accessor?: string;
	className?: string;
	Cell?: (value: any) => void;
}[] = [
	{
		Header: '',
		accessor: 'avatar',
		Cell: ({ value }) => (
			<Image
				style={{ height: 42, width: 42 }}
				className='rounded-full'
				src={value || noAvatar}
				alt='avatar'
			/>
		),
	},
	{
		Header: 'Username',
		accessor: 'username',
	},
	{
		Header: 'Email',
		accessor: 'email',
	},
	{
		Header: 'Gender',
		accessor: 'gender',
	},
	{
		Header: 'Admin',
		accessor: 'isAdmin',
		Cell: ({ value }) => {
			if (value) {
				return (
					<span
						style={{
							backgroundColor: 'rgb(254 215 170)',
							color: 'rgb(249 115 22)',
						}}
						className='font-medium px-6 py-2 rounded-xl'
					>
						Yes
					</span>
				);
			} else {
				return (
					<span
						style={{
							backgroundColor: 'rgb(191 219 254)',
							color: 'rgb(59 130 246)',
						}}
						className='bg-blue-200 text-blue-500 px-6 font-medium py-2 rounded-xl'
					>
						No
					</span>
				);
			}
		},
	},
	{
		Header: 'Created Date',
		accessor: 'createdAt',
		Cell: ({ value }) =>
			moment.tz(value, 'Asia/Karachi').format('DD-MM-YYYY | hh:mm:ss A'),
	},
];

export const tablePetsSchema: {
	Header: string;
	accessor: string;
	pet?: SafePet;
}[] = [
	{
		Header: 'Name',
		accessor: 'name',
	},
	{
		Header: 'Animal',
		accessor: 'animalType',
	},
	{
		Header: 'Species',
		accessor: 'species',
	},
	{
		Header: 'Gender',
		accessor: 'gender',
	},
	{
		Header: 'Age',
		accessor: 'age',
	},
	{
		Header: 'Owner',
		accessor: 'ownerId',
	},
	{
		Header: 'Created Date',
		accessor: 'createdAt',
	},
];
