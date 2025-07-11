import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, User, User2Icon } from 'lucide-react'
import { ModeToggle } from '@/theme/ModeToggle'
import { toast } from 'sonner'
import LogoIcon from './LogoIcon'
import { logout } from '@/helper/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authApi, useCheckMeQuery } from '@/services/authApi'

export default function Navbar() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { data: user, isLoading } = useCheckMeQuery()

	const handleLogout = () => {
		toast.info('Logging out...')
		dispatch(logout())
		dispatch(authApi.util.resetApiState())
		navigate('/login')
	}

	const fallbackUser = {
		first_name: 'Unknown',
		last_name: '',
		email: 'N/A',
		gender: 'Unknown',
	}

	const userInfo = user || fallbackUser

	return (
		<nav className='border-b bg-background/80 backdrop-blur-md sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<LogoIcon />

					<div className='flex items-center space-x-4'>
						<ModeToggle />

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' className='relative'>
									<User2Icon />
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent className='w-56' align='end' forceMount>
								<DropdownMenuLabel className='font-normal'>
									<div className='flex flex-col space-y-1'>
										<p className='text-sm font-medium leading-none'>
											{isLoading
												? 'Loading...'
												: `${userInfo.first_name} ${userInfo.last_name}`}
										</p>
										<p className='text-xs leading-none text-muted-foreground'>
											{userInfo.email}
										</p>
									</div>
								</DropdownMenuLabel>

								<DropdownMenuSeparator />

								<DropdownMenuItem disabled className='cursor-default'>
									<User className='mr-2 h-4 w-4' />
									<div className='flex flex-col'>
										<span className='text-xs text-muted-foreground'>
											Gender
										</span>
										<span className='text-sm'>{userInfo.gender}</span>
									</div>
								</DropdownMenuItem>

								<DropdownMenuSeparator />

								<DropdownMenuItem
									onClick={handleLogout}
									className='text-red-500 focus:text-red-500'
								>
									<LogOut className='mr-2 h-4 w-4 translate-y-0.5 text-red-500 focus:text-red-500' />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	)
}
