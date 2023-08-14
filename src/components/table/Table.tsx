'use client';
import { SafeAppointment, SafePet, SafeUser, SafeVet } from '@/app/types';
import {
	tableAppointmentsSchema,
	tablePetsSchema,
	tableUsersSchema,
	tableVetsSchema,
} from '@/data';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEditAlt, BiSearch } from 'react-icons/bi';
import Button from '../button/Button';
import { FaPlus } from 'react-icons/fa';
import NoData from './NoData';
import useCreateUserModal from '@/hooks/useCreateUserModal';
import useCreatePetModal from '@/hooks/useCreatePetModal';
import useCreateVetModal from '@/hooks/useCreateVetModal';

interface TableProps {
	users?: SafeUser[] | null;
	pets?: SafePet[] | null;
	vets?: SafeVet[] | null;
	appointments?: SafeAppointment[] | null;
	isUsersTable?: boolean;
	isVetsTable?: boolean;
	isPetsTable?: boolean;
	isAppointmentsTable?: boolean;
	deleteRow: (id: string) => void;
	updateRow: (data: any) => void;
}

const Table: React.FC<TableProps> = ({
	users,
	vets,
	pets,
	appointments,
	isUsersTable,
	isPetsTable,
	isVetsTable,
	isAppointmentsTable,
	deleteRow,
	updateRow,
}) => {
	const [placeholder, setPlaceholder] = useState('Search');
	const userModal = useCreateUserModal();
	const petModal = useCreatePetModal();
	const vetModal = useCreateVetModal();
	const data: any = useMemo(() => {
		if (isUsersTable) {
			setPlaceholder('Enter ID, username or email of a user');
			return users;
		} else if (isVetsTable) {
			setPlaceholder('Enter ID, username or email of a vet');
			return vets;
		} else if (isPetsTable) {
			setPlaceholder('Enter ID, name or owner ID of a pet');
			return pets;
		} else if (isAppointmentsTable) {
			setPlaceholder('Enter ID, vet ID or owner ID or pet ID ');
			return appointments;
		} else {
			return [];
		}
	}, [
		pets,
		users,
		vets,
		appointments,
		isPetsTable,
		isVetsTable,
		isUsersTable,
		isAppointmentsTable,
	]);
	const [queriedData, setQueriedData] = useState(data);
	const [inputFocused, setInputFocused] = useState(false);
	const columns = useMemo(() => {
		if (isUsersTable) {
			return tableUsersSchema;
		} else if (isPetsTable) {
			return tablePetsSchema;
		} else if (isVetsTable) {
			return tableVetsSchema;
		} else if (isAppointmentsTable) {
			return tableAppointmentsSchema;
		} else {
			return [];
		}
	}, [isPetsTable, isVetsTable, isUsersTable, isAppointmentsTable]);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value.toLowerCase();
		if (query === '') {
			setQueriedData(data);
		} else {
			if (isUsersTable && data) {
				//@ts-ignore
				const filteredData = data.filter(
					(user: SafeUser) =>
						user.username.toLowerCase().includes(query) ||
						user.email.toLowerCase().includes(query) ||
						user.id.toLowerCase().includes(query)
				);
				setQueriedData(filteredData);
			} else if (isVetsTable && data) {
				//@ts-ignore
				const filteredData = data.filter(
					(vet: SafeVet) =>
						vet.username.toLowerCase().includes(query) ||
						vet.email.toLowerCase().includes(query) ||
						vet.id.toLowerCase().includes(query)
				);
				setQueriedData(filteredData);
			} else if (isPetsTable && data) {
				//@ts-ignore
				const filteredData = data.filter(
					(pet: SafePet) =>
						pet.name.toLowerCase().includes(query) ||
						pet.animalType.toLowerCase().includes(query) ||
						pet.ownerId.toLowerCase().includes(query) ||
						pet.id.toLowerCase().includes(query)
				);
				setQueriedData(filteredData);
			} else if (isAppointmentsTable && data) {
				//@ts-ignore
				const filteredData = data.filter(
					(appointment: SafeAppointment) =>
						appointment.id.toLowerCase().includes(query) ||
						appointment.petId.toLowerCase().includes(query) ||
						appointment.userId.toLowerCase().includes(query) ||
						appointment.vetId.toLowerCase().includes(query)
				);
				setQueriedData(filteredData);
			}
		}
	};

	useEffect(() => {
		setQueriedData(data);
	}, [data, users, pets, vets]);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		//@ts-ignore
		useTable({ columns, data: Array.isArray(queriedData) ? queriedData : [] });
	return (
		<div className='w-[70vw] '>
			<div
				className={`flex items-center shadow-sm border-[3px] transition   ${
					inputFocused ? 'border-primary/50' : 'border-neutral-100/50 '
				} h-[50px] rounded-lg px-6 my-2`}
			>
				<BiSearch size={20} color='#40B37C' />
				<input
					onFocus={() => setInputFocused(true)}
					onBlur={() => setInputFocused(false)}
					className='focus:outline-none w-full py-2 px-6'
					placeholder={placeholder}
					type='search'
					onChange={onSearch}
				/>
			</div>
			{!isAppointmentsTable && (
				<div className='flex gap-2 justify-end'>
					<Button
						primary={false}
						dark
						icon={<FaPlus />}
						onClick={
							isUsersTable
								? userModal.onOpen
								: isPetsTable
								? petModal.onOpen
								: vetModal.onOpen
						}
						title={`Add ${isUsersTable ? 'User' : isVetsTable ? 'Vet' : 'Pet'}`}
					/>
				</div>
			)}
			<div
				className={`${
					!queriedData || queriedData?.length === 0
						? 'h-auto overflow-hidden'
						: 'h-[50vh]'
				} overflow-y-scroll w-full ${
					isUsersTable || isPetsTable ? 'overflow-x-hidden' : ''
				}`}
			>
				<table
					className='bg-white rounded-lg w-[70vw] overflow-x-hidden shadow-lg'
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<React.Fragment key={headerGroup.id}>
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<React.Fragment key={column.id}>
											<th
												className='p-4 bg-neutral-200 first:rounded-tl-lg whitespace-nowrap'
												{...column.getHeaderProps()}
											>
												{column.render('Header')}
											</th>
										</React.Fragment>
									))}
									<th
										colSpan={2}
										className='py-4 px-8 bg-neutral-200 rounded-tr-lg'
									>
										Action
									</th>
								</tr>
							</React.Fragment>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<React.Fragment key={row.id}>
									<tr
										className='even:bg-neutral-100 hover:bg-primary/10 transition cursor-pointer p-2'
										{...row.getRowProps()}
									>
										{row.cells.map((cell) => {
											return (
												<React.Fragment key={cell.value}>
													<td
														className={`p-6 text-sm whitespace-nowrap object-cover ${
															cell.column.id === 'avatar' ||
															cell.column.id === 'image'
																? 'pr-0'
																: ''
														} text-center border-b-2 border-neutral-100`}
														{...cell.getCellProps()}
													>
														{cell.render('Cell')}
													</td>
												</React.Fragment>
											);
										})}
										<td className='py-4 pr-2 pl-6 text-center cursor-pointer'>
											<BiEditAlt
												onClick={() => updateRow(row.original)}
												className='text-neutral-700 transition p-2 hover:bg-neutral-100 rounded-full'
												size={40}
											/>
										</td>
										<td className='py-4 pl-2 pr-6 text-center cursor-pointer'>
											<RiDeleteBin6Line
												onClick={() => deleteRow(row.original.id)}
												className='text-neutral-700 transition p-2 hover:bg-neutral-100 rounded-full'
												size={40}
											/>
										</td>
									</tr>
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
			{(!queriedData || queriedData?.length === 0) && <NoData />}
		</div>
	);
};

export default Table;
