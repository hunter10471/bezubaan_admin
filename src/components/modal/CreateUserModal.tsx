'use client';
import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import useCreateUserModal from '@/hooks/useCreateUserModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/app/types';

interface UserModalProps {
	getUsers: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ getUsers }) => {
	const userModal = useCreateUserModal();
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
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
			username: '',
			gender: '',
			isAdmin: false,
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
		event?.preventDefault();
		let imgUrl = '';
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
			const { lat, long, ...others } = data;

			await axios.post('/api/users', {
				...others,
				avatar: imgUrl,
				location: {
					type: 'Point',
					coordinates: [parseFloat(lat), parseFloat(long)],
				},
			});
			setFilePreview('');
			setFile(undefined);
			reset();
			getUsers();
			userModal.onClose();
			toast.success('User created successfully.');
		} catch (error) {
			toast.error('There was an error creating this user.');
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
					id='email'
					register={register}
					errors={errors}
					type='email'
					placeholder='someone@mail.com'
					label='Email'
					required={true}
				/>
				<Input
					id='password'
					register={register}
					errors={errors}
					type='password'
					placeholder='********'
					label='Password'
					required={true}
				/>
			</div>
			<div className='flex justify-between gap-10 w-full'>
				<Input
					id='username'
					register={register}
					errors={errors}
					type='text'
					placeholder='JohnDoe'
					label='Username'
					required
				/>
				<div className='flex gap-2 w-full'>
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
					<Input
						id='gender'
						label='other'
						type='radio'
						disabled={isLoading}
						register={register}
						errors={errors}
						smallLabel='Other'
						value='other'
						labelVisibility
					/>
				</div>
			</div>
			<div className='flex gap-2 w-full'>
				<Input
					id='isAdmin'
					register={register}
					errors={errors}
					label='Admin'
					type='radio'
					smallLabel='Yes'
					value={true}
				/>
				<Input
					id='isAdmin'
					label='no'
					register={register}
					type='radio'
					errors={errors}
					smallLabel='No'
					value={false}
					labelVisibility
				/>
			</div>
			<div className='flex gap-2 w-full'>
				<Input
					id='lat'
					register={register}
					errors={errors}
					type='text'
					placeholder='33.77'
					label='Latitude'
				/>
				<Input
					id='long'
					register={register}
					errors={errors}
					type='text'
					placeholder='128.88'
					label='Longitude'
				/>
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
					onClick={userModal.onClose}
					title='Cancel'
				/>
				<Button
					primary={true}
					onClick={handleSubmit(onSubmit)}
					title='Create'
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
			isOpen={userModal.isOpen}
			title='Add User'
			onClose={userModal.onClose}
		/>
	);
};

export default UserModal;
