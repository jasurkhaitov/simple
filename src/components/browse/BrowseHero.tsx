import { Globe, MessageCircle, Users } from 'lucide-react'

export default function BrowseHero() {
	return (
		<section className='py-16 bg-muted/50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
					<div className='text-center'>
						<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4'>
							<Users className='h-8 w-8 text-blue-600 dark:text-blue-400' />
						</div>
						<div className='text-2xl md:text-4xl font-bold text-foreground mb-2'>
							10,000+
						</div>
						<div className='text-muted-foreground'>Registered Users</div>
					</div>

					<div className='text-center'>
						<div className='inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-4'>
							<Globe className='h-8 w-8 text-purple-600 dark:text-purple-400' />
						</div>
						<div className='text-2xl md:text-4xl font-bold text-foreground mb-2'>
							100+
						</div>
						<div className='text-muted-foreground'>Supported Languages</div>
					</div>

					<div className='text-center'>
						<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full mb-4'>
							<MessageCircle className='h-8 w-8 text-green-600 dark:text-green-400' />
						</div>
						<div className='text-2xl md:text-4xl font-bold text-foreground mb-2'>
							2M+
						</div>
						<div className='text-muted-foreground'>Messages Translated</div>
					</div>
				</div>
			</div>
		</section>
	)
}
