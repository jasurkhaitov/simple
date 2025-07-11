import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store'
import { Loader } from 'lucide-react'

const GuestRoute = () => {
	const accessToken = useSelector((state: RootState) => state.auth.accessToken)
	const [authChecked, setAuthChecked] = useState(false)

	useEffect(() => {
		const checkAuth = () => {
			setAuthChecked(true)
		}

		checkAuth()
	}, [])

	if (!authChecked) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<Loader />
			</div>
		)
	}

	if (accessToken) {
		return <Navigate to='/dashboard' replace />
	}

	return <Outlet />
}

export default GuestRoute
