import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getWhiteboard = query({
  args: { meetingId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("whiteboards")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId))
      .first();
  },
});

export const updateWhiteboard = mutation({
  args: {
    meetingId: v.string(),
    elements: v.string(),
    appState: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("whiteboards")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        elements: args.elements,
        appState: args.appState,
      });
    } else {
      await ctx.db.insert("whiteboards", {
        meetingId: args.meetingId,
        elements: args.elements,
        appState: args.appState,
      });
    }
  },
});

export const getCursors = query({
  args: { meetingId: v.string() },
  handler: async (ctx, args) => {
    const tenSecondsAgo = Date.now() - 10000;
    return await ctx.db
      .query("cursors")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId))
      .filter((q) => q.gte(q.field("updatedAt"), tenSecondsAgo))
      .collect();
  },
});

export const updateCursor = mutation({
  args: {
    meetingId: v.string(),
    userId: v.string(),
    pointer: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cursors")
      .withIndex("by_meeting_and_user", (q) =>
        q.eq("meetingId", args.meetingId).eq("userId", args.userId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        pointer: args.pointer,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("cursors", {
        meetingId: args.meetingId,
        userId: args.userId,
        pointer: args.pointer,
        updatedAt: Date.now(),
      });
    }
  },
});