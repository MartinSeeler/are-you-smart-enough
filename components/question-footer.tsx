import React from "react";
import { Button } from "@/components/ui/button";

type QuestionFooterProps = {
  isDisabled: boolean;
  hasAnswered: boolean;
  onSubmit: () => void;
  onNextQuestion: () => void;
  onShowResults: () => void;
  hasNextQuestion: boolean;
};

const QuestionFooter = ({
  isDisabled,
  hasAnswered,
  onSubmit,
  onNextQuestion,
  onShowResults,
  hasNextQuestion,
}: QuestionFooterProps) => {
  return (
    <footer className="flex flex-col-reverse sm:flex-row justify-between items-center gap-2">
      <Button
        variant="outline"
        onClick={() => {
          // reload page with next router
          window.location.reload();
        }}
        className="w-full sm:w-auto"
      >
        Test abbrechen
      </Button>
      {hasAnswered ? (
        hasNextQuestion ? (
          <Button
            className="w-full sm:w-auto"
            disabled={isDisabled}
            onClick={onNextQuestion}
          >
            Nächste Frage
          </Button>
        ) : (
          <Button
            className="w-full sm:w-auto"
            disabled={isDisabled}
            onClick={onShowResults}
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
