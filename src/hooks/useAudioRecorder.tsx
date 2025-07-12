/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from 'react'

export const useAudioRecorder = () => {
	const [isRecording, setIsRecording] = useState(false)
	const [recordingTime, setRecordingTime] = useState(0)
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
	const [audioUrl, setAudioUrl] = useState<string | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [hasPermission, setHasPermission] = useState<boolean | null>(null)

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
	const chunksRef = useRef<Blob[]>([])

	const checkPermissionStatus = async () => {
		try {
			if ('permissions' in navigator) {
				const permissionStatus = await navigator.permissions.query({
					name: 'microphone' as PermissionName,
				})

				if (permissionStatus.state === 'granted') {
					setHasPermission(true)
				} else if (permissionStatus.state === 'denied') {
					setHasPermission(false)
				} else {
					setHasPermission(null)
				}

				permissionStatus.addEventListener('change', () => {
					setHasPermission(permissionStatus.state === 'granted')
				})
			} else {
				try {
					const stream = await (
						navigator as Navigator
					).mediaDevices.getUserMedia({ audio: true })

					setHasPermission(true)
					stream
						.getTracks()
						.forEach((track: { stop: () => unknown }) => track.stop())
				} catch (error) {
					setHasPermission(false)
				}
			}
		} catch (error) {
			console.error('Error checking microphone permission:', error)
			setHasPermission(false)
		}
	}

	useEffect(() => {
		checkPermissionStatus()
	}, [])

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

			setHasPermission(true)

			const mediaRecorder = new MediaRecorder(stream)
			mediaRecorderRef.current = mediaRecorder
			chunksRef.current = []

			mediaRecorder.ondataavailable = event => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data)
				}
			}

			mediaRecorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
				setAudioBlob(blob)
				setAudioUrl(URL.createObjectURL(blob))
				stream.getTracks().forEach(track => track.stop())
			}

			mediaRecorder.start()
			setIsRecording(true)
			setRecordingTime(0)

			recordingIntervalRef.current = setInterval(() => {
				setRecordingTime(prev => prev + 1)
			}, 1000)
		} catch (error) {
			console.error('Error starting recording:', error)
			setHasPermission(false)

			if (error instanceof DOMException) {
				if (error.name === 'NotAllowedError') {
					alert(
						'Microphone access was denied. Please allow microphone access in your browser settings and try again.'
					)
				} else if (error.name === 'NotFoundError') {
					alert('No microphone found. Please check your microphone connection.')
				} else if (error.name === 'NotReadableError') {
					alert('Microphone is already in use by another application.')
				} else {
					alert(
						'Failed to start recording. Please check your microphone permissions.'
					)
				}
			} else {
				alert(
					'Failed to start recording. Please check your microphone permissions.'
				)
			}
		}
	}

	const stopRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop()
			setIsRecording(false)

			if (recordingIntervalRef.current) {
				clearInterval(recordingIntervalRef.current)
				recordingIntervalRef.current = null
			}
		}
	}

	const playAudio = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause()
				setIsPlaying(false)
			} else {
				audioRef.current.play()
				setIsPlaying(true)
			}
		}
	}

	const deleteRecording = () => {
		setAudioBlob(null)
		setAudioUrl(null)
		setIsPlaying(false)
		setRecordingTime(0)
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.currentTime = 0
		}
	}

	useEffect(() => {
		const audio = audioRef.current
		if (audio) {
			const handleEnded = () => setIsPlaying(false)
			const handlePause = () => setIsPlaying(false)

			audio.addEventListener('ended', handleEnded)
			audio.addEventListener('pause', handlePause)

			return () => {
				audio.removeEventListener('ended', handleEnded)
				audio.removeEventListener('pause', handlePause)
			}
		}
	}, [audioUrl])

	useEffect(() => {
		return () => {
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl)
			}
		}
	}, [audioUrl])

	return {
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
	}
}
