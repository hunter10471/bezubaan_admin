'use client';
import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import Heading from '@/components/heading/Heading';
import Logo from '@/components/logo/Logo';
import { IoMail } from 'react-icons/io5';
import { AiFillLock } from 'react-icons/ai';
import Button from '@/components/button/Button';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		signIn('credentials', {
			...data,
			redirect: false,
		})
			.then((callback) => {
				if (callback?.ok) {
					toast.success('Logged in');
					router.push('/Admin/Dashboard');
				}
				if (callback?.error) {
					toast.error('There was an error logging you in');
				}
			})
			.finally(() => setIsLoading(false));
	};
	return (
		<div className='flex h-full items-center justify-center bg-login-background '>
			<div className='absolute h-full w-full bg-black/25 top-0'></div>
			<div className='flex items-center px-16 py-10 bg-white rounded-xl gap-16 shadow-xl z-10'>
				<Logo large />
				<span className='h-[350px] border-[1px] border-neutral-200'></span>
				<form>
					<Heading title='Welcome back' />
					<Input
						id='email'
						register={register}
						errors={errors}
						type='email'
						placeholder='someone@mail.com'
						label='Email'
						required={true}
						icon={<IoMail size={20} />}
					/>
					<Input
						id='password'
						register={register}
						errors={errors}
						type='password'
						placeholder='********'
						label='Password'
						required={true}
						icon={<AiFillLock size={20} />}
					/>
					<Button
						primary={true}
						isLoading={isLoading}
						onClick={handleSubmit(onSubmit)}
						title='Login'
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
