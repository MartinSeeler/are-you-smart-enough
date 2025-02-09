"use client";

import { quizCompletedAtom, selectedQuizAtom } from "@/lib/atoms";
import { QuestionCatalog } from "@/lib/types";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import QuizProgressHeader from "../quiz-progress-header";
import Question from "../question";
import Results from "../results";

type QuestionProps = {
  catalog: QuestionCatalog;
};

const QuizPage = ({ catalog }: QuestionProps) => {
  const setSelectedQuizCatalog = useSetAtom(selectedQuizAtom);
  const isCompleted = useAtomValue(quizCompletedAtom);

  useEffect(() => {
    setSelectedQuizCatalog(catalog);
  }, [catalog, setSelectedQuizCatalog]);
  return (
    <>
      <QuizProgressHeader
        title={`${catalog.grade}. Klasse ${catalog.subject}`}
      />
      {isCompleted ? <Results /> : <Question />}
    </>
  );
};

export default QuizPage;
