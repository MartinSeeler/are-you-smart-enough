"use client";

import { experimental_useObject as useObject } from "ai/react";
import { evaluationSchema } from "@/app/api/eval/schema";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import QuestionFooter from "./question-footer";
import ScoreChart from "./score-chart";
import { Separator } from "./ui/separator";
import { TextQuestion } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { completedQuestionsAtom, userEvalsAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";

export type QuestionTextProps = {
  question: TextQuestion;
};

const QuestionText = ({ question }: QuestionTextProps) => {
  const [text, setText] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const setCompleted = useSetAtom(completedQuestionsAtom);
  const setEvals = useSetAtom(userEvalsAtom);
  const { object, submit } = useObject({
    api: "/api/eval",
    schema: evaluationSchema,
    onError: (error) => {
      console.error("Error", error);
      setIsEvaluating(false);
    },
    onFinish: (object) => {
      setEvals((prev) => [
        ...prev,
        {
          question,
          answer: text,
          score: object.object?.score ?? 0,
          feedback: object.object?.feedback ?? "",
        },
      ]);
      setCompleted((prev) => prev + 1);
      setIsEvaluating(false);
    },
  });
  return (
    <>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="answer"
              name="answer"
              rows={4}
              disabled={isSubmitted}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={text}
              placeholder="Deine Antwort..."
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
        </Card>
      </main>
      {isSubmitted && (
        <Card>
          <CardHeader>
            <CardTitle>Auswertung</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
            <ScoreChart score={object?.score ?? 0} />
            <p className="text-sm">{object?.feedback ?? "..."}</p>
          </CardContent>
          <Separator />
        </Card>
      )}
      <QuestionFooter
        isDisabled={isEvaluating || text.trim().length === 0}
        hasAnswered={isSubmitted}
        onSubmit={() => {
          setIsEvaluating(true);
          setIsSubmitted(true);
          submit({
            question: question.question,
            answer: text,
            referenceAnswer: question.referenceAnswer,
          });
        }}
      />
    </>
  );
};

export default QuestionText;
