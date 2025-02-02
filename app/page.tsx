"use client";

import { useState } from "react";
import CatalogHeader from "@/components/catalog-header";
import Question from "@/components/question";
import { EvaluationHistoryEntry, QuestionCatalog } from "@/lib/types";

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
  const [selectedCatalog] = useState(1);
  const catalog = questionCatalogs[selectedCatalog];
  const questions = catalog.questions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [, setEvals] = useState<EvaluationHistoryEntry[]>([]);
  return (
    <>
      <CatalogHeader
        title={`${catalog.grade}. Klasse ${catalog.subject}`}
        currentStep={completedQuestions}
        totalSteps={questions.length}
        progress={(completedQuestions / questions.length) * 100.0}
      />
      <div className="w-full max-w-3xl mx-auto p-6 space-y-4">
        <Question
          question={questions[currentQuestion]}
          onEvaluateComplete={(ev, question, answer) => {
            setEvals((oldEvals) => [...oldEvals, { ...ev, question, answer }]);
            setCompletedQuestions(completedQuestions + 1);
          }}
          hasNextQuestion={currentQuestion < questions.length - 1}
          onNextQuestion={() => {
            console.log("Next question");
            setCurrentQuestion(currentQuestion + 1);
          }}
          onShowResults={() => {
            console.log("Show results");
          }}
        />
      </div>
    </>
  );
}
