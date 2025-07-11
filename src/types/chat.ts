// First, create the MessageData interface
export interface MessageData {
	text?: string;
	audioFile?: File;
	sessionId: number;
}

// Then update your ChatInputProps interface to use the new type
export interface ChatInputProps {
	currentUser: User
	chatPartner: User
	onSendMessage: (messageData: MessageData) => Promise<void>
}

// Make sure your existing types remain intact
export interface User {
	id: string
	name: string
	surname: string
}