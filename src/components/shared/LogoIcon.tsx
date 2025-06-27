import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LogoIcon() {
	return (
		<Link to={'/'} className='flex items-center space-x-3'>
			<div className='w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
				<Sparkles className='h-5 w-5 text-white' />
			</div>
			<span className='text-xl font-bold font-montserrat text-foreground'>
				Simple AI
			</span>
		</Link>
	)
}
