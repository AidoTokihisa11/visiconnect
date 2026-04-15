import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getActiveBreakout = query({
  args: { meetingId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("breakoutRooms")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId).eq("status", "active"))
      .first();
  },
});

export const startBreakout = mutation({
  args: {
    meetingId: v.string(),
    rooms: v.array(v.object({
      id: v.string(),
      name: v.string(),
      participants: v.array(v.string())
    })),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("breakoutRooms")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId).eq("status", "active"))
      .first();
      
    if (existing) {
      await ctx.db.patch(existing._id, { rooms: args.rooms });
    } else {
      await ctx.db.insert("breakoutRooms", {
        meetingId: args.meetingId,
        rooms: args.rooms,
        status: "active"
      });
    }
  },
});

export const closeBreakout = mutation({
  args: { meetingId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("breakoutRooms")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId).eq("status", "active"))
      .first();
      
    if (existing) {
      await ctx.db.patch(existing._id, { status: "closed" });
    }
  },
});
