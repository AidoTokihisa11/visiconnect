import { useEffect, useState, useCallback, useRef } from 'react'
import RealtimeService from '../services/RealtimeService'
import { useAuth } from '../contexts/AuthContext'

/**
 * useRealtime Hook
 * Hook personnalisé pour gérer les connexions Realtime Supabase dans les meetings
 * 
 * @param {string} meetingId - ID du meeting
 * @param {boolean} enabled - Activer/désactiver le realtime (default: true)
 * @returns {Object} État et méthodes pour la communication en temps réel
 */
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

  // Load initial messages
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

  // Subscribe to realtime updates
  useEffect(() => {
    if (!meetingId || !enabled || !authUserId) {
      setIsLoading(false)
      return
    }

    let mounted = true

    const setupRealtime = async () => {
      try {
        // Load initial messages
        await loadMessages()

        // Subscribe to meeting channel
        const channel = RealtimeService.subscribeMeeting(
          meetingId,
          {
            // Meeting updates
            onMeetingUpdate: (payload) => {
              if (!mounted) return
              // Vous pouvez émettre un événement ou callback ici si nécessaire
            },

            // New messages
            onNewMessage: (message) => {
              if (!mounted) return
              setMessages((prev) => {
                // Éviter les doublons
                const exists = prev.some((m) => m.id === message.id)
                if (exists) return prev
                return [...prev, message]
              })
            },

            // Presence sync (participants list)
            onPresenceSync: (state) => {
              if (!mounted) return
              const users = Object.values(state).flat()
              setParticipants(users)
            },

            // User joined
            onUserJoin: ({ newPresences }) => {
              if (!mounted) return
            },

            // User left
            onUserLeave: ({ leftPresences }) => {
              if (!mounted) return
            },

            // Custom broadcasts
            onBroadcast: (payload) => {
              if (!mounted) return
              // Gérer les événements personnalisés ici
            },

            // Connection established
            onSubscribed: () => {
              if (!mounted) return
              setIsConnected(true)
              setIsLoading(false)
            },

            // Connection error
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

    // Cleanup
    return () => {
      mounted = false
      if (meetingId) {
        RealtimeService.unsubscribeMeeting(meetingId)
      }
    }
  }, [meetingId, enabled, authUserId, authUserName, authUserAvatar, loadMessages])

  // Send message
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

  // Broadcast custom event
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

  // Update presence
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

  // Get current participants count
  const participantsCount = participants.length

  // Get current user from participants
  const currentUser = participants.find(
    (p) => p.user_id === userProfile?.id || p.user_id === user?.id
  )

  return {
    // État
    participants,
    participantsCount,
    messages,
    isConnected,
    isLoading,
    error,
    currentUser,

    // Méthodes
    sendMessage,
    broadcast,
    updatePresence,
    loadMessages,

    // Channel ref (pour usage avancé)
    channel: channelRef.current
  }
}

/**
 * usePresence Hook
 * Hook simplifié pour gérer uniquement la présence en ligne
 * 
 * @param {string} meetingId - ID du meeting
 * @returns {Object} État de présence
 */
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

/**
 * useMessages Hook
 * Hook simplifié pour gérer uniquement les messages
 * 
 * @param {string} meetingId - ID du meeting
 * @returns {Object} Messages et méthode d'envoi
 */
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
        // Load initial messages
        const initialMessages = await RealtimeService.getMessages(meetingId)
        if (mounted) {
          setMessages(initialMessages)
          setIsLoading(false)
        }

        // Subscribe to new messages
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
