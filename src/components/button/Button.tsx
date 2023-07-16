import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ButtonProps {
	title: string;
	outline?: boolean;
	onClick: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	icon?: JSX.Element;
	dark?: boolean;
	darkOutline?: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	title,
	outline,
	onClick,
	disabled,
	isLoading,
	icon,
	dark,
	className,
	darkOutline,
}) => {
	return (
		<button
			disabled={disabled || isLoading}
			onClick={onClick}
			className={`flex items-center my-2 px-8 py-2 gap-2 no_highlights ${
				outline
					? 'text-primary hover:text-heading border-2 border-primary hover:border-heading '
					: 'text-white bg-primary hover:bg-heading'
			} rounded-lg transition capitalize font-medium disabled:cursor-not-allowed ${
				dark ? 'bg-neutral-800 text-white hover:bg-neutral-700' : ''
			} ${
				darkOutline
					? 'border-2 bg-white text-neutral-800 hover:text-neutral-700 border-neutral-800 hover:border-neutral-700'
					: ''
			} ${className} `}
		>
			{isLoading ? (
				<ClipLoader
					loading={isLoading}
					size={15}
					color={outline ? '#40B37C' : '#fff'}
				/>
			) : (
				<>
					<span className='ml-[-10px]'>{icon} </span>
					{title}
				</>
			)}
		</button>
	);
};

export default Button;
