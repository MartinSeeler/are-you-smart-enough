"use client";

import { experimental_useObject as useObject } from "ai/react";
import { evaluationSchema } from "@/app/api/eval/schema";
import React, { useState } from "react";
import QuestionFooter from "./question-footer";
import ScoreChart from "./score-chart";
import { Separator } from "./ui/separator";
import { MultipleChoiceQuestion } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { completedQuestionsAtom, userEvalsAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";

export type QuestionMultipleChoiceProps = {
  question: MultipleChoiceQuestion;
};

const QuestionMultipleChoice = ({ question }: QuestionMultipleChoiceProps) => {
  const combiendQuestion = `${question.question}\n${question.options
    .map((option, idx) => `${idx + 1}. ${option}`)
    .join("\n")}`;
  const [selectedOption, setSelectedOption] = useState<string>("");
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
      setCompleted((prev) => prev + 1);
      setIsEvaluating(false);
      setEvals((prev) => [
        ...prev,
        {
          question,
          answer: selectedOption,
          score: object.object?.score ?? 0,
          feedback: object.object?.feedback ?? "",
        },
      ]);
    },
  });
  return (
    <>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {question.options.map((option) => (
              <Button
                key={"option-" + option}
                variant="outline"
                className="w-full"
                disabled={isSubmitted || isEvaluating}
                onClick={() => {
                  setSelectedOption(option);
                  setIsEvaluating(true);
                  setIsSubmitted(true);
                  submit({
                    question: combiendQuestion,
                    answer: option,
                    referenceAnswer: question.referenceAnswer,
                  });
                }}
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
        {/* <RadioGroup defaultValue="option-one">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={`option-${option}`}
                disabled={isSubmitted}
                checked={selectedOption === option}
                onClick={() => setSelectedOption(option)}
                onChange={() => setSelectedOption(option)}
              />
              <Label htmlFor={`option-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup> */}
      </main>
      {isSubmitted && (
        <Card>
          <CardHeader>
            <CardTitle>Auswertung</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
            <ScoreChart score={object?.score ?? 0} />
            <p className="text-sm">{object?.feedback}</p>
          </CardContent>
          <Separator />
        </Card>
      )}
      <QuestionFooter
        isDisabled={isEvaluating || !isSubmitted}
        hasAnswered={isSubmitted}
        onSubmit={() => {}}
      />
    </>
  );
};

export default QuestionMultipleChoice;
