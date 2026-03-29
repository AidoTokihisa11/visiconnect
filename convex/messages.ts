import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByMeetingId = query({
  args: { meetingId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId))
      .collect();
  },
});

export const send = mutation({
  args: {
    meetingId: v.string(),
    userId: v.string(),
    senderName: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      meetingId: args.meetingId,
      userId: args.userId,
      senderName: args.senderName,
      text: args.text,
      timestamp: Date.now(),
    });
  },
});