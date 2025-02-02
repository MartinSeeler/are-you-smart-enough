"use client";

import { experimental_useObject as useObject } from "ai/react";
import { Evaluation, evaluationSchema } from "@/app/api/eval/schema";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import QuestionFooter from "./question-footer";

export type QuestionTextProps = {
  question: string;
  referenceAnswer: string;
  onEvaluateComplete: (
    ev: Evaluation,
    question: string,
    answer: string
  ) => void;
  onNextQuestion: () => void;
  onShowResults: () => void;
  hasNextQuestion: boolean;
};

const QuestionText = ({
  question,
  referenceAnswer,
  onEvaluateComplete,
  onNextQuestion,
  onShowResults,
  hasNextQuestion,
}: QuestionTextProps) => {
  const [text, setText] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { object, submit } = useObject({
    api: "/api/eval",
    schema: evaluationSchema,
    onError: (error) => {
      console.error("Error", error);
      setIsEvaluating(false);
    },
    onFinish: (object) => {
      onEvaluateComplete(object.object as Evaluation, question, text);
      setIsEvaluating(false);
    },
  });
  return (
    <>
      <main>
        <Textarea
          id="comment"
          name="comment"
          rows={4}
          disabled={isSubmitted}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </main>
      <QuestionFooter
        isDisabled={isEvaluating}
        hasAnswered={isSubmitted}
        hasNextQuestion={hasNextQuestion}
        onNextQuestion={onNextQuestion}
        onShowResults={onShowResults}
        onSubmit={() => {
          setIsEvaluating(true);
          setIsSubmitted(true);
          submit({
            question,
            answer: text,
            referenceAnswer,
          });
        }}
      />
      <div>
        <p>{object?.score?.toFixed(2)}</p>
        <p>{object?.feedback}</p>
      </div>
    </>
  );
};

export default QuestionText;
