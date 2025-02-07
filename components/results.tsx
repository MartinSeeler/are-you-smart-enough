import { EvaluationHistoryEntry } from "@/lib/types";
import { experimental_useObject as useObject } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { finalEvaluationSchema } from "@/app/api/final/schema";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";
import ScoreChart from "./score-chart";
import { QuestionHeader } from "./question-header";

type ResultsProps = {
  evals: EvaluationHistoryEntry[];
};

const Results = ({ evals }: ResultsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasSubmitted = useRef(false);

  const totalPoints = evals.reduce((acc, curr) => acc + curr.score, 0.0);
  const maxPoints = evals.length * 100;

  const { object, submit } = useObject({
    api: "/api/final",
    schema: finalEvaluationSchema,
    onError: (error) => {
      console.error("Error", error);
    },
    onFinish: () => {
      setIsGenerating(false);
      setIsDone(true);
    },
  });

  useEffect(() => {
    if (isGenerating || isDone || hasSubmitted.current) {
      return;
    }
    console.log("calling submit");
    submit({ evals });
    setIsGenerating(true);
    hasSubmitted.current = true;
  }, [isGenerating, submit, isDone, evals]);

  //   useEffect(() => {
  //     console.log("calling submit");
  //   }, [evals]);
  return (
    <div className="space-y-6">
      <QuestionHeader subtitle={"Übersicht"} title={"Gesamtauswertung"} />
      {/* <h2 className="text-2xl font-bold">Auswertung</h2> */}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <ScoreChart score={(totalPoints / maxPoints) * 100} />
        <p className="font-medium">{object?.summary}</p>
      </div>
      {/* <Separator /> */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold">Stärken</h3>
          <ul className="space-y-4 mt-4">
            {(object?.strengths ?? []).map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <Badge
                  variant="default"
                  className="bg-green-500 text-white mt-1"
                >
                  <Check className="h-4 w-4" />
                </Badge>
                <div className="flex flex-col gap-1.5">
                  <p className="font-medium">{item?.text}</p>
                  {item?.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Schwächen</h3>
          <ul className="space-y-4 mt-4">
            {(object?.weaknesses ?? []).map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <Badge variant="destructive" className="mt-1">
                  <X className="h-4 w-4" />
                </Badge>
                <div className="flex flex-col gap-1.5">
                  <p className="font-medium">{item?.text}</p>
                  {item?.description && (
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Separator />
      <div className="space-y-6">
        <QuestionHeader subtitle={"Übersicht"} title={"Einzelbewertungen"} />
        {evals.map((ev, index) => (
          <div key={"eval-" + index} className="flex flex-col gap-4">
            <h4 className="text-lg font-bold">{ev.question}</h4>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <ScoreChart score={ev.score} />
              <p>{ev.feedback}</p>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
