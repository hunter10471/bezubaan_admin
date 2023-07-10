import React from 'react';

interface ButtonProps {
	title: string;
	outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, outline }) => {
	return <button className={` my-2 `}>{title}</button>;
};

export default Button;
