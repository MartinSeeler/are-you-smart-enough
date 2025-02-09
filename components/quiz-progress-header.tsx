import type React from "react";
import { Progress } from "@/components/ui/progress";
import { useAtomValue } from "jotai";
import {
  completedQuestionsAtom,
  currentQuestionIndexAtom,
  totalQuestionsAtom,
} from "@/lib/atoms";

type QuizProgressHeaderProps = {
  title: string;
};

const QuizProgressHeader = ({ title }: QuizProgressHeaderProps) => {
  const completed = useAtomValue(completedQuestionsAtom);
  const total = useAtomValue(totalQuestionsAtom);
  const current = useAtomValue(currentQuestionIndexAtom);
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-primary">{title}</h2>
        <span className="text-sm font-medium text-muted-foreground">
          Frage {current + 1} von {total}
        </span>
      </div>
      <Progress value={(completed / total) * 100} className="w-full h-2" />
    </>
  );
};

export default QuizProgressHeader;
