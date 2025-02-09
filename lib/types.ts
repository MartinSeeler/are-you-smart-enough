export type TextQuestion = {
  type: "text";
  topic: string;
  question: string;
  referenceAnswer: string;
};

export type MultipleChoiceQuestion = {
  type: "multiple-choice";
  topic: string;
  question: string;
  options: string[];
  referenceAnswer: string;
};

export type Question = TextQuestion | MultipleChoiceQuestion;

export type QuestionCatalog = {
  grade: number;
  subject: string;
  questions: Question[];
};

export type EvaluationHistoryEntry = {
  question: Question;
  answer: string;
  score: number;
  feedback: string;
};
