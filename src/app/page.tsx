import Login from '@/components/login/Login';
import getCurrentUser from './actions/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function Signin() {
	const user = await getCurrentUser();
	if (!user) {
		return <Login />;
	} else {
		redirect('/Admin/Dashboard');
	}
}
