import { atom } from "jotai";
import { EvaluationHistoryEntry, QuestionCatalog } from "@/lib/types";

export const userNameAtom = atom<string>("Unbekannter Schüler");

export const selectedQuizAtom = atom<QuestionCatalog | null>(null);

export const currentQuestionIndexAtom = atom<number>(0);

export const currentQuestionAtom = atom((get) => {
  const index = get(currentQuestionIndexAtom);
  return get(selectedQuizAtom)?.questions[index];
});

export const totalQuestionsAtom = atom(
  (get) => get(selectedQuizAtom)?.questions.length ?? 0
);

export const completedQuestionsAtom = atom<number>(0);

export const userEvalsAtom = atom<EvaluationHistoryEntry[]>([]);

export const quizCompletedAtom = atom(false);
