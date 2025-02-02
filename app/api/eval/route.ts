import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { evaluationSchema } from "./schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4o"),
    temperature: 0,
    schema: evaluationSchema,
    prompt: `Du bist ein Experte im Bewerten von Gymnasiumsantworten.
Deine Aufgabe ist es (gutmütig) zu beurteilen, ob ein Schüler ein Thema verstanden hat. Dabei gilt:

Kernaussage:
- Prüfe, ob die wesentliche Idee korrekt wiedergegeben wurde – auch wenn Details fehlen.
Punktevergabe:
- 100 Punkte gibt es, wenn alle Details aus der Referenzantwort enthalten sind.
- Unterschiede in der Formulierung sind erlaubt und führen nicht zu Punktabzug und werden nicht im Feedback erwähnt.
- Ziehe Punkte ab, wenn wichtige Details fehlen, und vergib auch krumme Punkte (z.B. 73 oder 47).
- Es gibt keine zusätzlichen Punkte für zusätzliche Informationen.
Beispiele: Erwarte KEIN Beispiel in der Antwort, wenn sie bereits korrekt ist. Alternativ kann ein Beispiel dazu beitragen, die Kernaussage des Schülers zu verstehen, falls keine klare Antwort gegeben wurde.
Feedback:
- Erkläre Fehler und gib Hinweise, was der Schüler noch verbessern kann – ohne die ideale Antwort preiszugeben.
- Gib nur Feedback auf die Referenzantwort. Denke dir keine zusätzlichen Punkte aus, was der Schüler hätte sagen können.
- Feedback ist direkt, der Schüler hat keine zweite Chance, eine Antwort einzugeben. Erkläre ihm also direkt, was er hätte besser machen können, ohne zu sagen, wie er es beim nächsten Mal besser machen kann.
Sprache: Verwende eine einfache, unformelle Sprache.
Wichtig: Gib niemals die Referenzantwort preis. Bewerte die Schülerantwort, als ob du nicht wüsstest, wie die ideale Antwort lautet. Sei wohlwohlend und fair. Erwarte niemals ein Beispiel! Es ist wirklich so einfach. Was sind die KErnpunkte der Referenzantwort? Hat der Schüler alle drin? Ja? Dann 100 Punkte. Hat der Schüler sie anders geschrieben? Ja? Trotzdem 100 Punkte! Fehlend Kernpunkte? Dann paar Punkte abziehen. Denk daran, du gibst gern 100 Punkte. Du ziehst nur Punkte ab, wenn wirklich Details fehlen.
---
Beispiele:
Frage: Erkläre den Begriff "Ironie".
Referenzantwort: Ironie ist eine Form der Rede, bei der das Gegenteil dessen gemeint ist, was gesagt wird.
Antwort: Ironie ist eine Form der Rede
Punkte: 50
Feedback: Korrekt, bei Ironie handelt es sich um eine Form der Rede. Allerdings fehlte mir in deiner Antwort der wichtige Aspekt, dass bei Ironie das Gegenteil von dem gemeint ist, was gesagt wird.

Frage: Erkläre den Begriff "Ironie".
Referenzantwort: Ironie ist eine Form der Rede, bei der das Gegenteil dessen gemeint ist, was gesagt wird.
Antwort: Bspw wenn ich sage "Heute ist aber schönes Wetter", obwohl es regnet.
Punkte: 75
Feedback: Dein Beispiel zeigt gut, was Ironie ist, nämlich wenn das Gegenteil von dem gemeint ist, was gesagt wird. Allerdings fehlt mir, dass es sich bei Ironie um eine Form der Rede handelt.

Frage: Erkläre den Begriff "Ironie".
Referenzantwort: Ironie ist eine Form der Rede, bei der das Gegenteil dessen gemeint ist, was gesagt wird.
Antwort: Keine AHnung
Punkte: 0
Feedback: Schade! Ironie ist eine Form der Rede, bei der das Gegenteil dessen gemeint ist, was gesagt wird.

---
Frage: ${context.question}"
Referenzantwort: ${context.referenceAnswer}
Antwort: ${context.answer}
`,
  });

  return result.toTextStreamResponse();
}
