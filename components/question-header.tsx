import { cn } from "@/lib/utils";

interface QuestionHeaderProps {
  subtitle: string;
  title: string;
  className?: string;
  subtitleClassName?: string;
  titleClassName?: string;
}

export function QuestionHeader({
  subtitle,
  title,
  className,
  subtitleClassName,
  titleClassName,
}: QuestionHeaderProps) {
  return (
    <header className={cn("text-left", className)}>
      <p
        className={cn(
          "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1",
          subtitleClassName
        )}
      >
        {subtitle}
      </p>
      <h1
        className={cn(
          "text-2xl font-extrabold tracking-tight sm:text-3xl",
          titleClassName
        )}
      >
        {title}
      </h1>
    </header>
  );
}
