"use client";

import { experimental_useObject as useObject } from "ai/react";
import { evaluationSchema } from "./api/eval/schema";
import { useState } from "react";

export default function Page() {
  const [text, setText] = useState<string>("");
  const { object, submit } = useObject({
    api: "/api/eval",
    schema: evaluationSchema,
  });

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => submit(text)}>Generate notifications</button>

      <div>
        <p>{object?.score?.toFixed(2)}</p>
        <p>{object?.feedback}</p>
      </div>
    </div>
  );
}
