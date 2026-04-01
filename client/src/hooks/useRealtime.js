import { useEffect, useState, useCallback, useRef } from 'react'
import RealtimeService from '../services/RealtimeService'
import { useAuth } from '../contexts/AuthContext'

export const useRealtime = (meetingId, enabled = true) => {
  const { user, userProfile } = useAuth()
  const authUserId = userProfile?.id || user?.id
  const authUserName = userProfile?.display_name || user?.email?.split('@')[0] || 'Anonymous'
  const authUserAvatar = userProfile?.avatar_url || null
  const [participants, setParticipants] = useState([])
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const channelRef = useRef(null)

  const loadMessages = useCallback(async () => {
    if (!meetingId) return

    try {
      const initialMessages = await RealtimeService.getMessages(meetingId)
      setMessages(initialMessages)
    } catch (err) {
      console.error('Error loading messages:', err)
      setError(err.message)
    }
  }, [meetingId])

  useEffect(() => {
    if (!meetingId || !enabled || !authUserId) {
      setIsLoading(false)
      return
    }

    let mounted = true

    const setupRealtime = async () => {
      try {
        await loadMessages()

        const channel = RealtimeService.subscribeMeeting(
          meetingId,
          {
            onNewMessage: (message) => {
              if (!mounted) return
              setMessages((prev) => {
                const exists = prev.some((m) => m.id === message.id)
                if (exists) return prev
                return [...prev, message]
              })
            },

            onPresenceSync: (state) => {
              if (!mounted) return
              setParticipants(Object.values(state).flat())
            },

            onSubscribed: () => {
              if (!mounted) return
              setIsConnected(true)
              setIsLoading(false)
            },

            onError: (err) => {
              if (!mounted) return
              setError(err.message)
              setIsLoading(false)
              console.error('❌ Realtime error:', err)
            }
          },
          {
            userId: authUserId,
            userName: authUserName,
            userAvatar: authUserAvatar
          }
        )

        channelRef.current = channel
      } catch (err) {
        if (mounted) {
          setError(err.message)
          setIsLoading(false)
        }
      }
    }

    setupRealtime()

    return () => {
      mounted = false
      RealtimeService.unsubscribeMeeting(meetingId)
    }
  }, [meetingId, enabled, authUserId, authUserName, authUserAvatar, loadMessages])

  const sendMessage = useCallback(
    async (messageText, type = 'text') => {
      if (!authUserId || !meetingId || !messageText.trim()) {
        return null
      }

      try {
        const message = await RealtimeService.sendMessage(
          meetingId,
          authUserId,
          messageText.trim(),
          type
        )
        return message
      } catch (err) {
        console.error('Error sending message:', err)
        setError(err.message)
        throw err
      }
    },
    [meetingId, authUserId]
  )

  const broadcast = useCallback(
    async (event, payload) => {
      if (!meetingId) return

      try {
        await RealtimeService.broadcastEvent(meetingId, event, payload)
      } catch (err) {
        console.error('Error broadcasting:', err)
        setError(err.message)
      }
    },
    [meetingId]
  )

  const updatePresence = useCallback(
    async (status) => {
      if (!meetingId) return

      try {
        await RealtimeService.updatePresence(meetingId, status)
      } catch (err) {
        console.error('Error updating presence:', err)
        setError(err.message)
      }
    },
    [meetingId]
  )

  const participantsCount = participants.length
  const currentUser = participants.find(
    (participant) => participant.user_id === authUserId
  )

  return {
    participants,
    participantsCount,
    messages,
    isConnected,
    isLoading,
    error,
    currentUser,
    sendMessage,
    broadcast,
    updatePresence,
    loadMessages,
    channel: channelRef.current
  }
}

export const usePresence = (meetingId) => {
  const { user, userProfile } = useAuth()
  const authUserId = userProfile?.id || user?.id
  const authUserName = userProfile?.display_name || user?.email?.split('@')[0] || 'Anonymous'
  const authUserAvatar = userProfile?.avatar_url || null
  const [participants, setParticipants] = useState([])
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    if (!meetingId || !authUserId) return

    let mounted = true

    RealtimeService.subscribeMeeting(
      meetingId,
      {
        onPresenceSync: (state) => {
          if (!mounted) return
          const users = Object.values(state).flat()
          setParticipants(users)
        },
        onSubscribed: () => {
          if (!mounted) return
          setIsOnline(true)
        }
      },
      {
        userId: authUserId,
        userName: authUserName,
        userAvatar: authUserAvatar
      }
    )

    return () => {
      mounted = false
      RealtimeService.unsubscribeMeeting(meetingId)
    }
  }, [meetingId, authUserId, authUserName, authUserAvatar])

  return {
    participants,
    participantsCount: participants.length,
    isOnline
  }
}

export const useMessages = (meetingId) => {
  const { userProfile } = useAuth()
  const userProfileId = userProfile?.id
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!meetingId) return

    let mounted = true

    const setupMessages = async () => {
      try {
        const initialMessages = await RealtimeService.getMessages(meetingId)
        if (mounted) {
          setMessages(initialMessages)
          setIsLoading(false)
        }

        RealtimeService.subscribeMeeting(meetingId, {
          onNewMessage: (message) => {
            if (!mounted) return
            setMessages((prev) => {
              const exists = prev.some((m) => m.id === message.id)
              if (exists) return prev
              return [...prev, message]
            })
          }
        })
      } catch (err) {
        console.error('Error setting up messages:', err)
        if (mounted) setIsLoading(false)
      }
    }

    setupMessages()

    return () => {
      mounted = false
      RealtimeService.unsubscribeMeeting(meetingId)
    }
  }, [meetingId])

  const sendMessage = useCallback(
    async (messageText) => {
      if (!userProfileId || !meetingId || !messageText.trim()) {
        return null
      }

      try {
        return await RealtimeService.sendMessage(
          meetingId,
          userProfileId,
          messageText.trim(),
          'text'
        )
      } catch (err) {
        console.error('Error sending message:', err)
        throw err
      }
    },
    [meetingId, userProfileId]
  )

  return {
    messages,
    isLoading,
    sendMessage
  }
}

export default useRealtime
