'use client';
import { SafePet, SafeUser, SafeVet } from '@/app/types';
import { tablePetsSchema, tableUsersSchema } from '@/data';
import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEditAlt, BiSearch } from 'react-icons/bi';
import Button from '../button/Button';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import NoData from './NoData';
interface TableProps {
	users?: SafeUser[] | null;
	pets?: SafePet[] | null;
	vets?: SafeVet[] | null;
	isUsersTable?: boolean;
	isVetsTable?: boolean;
	isPetsTable?: boolean;
}

const Table: React.FC<TableProps> = ({
	users,
	vets,
	pets,
	isUsersTable,
	isPetsTable,
	isVetsTable,
}) => {
	const [placeholder, setPlaceholder] = useState('Search');
	const data = useMemo(() => {
		if (isUsersTable) {
			setPlaceholder('Enter ID, username or email of a user');
			return users;
		} else if (isVetsTable) {
			setPlaceholder('Enter ID, username or email of a vet');
			return vets;
		} else if (isPetsTable) {
			setPlaceholder('Enter ID, name or owner ID of a pet');
			return pets;
		} else {
			return [];
		}
	}, [pets, users, vets, isPetsTable, isVetsTable, isUsersTable]);
	const [queriedData, setQueriedData] = useState(data);
	const [inputFocused, setInputFocused] = useState(false);
	const columns = useMemo(() => {
		if (isUsersTable) {
			return tableUsersSchema;
		} else if (isPetsTable) {
			return tablePetsSchema;
		} else if (isVetsTable) {
			return [
				{
					Header: 'ID',
					accessor: 'id',
				},
			];
		} else {
			return [];
		}
	}, [isPetsTable, isVetsTable, isUsersTable]);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		if (query === '') {
			setQueriedData(data);
		} else {
			if (isUsersTable && data) {
				//@ts-ignore
				const filteredData = data.filter(
					(user: SafeUser) =>
						user.username.includes(query) ||
						user.email.includes(query) ||
						user.id.includes(query)
				);
				setQueriedData(filteredData);
			}
		}
	};

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		//@ts-ignore
		useTable({ columns, data: [...queriedData] });
	return (
		<div className='w-[70vw]'>
			<div
				className={`flex items-center shadow-sm border-[3px] transition  ${
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
			<div className='flex gap-2 justify-end'>
				<Button dark icon={<FaPlus />} onClick={() => {}} title='Add User' />
			</div>
			<table
				className='bg-white rounded-lg w-full shadow-lg'
				{...getTableProps()}
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<React.Fragment key={headerGroup.id}>
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<React.Fragment key={column.id}>
										<th
											className='p-4 bg-neutral-200'
											{...column.getHeaderProps()}
										>
											{column.render('Header')}
										</th>
									</React.Fragment>
								))}
								<th colSpan={2} className='py-4 px-8 bg-neutral-200'>
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
								<tr className='even:bg-neutral-100' {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<React.Fragment key={cell.value}>
												<td
													className={`p-4 ${
														cell.column.id === 'avatar' ? 'pr-0' : ''
													} text-center border-b-2 border-neutral-100`}
													{...cell.getCellProps()}
												>
													{cell.render('Cell')}
												</td>
											</React.Fragment>
										);
									})}
									<td className='py-4 pr-3 pl-6 text-center cursor-pointer'>
										<BiEditAlt className='text-neutral-700' size={22} />
									</td>
									<td className='py-4 pl-3 pr-6 text-center cursor-pointer'>
										<RiDeleteBin6Line className='text-neutral-700' size={22} />
									</td>
								</tr>
							</React.Fragment>
						);
					})}
				</tbody>
			</table>
			{queriedData?.length === 0 && <NoData />}
		</div>
	);
};

export default Table;
