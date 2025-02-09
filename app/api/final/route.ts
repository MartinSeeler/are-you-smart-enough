import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { finalEvaluationSchema } from "./schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { EvaluationHistoryEntry } from "@/lib/types";
import { hashJti } from "@/lib/utils";
import Langfuse from "langfuse";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    evals,
    grade,
    subject,
  }: { evals: EvaluationHistoryEntry[]; grade: number; subject: string } =
    await req.json();
  const { getUser, getAccessToken } = getKindeServerSession();

  const tokenData = await getAccessToken();

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const langfuse = new Langfuse();
  const fetchedPrompt = await langfuse.getPrompt("eval-user");

  const feedbacks = evals
    .map(
      (ev) => `Frage: ${ev.question}
Antwort: ${ev.answer}
Score: ${ev.score} / 100
Feedback: ${ev.feedback}`
    )
    .join("\n");

  const result = streamObject({
    model: openai("gpt-4o"),
    maxTokens: 2048,
    experimental_telemetry: {
      isEnabled: true,
      functionId: "eval-student",
      metadata: {
        userId: user.id,
        sessionId: hashJti(tokenData?.jti ?? ""),
        langfusePrompt: fetchedPrompt.toJSON(),
        tags: [`${grade}. Klasse`, subject],
      },
    },
    temperature: 0,
    schema: finalEvaluationSchema,
    prompt: fetchedPrompt.compile({
      name: user.given_name ?? "Unbekannter Nutzer",
      feedbacks,
      grade: grade.toString(),
      subject: subject,
    }),
  });

  return result.toTextStreamResponse();
}
