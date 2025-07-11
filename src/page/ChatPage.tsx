import Chat from '@/components/chat/Chat'
import { Navigate, useLocation } from 'react-router-dom'

export default function ChatPage() {
	const location = useLocation()

	const type = location.state?.type

	if (type !== 'creator' && type !== 'joiner') {
		return <Navigate to='/' replace />
	}

	console.log('Chat type:', type)

	return (
		<div className='w-full'>
			<div className='max-w-2xl m-auto border-x'>
				<Chat />
			</div>
		</div>
	)
}
