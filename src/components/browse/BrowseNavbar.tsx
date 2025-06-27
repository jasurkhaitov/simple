import { useNavigate } from 'react-router-dom'
import LogoIcon from '../shared/LogoIcon'
import { Button } from '../ui/button'
import { ModeToggle } from '@/theme/ModeToggle'

export default function BrowseNavbar() {
	const navigate = useNavigate()

	return (
		<nav className='border-b bg-background/50 backdrop-blur-md sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<LogoIcon />
					<div className='flex items-center space-x-0 sm:space-x-4'>
						<Button
							className='hidden sm:block'
							onClick={() => navigate('/login')}
							variant='outline'
						>
							Login
						</Button>
						<Button
							className='hidden sm:block'
							onClick={() => navigate('/register')}
						>
							Start Free
						</Button>
						<ModeToggle />
					</div>
				</div>
			</div>
		</nav>
	)
}
