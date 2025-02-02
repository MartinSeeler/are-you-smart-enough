import { z } from "zod";

// define a schema for the notifications
export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Message. Do not use emojis or links."),
    })
  ),
});

export const evaluationSchema = z.object({
  score: z.number().min(0).max(100).describe("Score between 0 and 100"),
  feedback: z.string().optional().describe("Feedback on the evaluation."),
});
