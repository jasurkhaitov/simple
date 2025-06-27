import BrowseNavbar from '@/components/browse/BrowseNavbar'
import BrowseHeader from '@/components/browse/BrowseHeader'
import BrowseHero from '@/components/browse/BrowseHero'
import BrowseSection from '@/components/browse/BrowseSection'
import BrowseMain from '@/components/browse/BrowseMain'
import BrowseContact from '@/components/browse/BrowseContact'
import Footer from '@/components/shared/Footer'

export default function LandingPage() {
	return (
		<div className='min-h-screen bg-background'>
			<BrowseNavbar />

			<BrowseHeader />

			<BrowseHero />

			<BrowseSection />

			<BrowseMain />

			<BrowseContact />

			<Footer />
		</div>
	)
}
