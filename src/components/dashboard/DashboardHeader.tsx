import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCheckMeQuery } from '@/services/authApi'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardHeader() {
	const { data, isLoading } = useCheckMeQuery()

	console.log(data)

	if (isLoading) {
		return (
			<div className='flex items-center space-x-4 mb-4'>
				<Skeleton className='h-16 w-16 rounded-full' />
				<div className='space-y-2'>
					<Skeleton className='h-6 w-48 rounded-md' />
					<Skeleton className='h-4 w-64 rounded-md' />
				</div>
			</div>
		)
	}

	if (!data) return null

	return (
		<div className='flex items-center space-x-4 mb-4'>
			<Avatar className='h-16 w-16'>
				<AvatarImage src={'https://github.com/shadcn.png'} />
				<AvatarFallback className='bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg'>
					{data.first_name?.[0]}
					{data.last_name?.[0]}
				</AvatarFallback>
			</Avatar>
			<div>
				<h1 className='text-xl xs:text-3xl font-bold text-foreground'>
					Welcome back {data.first_name} !
				</h1>
				<p className='text-md text-muted-foreground'>
					Ready to chat across languages?
				</p>
			</div>
		</div>
	)
}
