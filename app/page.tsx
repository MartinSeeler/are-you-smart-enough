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

  return <QuizSelector />;
}
