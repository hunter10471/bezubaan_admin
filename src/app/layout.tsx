import Sidebar from '@/components/sidebar/Sidebar';
import './globals.css';
import { Roboto } from 'next/font/google';
import ToasterProvider from './Providers/ToasterProvider';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
	title: 'Bezubaan: Admin Panel',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<ToasterProvider />
				<div className='flex'>
					<div className='w-full min-h-screen bg-neutral-200 text-neutral-800'>
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
