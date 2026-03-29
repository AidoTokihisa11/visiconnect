import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("targetUserId", args.userId))
      .order("desc")
      .take(50);
  },
});

export const markAsRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, { isRead: true });
  },
});

export const create = mutation({
  args: {
    targetUserId: v.string(),
    title: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("notifications", {
      targetUserId: args.targetUserId,
      title: args.title,
      message: args.message,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});