"use client";

import { useEffect } from "react";
import QuizSelector from "@/components/screens/quiz-selector";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useSetAtom } from "jotai";
import { userNameAtom } from "@/lib/atoms";

export default function Page() {
  const { user } = useKindeAuth();
  const setUserName = useSetAtom(userNameAtom);

  useEffect(() => {
    if (user && user.given_name) {
      setUserName(user.given_name);
    }
  }, [user, setUserName]);

  return (
    <QuizSelector />
    // {/* {catalog ? (
    //   <>
    //     <CatalogHeader
    //       title={`${catalog.grade}. Klasse ${catalog.subject}`}
    //       currentStep={currentQuestion + 1}
    //       totalSteps={catalog.questions.length}
    //       progress={(completedQuestions / catalog.questions.length) * 100.0}
    //     />
    //     {questionsCompleted ? (
    //       <Results key={JSON.stringify(evals)} evals={evals} />
    //     ) : (
    //       <Question
    //         question={catalog.questions[currentQuestion]}
    //         onEvaluateComplete={(ev, question, answer) => {
    //           setEvals((oldEvals) => [
    //             ...oldEvals,
    //             { ...ev, question, answer },
    //           ]);
    //           setCompletedQuestions(completedQuestions + 1);
    //         }}
    //         hasNextQuestion={currentQuestion < catalog.questions.length - 1}
    //         onNextQuestion={() => {
    //           console.log("Next question");
    //           setCurrentQuestion(currentQuestion + 1);
    //         }}
    //         onShowResults={() => {
    //           setQuestionsCompleted(true);
    //         }}
    //       />
    //     )}
    //   </>
    // ) : (
    //   <QuizSelector
    //     quizes={questionCatalogs.map(
    //       (q) =>
    //         ({
    //           grade: q.grade,
    //           subject: q.subject,
    //         } as GradeSubjectTuple)
    //     )}
    //     onStartQuiz={(grade, subject) => {
    //       const catalog = questionCatalogs.find(
    //         (q) => q.grade === grade && q.subject === subject
    //       );
    //       if (catalog) {
    //         setCatalog(catalog);
    //         setCurrentQuestion(0);
    //         setCompletedQuestions(0);
    //         setEvals([]);
    //         setQuestionsCompleted(false);
    //       }
    //     }}
    //   />
    // )} */}
  );
}
