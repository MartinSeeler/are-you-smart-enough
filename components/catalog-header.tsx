import type React from "react";
import { Progress } from "@/components/ui/progress";

interface StylishHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  progress: number;
}

const CatalogHeader: React.FC<StylishHeaderProps> = ({
  title,
  currentStep,
  totalSteps,
  progress,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-primary">{title}</h2>
        <span className="text-sm font-medium text-muted-foreground">
          Frage {currentStep} von {totalSteps}
        </span>
      </div>
      <Progress value={progress} className="w-full h-2" />
    </>
  );
};

export default CatalogHeader;
