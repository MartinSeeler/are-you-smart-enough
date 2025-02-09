import { experimental_useObject as useObject } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { finalEvaluationSchema } from "@/app/api/final/schema";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import ScoreChart from "../score-chart";
import { useAtomValue } from "jotai";
import { selectedQuizAtom, userEvalsAtom } from "@/lib/atoms";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const Results = () => {
  const evals = useAtomValue(userEvalsAtom);
  const [isGenerating, setIsGenerating] = useState(false);
  const hasSubmitted = useRef(false);

  const [isDone, setIsDone] = useState(false);

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

  const quiz = useAtomValue(selectedQuizAtom);

  useEffect(() => {
    if (isGenerating || isDone || hasSubmitted.current) {
      return;
    }
    submit({ evals, grade: quiz?.grade, subject: quiz?.subject });
    setIsGenerating(true);
    hasSubmitted.current = true;
  }, [isGenerating, submit, isDone, evals]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gesamtergebnis</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
          <ScoreChart score={(totalPoints / maxPoints) * 100} />
          <p className="text-sm">{object?.summary}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Stärken</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Schwächen</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
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
        </CardContent>
      </Card>

      <Separator />
      <div className="space-y-6">
        {evals.map((ev, index) => (
          <Card key={"result-" + index}>
            <CardHeader>
              <CardTitle>{ev.question.question}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
              <ScoreChart score={ev.score} />
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  <span className="font-bold">Deine Antwort: </span>
                  {ev.answer}
                </p>
                <Separator />
                <p className="text-sm">{ev.feedback}</p>
              </div>
            </CardContent>
            <Separator />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Results;
