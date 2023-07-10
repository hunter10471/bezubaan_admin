import { IconType } from 'react-icons';
import { MdSpaceDashboard, MdNotifications } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { BiSolidDog, BiSolidTimeFive, BiSolidLogOut } from 'react-icons/bi';
import { BsFileBarGraphFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';

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
