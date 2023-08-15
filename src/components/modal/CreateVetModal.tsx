'use client';
import React, { useCallback, useState } from 'react';
import Modal from './Modal';
import Button from '../button/Button';
import useCreateVetModal from '@/hooks/useCreateVetModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldOfStudy, University } from '@/common/enum';

interface CreateVetModalProps {
	getVets: () => void;
}

const CreateVetModal: React.FC<CreateVetModalProps> = ({ getVets }) => {
	const CreateVetModal = useCreateVetModal();
	const [isLoading, setIsLoading] = useState(false);
	const [filePreview, setFilePreview] = useState('');
	const [file, setFile] = useState(null);
	const [filePreview1, setFilePreview1] = useState('');
	const [file1, setFile1] = useState(null);
	const [filePreview2, setFilePreview2] = useState('');
	const [file2, setFile2] = useState(null);
	const handleImagePreview = useCallback((e: any) => {
		if (e.target.files) {
			{
				if (e.target.id === 'file') {
					setFilePreview(URL.createObjectURL(e.target.files[0]));
					setFile(e.target.files[0]);
				} else if (e.target.id === 'file1') {
					setFilePreview1(URL.createObjectURL(e.target.files[0]));
					setFile1(e.target.files[0]);
				} else if (e.target.id === 'file2') {
					setFilePreview2(URL.createObjectURL(e.target.files[0]));
					setFile2(e.target.files[0]);
				} else {
					return;
				}
			}
		}
	}, []);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
			username: '',
			gender: '',
			isApproved: false,
			fieldOfStudy: '',
			university: '',
			address: '',
			clinicName: '',
			licenseNumber: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
		event?.preventDefault();
		let files: any[] = [];
		try {
			setIsLoading(true);
			if (file && file1 && file2) {
				const apiEndpoint =
					'http://bezubaan-nest-env.eba-4xmi8md6.ap-south-1.elasticbeanstalk.com/api/uploads';
				files = [
					{ file: file, id: 'avatar' },
					{ file: file1, id: 'degreeImage' },
					{ file: file2, id: 'licenseImage' },
				];
				for (const image of files) {
					const formData = new FormData();
					formData.append('file', image.file);
					const response: any = await axios.post<string, null>(
						apiEndpoint,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					);
					if (response) (image.file as any) = response.data;
				}
			}
			const transformedFiles = files.reduce((acc, { file, id }) => {
				acc[id] = file;
				return acc;
			}, {});
			const { lat, long, ...others } = data;
			await axios.post('/api/vets', {
				...others,
				...transformedFiles,
				location: {
					type: 'Point',
					coordinates: [parseFloat(lat), parseFloat(long)],
				},
				specializations: others.specializations.split(','),
				yearsOfExperience: parseInt(others.yearsOfExperience),
			});
			setFilePreview('');
			setFile(null);
			setFilePreview1('');
			setFile1(null);
			setFilePreview2('');
			setFile2(null);
			reset();
			getVets();
			CreateVetModal.onClose();
			toast.success('Vet created successfully.');
		} catch (error) {
			toast.error('There was an error creating this vet.');
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
			<div className='flex justify-between gap-10 w-full items-center'>
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
			<div className='flex justify-between gap-10 w-full items-center'>
				<Input
					id='yearsOfExperience'
					register={register}
					errors={errors}
					label='Years Of Experience'
					type='text'
					placeholder='10'
				/>
				<div className='flex gap-2 w-full'>
					<Input
						id='isApproved'
						register={register}
						errors={errors}
						label='Approve'
						type='radio'
						smallLabel='Yes'
						value={true}
					/>
					<Input
						id='isApproved'
						label='no'
						register={register}
						type='radio'
						errors={errors}
						smallLabel='No'
						value={false}
						labelVisibility
					/>
				</div>
			</div>
			<div className='flex justify-between gap-10 w-full items-center'>
				<Input
					id='university'
					register={register}
					errors={errors}
					label='University'
					type='text'
					select
					options={University}
				/>
				<Input
					id='fieldOfStudy'
					register={register}
					errors={errors}
					label='Field Of Study'
					type='text'
					select
					options={FieldOfStudy}
				/>
			</div>
			<div className='flex justify-between w-full'>
				<Input
					id='specializations'
					register={register}
					errors={errors}
					label='Specializations'
					type='text'
					placeholder='Medicine,Surgery'
					fullWidth
					className='min-w-[400px]'
				/>
			</div>
			<div className='flex justify-between gap-10 w-full items-center'>
				<Input
					id='clinicName'
					register={register}
					errors={errors}
					label='Clinic Name'
					type='text'
					placeholder='XYZ'
				/>
				<Input
					id='licenseNumber'
					register={register}
					errors={errors}
					label='License Number'
					type='text'
					placeholder='ABC12345'
				/>
			</div>
			<div className='flex justify-between w-full'>
				<Input
					id='address'
					register={register}
					errors={errors}
					label='Address'
					type='text'
					placeholder='15-A, Street#A, City'
					fullWidth
					className='min-w-[400px]'
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
			<div className='flex justify-between w-full'>
				<Input
					id='description'
					register={register}
					errors={errors}
					label='Description'
					type='text'
					placeholder='The new vet clinic'
					fullWidth
					className='min-w-[400px]'
				/>
			</div>
			<div className='w-full flex justify-between gap-10'>
				<div className='w-full'>
					<label htmlFor='file1'>
						<h3 className='mb-2 font-medium'>Degree Image</h3>
						<div className='w-[120px] h-[120px] rounded-xl bg-neutral-100 flex items-center justify-center cursor-pointer'>
							{filePreview === '' ? (
								<FiPlus size={25} />
							) : (
								<img
									src={filePreview1}
									alt='image-preview'
									className='w-full h-full rounded-xl'
								/>
							)}
						</div>
					</label>
					<input onChange={handleImagePreview} type='file' hidden id='file1' />
				</div>
				<div className='flex w-full justify-start'>
					<label htmlFor='file2'>
						<h3 className='mb-2 font-medium'>License Image</h3>
						<div className='w-[120px] h-[120px] rounded-xl bg-neutral-100 flex items-center justify-center cursor-pointer'>
							{filePreview === '' ? (
								<FiPlus size={25} />
							) : (
								<img
									src={filePreview2}
									alt='image-preview'
									className='w-full h-full rounded-xl'
								/>
							)}
						</div>
					</label>
					<input onChange={handleImagePreview} type='file' hidden id='file2' />
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
					onClick={CreateVetModal.onClose}
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
			isOpen={CreateVetModal.isOpen}
			title='Add Vet'
			onClose={CreateVetModal.onClose}
		/>
	);
};

export default CreateVetModal;
