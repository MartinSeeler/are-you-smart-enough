"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questionCatalogs } from "@/lib/questions";
import Link from "next/link";
import {
  completedQuestionsAtom,
  currentQuestionIndexAtom,
  quizCompletedAtom,
  userEvalsAtom,
  userNameAtom,
} from "@/lib/atoms";
import { useAtomValue, useSetAtom } from "jotai";

export default function QuizSelector() {
  const subjects = Array.from(
    new Set(questionCatalogs.map((catalog) => catalog.subject))
  );
  const userName = useAtomValue(userNameAtom);

  const setCurrentQuestion = useSetAtom(currentQuestionIndexAtom);
  const setCompletedQuestions = useSetAtom(completedQuestionsAtom);
  const setUserEvals = useSetAtom(userEvalsAtom);
  const setQuizCompleted = useSetAtom(quizCompletedAtom);

  const onSelectQuiz = () => {
    setCurrentQuestion(0);
    setCompletedQuestions(0);
    setUserEvals([]);
    setQuizCompleted(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Wähle deinen Leistungstest{userName && `, ${userName}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {subjects.map((subject) => (
          <Link
            key={subject}
            href={`/${subject.toLowerCase()}`}
            className="w-full"
          >
            <Button variant="outline" className="w-full" onClick={onSelectQuiz}>
              10. Klasse {subject}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
