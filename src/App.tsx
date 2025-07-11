import { Navigate, Route, Routes } from 'react-router-dom'
import BrowsePage from './page/BrowsePage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import DashboardPage from './page/DashboardPage'
import ChatPage from './page/ChatPage'
import ProtectedRoute from './routes/ProtectedRoute'
import GuestRoute from './routes/GuestRoute'

export default function App() {
	return (
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
	)
}