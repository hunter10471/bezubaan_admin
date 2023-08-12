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
import noAvatarPet from '../public/assets/no-avatar-pet.png';

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
	// { title: 'Analytics', icon: BsFileBarGraphFill },
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
				width={42}
				height={42}
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
							backgroundColor: 'rgb(242 215 170)',
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
							backgroundColor: 'rgb(191 219 242)',
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
	className?: string;
	Cell?: (value: any) => void;
}[] = [
	{
		Header: '',
		accessor: 'image',
		Cell: ({ value }) => (
			<Image
				style={{ minWidth: 42 }}
				width={42}
				height={42}
				className='rounded-full'
				src={value || noAvatarPet}
				alt='avatar'
			/>
		),
	},
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
		Header: 'Owner ID',
		accessor: 'ownerId',
	},
	{
		Header: 'Created Date',
		accessor: 'createdAt',
		Cell: ({ value }) =>
			moment.tz(value, 'Asia/Karachi').format('DD-MM-YYYY | hh:mm:ss A'),
	},
];

export const tableVetsSchema: {
	Header: string;
	accessor: string;
	className?: string;
	Cell?: (value: any) => void;
}[] = [
	{
		Header: '',
		accessor: 'avatar',
		Cell: ({ value }) => (
			<Image
				style={{ minWidth: 42 }}
				width={42}
				height={42}
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
		Header: 'Approved',
		accessor: 'isApproved',
		Cell: ({ value }) => {
			if (value) {
				return (
					<span
						style={{
							backgroundColor: 'rgb(187 247 208)',
							color: 'rgb(34 197 94)',
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
							backgroundColor: 'rgb(242 205 211)',
							color: 'rgb(244 63 94)',
						}}
						className='bg-rose-200 text-rose-500  px-6 font-medium py-2 rounded-xl'
					>
						No
					</span>
				);
			}
		},
	},
	{
		Header: 'Experience',
		accessor: 'yearsOfExperience',
		Cell: ({ value }) => {
			return <span>{value} years</span>;
		},
	},
	{
		Header: 'Gender',
		accessor: 'gender',
	},
	{
		Header: 'University',
		accessor: 'university',
	},
	{
		Header: 'Field',
		accessor: 'fieldOfStudy',
	},
	{
		Header: 'Specializations',
		accessor: 'specializations',
		Cell: ({ value }) => {
			return value.join(' | ');
		},
	},
	{
		Header: 'Created Date',
		accessor: 'createdAt',
		Cell: ({ value }) =>
			moment.tz(value, 'Asia/Karachi').format('DD-MM-YYYY | hh:mm:ss A'),
	},
];
