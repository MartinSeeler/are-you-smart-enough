"use client";

import { experimental_useObject as useObject } from "ai/react";
import { Evaluation, evaluationSchema } from "./api/eval/schema";
import { useState } from "react";
import QuestionText from "@/components/question-text";

const questions = [
  {
    topic: "Beziehungen zwischen USA und UdSSR im 20. Jahrhundert",
    question:
      "Welche Ereignisse führten zur Verschärfung der Spannungen zwischen den USA und der UdSSR nach dem Zweiten Weltkrieg?",
    referenceAnswer:
      "Die Spannungen verschärften sich durch ideologische Gegensätze (Kapitalismus vs. Kommunismus), die Aufteilung Europas in Einflusszonen, den Marshallplan der USA und die Gründung der NATO. Die UdSSR reagierte mit der Einrichtung des Warschauer Pakts und der Blockade Berlins.",
  },
  {
    topic: "Beziehungen zwischen USA und UdSSR im 20. Jahrhundert",
    question:
      "Welche Rolle spielte die Kubakrise im Kontext der Beziehungen zwischen den USA und der UdSSR?",
    referenceAnswer:
      'Die Kubakrise von 1962 war ein Höhepunkt des Kalten Krieges, als die UdSSR Raketen auf Kuba stationierte, was die USA als Bedrohung sahen. Nach intensiven Verhandlungen wurde ein Atomkrieg abgewendet, was zu einer Entspannung und Einrichtung eines "heißen Drahtes" zwischen Washington und Moskau führte.',
  },
  {
    topic: "Der Ost-West-Konflikt – Ursachen und Auswirkungen für Deutschland",
    question:
      "Wie wurde Deutschland nach dem Zweiten Weltkrieg in den Ost-West-Konflikt einbezogen?",
    referenceAnswer:
      "Deutschland wurde in die BRD (Westdeutschland, unter Einfluss der USA und NATO) und die DDR (Ostdeutschland, unter sowjetischer Kontrolle) geteilt. Berlin wurde ebenfalls geteilt, was die Spannungen symbolisierte.",
  },
];

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  return (
    <div>
      <QuestionText
        key={currentQuestion}
        topic={questions[currentQuestion].topic}
        question={questions[currentQuestion].question}
        referenceAnswer={questions[currentQuestion].referenceAnswer}
        onEvaluateComplete={(ev: Evaluation) => {
          console.log("Received", ev.score, ev.feedback);
          setHasAnswered(true);
        }}
      />
      {hasAnswered ? (
        <button
          onClick={() => {
            setCurrentQuestion(currentQuestion + 1);
            setHasAnswered(false);
          }}
        >
          Next Question
        </button>
      ) : null}
    </div>
  );
}
