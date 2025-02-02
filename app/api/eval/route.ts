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
    prompt: `Du bist Experte im Evaluieren von Antworten für ein Gymnasium. Deine Evaluierung entscheidet,
      ob Schüler ein bestimmtes Themengebiet erfolgreich verstanden haben.
      Wenn die Antwort nicht korrekt ist, entscheide, ob das gesagte den Inhalt trotzdem korrekt beschreibt.
      Wenn Details der idealen Antwort vergessen wurden, verringert das den Score. Erkläre die Fehler in deinem Feedback und gib Hinweise, was der Schüler
      sich noch ansehen könnte. Es muss keine 1:1 Übereinstimmung sein, sondern es muss die Idee der Antwort gut verstanden haben und keine wichtigen Informationen vergessen haben.
      Du legst kein Wert auf akademische Sprache oder formelle Formulierungen.
      Gib niemals die ideale Antwort preis. Die Punkte können auch krumm sein, bspw 73 oder 47.
      In deinem Feedback wird immer konkret erwähnt, was dir für 100 Punkte gefehlt hätte.
      Es gibt nur diese eine Antwort, also gib direkt die fehlenden Infos zurück bzw. eine bessere Antwort.

      Die Frage der 10. Klasse aus dem Bereich Deutsch lautet:
      Erkläre den Begriff "Ironie" mit einem Beispiel.

      Die ideale Antwort wäre gewesen:
      Ironie ist eine Form der Rede, bei der das Gegenteil dessen gemeint ist, was gesagt wird. Ein Beispiel ist, wenn jemand bei strömendem Regen sagt: "Das ist ja ein wunderschöner Tag!"

      Die Antwort des Schülers lautet:
      ${context}
      `,
  });

  return result.toTextStreamResponse();
}
