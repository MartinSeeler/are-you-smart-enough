import React from "react";
import QuestionText from "./question-text";
import { Evaluation } from "@/app/api/eval/schema";
import QuestionMultipleChoice from "./question-multiple-choice";
import { QuestionHeader } from "./question-header";
import { Question as QuestionType, MultipleChoiceQuestion } from "@/lib/types";

type QuestionProps = {
  question: QuestionType;
  onEvaluateComplete: (
    ev: Evaluation,
    question: string,
    answer: string
  ) => void;
  onNextQuestion: () => void;
  onShowResults: () => void;
  hasNextQuestion: boolean;
};

const Question = ({
  question,
  onEvaluateComplete,
  onNextQuestion,
  onShowResults,
  hasNextQuestion,
}: QuestionProps) => {
  return (
    <section className="flex flex-col gap-6">
      <QuestionHeader
        subtitle={"Thema: " + question.topic}
        title={question.question}
      />
      {question.type === "text" ? (
        <QuestionText
          question={question.question}
          referenceAnswer={question.referenceAnswer}
          onEvaluateComplete={onEvaluateComplete}
          onNextQuestion={onNextQuestion}
          onShowResults={onShowResults}
          hasNextQuestion={hasNextQuestion}
        />
      ) : (
        <QuestionMultipleChoice
          question={question.question}
          options={(question as MultipleChoiceQuestion).options}
          referenceAnswer={(question as MultipleChoiceQuestion).referenceAnswer}
          onEvaluateComplete={onEvaluateComplete}
          onNextQuestion={onNextQuestion}
          onShowResults={onShowResults}
          hasNextQuestion={hasNextQuestion}
        />
      )}
    </section>
  );
};

export default Question;
