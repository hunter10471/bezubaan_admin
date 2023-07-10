'use client';
import React from 'react';

interface InputProps {
	placeholder: string;
	label: string;
	required?: boolean;
	icon?: React.ReactNode;
	iconColor?: string;
	type: 'email' | 'password' | 'text';
}

const Input: React.FC<InputProps> = ({
	placeholder,
	label,
	required,
	icon: Icon,
	iconColor,
	type,
}) => {
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
					className={` ${
						Icon ? 'pr-2 pl-8' : 'px-4'
					} py-1 focus:outline-none transition focus:border-primary border-b-[1px] border-neutral-300`}
					placeholder={placeholder}
					required={required}
					type={type}
				/>
			</div>
		</div>
	);
};

export default Input;
