import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Copy, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { useCreateSessionMutation } from '@/services/authApi'
import type { createSessionResponse } from '@/types/type'
import { useDispatch } from 'react-redux'
import { setActiveSessionId } from '@/helper/authSlice'

const languages = ['Uzbek', 'English', 'Russian']

const CreateSessionCard = () => {
	const [createSessionLanguage, setCreateSessionLanguage] = useState('')
	const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
	const [activeSession, setActiveSession] =
		useState<createSessionResponse | null>(null)
	const [createSession, { isLoading: isCreatingSession }] =
		useCreateSessionMutation()
	const dispatch = useDispatch()

	const handleCreateSession = async () => {
		let toastId: string | number | undefined

		try {
			toastId = toast.loading('Creating session...')

			const result = await createSession({
				language: createSessionLanguage,
			}).unwrap()

			setActiveSession(result)

			toast.success('Session created successfully!', {
				id: toastId,
				description: `Session ID: ${result.session_id} | Invite Code: ${result.invite_code}`,
			})

			dispatch(setActiveSessionId(result.session_id))
		} catch (error) {
			if (typeof error === 'object' && error !== null && 'data' in error) {
				const errData = error as { data: { detail: string } }
				toast.error(errData.data.detail)
			} else {
				toast.error('An unknown error occurred.')
			}
		}
	}

	const copyInviteCode = (code: string) => {
		navigator.clipboard.writeText(code)
		setCopiedStates(prev => ({ ...prev, [code]: true }))

		toast.success('Invite code copied!', {
			description: 'Share this code with someone to start chatting.',
		})

		setTimeout(() => {
			setCopiedStates(prev => ({ ...prev, [code]: false }))
		}, 2000)
	}

	return (
		<Card className='border'>
			<CardHeader>
				<CardTitle className='flex items-center space-x-2'>
					<span>Create Session</span>
				</CardTitle>
				<CardDescription>
					Start a new chat session and invite someone to join
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='space-x-2 flex items-center justify-between'>
					<Label htmlFor='createLanguage'>Your Language</Label>
					<Select
						value={createSessionLanguage}
						onValueChange={setCreateSessionLanguage}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select your language' />
						</SelectTrigger>
						<SelectContent>
							{languages.map(language => (
								<SelectItem key={language} value={language}>
									{language}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='space-y-3 p-4 bg-muted/50 rounded-lg border'>
					<h4 className='font-medium text-foreground'>Active Session</h4>
					{activeSession ? (
						<>
							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-muted-foreground'>
										Chat ID:
									</span>
									<Badge variant='outline' className='font-mono'>
										{activeSession.session_id}
									</Badge>
								</div>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-muted-foreground'>
										Invite Code:
									</span>
									<div className='flex items-center space-x-2'>
										<Badge variant='outline' className='font-mono'>
											{activeSession.invite_code}
										</Badge>
										<Button
											variant='ghost'
											size='icon'
											className={`h-6 w-6 transition-all duration-200 ${
												copiedStates[activeSession.invite_code]
													? 'bg-green-100 dark:bg-green-900 scale-110'
													: 'hover:bg-gray-100 dark:hover:bg-gray-800'
											}`}
											onClick={() => copyInviteCode(activeSession.invite_code)}
										>
											<Copy
												className={`h-3 w-3 transition-all duration-200 ${
													copiedStates[activeSession.invite_code]
														? 'text-green-600 dark:text-green-400'
														: 'text-gray-600 dark:text-gray-400'
												}`}
											/>
										</Button>
									</div>
								</div>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-muted-foreground'>
										Your Language:
									</span>
									<Badge className='bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
										{activeSession.language}
									</Badge>
								</div>
							</div>
							<div className='flex space-x-2'>
								<Link
									to={`/chat/${activeSession.session_id}`}
									state={{
										type: 'creator',
									}}
									className='w-full'
								>
									<Button
										size='sm'
										className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
									>
										<MessageCircle className='mr-2 h-3 w-3' />
										Chat
									</Button>
								</Link>
							</div>
						</>
					) : (
						<div className='text-center py-16'>
							<p className='text-sm text-muted-foreground'>
								No active session. Create one to get started.
							</p>
						</div>
					)}
				</div>

				<Button
					onClick={handleCreateSession}
					disabled={isCreatingSession || !createSessionLanguage}
					className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
				>
					{isCreatingSession ? 'Creating...' : 'Create Session'}
				</Button>
			</CardContent>
		</Card>
	)
}

export default CreateSessionCard
