import { configureStore } from '@reduxjs/toolkit'
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux'

import authReducer from '@/helper/authSlice'

import { authApi } from '@/services/authApi'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: true,
		}).concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
