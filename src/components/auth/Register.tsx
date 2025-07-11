import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '@/services/authApi'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '@/helper/authSlice'
import { toast } from 'sonner'

export default function Register() {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		gender: '',
	})

	const [registerUser, { isLoading }] = useRegisterMutation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await registerUser(formData).unwrap()
			console.log('Register successful:', response)

			if (response.access_token) {
				dispatch(setAccessToken(response.access_token))
			}

			navigate('/login')
		} catch (error) {
			toast.error(error.data.detail)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div className='grid grid-cols-1 xs:grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<Label htmlFor='first_name'>Name</Label>
					<Input
						id='first_name'
						name='first_name'
						type='text'
						placeholder='Enter your name'
						value={formData.first_name}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='last_name'>Surname</Label>
					<Input
						id='last_name'
						name='last_name'
						type='text'
						placeholder='Enter your surname'
						value={formData.last_name}
						onChange={handleInputChange}
						required
					/>
				</div>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder='Enter your email'
					value={formData.email}
					onChange={handleInputChange}
					required
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='password'>Password</Label>
				<div className='relative'>
					<Input
						id='password'
						name='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Create a password'
						value={formData.password}
						onChange={handleInputChange}
						required
						className='pr-10'
					/>
					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
						onClick={() => setShowPassword(!showPassword)}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{showPassword ? (
							<EyeOff className='h-4 w-4 text-muted-foreground' />
						) : (
							<Eye className='h-4 w-4 text-muted-foreground' />
						)}
					</Button>
				</div>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='gender'>Gender</Label>
				<Select
					value={formData.gender}
					onValueChange={value =>
						setFormData(prev => ({ ...prev, gender: value }))
					}
					required
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Select your gender' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='male'>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 rounded-full bg-blue-500' />
								<span>Male</span>
							</div>
						</SelectItem>
						<SelectItem value='female'>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 rounded-full bg-pink-500' />
								<span>Female</span>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Button
				type='submit'
				className='w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
				disabled={isLoading}
			>
				{isLoading ? 'Creating account...' : 'Create Account'}
			</Button>

			<p className='text-center text-sm text-muted-foreground'>
				Already have an account?{' '}
				<Link
					to='/login'
					className='text-primary hover:text-primary/80 font-medium transition-colors'
				>
					Sign in
				</Link>
			</p>
		</form>
	)
}
