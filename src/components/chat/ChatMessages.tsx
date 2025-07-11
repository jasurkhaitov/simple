import { useRef, useEffect, memo, useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Volume2, Clock, MessageCircle, Languages } from 'lucide-react'

interface Message {
	id: string
	senderId: string
	originalText: string
	translatedText: string
	timestamp: Date
	type: 'text' | 'voice'
	audioUrl?: string
}

interface User {
	id: string
	name: string
	surname: string
	avatar?: string
}

interface ChatMessagesProps {
	messages: Message[]
	currentUser: User
	chatPartner: User
	isTyping: boolean
}

const MessageBubble = memo(
	({
		message,
		currentUser,
		chatPartner,
	}: {
		message: Message
		currentUser: User
		chatPartner: User
	}) => {
		const isCurrentUser = String(message.senderId) === String(currentUser.id)
		const sender = isCurrentUser ? currentUser : chatPartner

		const avatarUrl = useMemo(() => {
			if (isCurrentUser) {
				return (
					currentUser.avatar ||
					'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_8.png'
				)
			} else {
				return chatPartner.avatar
			}
		}, [isCurrentUser, currentUser.avatar, chatPartner.avatar])

		const formatTime = (date: Date) => {
			return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		}

		const formatDate = (date: Date) => {
			const now = new Date()
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			const messageDate = new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate()
			)

			if (messageDate.getTime() === today.getTime()) {
				return 'Today'
			} else if (messageDate.getTime() === today.getTime() - 86400000) {
				return 'Yesterday'
			} else {
				return date.toLocaleDateString()
			}
		}

		return (
			<div
				className={`group flex items-start space-x-3 mb-6 transition-all duration-200 hover:bg-muted/30 -mx-2 px-2 py-2 rounded-lg ${
					isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
				}`}
			>
				<div className='relative'>
					<Avatar className='h-12 w-12 flex-shrink-0 ring-2 ring-background shadow-lg'>
						<AvatarImage src={avatarUrl} />
						<AvatarFallback
							className={
								isCurrentUser
									? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold'
									: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold'
							}
						>
							{sender.name?.[0] || 'U'}
							{sender.surname?.[0] || ''}
						</AvatarFallback>
					</Avatar>

					<div className='absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm'></div>
				</div>

				<div
					className={`max-w-xs lg:max-w-md xl:max-w-lg ${
						isCurrentUser ? 'items-end' : 'items-start'
					} flex flex-col space-y-1`}
				>
					<div
						className={`flex items-center space-x-2 ${
							isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
						}`}
					>
						<span className='text-sm font-semibold text-foreground'>
							{sender.name} {sender.surname}
						</span>
						<Badge variant='outline' className='text-xs'>
							{formatDate(message.timestamp)}
						</Badge>
					</div>

					<Card
						className={`px-4 py-3 min-w-sm shadow-md border-0 transition-all duration-200 hover:shadow-lg ${
							isCurrentUser
								? 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white'
								: 'bg-card text-card-foreground border border-border/50'
						}`}
					>
						<div>
							<p className='text-sm font-medium leading-relaxed'>
								{message.originalText}
							</p>
						</div>

						<div
							className={`pt-2 ${
								isCurrentUser
									? 'border-t border-white/10'
									: 'border-t border-border/30'
							}`}
						>
							<div className='flex items-center space-x-1 mb-1'>
								<Languages className='w-3 h-3 opacity-60' />
								<span
									className={`text-xs ${
										isCurrentUser
											? 'text-blue-100/70'
											: 'text-muted-foreground/70'
									}`}
								>
									Translation
								</span>
							</div>
							<p
								className={`text-xs leading-relaxed ${
									isCurrentUser ? 'text-blue-100/90' : 'text-muted-foreground'
								}`}
							>
								{message.translatedText}
							</p>
						</div>

						{message.audioUrl && (
							<div
								className={`pt-3 mt-3 ${
									isCurrentUser
										? 'border-t border-white/20'
										: 'border-t border-border/50'
								}`}
							>
								<div className='flex items-center space-x-2 mb-2'>
									<Volume2 className='w-3 h-3 opacity-70' />
									<p
										className={`text-xs font-medium ${
											isCurrentUser ? 'text-blue-100' : 'text-muted-foreground'
										}`}
									>
										Audio Message
									</p>
								</div>
								<audio
									controls
									className={`w-full max-w-64 h-8 rounded-lg ${
										isCurrentUser ? 'filter brightness-90' : ''
									}`}
								>
									<source src={message.audioUrl} type='audio/mpeg' />
									Your browser does not support the audio element.
								</audio>
							</div>
						)}
					</Card>

					<div
						className={`flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
							isCurrentUser ? 'justify-end' : 'justify-start'
						}`}
					>
						<Clock className='w-3 h-3 text-muted-foreground' />
						<span className='text-xs text-muted-foreground'>
							{formatTime(message.timestamp)} • {message.type}
						</span>
					</div>
				</div>
			</div>
		)
	}
)

MessageBubble.displayName = 'MessageBubble'

export default function ChatMessages({
	messages,
	currentUser,
	chatPartner,
	isTyping,
}: ChatMessagesProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const typingAvatarUrl = useMemo(() => {
		return chatPartner.avatar
	}, [chatPartner.avatar])
	const groupedMessages = useMemo(() => {
		const groups: { [key: string]: Message[] } = {}

		messages.forEach(message => {
			const date = new Date(message.timestamp)
			const dateKey = date.toDateString()

			if (!groups[dateKey]) {
				groups[dateKey] = []
			}
			groups[dateKey].push(message)
		})

		return groups
	}, [messages])

	const formatDateHeader = (dateString: string) => {
		const date = new Date(dateString)
		const now = new Date()
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		const messageDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		)

		if (messageDate.getTime() === today.getTime()) {
			return 'Today'
		} else if (messageDate.getTime() === today.getTime() - 86400000) {
			return 'Yesterday'
		} else {
			return date.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		}
	}

	return (
		<div className='h-full overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20'>
			{messages.length === 0 ? (
				<div className='flex items-center justify-center h-full'>
					<div className='text-center space-y-4'>
						<div className='relative'>
							<div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<MessageCircle className='w-10 h-10 text-white' />
							</div>
							<div className='absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-pulse'></div>
						</div>
						<p className='text-lg font-semibold text-foreground'>
							Start the conversation!
						</p>
						<p className='text-sm text-muted-foreground max-w-md'>
							Send your first message to begin chatting with translation support
						</p>
					</div>
				</div>
			) : (
				Object.entries(groupedMessages).map(([dateString, dayMessages]) => (
					<div key={dateString} className='space-y-4'>
						<div className='flex items-center justify-center my-6'>
							<div className='bg-muted/80 backdrop-blur-sm px-4 py-2 rounded-full'>
								<span className='text-xs font-medium text-muted-foreground'>
									{formatDateHeader(dateString)}
								</span>
							</div>
						</div>

						{dayMessages.map(message => (
							<MessageBubble
								key={message.id}
								message={message}
								currentUser={currentUser}
								chatPartner={chatPartner}
							/>
						))}
					</div>
				))
			)}

			{isTyping && (
				<div className='flex items-start space-x-3 mb-6 animate-fade-in'>
					<div className='relative'>
						<Avatar className='h-12 w-12 ring-2 ring-background shadow-lg'>
							<AvatarImage src={typingAvatarUrl} />
							<AvatarFallback className='bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold'>
								{chatPartner.name?.[0] || 'U'}
								{chatPartner.surname?.[0] || ''}
							</AvatarFallback>
						</Avatar>
						<div className='absolute -bottom-0 -right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-sm animate-pulse'></div>
					</div>

					<Card className='bg-card border border-border/50 rounded-2xl px-4 py-3 shadow-md'>
						<div className='flex space-x-1'>
							<div className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce'></div>
							<div
								className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce'
								style={{ animationDelay: '0.1s' }}
							></div>
							<div
								className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce'
								style={{ animationDelay: '0.2s' }}
							></div>
						</div>
						<span className='text-xs text-muted-foreground mt-1 block'>
							{chatPartner.name} is typing...
						</span>
					</Card>
				</div>
			)}

			<div ref={messagesEndRef} />
		</div>
	)
}