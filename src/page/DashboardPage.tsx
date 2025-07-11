import Navbar from '@/components/shared/Navbar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import CreateSessionCard from '@/components/dashboard/DashboardCreateSession'
import JoinSessionCard from '@/components/dashboard/DashboardJoinSession'

export default function DashboardPage() {
	return (
		<div className='min-h-screen bg-background'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='mb-8'>
					<DashboardHeader />
				</div>

				<div className='grid gap-6 md:grid-cols-2'>
					<CreateSessionCard />
					<JoinSessionCard />
				</div>
			</div>
		</div>
	)
}
