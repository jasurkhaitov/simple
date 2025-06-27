import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

export default function BrowseMain() {
	const navigate = useNavigate()
	return (
		<section className='py-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<h2 className='text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4'>
					Ready to Break Language Barriers ?
				</h2>
				<p className='text-base xs:text-xl text-blue-100 dark:text-blue-200 mb-8'>
					Join thousands of users connecting across languages with Simple AI
				</p>
				<Button
					onClick={() => navigate('/register')}
					size='lg'
					className='bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-gray-200'
				>
					Start Free Today
				</Button>
			</div>
		</section>
	)
}
