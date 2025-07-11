import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './provider/ThemeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<App />
						<Toaster/>
					</Provider>
				</QueryClientProvider>
			</ThemeProvider>
		</StrictMode>
	</BrowserRouter>
)
