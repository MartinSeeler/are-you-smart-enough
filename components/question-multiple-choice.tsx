"use client";

import { experimental_useObject as useObject } from "ai/react";
import { Evaluation, evaluationSchema } from "@/app/api/eval/schema";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuestionFooter from "./question-footer";

export type QuestionMultipleChoiceProps = {
  question: string;
  options: string[];
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

const QuestionMultipleChoice = ({
  question,
  options,
  referenceAnswer,
  onEvaluateComplete,
  onNextQuestion,
  onShowResults,
  hasNextQuestion,
}: QuestionMultipleChoiceProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
      setIsEvaluating(false);
      onEvaluateComplete(
        object.object as Evaluation,
        question,
        selectedOption ?? ""
      );
    },
  });
  return (
    <>
      <main>
        <RadioGroup defaultValue="option-one">
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
        </RadioGroup>
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
            question: question + " Optionen: " + options.join(", ") + "?",
            answer: selectedOption ?? "",
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

export default QuestionMultipleChoice;
