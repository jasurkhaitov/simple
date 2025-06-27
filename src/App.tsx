import { Navigate, Route, Routes } from 'react-router-dom'
import BrowsePage from './page/BrowsePage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import DashboardPage from './page/DashboardPage'

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<BrowsePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/dashboard' element={<DashboardPage />} />
			<Route path='*' element={<Navigate to={'/'} />} />
		</Routes>
	)
}
