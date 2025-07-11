import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '@/store'
import {
	type LoginRequest,
	type LoginResponse,
	type RegisterRequest,
	type RegisterResponse,
	type UserProfileResponse,
	type createSession,
	type createSessionResponse,
	type JoinSessionRequest,
	type JoinSessionResponse,
	type SendMessageResponse,
	type SendMessageRequest,
	type GetMessagesResponse,
} from '@/types/type'

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState
			const token =
				state.auth.accessToken || localStorage.getItem('accessToken')

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: credentials => ({
				url: '/token',
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					username: credentials.email,
					password: credentials.password,
				}).toString(),
			}),
		}),
		register: builder.mutation<RegisterResponse, RegisterRequest>({
			query: userData => ({
				url: '/signup',
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			}),
		}),
		checkMe: builder.query<UserProfileResponse, void>({
			query: () => ({
				url: '/users/me',
				method: 'GET',
				credentials: 'include',
			}),
		}),
		createSession: builder.mutation<createSessionResponse, createSession>({
			query: sessionData => ({
				url: '/sessions',
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sessionData),
			}),
		}),
		joinSession: builder.mutation<JoinSessionResponse, JoinSessionRequest>({
			query: ({ invite_code, language }) => ({
				url: `/sessions/join/${invite_code}`,
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ language }),
			}),
		}),
		sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: ({ session_id, text, message }) => {
        const formData = new FormData();
        formData.append('session_id', String(session_id));
        if (text) formData.append('text', text);
        if (message) formData.append('message', message);

        return {
          url: '/messages',
          method: 'POST',
          credentials: 'include',
          body: formData,
        };
      },
    }),

    getMessages: builder.query<GetMessagesResponse, number>({
      query: (session_id) => ({
        url: `/messages/${session_id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
	}),
})

export const {
	useLoginMutation,
	useRegisterMutation,
	useCheckMeQuery,
	useLazyCheckMeQuery,
	useCreateSessionMutation,
	useJoinSessionMutation,
	useSendMessageMutation,
	useGetMessagesQuery,
} = authApi