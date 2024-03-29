import './globals.css';
import { Roboto } from 'next/font/google';
import ToasterProvider from './Providers/ToasterProvider';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
	title: 'Bezubaan: Admin Panel',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<ToasterProvider />
				<div className='flex'>
					<div className='w-full min-h-screen text-neutral-800'>{children}</div>
				</div>
			</body>
		</html>
	);
}
