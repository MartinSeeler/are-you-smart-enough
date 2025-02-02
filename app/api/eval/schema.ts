import { z } from "zod";

export const evaluationSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Score for the answer. Between 0 (completely wrong) and 100 (perfect)."
    ),
  feedback: z.string().describe("Favorable Feedback for the student."),
});

export type Evaluation = z.infer<typeof evaluationSchema>;
