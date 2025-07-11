import { Button } from '@/components/ui/button'
import { Square } from 'lucide-react'

interface RecordingIndicatorProps {
	recordingTime: number
	onStopRecording: () => void
	formatTime: (seconds: number) => string
	isSending: boolean
}

export const RecordingIndicator = ({
	recordingTime,
	onStopRecording,
	formatTime,
	isSending,
}: RecordingIndicatorProps) => {
	return (
		<div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<div className='w-3 h-3 bg-red-500 rounded-full animate-pulse'></div>
					<span className='text-sm font-medium text-red-700'>
						Recording...
					</span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className='text-sm font-mono text-red-700'>
						{formatTime(recordingTime)}
					</span>
					<Button
						variant='destructive'
						size='sm'
						onClick={onStopRecording}
						className='bg-red-500 hover:bg-red-600'
						disabled={isSending}
					>
						<Square className='h-3 w-3' />
					</Button>
				</div>
			</div>
		</div>
	)
}