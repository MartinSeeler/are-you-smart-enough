"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export type GradeSubjectTuple = {
  grade: number;
  subject: string;
};

type QuizSelectorProps = {
  quizes: GradeSubjectTuple[];
  onStartQuiz: (grade: number, subject: string) => void;
};

export default function QuizSelector({
  quizes,
  onStartQuiz,
}: QuizSelectorProps) {
  const grades = Array.from(new Set(quizes.map((quiz) => quiz.grade)));

  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const resetSelection = () => {
    setSelectedGrade(null);
    setSelectedSubject(null);
  };

  useEffect(() => {
    if (selectedGrade) {
      setAvailableSubjects(
        quizes
          .filter((quiz) => quiz.grade === selectedGrade)
          .map((quiz) => quiz.subject)
      );
    }
  }, [selectedGrade, quizes]);

  const renderGradeSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Wähle eine Klassenstufe</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {grades.map((grade) => (
          <Button
            key={grade}
            variant="outline"
            onClick={() => setSelectedGrade(grade)}
          >
            {grade}. Klasse
          </Button>
        ))}
      </CardContent>
    </Card>
  );

  const renderSubjectSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Wähle ein Fach für die {selectedGrade}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {availableSubjects.map((subject) => (
          <Button
            key={subject}
            variant="outline"
            onClick={() => setSelectedSubject(subject)}
          >
            {subject}
          </Button>
        ))}
      </CardContent>
    </Card>
  );

  const renderFinalSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Ausgewählter Test</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Du hast den Eignungstest "{selectedGrade}. Klasse {selectedSubject}"
          ausgewählt.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {selectedGrade && selectedSubject
        ? renderFinalSelection()
        : selectedGrade
        ? renderSubjectSelection()
        : renderGradeSelection()}
      {(selectedGrade || selectedSubject) && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={resetSelection}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Auswahl
          </Button>
          <Button
            disabled={!selectedGrade || !selectedSubject}
            onClick={() => onStartQuiz(selectedGrade!, selectedSubject!)}
          >
            Eignungstest starten
          </Button>
        </div>
      )}
    </div>
  );
}
