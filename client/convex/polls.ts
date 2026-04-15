import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPolls = query({
  args: { meetingId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("polls")
      .withIndex("by_meeting", (q) => q.eq("meetingId", args.meetingId))
      .collect();
  },
});

export const createPoll = mutation({
  args: {
    meetingId: v.string(),
    question: v.string(),
    options: v.array(v.string()),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const optionsWithVotes = args.options.map(text => ({
      id: crypto.randomUUID(),
      text,
      votes: 0
    }));

    await ctx.db.insert("polls", {
      meetingId: args.meetingId,
      question: args.question,
      options: optionsWithVotes,
      votedUsers: [],
      isActive: true,
      createdBy: args.createdBy,
      createdAt: Date.now(),
    });
  },
});

export const votePoll = mutation({
  args: {
    pollId: v.id("polls"),
    optionId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const poll = await ctx.db.get(args.pollId);
    if (!poll || !poll.isActive) throw new Error("Sondage inactif ou introuvable");
    
    if (poll.votedUsers.includes(args.userId)) {
      throw new Error("Vous avez déjà voté");
    }

    const updatedOptions = poll.options.map(opt => 
      opt.id === args.optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );

    await ctx.db.patch(args.pollId, {
      options: updatedOptions,
      votedUsers: [...poll.votedUsers, args.userId],
    });
  },
});

export const endPoll = mutation({
  args: { pollId: v.id("polls") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.pollId, { isActive: false });
  },
});
