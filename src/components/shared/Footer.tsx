import LogoIcon from './LogoIcon'

export default function Footer() {
	return (
		<footer className='bg-card border-t py-5'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col xs:flex-row justify-between items-center'>
					<div className='hidden xs:block'>
						<LogoIcon />
					</div>

					<div className='text-sm text-muted-foreground'>
						© 2025 Simple AI. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	)
}
