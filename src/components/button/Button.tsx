import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ButtonProps {
	title: string;
	outline?: boolean;
	primary: boolean;
	onClick: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	icon?: JSX.Element;
	dark?: boolean;
	darkOutline?: boolean;
	className?: string;
	red?: boolean;
	style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
	title,
	outline,
	onClick,
	primary,
	disabled,
	isLoading,
	icon,
	dark,
	className,
	darkOutline,
	red,
	style,
}) => {
	return (
		<button
			style={style}
			type='button'
			disabled={disabled || isLoading}
			onClick={onClick}
			className={`flex items-center my-2 px-8 py-2 gap-2 no_highlights ${
				primary ? 'text-white bg-primary hover:bg-heading' : ''
			} ${
				outline
					? 'text-primary hover:text-heading  border-primary hover:border-heading '
					: ''
			} rounded-lg transition capitalize font-medium disabled:cursor-not-allowed border-2 ${
				dark ? 'bg-neutral-800 text-white hover:bg-neutral-700' : ''
			} ${
				darkOutline
					? 'border-2 bg-white text-neutral-700 hover:text-neutral-700 border-neutral-800 hover:border-neutral-700'
					: ''
			} ${
				red
					? 'text-white  border-rose-500 hover:border-rose-600 bg-rose-500 hover:bg-rose-600'
					: ''
			}  ${className} `}
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
