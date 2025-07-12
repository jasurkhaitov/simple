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
				className={`group flex items-start space-x-2 sm:space-x-3 mb-4 sm:mb-6 transition-all duration-200 hover:bg-muted/70 -mx-2 px-2 py-2 rounded-lg ${
					isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
				}`}
			>
				<div className='relative hidden xs:block flex-shrink-0'>
					<Avatar className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ring-2 ring-background shadow-lg'>
						<AvatarImage src={avatarUrl} />
						<AvatarFallback
							className={`text-xs sm:text-sm ${
								isCurrentUser
									? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold'
									: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold'
							}`}
						>
							{sender.name?.[0] || 'U'}
							{sender.surname?.[0] || ''}
						</AvatarFallback>
					</Avatar>

					<div className='absolute -bottom-0 -right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-background shadow-sm'></div>
				</div>

				<div
					className={`flex-1 max-w-[calc(100vw-120px)] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg ${
						isCurrentUser ? 'items-end' : 'items-start'
					} flex flex-col space-y-1`}
				>
					<div
						className={`flex items-center space-x-2 flex-wrap ${
							isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
						}`}
					>
						<span className='text-xs sm:text-sm font-semibold text-foreground truncate'>
							{sender.name} {sender.surname}
						</span>
						<Badge variant='outline' className='text-xs flex-shrink-0'>
							{formatDate(message.timestamp)}
						</Badge>
					</div>

					<Card
						className={`px-3 py-2 sm:px-4 sm:py-3 w-[200px] xs:w-xs min-w-0 shadow-md border-0 transition-all duration-200 hover:shadow-lg ${
							isCurrentUser
								? 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white'
								: 'bg-card text-card-foreground border border-border/50'
						}`}
					>
						<div className='min-w-0'>
							<p className='text-sm sm:text-base font-medium leading-relaxed break-words'>
								{message.originalText}
							</p>
						</div>

						<div
							className={`pt-2 mt-2 ${
								isCurrentUser
									? 'border-t border-white/10'
									: 'border-t border-border/30'
							}`}
						>
							<div className='flex items-center space-x-1 mb-1'>
								<Languages className='w-3 h-3 opacity-60 flex-shrink-0' />
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
								className={`text-xs sm:text-sm leading-relaxed break-words ${
									isCurrentUser ? 'text-blue-100/90' : 'text-muted-foreground'
								}`}
							>
								{message.translatedText}
							</p>
						</div>

						{message.audioUrl && (
							<div
								className={`pt-2 mt-2 sm:pt-3 sm:mt-3 ${
									isCurrentUser
										? 'border-t border-white/20'
										: 'border-t border-border/50'
								}`}
							>
								<div className='flex items-center space-x-2 mb-2'>
									<Volume2 className='w-3 h-3 opacity-70 flex-shrink-0' />
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
									className={`w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-8 rounded-lg ${
										isCurrentUser ? 'filter brightness-90' : ''
									}`}
								>
									<source
										src={`https://simpleai-ntj5.onrender.com${message.audioUrl}`}
										type='audio/mpeg'
									/>
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
						<Clock className='w-3 h-3 text-muted-foreground flex-shrink-0' />
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
				weekday: 'short',
				month: 'short',
				day: 'numeric',
			})
		}
	}

	return (
		<div className='h-full overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-background to-muted/20'>
			{messages.length === 0 ? (
				<div className='flex items-center justify-center h-full px-4'>
					<div className='text-center space-y-3 sm:space-y-4 max-w-md'>
						<div className='relative'>
							<div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<MessageCircle className='w-8 h-8 sm:w-10 sm:h-10 text-white' />
							</div>
							<div className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full animate-pulse'></div>
						</div>
						<p className='text-base sm:text-lg font-semibold text-foreground'>
							Start the conversation!
						</p>
						<p className='text-sm text-muted-foreground'>
							Send your first message to begin chatting with translation support
						</p>
					</div>
				</div>
			) : (
				Object.entries(groupedMessages).map(([dateString, dayMessages]) => (
					<div key={dateString} className='space-y-3 sm:space-y-4'>
						<div className='flex items-center justify-center my-4 sm:my-6'>
							<div className='bg-muted/80 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full'>
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
				<div className='flex items-start space-x-2 sm:space-x-3 mb-4 sm:mb-6 animate-fade-in'>
					<div className='relative'>
						<Avatar className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ring-2 ring-background shadow-lg'>
							<AvatarImage src={typingAvatarUrl} />
							<AvatarFallback className='bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold text-xs sm:text-sm'>
								{chatPartner.name?.[0] || 'U'}
								{chatPartner.surname?.[0] || ''}
							</AvatarFallback>
						</Avatar>
						<div className='absolute -bottom-0 -right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-background shadow-sm animate-pulse'></div>
					</div>

					<Card className='bg-card border border-border/50 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-md'>
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
