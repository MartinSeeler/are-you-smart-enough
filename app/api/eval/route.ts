import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { evaluationSchema } from "./schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { hashJti } from "@/lib/utils";
import { Langfuse } from "langfuse";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const context = await req.json();
  const { getUser, getAccessToken } = getKindeServerSession();

  const tokenData = await getAccessToken();

  const user = await getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }
  const langfuse = new Langfuse();
  const fetchedPrompt = await langfuse.getPrompt("eval-question");

  const result = streamObject({
    model: openai("gpt-4o"),
    experimental_telemetry: {
      isEnabled: true,
      functionId: "eval-answer",
      metadata: {
        userId: user.id,
        sessionId: hashJti(tokenData?.jti ?? ""),
        langfusePrompt: fetchedPrompt.toJSON(),
      },
    },
    temperature: 0,
    schema: evaluationSchema,
    prompt: fetchedPrompt.compile({
      name: user.given_name ?? "Unbekannter Nutzer",
      question: context.question,
      answer: context.answer,
      referenceAnswer: context.referenceAnswer,
    }),
  });

  return result.toTextStreamResponse();
}
