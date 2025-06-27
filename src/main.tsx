import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './provider/ThemeProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<App />
					</Provider>
				</QueryClientProvider>
			</ThemeProvider>
		</StrictMode>
	</BrowserRouter>
)
