'use client';
import { University } from '@/common/enum';
import React, { useState } from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface InputProps {
	id: string;
	placeholder?: string;
	label?: string;
	required?: boolean;
	icon?: React.ReactNode;
	type: 'email' | 'password' | 'text' | 'search' | 'radio';
	disabled?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	fullWidth?: boolean;
	className?: string;
	value?: any;
	smallLabel?: string;
	labelVisibility?: boolean;
	checked?: boolean;
	university?: boolean;
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
	fullWidth,
	className,
	value,
	smallLabel,
	labelVisibility,
	checked,
	university,
}) => {
	const [isVisible, setIsVisible] = useState<'text' | 'password'>('password');
	return (
		<div className='my-5'>
			<label
				style={{ visibility: labelVisibility ? 'hidden' : 'visible' }}
				className={`font-medium`}
			>
				{label}
			</label>
			<div className='relative'>
				<span
					className={`absolute top-[25%] left-2 text-primary
					`}
				>
					{Icon}
				</span>

				{!university ? (
					<input
						checked={checked}
						id={id}
						disabled={disabled}
						{...register(id, { required })}
						className={` ${Icon ? 'pr-2 pl-8' : 'px-2'} ${
							fullWidth ? 'w-full' : ''
						}  py-1 focus:outline-none transition border-b-[1px] ${
							errors[id]
								? 'border-rose-500 focus:border-rose-500'
								: 'focus:border-primary  border-neutral-300'
						}  ${className}`}
						placeholder={placeholder}
						type={type === 'password' ? isVisible : type}
						defaultValue={value}
					/>
				) : (
					<select
						className='px-2 py-1 border-b-[1px] border-neutral-300 focus:border-primary focus:outline-none w-full '
						{...register('university', { required })}
					>
						{Object.values(University).map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</select>
				)}
				<label htmlFor={id} className='ml-1 text-sm'>
					{smallLabel}
				</label>
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
