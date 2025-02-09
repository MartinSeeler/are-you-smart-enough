import QuizPage from "@/components/screens/quiz-page";
import { questionCatalogs } from "@/lib/questions";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ quiz: string }>;
}) {
  const quiz = (await params).quiz;
  const catalog = questionCatalogs.find(
    (q) => q.subject.toLowerCase() === quiz
  );
  if (!catalog) {
    return redirect("/");
  }
  return <QuizPage catalog={catalog} />;
}
