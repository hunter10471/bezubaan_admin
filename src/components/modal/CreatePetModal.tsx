'use client';
import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useCreatePetModal from '@/hooks/useCreatePetModal';
import { AnimalType } from '@/common/enum';

interface UserModalProps {
	getPets: () => void;
}

const CreatePetModal: React.FC<UserModalProps> = ({ getPets }) => {
	const petModal = useCreatePetModal();
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
			name: '',
			age: 0,
			animalType: '',
			gender: '',
			ownerId: '',
			species: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
		event?.preventDefault();
		let imgUrl = '';
		setIsLoading(true);
		try {
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
			toast.success('Pet created successfully.');
		} catch (error) {
			toast.error('There was an error creating this pet.');
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
					required={true}
				/>
				<Input
					id='age'
					register={register}
					errors={errors}
					type='text'
					placeholder='10'
					label='Age'
					required={true}
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
					className='flex-1'
				/>
				<Input
					id='species'
					register={register}
					errors={errors}
					label='Species'
					type='text'
				/>
			</div>
			<div className='flex gap-10 w-full'>
				<Input
					id='ownerId'
					register={register}
					errors={errors}
					label='Owner ID'
					type='text'
					placeholder='1998x5ghbc*a2hhn'
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
					disabled={isLoading}
				/>
				<Button
					primary={true}
					onClick={handleSubmit(onSubmit)}
					title='Create'
					disabled={isLoading}
					isLoading={isLoading}
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
			title='Add Pet'
			onClose={petModal.onClose}
		/>
	);
};

export default CreatePetModal;
