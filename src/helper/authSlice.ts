import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	name: string
	surname: string
	gender: string
	email: string
	password: string
	accessToken: string | null
	isAuthenticated: boolean
	createSessionLanguage: string
	joinSessionLanguage: string
	joinInviteCode: string

	activeSessionId: number | null
}

const initialState: AuthState = {
	name: '',
	surname: '',
	gender: '',
	email: '',
	password: '',
	accessToken: localStorage.getItem('accessToken'),
	isAuthenticated: false,
	createSessionLanguage: '',
	joinSessionLanguage: '',
	joinInviteCode: '',

	activeSessionId: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		setSurname: (state, action: PayloadAction<string>) => {
			state.surname = action.payload
		},
		setGender: (state, action: PayloadAction<string>) => {
			state.gender = action.payload
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			localStorage.setItem('accessToken', action.payload)
			state.accessToken = action.payload
			state.isAuthenticated = true
		},
		setAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload
		},
		setCreateSessionLanguage: (state, action: PayloadAction<string>) => {
			state.createSessionLanguage = action.payload
		},
		setJoinSessionLanguage: (state, action: PayloadAction<string>) => {
			state.joinSessionLanguage = action.payload
		},
		setJoinInviteCode: (state, action: PayloadAction<string>) => {
			state.joinInviteCode = action.payload
		},
		logout: state => {
			localStorage.removeItem('accessToken')
			state.accessToken = null
			state.isAuthenticated = false
		},
		resetForm: () => {
			return {
				...initialState,
				accessToken: localStorage.getItem('accessToken'),
			}
		},
		setActiveSessionId: (state, action: PayloadAction<number>) => {
			state.activeSessionId = action.payload
		}
	},
})

export const {
	setName,
	setSurname,
	setGender,
	setEmail,
	setPassword,
	setAccessToken,
	setAuthenticated,
	setCreateSessionLanguage,
	setJoinSessionLanguage,
	setJoinInviteCode,
	logout,
	resetForm,
	setActiveSessionId
} = authSlice.actions

export default authSlice.reducer