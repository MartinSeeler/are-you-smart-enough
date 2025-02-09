import React from "react";
import QuestionText from "./question-text";
import { useAtomValue } from "jotai";
import { currentQuestionAtom } from "@/lib/atoms";
import QuestionMultipleChoice from "./question-multiple-choice";

const Question = () => {
  const question = useAtomValue(currentQuestionAtom);

  return (
    <>
      {/* <QuestionHeader
        subtitle={"Thema: " + question.topic}
        title={question.question}
      /> */}
      {question?.type === "text" && (
        <QuestionText key={question.question} question={question} />
      )}
      {question?.type === "multiple-choice" && (
        <QuestionMultipleChoice key={question.question} question={question} />
      )}
    </>
  );
};

export default Question;
