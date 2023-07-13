import Input from '@/components/Input/Input';
import Heading from '@/components/heading/Heading';
import Logo from '@/components/logo/Logo';
import { IoMail } from 'react-icons/io5';
import { AiFillLock } from 'react-icons/ai';
import Button from '@/components/button/Button';

export default async function Signin() {
	return (
		<div className='flex h-full items-center justify-center bg-login-background '>
			<div className='absolute h-full w-full bg-black/25 top-0'></div>
			<div className='flex items-center px-16 py-10 bg-white rounded-xl gap-16 shadow-xl z-10'>
				<Logo large />
				<span className='h-[350px] border-[1px] border-neutral-200'></span>
				<div>
					<Heading title='Welcome back' />
					<Input
						type='email'
						placeholder='someone@mail.com'
						label='Email'
						required={true}
						icon={<IoMail size={20} />}
					/>
					<Input
						type='password'
						placeholder='********'
						label='Password'
						required={true}
						icon={<AiFillLock size={20} />}
					/>
					<Button title='Login' />
				</div>
			</div>
		</div>
	);
}
