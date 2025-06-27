import { Languages, Mic, Sparkles, Type } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { useNavigate } from 'react-router-dom'

export default function BrowseHeader() {
	const navigate = useNavigate()
	return (
		<section className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20'>
			<div className='absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))] -z-10' />
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div className='text-center lg:text-left'>
						<Badge className='mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/50'>
							<Sparkles className='h-3 w-3 mr-1' />
							AI-Powered Translation
						</Badge>
						<h1 className='text-4xl sm:text-5xl font-bold bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight'>
							Chat Across Languages
						</h1>
						<p className='text-base text-muted-foreground mb-8 m-auto max-w-2xl'>
							Text or voice chat in your language and let AI translate it for
							the other person — in real time. Break down language barriers and
							connect with anyone, anywhere.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
							<Button
								onClick={() => navigate('/register')}
								size='lg'
								className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
							>
								Start Free
							</Button>
							<Button
								onClick={() => navigate('/login')}
								size='lg'
								variant='outline'
							>
								Login
							</Button>
						</div>
					</div>

					<div className='relative'>
						<div className='relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl xs:rounded-2xl p-4 xs:p-8 shadow-2xl border dark:border-border'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<Card className='p-4 bg-card/80 backdrop-blur-sm border'>
									<div className='flex items-center space-x-2 mb-2'>
										<div className='w-6 h-6 bg-blue-500 rounded-full' />
										<span className='text-sm font-medium text-foreground'>
											You
										</span>
									</div>
									<div className='bg-blue-500 text-white p-2 rounded-lg text-sm'>
										Hello! How are you?
									</div>
									<div className='flex items-center mt-1 text-xs text-muted-foreground'>
										<Type className='h-3 w-3 mr-1' />
										English
									</div>
								</Card>

								<Card className='p-4 bg-card/80 backdrop-blur-sm border'>
									<div className='flex items-center space-x-2 mb-2'>
										<div className='w-6 h-6 bg-green-500 rounded-full' />
										<span className='text-sm font-medium text-foreground'>
											Friend
										</span>
									</div>
									<div className='bg-muted text-foreground p-2 rounded-lg text-sm'>
										¡Hola! ¿Cómo estás?
									</div>
									<div className='flex items-center mt-1 text-xs text-muted-foreground'>
										<Mic className='h-3 w-3 mr-1' />
										Spanish
									</div>
								</Card>
							</div>

							<div className='absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full'>
								<Languages className='h-4 w-4' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
