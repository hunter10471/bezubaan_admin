import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ButtonProps {
	title: string;
	outline?: boolean;
	onClick: () => void;
	disabled?: boolean;
	isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	title,
	outline,
	onClick,
	disabled,
	isLoading,
}) => {
	return (
		<button
			disabled={disabled || isLoading}
			onClick={onClick}
			className={` my-2 px-8 py-2 no_highlights ${
				outline
					? 'text-primary hover:text-heading border-2 border-primary hover:border-heading disabled:cursor-not-allowed'
					: 'text-white bg-primary hover:bg-heading'
			} rounded transition capitalize font-medium `}
		>
			{isLoading ? (
				<ClipLoader
					loading={isLoading}
					size={15}
					color={outline ? '#40B37C' : '#fff'}
				/>
			) : (
				title
			)}
		</button>
	);
};

export default Button;
