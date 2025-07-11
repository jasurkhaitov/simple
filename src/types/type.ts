export interface ErrorResponse {
	status: number
	data: {
		detail: string
	}
}

export interface LoginRequest {
	email: string
	password: string
}

export interface LoginResponse {
	access_token: string
	user: {
		id: string
		email: string
	}
}

export interface RegisterRequest {
	first_name: string
	last_name: string
	email: string
	password: string
	gender: string
}

export interface RegisterResponse {
	access_token: string
}

export interface UserProfileResponse {
	first_name: string
	last_name: string
	email: string
	gender: string
	id: number
}

export interface Session {
	id: number
	chatId: string
	inviteCode: string
	userLanguage: string
	status: string
	lastActivity: string
}

export interface createSession {
	language: string
}

export interface createSessionResponse {
	session_id: number
	user_id: number
	session_start: string
	session_end: null
	invite_code: string
	language: string
}

export interface DashboardCreateSessionProps {
	activeSession: Session | null
	onSessionCreate: (session: Session) => void
}

export interface JoinSessionRequest {
	invite_code: string
	language: string
}

export interface JoinSessionResponse {
	session_id: number
	message: string
}

export interface SendMessageRequest {
  session_id: number;
  text?: string;
  message?: File | null;
}

export interface SendMessageResponse {
    session_id: number,
    sender_id: number,
    content: string,
    original_content: string,
    audio_url: null,
    original_audio_url: null,
    language: string,
    original_language: string,
    message_id: number,
    timestamp: string
}

export interface GetMessagesResponse {
  messages: Array<{
		translated_text: string
		original_text: string
		id: number
    message_id: number;
    session_id: number;
    language: string;
    text: string | null;
    audio_url: string | null;
    timestamp: string;
    sender: string;
  }>;
}