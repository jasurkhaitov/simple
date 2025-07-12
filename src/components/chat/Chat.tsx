import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/theme/ModeToggle'
import { ArrowLeft, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { type RootState } from '@/store'
import { authApi } from '@/services/authApi'
import { setActiveSessionId } from '@/helper/authSlice'
import { toast } from 'sonner'

interface Message {
	id: string
	senderId: string
	originalText: string
	translatedText: string
	timestamp: Date
	type: 'text' | 'voice'
	audioUrl?: string
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([])
	const [isTyping] = useState(false)

	const location = useLocation()
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('Location state type:', location.state?.type)
	}, [location.state?.type])

	const { sessionId: urlSessionId } = useParams<{ sessionId: string }>()
	const session_id = useSelector(
		(state: RootState) => state.auth.activeSessionId
	)

	const effectiveSessionId =
		session_id || (urlSessionId ? Number(urlSessionId) : undefined)

	const { data: currentUserData, isLoading: isLoadingUser } =
		authApi.useCheckMeQuery()

	const currentUserFromCheckMe = useMemo(() => {
		return currentUserData
			? {
					id: String(currentUserData.id),
					name: currentUserData.first_name,
					surname: currentUserData.last_name,
			  }
			: null
	}, [currentUserData])

	const chatPartner = useMemo(() => {
		const userType = location.state?.type

		if (userType === 'creator') {
			return {
				id: '2',
				name: '',
				surname: '',
				avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png',
				status: 'online',
			}
		} else if (userType === 'joiner') {
			return {
				id: '2',
				name: '',
				surname: '',
				avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png',
				status: 'online',
			}
		} else {
			return {
				id: '6',
				name: '',
				surname: '',
				avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png',
				status: 'online',
			}
		}
	}, [location.state?.type])

	const [sendMessage] = authApi.useSendMessageMutation()
	const { data, refetch } = authApi.useGetMessagesQuery(effectiveSessionId!, {
		skip: !effectiveSessionId,
		pollingInterval: 2000,
	})

	useEffect(() => {
		if (!session_id && urlSessionId) {
			dispatch(setActiveSessionId(Number(urlSessionId)))
		}
	}, [session_id, urlSessionId, dispatch])

	const transformedMessages = useMemo(() => {
		if (!data || !Array.isArray(data)) return []

		return data.map(
			(msg: {
				message_id: number
				sender_id: number
				content: string
				original_content: string
				timestamp: string
				audio_url?: string | null
				original_audio_url?: string | null
				language: string
				original_language: string
			}) => ({
				id: String(msg.message_id),
				senderId: String(msg.sender_id),
				originalText: msg.original_content,
				translatedText: msg.content,
				timestamp: new Date(msg.timestamp),
				type: msg.audio_url ? ('voice' as const) : ('text' as const),
				audioUrl: msg.audio_url || undefined,
			})
		)
	}, [data])

	useEffect(() => {
		setMessages(transformedMessages)
	}, [transformedMessages])

	const handleSendMessage = useCallback(
		async (messageData: {
			text?: string
			audioFile?: File
			sessionId: number
		}) => {
			if (!effectiveSessionId) {
				console.error('No active session ID')
				toast.error('No active session ID')
				return
			}

			if (!currentUserFromCheckMe) {
				console.error('Current user data not available')
				toast.error('User data not available')
				return
			}

			if (!messageData.text && !messageData.audioFile) {
				console.error('No message content to send')
				toast.error('Please enter a message or record audio')
				return
			}

			try {
				console.log('Sending message with data:', {
					session_id: messageData.sessionId,
					hasText: !!messageData.text,
					hasAudio: !!messageData.audioFile,
					audioFileType: messageData.audioFile?.type,
					audioFileSize: messageData.audioFile?.size,
				})

				const response = await sendMessage({
					session_id: messageData.sessionId,
					text: messageData.text || undefined,
					message: messageData.audioFile || undefined,
				}).unwrap()

				console.log('Message sent successfully:', response)

				await refetch()

				toast.success('Message sent successfully')
			} catch (err) {
				const error = err as {
					data?: { detail?: string; message?: string }
					message?: string
				}

				let errorMessage = 'Failed to send message'

				if (error?.data?.detail) {
					errorMessage = error.data.detail
				} else if (error?.data?.message) {
					errorMessage = error.data.message
				} else if (error?.message) {
					errorMessage = error.message
				}

				toast.error(errorMessage)
			}
		},
		[effectiveSessionId, currentUserFromCheckMe, sendMessage, refetch]
	)

	if (!effectiveSessionId || isLoadingUser || !currentUserFromCheckMe) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center'>
				<div className='text-center'>
					<p className='text-muted-foreground'>
						<Loader className='animate-spin text-blue-600' />
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className='h-screen hide-scrollbar bg-background flex flex-col'>
			<div className='border-b bg-background/80 backdrop-blur-md flex-shrink-0 z-50'>
				<div className='flex items-center justify-between p-3 sm:p-4'>
					<Link to='/dashboard'>
						<Button
							variant='outline'
							size='icon'
							className='h-9 w-9 sm:h-10 sm:w-10'
						>
							<ArrowLeft className='h-4 w-4' />
						</Button>
					</Link>
					<ModeToggle />
				</div>
			</div>

			<div className='flex-1 overflow-hidden'>
				<ChatMessages
					messages={messages}
					currentUser={currentUserFromCheckMe}
					chatPartner={chatPartner}
					isTyping={isTyping}
				/>
			</div>

			<div className='flex-shrink-0 border-t bg-background'>
				<ChatInput
					currentUser={currentUserFromCheckMe}
					chatPartner={chatPartner}
					onSendMessage={handleSendMessage}
				/>
			</div>
		</div>
	)
}
