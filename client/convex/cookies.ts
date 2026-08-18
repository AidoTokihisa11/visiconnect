import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * CNIL / RGPD consent registry.
 *
 * Design choices (justified for the Master's defense):
 *  - Each consent action is stored as an IMMUTABLE new row. Previous rows are
 *    kept as legal proof (art. 7.1 RGPD: the controller must be able to
 *    demonstrate that the data subject has consented).
 *  - Rows are linked via `previousConsentId` to reconstruct the full history.
 *  - `expiresAt` enforces the CNIL recommendation of 6 months (max 13).
 *  - `policyVersion` triggers a re-prompt when cookie policy changes.
 *  - `method` documents HOW the consent was collected (informed vs. bulk).
 */

const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 180; // 180 days ≈ 6 months (CNIL guideline)

export const saveConsent = mutation({
  args: {
    sessionId: v.string(),
    userId: v.optional(v.string()),
    essential: v.boolean(),
    analytics: v.boolean(),
    marketing: v.boolean(),
    preferences: v.boolean(),
    policyVersion: v.string(),
    method: v.union(
      v.literal("accept_all"),
      v.literal("reject_all"),
      v.literal("custom")
    ),
    userAgent: v.optional(v.string()),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const previous = await ctx.db
      .query("cookieConsents")
      .withIndex("by_session_and_time", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .first();

    const newId = await ctx.db.insert("cookieConsents", {
      sessionId: args.sessionId,
      userId: args.userId,
      essential: args.essential,
      analytics: args.analytics,
      marketing: args.marketing,
      preferences: args.preferences,
      timestamp: now,
      expiresAt: now + CONSENT_TTL_MS,
      policyVersion: args.policyVersion,
      method: args.method,
      userAgent: args.userAgent,
      language: args.language,
      previousConsentId: previous?._id,
    });

    return newId;
  },
});

export const revokeConsent = mutation({
  args: {
    sessionId: v.string(),
    userId: v.optional(v.string()),
    policyVersion: v.string(),
    userAgent: v.optional(v.string()),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const previous = await ctx.db
      .query("cookieConsents")
      .withIndex("by_session_and_time", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .first();

    const newId = await ctx.db.insert("cookieConsents", {
      sessionId: args.sessionId,
      userId: args.userId,
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: now,
      expiresAt: now + CONSENT_TTL_MS,
      policyVersion: args.policyVersion,
      method: "revoked",
      userAgent: args.userAgent,
      language: args.language,
      previousConsentId: previous?._id,
      revokedAt: now,
    });

    return newId;
  },
});

export const getLatestConsent = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    return await ctx.db
      .query("cookieConsents")
      .withIndex("by_session_and_time", (q) => q.eq("sessionId", sessionId))
      .order("desc")
      .first();
  },
});
