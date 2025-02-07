import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { finalEvaluationSchema } from "./schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { EvaluationHistoryEntry } from "@/lib/types";
import { hashJti } from "@/lib/utils";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { evals }: { evals: EvaluationHistoryEntry[] } = await req.json();
  const { getUser, getAccessToken } = getKindeServerSession();

  const tokenData = await getAccessToken();

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

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
      },
    },
    temperature: 0,
    schema: finalEvaluationSchema,
    prompt: `Du bist ein Experte im Bewerten von Gymnasiumsantworten.
Deine Aufgabe ist es (gutmütig) zu beurteilen, ob ein Schüler ein eine Klassenstufe verstanden hat.

Regeln zur Auswertung:
- Analysiere die Stärken und SChwächen des Schülers auf Basis des Lerninhalts.
- Bewerte die Tauglichkeit und das Bildungsniveau, ob der Schüler die Klassenstufe verstanden hat.
- Identifiere die Schwächen und gib konstruktives Feedback, mit welchen Themen der Schüler sich tiefer auseinandersetzen sollte (und konkrete Beispiele).
- Identifiziere die Stärken und gib positives Feedback, welche Themen der Schüler gut verstanden hat (und konkrete Beispiele).
- Stärken und Schwächen sind immer bezogen auf den Lerninhalt und die Klassenstufe.
- Rede nie von Punktzahlen, sondern immer von konkreten Lerninhalten.

Beispiel-Stärken:
- Titel: Rhetorisches Mittel
- Beschreibung: {name} hat ein tiefes Verständnis für Metaphern in Aufgabe x und y gezeigt.

Beispiel-Schwächen:
- Titel: Detailtiefe
- Beschreibung: Einige Antworten, insbesondere Definitionen, wurden nachlässig beantwortet und könnten mehr Details enthalten.

---

Du bewertest die Antworten von ${user.given_name}.

Er hat folgende Antworten gegeben und dabei folgendes Feedback erhalten:
${feedbacks}

Gib nun eine Bewertung ab, wie gut ${user.given_name} die Klassenstufe verstanden hat.
Gib ihm Feedback, wie er sich verbessern kann und was er gut gemacht hat.
`,
  });

  return result.toTextStreamResponse();
}
