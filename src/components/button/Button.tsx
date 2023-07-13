import React from 'react';

interface ButtonProps {
	title: string;
	outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, outline }) => {
	return (
		<button
			className={` my-2 px-8 py-2 no_highlights ${
				outline
					? 'text-primary hover:text-heading border-2 border-primary hover:border-heading'
					: 'text-white bg-primary hover:bg-heading'
			} rounded transition capitalize font-medium `}
		>
			{title}
		</button>
	);
};

export default Button;
