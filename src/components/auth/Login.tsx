import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { useLoginMutation } from '@/services/authApi'
import { setEmail, setPassword, setAccessToken } from '@/helper/authSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function Login() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)

	const email = useAppSelector(state => state.auth.email)
	const password = useAppSelector(state => state.auth.password)

	const [login, { isLoading }] = useLoginMutation()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await login({ email, password }).unwrap()
			dispatch(setAccessToken(response.access_token))
			navigate('/dashboard')
			console.log(response)
		} catch (error) {
			console.log(error)
			toast.error(error.data.detail)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-5'>
			<div className='space-y-2'>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					type='email'
					placeholder='Enter your email'
					value={email}
					onChange={e => dispatch(setEmail(e.target.value))}
					required
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='password'>Password</Label>
				<div className='relative'>
					<Input
						id='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter your password'
						value={password}
						onChange={e => dispatch(setPassword(e.target.value))}
						required
						className='pr-10'
					/>
					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='absolute right-0 top-0 h-full px-3 py-2'
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeOff className='h-4 w-4 text-muted-foreground' />
						) : (
							<Eye className='h-4 w-4 text-muted-foreground' />
						)}
					</Button>
				</div>
			</div>

			<Button
				type='submit'
				className='w-full mt-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
				disabled={isLoading}
			>
				{isLoading ? 'Signing in...' : 'Sign In'}
			</Button>

			<p className='text-center text-sm text-muted-foreground'>
				Don't have an account?{' '}
				<Link
					to='/register'
					className='text-primary hover:text-primary/80 font-medium transition-colors'
				>
					Sign up
				</Link>
			</p>
		</form>
	)
}
