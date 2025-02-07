import { z } from "zod";

export const finalEvaluationSchema = z.object({
  summary: z
    .string()
    .describe(
      "Final evaluation result and very detailed summary about the knowledge gaps of the student, his strengths and weaknesses."
    ),
  strengths: z
    .array(
      z.object({
        text: z.string().describe("The main 3 strengths of the student."),
        description: z
          .string()
          .optional()
          .describe("Description of the strength."),
      })
    )
    .describe("Strengths and topics where the student excels."),
  weaknesses: z
    .array(
      z.object({
        text: z.string().describe("The main 3 weaknesses of the student."),
        description: z
          .string()
          .optional()
          .describe("Description of the weakness."),
      })
    )
    .describe("Weaknesses and topics where the student needs to improve."),
});

export type FinalEvaluation = z.infer<typeof finalEvaluationSchema>;
