import Image from 'next/image';
import React from 'react';
import logo from '../../../public/assets/white_logo_only.png';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

interface LogoProps {
	large?: boolean;
	white?: boolean;
}

const Logo: React.FC<LogoProps> = ({ large, white }) => {
	return (
		<div className='flex gap-4 items-center '>
			<div className={`${large ? 'p-6' : 'p-2'} bg-primary rounded-full`}>
				<Image src={logo} alt='Bezubaan-logo' height={large ? 65 : 35} />
			</div>
			<h2
				className={`${poppins.className} font-extrabold ${
					white ? 'text-white' : 'text-black'
				} text-center ${large ? 'text-[28px]' : 'text-lg'} flex flex-col`}
			>
				Bezubaan
				<span
					className={`italic font-normal ${
						white ? 'text-white' : 'text-black'
					} ${large ? 'text-xl' : 'text-sm'} mr-1`}
				>
					Admin Panel
				</span>
			</h2>
		</div>
	);
};

export default Logo;
