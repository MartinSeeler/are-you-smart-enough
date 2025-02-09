import React from "react";
import { Button } from "@/components/ui/button";
import {
  currentQuestionIndexAtom,
  quizCompletedAtom,
  totalQuestionsAtom,
} from "@/lib/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";

type QuestionFooterProps = {
  isDisabled: boolean;
  hasAnswered: boolean;
  onSubmit: () => void;
};

const QuestionFooter = ({
  isDisabled,
  hasAnswered,
  onSubmit,
}: QuestionFooterProps) => {
  const total = useAtomValue(totalQuestionsAtom);
  const [current, setCurrent] = useAtom(currentQuestionIndexAtom);
  const hasNextQuestion = current + 1 < total;
  const setCompleted = useSetAtom(quizCompletedAtom);
  return (
    <footer className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
      <Link href="/" className="w-full">
        <Button variant="secondary" className="w-full sm:w-auto">
          Test abbrechen
        </Button>
      </Link>
      {hasAnswered ? (
        hasNextQuestion ? (
          <Button
            className="w-full sm:w-auto"
            disabled={isDisabled}
            onClick={() => setCurrent((prev) => prev + 1)}
          >
            Nächste Frage
          </Button>
        ) : (
          <Button
            className="w-full sm:w-auto"
            disabled={isDisabled}
            onClick={() => setCompleted(true)}
          >
            Ergebnisse anzeigen
          </Button>
        )
      ) : (
        <Button
          type="submit"
          onClick={onSubmit}
          className="w-full sm:w-auto"
          disabled={isDisabled}
        >
          Antwort absenden
        </Button>
      )}
    </footer>
  );
};

export default QuestionFooter;
