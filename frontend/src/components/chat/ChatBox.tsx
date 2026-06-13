"use client";

import { useState } from "react";
import { askQuestion } from "@/services/chat.service";

type Props = {
  pdfId: string;
};

export default function ChatBox({ pdfId }: Props) {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const result = await askQuestion(question, pdfId);

      setAnswer(result.answer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <textarea
        className="border p-3 rounded"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="border rounded p-2"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div className="border rounded p-4">
          <h3 className="font-bold">Answer</h3>

          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
