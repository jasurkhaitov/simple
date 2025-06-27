import { Mail, Send } from 'lucide-react'
import { Card } from '../ui/card'

export default function BrowseContact() {
	return (
		<section className='py-16 bg-muted/50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl mb-2 font-bold text-foreground'>
						Get in Touch
					</h2>
					<p className='text-lg text-muted-foreground'>
						Have questions? We're here to help you get started.
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
					<Card className='p-6 gap-5 text-center border'>
						<Mail className='h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto' />
						<h3 className='text-lg font-semibold text-foreground'>
							Email Support
						</h3>
						<p className='text-muted-foreground'>
							Get help from our support team
						</p>
						<a
							href='mailto:jasurkhaitov0@gmail.com'
							className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium'
						>
							jasurkhaitov0@gmail.com
						</a>
					</Card>

					<Card className='p-6 gap-5 text-center border'>
						<Send className='h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto' />
						<h3 className='text-lg font-semibold text-foreground'>
							Telegram Support
						</h3>
						<p className='text-muted-foreground'>
							Get help from our support team
						</p>
						<a
							href='https://t.me/jasurkhaitov'
							className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium'
						>
							@jasurkhaitov
						</a>
					</Card>
				</div>
			</div>
		</section>
	)
}
