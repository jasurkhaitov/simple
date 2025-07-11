import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Users } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '@/store'
import {
	setActiveSessionId,
	setJoinInviteCode,
	setJoinSessionLanguage,
} from '@/helper/authSlice'
import { useJoinSessionMutation } from '@/services/authApi'

const languages = ['Uzbek', 'English', 'Russian']

const DashboardJoinSession = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { joinInviteCode, joinSessionLanguage } = useSelector(
		(state: RootState) => state.auth
	)

	const [joinSession, { isLoading: isJoiningSession }] =
		useJoinSessionMutation()

	const handleJoinSession = async () => {
		if (!joinInviteCode.trim()) {
			toast.error('Please enter an invite code', {
				description:
					'You need to provide a valid invite code to join a session.',
			})
			return
		}

		if (!joinSessionLanguage) {
			toast.error('Please select a language', {
				description:
					'You need to choose your preferred language for the session.',
			})
			return
		}

		try {
			const result = await joinSession({
				invite_code: joinInviteCode.trim(),
				language: joinSessionLanguage,
			}).unwrap()

			console.log(result)

			toast.success('Successfully joined session!', {
				description: `Connected with language: ${joinSessionLanguage}`,
			})

			navigate(`/chat/${result.session_id}`, {
				state: {
					type: 'joiner',
				},
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

	return (
		<Card className='border'>
			<CardHeader>
				<CardTitle className='flex items-center space-x-2'>
					<Users className='h-5 w-5' />
					<span>Join Session</span>
				</CardTitle>
				<CardDescription>
					Enter an invite code to join an existing chat session
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='space-y-2'>
					<Label htmlFor='inviteCode'>Invite Code</Label>
					<Input
						id='inviteCode'
						placeholder='Enter invite code'
						value={joinInviteCode}
						onChange={e => dispatch(setJoinInviteCode(e.target.value))}
						className='font-mono'
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='joinLanguage'>Your Language</Label>
					<Select
						value={joinSessionLanguage}
						onValueChange={value => dispatch(setJoinSessionLanguage(value))}
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

				<Button
					onClick={handleJoinSession}
					disabled={
						isJoiningSession || !joinInviteCode.trim() || !joinSessionLanguage
					}
					className='w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
				>
					{isJoiningSession ? 'Joining...' : 'Join Session'}
				</Button>
			</CardContent>
		</Card>
	)
}

export default DashboardJoinSession
