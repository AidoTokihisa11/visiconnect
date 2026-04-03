import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveConsent = mutation({
  args: {
    sessionId: v.string(),
    userId: v.optional(v.string()),
    essential: v.boolean(),
    analytics: v.boolean(),
    marketing: v.boolean(),
    preferences: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if consent already exists for this session
    const existing = await ctx.db
      .query("cookieConsents")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    const timestamp = Date.now();

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        userId: args.userId ?? existing.userId,
        essential: args.essential,
        analytics: args.analytics,
        marketing: args.marketing,
        preferences: args.preferences,
        timestamp,
      });
      return existing._id;
    } else {
      // Create new
      const newId = await ctx.db.insert("cookieConsents", {
        sessionId: args.sessionId,
        userId: args.userId,
        essential: args.essential,
        analytics: args.analytics,
        marketing: args.marketing,
        preferences: args.preferences,
        timestamp,
      });
      return newId;
    }
  },
});
