import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { RecordingIndicator } from './input/RecordingIndicator'
import { AudioPreview } from './input/AudioPreview'
import { MessageInput } from './input/MessageInput'
import type { ChatInputProps } from '@/types/chat'

export default function ChatInput({ onSendMessage }: ChatInputProps) {
	const { sessionId } = useParams<{ sessionId: string }>()
	const [newMessage, setNewMessage] = useState('')
	const [isSending, setIsSending] = useState(false)

	const {
		isRecording,
		recordingTime,
		audioBlob,
		audioUrl,
		isPlaying,
		hasPermission,
		audioRef,
		formatTime,
		startRecording,
		stopRecording,
		playAudio,
		deleteRecording,
	} = useAudioRecorder()

	const sendMessage = async () => {
		if (isSending || (!newMessage.trim() && !audioBlob)) return
		if (!sessionId) {
			console.error('Session ID is required to send messages.')
			return
		}

		setIsSending(true)

		try {
			let audioFile: File | undefined
			if (audioBlob) {
				const mimeType = audioBlob.type || 'audio/webm'
				const extension = mimeType.includes('wav') ? 'wav' : 'webm'
				
				audioFile = new File([audioBlob], `voice_message_${Date.now()}.${extension}`, {
					type: mimeType,
				})
				
				console.log('Created audio file:', {
					name: audioFile.name,
					size: audioFile.size,
					type: audioFile.type,
					blobSize: audioBlob.size,
					blobType: audioBlob.type
				})
			}

			await onSendMessage({
				text: newMessage.trim() || undefined,
				audioFile,
				sessionId: Number(sessionId)
			})

			setNewMessage('')
			deleteRecording()
		} catch (error) {
			console.error('Failed to send message:', error)
		} finally {
			setIsSending(false)
		}
	}

	const sendVoiceMessage = async () => {
		if (isSending || !audioBlob) return
		if (!sessionId) {
			console.error('Session ID is required to send messages.')
			return
		}

		setIsSending(true)

		try {
			const mimeType = audioBlob.type || 'audio/webm'
			const extension = mimeType.includes('wav') ? 'wav' : 'webm'
			
			const audioFile = new File([audioBlob], `voice_message_${Date.now()}.${extension}`, {
				type: mimeType,
			})

			console.log('Sending voice message:', {
				fileName: audioFile.name,
				fileSize: audioFile.size,
				fileType: audioFile.type,
				sessionId: Number(sessionId)
			})

			await onSendMessage({
				audioFile,
				sessionId: Number(sessionId)
			})

			deleteRecording()
		} catch (error) {
			console.error('Failed to send voice message:', error)
		} finally {
			setIsSending(false)
		}
	}

	const hasValidSessionId = !!sessionId

	return (
		<div className='border-t bg-background p-4'>
			{isRecording && (
				<RecordingIndicator
					recordingTime={recordingTime}
					onStopRecording={stopRecording}
					formatTime={formatTime}
					isSending={isSending}
				/>
			)}

			{audioBlob && !isRecording && (
				<AudioPreview
					audioUrl={audioUrl}
					audioRef={audioRef}
					isPlaying={isPlaying}
					recordingTime={recordingTime}
					onPlayAudio={playAudio}
					onDeleteRecording={deleteRecording}
					onSendVoiceMessage={sendVoiceMessage}
					formatTime={formatTime}
					isSending={isSending}
					hasValidSessionId={hasValidSessionId}
				/>
			)}

			<MessageInput
				newMessage={newMessage}
				onMessageChange={setNewMessage}
				onSendMessage={sendMessage}
				onStartRecording={startRecording}
				onStopRecording={stopRecording}
				isRecording={isRecording}
				isSending={isSending}
				hasValidSessionId={hasValidSessionId}
				hasPermission={hasPermission}
				audioBlob={audioBlob}
			/>
		</div>
	)
}