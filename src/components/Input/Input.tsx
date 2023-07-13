'use client';
import React, { useState } from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface InputProps {
	id: string;
	placeholder: string;
	label: string;
	required?: boolean;
	icon?: React.ReactNode;
	type: 'email' | 'password' | 'text';
	disabled?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
	id,
	placeholder,
	label,
	required,
	icon: Icon,
	type,
	disabled,
	register,
	errors,
}) => {
	const [isVisible, setIsVisible] = useState<'text' | 'password'>('password');
	return (
		<div className='my-5'>
			<label className='font-medium'>{label}</label>
			<div className='relative'>
				<span
					className={`absolute top-[6px] text-primary
					`}
				>
					{Icon}
				</span>
				<input
					{...register(id, { required })}
					className={` ${
						Icon ? 'pr-2 pl-8' : 'px-4'
					} py-1 focus:outline-none transition focus:border-primary border-b-[1px] border-neutral-300`}
					placeholder={placeholder}
					required={required}
					type={type === 'password' ? isVisible : type}
				/>
				{type === 'password' && (
					<div className='absolute top-2 right-6 cursor-pointer'>
						{isVisible === 'password' ? (
							<AiFillEye
								onClick={() => setIsVisible('text')}
								className='text-neutral-600'
								size={20}
							/>
						) : (
							<AiFillEyeInvisible
								onClick={() => setIsVisible('password')}
								className='text-neutral-600'
								size={20}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Input;
