import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import RegisterForm from '@/components/auth/Register'

export default function RegisterPage() {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen bg-background'>
			<div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12'>
				<div className='w-full max-w-md'>
					<Card className='border shadow-lg'>
						<CardHeader className='space-y-1 text-center'>
							<CardTitle className='text-2xl font-bold'>
								Create an account
							</CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent>
							<RegisterForm />
							<Button
								variant='outline'
								onClick={() => navigate('/')}
								className='w-full mt-4'
							>
								Back to Home
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
