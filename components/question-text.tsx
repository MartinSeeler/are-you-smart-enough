"use client";

import { experimental_useObject as useObject } from "ai/react";
import { Evaluation, evaluationSchema } from "@/app/api/eval/schema";
import React, { useState } from "react";

export type QuestionTextProps = {
  topic: string;
  question: string;
  referenceAnswer: string;
  onEvaluateComplete: (ev: Evaluation) => void;
};

const QuestionText = ({
  topic,
  question,
  referenceAnswer,
  onEvaluateComplete,
}: QuestionTextProps) => {
  const [text, setText] = useState<string>("");
  const { object, submit } = useObject({
    api: "/api/eval",
    schema: evaluationSchema,
    onFinish: (object) => {
      console.log("onFinish", object);
      onEvaluateComplete(object.object as Evaluation);
    },
  });
  return (
    <div>
      <h1 className="text-xl">{topic}</h1>
      <h1 className="text-lg">{question}</h1>
      <label
        htmlFor="comment"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Deine Antwort
      </label>
      <div className="mt-2">
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={() =>
          submit({
            question,
            answer: text,
            referenceAnswer,
          })
        }
      >
        Generate notifications
      </button>
      <div>
        <p>{object?.score?.toFixed(2)}</p>
        <p>{object?.feedback}</p>
      </div>
    </div>
  );
};

export default QuestionText;
