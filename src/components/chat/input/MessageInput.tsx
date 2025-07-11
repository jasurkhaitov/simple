import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Mic, MicOff } from 'lucide-react'

interface MessageInputProps {
	newMessage: string
	onMessageChange: (message: string) => void
	onSendMessage: () => void
	onStartRecording: () => void
	onStopRecording: () => void
	isRecording: boolean
	isSending: boolean
	hasValidSessionId: boolean
	hasPermission: boolean | null
	audioBlob: Blob | null
}

export const MessageInput = ({
	newMessage,
	onMessageChange,
	onSendMessage,
	onStartRecording,
	onStopRecording,
	isRecording,
	isSending,
	hasValidSessionId,
	hasPermission,
	audioBlob,
}: MessageInputProps) => {
	
	return (
		<div className='flex items-center space-x-2'>
			<div className='flex-1 relative'>
				<Input
					value={newMessage}
					onChange={e => onMessageChange(e.target.value)}
					placeholder={
						audioBlob ? 'Add a text message (optional)' : 'Type a message...'
					}
					onKeyDown={e => {
						if (
							e.key === 'Enter' &&
							!e.shiftKey &&
							!isSending &&
							hasValidSessionId
						) {
							e.preventDefault()
							onSendMessage()
						}
					}}
					className='pr-12'
					disabled={isRecording || isSending || !hasValidSessionId}
				/>
				<Button
					variant='ghost'
					size='icon'
					className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${
						isRecording
							? 'text-red-500'
							: 'text-muted-foreground hover:text-blue-600'
					}`}
					onClick={isRecording ? onStopRecording : onStartRecording}
					disabled={hasPermission === false || isSending || !hasValidSessionId}
				>
					{isRecording ? (
						<MicOff className='h-4 w-4' />
					) : (
						<Mic className='h-4 w-4' />
					)}
				</Button>
			</div>

			<Button
				onClick={onSendMessage}
				className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50'
				disabled={isSending || !hasValidSessionId}
			>
				{isSending ? (
					<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
				) : (
					<Send className='h-4 w-4' />
				)}
			</Button>
		</div>
	)
}
