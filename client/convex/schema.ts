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
    hostId: v.id("users"),
    livekitRoomName: v.string(),
    status: v.union(v.literal("waiting"), v.literal("active"), v.literal("ended")),
    isProtected: v.boolean(),
    passcode: v.optional(v.string()),
    startedAt: v.optional(v.number()),
    endedAt: v.optional(v.number()),
  }).index("by_host", ["hostId"])
    .index("by_status", ["status"]),

  messages: defineTable({
    meetingId: v.id("meetings"),
    userId: v.id("users"),
    text: v.string(),
    timestamp: v.number(),
  }).index("by_meeting", ["meetingId"]),

  whiteboard_elements: defineTable({
    meetingId: v.id("meetings"),
    type: v.union(v.literal("path"), v.literal("text"), v.literal("shape")),
    data: v.string(),
    createdBy: v.id("users"),
  }).index("by_meeting", ["meetingId"]),

  notifications: defineTable({
    targetUserId: v.id("users"),
    title: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["targetUserId"]),
});