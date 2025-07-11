import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store'

const ProtectedRoute = () => {
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
				<Loader className='h-8 w-8 animate-spin text-gray-500' />
			</div>
		)
	}

	if (!accessToken) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}

export default ProtectedRoute
