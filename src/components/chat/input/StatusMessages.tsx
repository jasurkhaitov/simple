interface StatusMessagesProps {
	hasPermission: boolean | null
	hasValidSessionId: boolean
	isSending: boolean
}

export const StatusMessages = ({
	hasPermission,
	hasValidSessionId,
	isSending,
}: StatusMessagesProps) => {
	return (
		<>
			{hasPermission === false && (
				<div className='mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700'>
					Microphone access denied. Please enable microphone permissions to use
					voice recording.
				</div>
			)}
			
			{!hasValidSessionId && (
				<div className='mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700'>
					Session ID is required. Please navigate to a valid chat session.
				</div>
			)}
			
			{isSending && (
				<div className='mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700'>
					Sending message...
				</div>
			)}
		</>
	)
}
