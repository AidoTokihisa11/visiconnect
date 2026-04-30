import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    subscriptionPlan: v.union(v.literal("free"), v.literal("pro"), v.literal("entreprise")),
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  meetings: defineTable({
    title: v.string(),
    hostId: v.string(),
    livekitRoomName: v.string(),
    status: v.union(v.literal("waiting"), v.literal("active"), v.literal("ended")),
    isProtected: v.boolean(),
    passcode: v.optional(v.string()),
    startedAt: v.optional(v.number()),
    endedAt: v.optional(v.number()),
  })
    .index("by_host", ["hostId"])
    .index("by_status", ["status"]),

  messages: defineTable({
    meetingId: v.string(),
    userId: v.string(),
    senderName: v.string(),
    text: v.string(),
    timestamp: v.number(),
  }).index("by_meeting", ["meetingId"]),

  whiteboards: defineTable({
    meetingId: v.string(),
    elements: v.string(),
    appState: v.string(),
  }).index("by_meeting", ["meetingId"]),

  cursors: defineTable({
    meetingId: v.string(),
    userId: v.string(),
    pointer: v.string(),
    updatedAt: v.number(),
  })
    .index("by_meeting", ["meetingId"])
    .index("by_meeting_and_user", ["meetingId", "userId"]),

  notifications: defineTable({
    targetUserId: v.string(),
    title: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["targetUserId"]),

  cookieConsents: defineTable({
    sessionId: v.string(),
    userId: v.optional(v.string()),
    essential: v.boolean(),
    analytics: v.boolean(),
    marketing: v.boolean(),
    preferences: v.boolean(),
    timestamp: v.number(),
  }).index("by_session", ["sessionId"])
    .index("by_user", ["userId"]),

  polls: defineTable({
    meetingId: v.string(),
    question: v.string(),
    options: v.array(v.object({ id: v.string(), text: v.string(), votes: v.number() })),
    votedUsers: v.array(v.string()),
    isActive: v.boolean(),
    createdBy: v.string(),
    createdAt: v.number(),
    isAnonymous: v.optional(v.boolean()),
    showResults: v.optional(v.boolean()),
  }).index("by_meeting", ["meetingId"]),

  breakoutRooms: defineTable({
    meetingId: v.string(),
    rooms: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        participants: v.array(v.string()),
      })
    ),
    status: v.union(v.literal("active"), v.literal("closed")),
  }).index("by_meeting", ["meetingId", "status"]),
});
