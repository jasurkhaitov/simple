import { Button } from '@/components/ui/button'
import { Play, Pause, Trash2, Send } from 'lucide-react'

interface AudioPreviewProps {
	audioUrl: string | null
	audioRef: React.RefObject<HTMLAudioElement | null>
	isPlaying: boolean
	recordingTime: number
	onPlayAudio: () => void
	onDeleteRecording: () => void
	onSendVoiceMessage: () => void
	formatTime: (seconds: number) => string
	isSending: boolean
	hasValidSessionId: boolean
}

export const AudioPreview = ({
	audioUrl,
	audioRef,
	isPlaying,
	recordingTime,
	onPlayAudio,
	onDeleteRecording,
	onSendVoiceMessage,
	formatTime,
	isSending,
	hasValidSessionId,
}: AudioPreviewProps) => {
	const handleAudioEnded = () => {}

	return (
		<div className='mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={onPlayAudio}
						className='text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300'
						disabled={isSending}
						title={isPlaying ? 'Pause' : 'Play recording'}
					>
						{isPlaying ? (
							<Pause className='h-4 w-4' />
						) : (
							<Play className='h-4 w-4' />
						)}
					</Button>
					<div className='flex items-center space-x-2'>
						<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
						<span className='text-sm text-green-700 dark:text-green-400'>
							Voice message recorded ({formatTime(recordingTime)})
						</span>
					</div>
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={onDeleteRecording}
						className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
						disabled={isSending}
						title='Delete recording'
					>
						<Trash2 className='h-3 w-3' />
					</Button>
					<Button
						size='sm'
						onClick={onSendVoiceMessage}
						className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white disabled:opacity-50'
						disabled={isSending || !hasValidSessionId}
						title={!hasValidSessionId ? 'Invalid session' : 'Send voice message'}
					>
						{isSending ? (
							<div className='animate-spin rounded-full h-3 w-3 border-b-2 border-white'></div>
						) : (
							<Send className='h-3 w-3' />
						)}
					</Button>
				</div>
			</div>

			{audioUrl && (
				<audio
					ref={audioRef}
					src={audioUrl}
					onEnded={handleAudioEnded}
					className='hidden'
					preload='metadata'
				/>
			)}
		</div>
	)
}