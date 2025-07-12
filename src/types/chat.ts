export interface MessageData {
	text?: string
	audioFile?: File
	sessionId: number
}

export interface ChatInputProps {
	currentUser: User
	chatPartner: User
	onSendMessage: (messageData: MessageData) => Promise<void>
}

export interface User {
	id: string
	name: string
	surname: string
}
