"use client";

import { use, useState } from "react";
import CatalogHeader from "@/components/catalog-header";
import Question from "@/components/question";
import { EvaluationHistoryEntry, QuestionCatalog } from "@/lib/types";
import Results from "@/components/results";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import QuizSelector, { GradeSubjectTuple } from "@/components/quiz-selector";

const questionCatalogs: QuestionCatalog[] = [
  {
    grade: 10,
    subject: "Geschichte",
    questions: [
      {
        type: "text",
        topic: "Beziehungen zwischen USA und UdSSR im 20. Jahrhundert",
        question:
          "Welche Ereignisse führten zur Verschärfung der Spannungen zwischen den USA und der UdSSR nach dem Zweiten Weltkrieg?",
        referenceAnswer:
          "Die Spannungen verschärften sich durch ideologische Gegensätze (Kapitalismus vs. Kommunismus), die Aufteilung Europas in Einflusszonen, den Marshallplan der USA und die Gründung der NATO. Die UdSSR reagierte mit der Einrichtung des Warschauer Pakts und der Blockade Berlins.",
      },
      {
        type: "text",
        topic: "Beziehungen zwischen USA und UdSSR im 20. Jahrhundert",
        question:
          "Welche Rolle spielte die Kubakrise im Kontext der Beziehungen zwischen den USA und der UdSSR?",
        referenceAnswer:
          'Die Kubakrise von 1962 war ein Höhepunkt des Kalten Krieges, als die UdSSR Raketen auf Kuba stationierte, was die USA als Bedrohung sahen. Nach intensiven Verhandlungen wurde ein Atomkrieg abgewendet, was zu einer Entspannung und Einrichtung eines "heißen Drahtes" zwischen Washington und Moskau führte.',
      },
      {
        type: "text",
        topic:
          "Der Ost-West-Konflikt – Ursachen und Auswirkungen für Deutschland",
        question:
          "Wie wurde Deutschland nach dem Zweiten Weltkrieg in den Ost-West-Konflikt einbezogen?",
        referenceAnswer:
          "Deutschland wurde in die BRD (Westdeutschland, unter Einfluss der USA und NATO) und die DDR (Ostdeutschland, unter sowjetischer Kontrolle) geteilt. Berlin wurde ebenfalls geteilt, was die Spannungen symbolisierte.",
      },
    ],
  },
  {
    grade: 10,
    subject: "Deutsch",
    questions: [
      {
        type: "multiple-choice",
        topic: "Rhetorische Mittel",
        question: "Was ist eine Metapher?",
        options: [
          'Ein Vergleich ohne "wie"',
          "Ein Gegenteil von etwas",
          "Ein Synonym",
          "Ein rhetorisches Mittel, das Widersprüche vereint",
        ],
        referenceAnswer: 'Ein Vergleich ohne "wie"',
      },
      {
        type: "text",
        topic: "Rhetorische Mittel",
        question: 'Erkläre den Begriff "Ironie".',
        referenceAnswer:
          "Ironie ist eine Form der Rede, bei der das Gegenteil dessen gemeint ist, was gesagt wird.",
      },
      {
        type: "multiple-choice",
        topic: "Klassiker der deutschen Literatur",
        question:
          "Welches der folgenden Werke ist von Johann Wolfgang von Goethe?",
        options: ["Faust", "Effi Briest", "Der Steppenwolf", "Die Verwandlung"],
        referenceAnswer: "Faust",
      },
      {
        type: "text",
        topic: "Erzählperspektive",
        question:
          "Was ist der Unterschied zwischen einer Erzählperspektive in der ersten und der dritten Person?",
        referenceAnswer:
          'Bei der Erzählperspektive in der ersten Person erzählt der Erzähler aus der Sicht einer Figur. In der dritten Person erzählt der Erzähler aus einer externen Sicht, indem er die Figuren mit "er", "sie" oder "es" beschreibt.',
      },
    ],
  },
];

export default function Page() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const [catalog, setCatalog] = useState<QuestionCatalog | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [evals, setEvals] = useState<EvaluationHistoryEntry[]>([
    // {
    //   answer: "Lorem ipsum dolor sit amet",
    //   feedback: "Lorem ipsum dolor sit amet",
    //   question: "Lorem ipsum dolor sit amet",
    //   score: 100,
    // },
    // {
    //   answer: "consectetur adipiscing elit",
    //   feedback: "consectetur adipiscing elit",
    //   question: "consectetur adipiscing elit",
    //   score: 50,
    // },
  ]);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);
  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-4">
      {isAuthenticated ? (
        catalog ? (
          <>
            <CatalogHeader
              title={`${catalog.grade}. Klasse ${catalog.subject}`}
              currentStep={currentQuestion + 1}
              totalSteps={catalog.questions.length}
              progress={(completedQuestions / catalog.questions.length) * 100.0}
            />
            {questionsCompleted ? (
              <Results key={JSON.stringify(evals)} evals={evals} />
            ) : (
              <Question
                question={catalog.questions[currentQuestion]}
                onEvaluateComplete={(ev, question, answer) => {
                  setEvals((oldEvals) => [
                    ...oldEvals,
                    { ...ev, question, answer },
                  ]);
                  setCompletedQuestions(completedQuestions + 1);
                }}
                hasNextQuestion={currentQuestion < catalog.questions.length - 1}
                onNextQuestion={() => {
                  console.log("Next question");
                  setCurrentQuestion(currentQuestion + 1);
                }}
                onShowResults={() => {
                  setQuestionsCompleted(true);
                }}
              />
            )}
          </>
        ) : (
          <QuizSelector
            quizes={questionCatalogs.map(
              (q) =>
                ({
                  grade: q.grade,
                  subject: q.subject,
                } as GradeSubjectTuple)
            )}
            onStartQuiz={(grade, subject) => {
              const catalog = questionCatalogs.find(
                (q) => q.grade === grade && q.subject === subject
              );
              if (catalog) {
                setCatalog(catalog);
                setCurrentQuestion(0);
                setCompletedQuestions(0);
                setEvals([]);
                setQuestionsCompleted(false);
              }
            }}
          />
        )
      ) : (
        <div className="w-full max-w-3xl mx-auto p-6 space-y-4">
          <h1 className="text-2xl font-bold">Bitte logge dich ein</h1>
          <p className="text-lg font-medium text-gray-600">
            Logge dich ein, um deine Auswertung zu starten.
          </p>
          <Button asChild disabled={isLoading ?? false}>
            <LoginLink>Anmelden</LoginLink>
          </Button>
        </div>
      )}
    </div>
  );
}
