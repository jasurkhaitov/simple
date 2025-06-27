import { MessageSquare, Share2, UserPlus } from 'lucide-react'

export default function BrowseSection() {
	return (
		<section className='py-20 bg-background'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
						How It Works
					</h2>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Get started with Simple AI in just three simple steps
					</p>
				</div>

				<div className='grid md:grid-cols-3 gap-8'>
					<div className='text-center'>
						<div className='relative'>
							<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6'>
								<UserPlus className='h-10 w-10 text-white' />
							</div>
							<div className='absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center'>
								1
							</div>
						</div>
						<h3 className='text-xl font-semibold text-foreground mb-3'>
							Sign Up & Set Your Language
						</h3>
						<p className='text-muted-foreground'>
							Create your account and select your preferred language from
							supported languages.
						</p>
					</div>

					<div className='text-center'>
						<div className='relative'>
							<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6'>
								<Share2 className='h-10 w-10 text-white' />
							</div>
							<div className='absolute -top-2 -right-2 bg-purple-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center'>
								2
							</div>
						</div>
						<h3 className='text-xl font-semibold text-foreground mb-3'>
							Share or Join an Invite Code
						</h3>
						<p className='text-muted-foreground'>
							Create a chat room and share the invite code, or join an existing
							conversation with a code.
						</p>
					</div>

					<div className='text-center'>
						<div className='relative'>
							<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-red-600 rounded-full mb-6'>
								<MessageSquare className='h-10 w-10 text-white' />
							</div>
							<div className='absolute -top-2 -right-2 bg-pink-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center'>
								3
							</div>
						</div>
						<h3 className='text-xl font-semibold text-foreground mb-3'>
							Start Chatting — AI Auto-Translates
						</h3>
						<p className='text-muted-foreground'>
							Send text or voice messages in your language. AI instantly
							translates for seamless communication.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
