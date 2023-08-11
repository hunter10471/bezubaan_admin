import getAllPets from '@/app/actions/getAllPets';
import getAllUsers from '@/app/actions/getAllUsers';
import DashboardCard from '@/components/DashboardCard/DashboardCard';
import React from 'react';
import { FaUserFriends, FaDog } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { AiFillCalendar, AiTwotoneCalendar } from 'react-icons/ai';
import Heading from '@/components/heading/Heading';
import LineChart from '@/components/LineChartComponent/LineChartComponent';
const Dashboard = async () => {
	const users = await getAllUsers();
	const pets = await getAllPets();
	return (
		<div>
			<div className='flex gap-4'>
				<DashboardCard
					title='Registered Users'
					color='#C33C29'
					textColor='#fff'
					icon={<FaUserFriends size={35} />}
					value={25}
				/>
				<DashboardCard
					title='Scanned Pets'
					color='#E5BE90'
					textColor='#000'
					icon={<FaDog size={35} />}
					value={30}
				/>
				<DashboardCard
					title='Registered Vets'
					color='#F7F1EC'
					textColor='#000'
					icon={<FaUserDoctor size={35} />}
					value={7}
				/>
				<DashboardCard
					title='Appointments Made'
					color='#75A29E'
					textColor='#fff'
					icon={<AiFillCalendar size={35} />}
					value={12}
				/>
			</div>
			<Heading title='Total Activity' small={true} className='my-10' />
			<div className='flex gap-8 items-center h-fit'>
				<div className='flex flex-col gap-5'>
					<div className='flex gap-4 h-fit w-fit items-end'>
						<AiTwotoneCalendar className='mb-1' size={25} />
						<div className='flex flex-col gap-1'>
							<h3 className='font-medium text-neutral-500'>
								Appointments Today
							</h3>
							<h4 className='text-xl font-bold'>40</h4>
						</div>
					</div>
					<div className='flex gap-4 h-fit w-fit items-end'>
						<AiTwotoneCalendar className='mb-1' size={25} />
						<div className='flex flex-col gap-1'>
							<h3 className='font-medium text-neutral-500'>
								Total Appointments
							</h3>
							<h4 className='text-xl font-bold'>40</h4>
						</div>
					</div>
				</div>
				<div className='w-[600px]'>
					<LineChart />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
