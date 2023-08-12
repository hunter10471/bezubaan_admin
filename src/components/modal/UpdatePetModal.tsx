'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useCreatePetModal from '@/hooks/useCreatePetModal';
import { AnimalType } from '@/common/enum';
import { SafePet } from '@/app/types';
import useUpdatePetModal from '@/hooks/useUpdatePetModal';

interface UserModalProps {
	getPets: () => void;
	rowData: SafePet | null;
}

const CreatePetModal: React.FC<UserModalProps> = ({ getPets, rowData }) => {
	const petModal = useUpdatePetModal();
	const [isLoading, setIsLoading] = useState(false);
	const [filePreview, setFilePreview] = useState('');
	const [file, setFile] = useState();
	const handleImagePreview = useCallback((e: any) => {
		if (e.target.files) {
			setFilePreview(URL.createObjectURL(e.target.files[0]));
			setFile(e.target.files[0]);
		}
	}, []);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			...rowData,
		},
	});

	useEffect(() => {
		reset({
			...rowData,
		});
		setFilePreview(rowData?.image || '');
	}, [rowData, reset]);

	const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
		event?.preventDefault();
		let imgUrl = rowData?.image;
		try {
			setIsLoading(true);
			if (file) {
				const apiEndpoint =
					'http://bezubaan-nest-env.eba-4xmi8md6.ap-south-1.elasticbeanstalk.com/api/uploads';
				const formData = new FormData();
				formData.append('file', file);
				const response: any = await axios.post<string, null>(
					apiEndpoint,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				if (response) imgUrl = response.data;
			}
			await axios.post('/api/pets', {
				...data,
				image: imgUrl,
				age: parseInt(data.age),
			});
			setFilePreview('');
			setFile(undefined);
			reset();
			getPets();
			petModal.onClose();
			toast.success('Pet updated successfully.');
		} catch (error) {
			toast.error('There was an error updating this pet.');
			console.log(errors);
		}
		setIsLoading(false);
	};

	const bodyContent = (
		<div className='flex flex-wrap gap-2 justify-center m-1'>
			<div className='w-full flex justify-end'>
				<label htmlFor='file'>
					<div className='w-[120px] h-[120px] rounded-xl bg-neutral-100 flex items-center justify-center cursor-pointer'>
						{filePreview === '' ? (
							<FiPlus size={25} />
						) : (
							<img
								src={filePreview}
								alt='image-preview'
								className='w-full h-full rounded-xl'
							/>
						)}
					</div>
				</label>
				<input onChange={handleImagePreview} type='file' hidden id='file' />
			</div>
			<div className='flex justify-between gap-4 w-full'>
				<Input
					id='name'
					register={register}
					errors={errors}
					type='text'
					placeholder='Thomas'
					label='Name'
					value={rowData?.name}
				/>
				<Input
					id='age'
					register={register}
					errors={errors}
					type='text'
					placeholder='10'
					label='Age'
					value={rowData?.age}
				/>
			</div>
			<div className='flex justify-between gap-10 w-full'>
				<Input
					id='animalType'
					register={register}
					errors={errors}
					type='text'
					placeholder='Cat / Dog'
					label='Animal Type'
					required
					select
					options={AnimalType}
				/>
				<Input
					id='species'
					register={register}
					errors={errors}
					label='Species'
					type='text'
					value={rowData?.species}
				/>
			</div>
			<div className='flex gap-10 w-full'>
				<Input
					id='ownerId'
					register={register}
					errors={errors}
					label='Owner ID'
					type='text'
					placeholder={rowData?.ownerId}
				/>

				<div className='flex gap-2 flex-1'>
					<Input
						id='gender'
						register={register}
						errors={errors}
						label='Gender'
						type='radio'
						smallLabel='Male'
						value='male'
						checked={rowData?.gender === 'male'}
					/>
					<Input
						id='gender'
						label='female'
						register={register}
						type='radio'
						errors={errors}
						smallLabel='Female'
						value='female'
						labelVisibility
						checked={rowData?.gender === 'female'}
					/>
				</div>
			</div>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4'>
			<hr />
			<div className='flex gap-4 items-center justify-end'>
				<Button
					primary={false}
					outline
					onClick={petModal.onClose}
					title='Cancel'
				/>
				<Button
					primary={true}
					onClick={handleSubmit(onSubmit)}
					title='Create'
				/>
			</div>
		</div>
	);

	return (
		<Modal
			footer={footerContent}
			body={bodyContent}
			disabled={isLoading}
			isOpen={petModal.isOpen}
			title='Update Pet'
			onClose={petModal.onClose}
		/>
	);
};

export default CreatePetModal;
