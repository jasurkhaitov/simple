import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const BrowsePage = lazy(() => import('./page/BrowsePage'))
const LoginPage = lazy(() => import('./page/LoginPage'))
const RegisterPage = lazy(() => import('./page/RegisterPage'))
const DashboardPage = lazy(() => import('./page/DashboardPage'))
const ChatPage = lazy(() => import('./page/ChatPage'))

import ProtectedRoute from './routes/ProtectedRoute'
import GuestRoute from './routes/GuestRoute'

export default function App() {
	return (
		<Suspense
			fallback={
				<div className='flex items-center justify-center h-screen'>
					Loading...
				</div>
			}
		>
			<Routes>
				<Route element={<GuestRoute />}>
					<Route path='/' element={<BrowsePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route path='/dashboard' element={<DashboardPage />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/chat/:sessionId' element={<ChatPage />} />
				</Route>

				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Suspense>
	)
}
