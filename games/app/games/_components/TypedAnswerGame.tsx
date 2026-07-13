"use client";

import { useEffect, useState, type FormEvent } from "react";
import GameHeader from "./GameHeader";
import GameResultOverlay from "./GameResultOverlay";
import { useCountdown } from "./useCountdown";
import { markGameCompleted } from "../_lib/gameProgress";

export type TypedQuestion = {
  id: number | string;
  prompt: string;
  answers: string[];
};

type TypedAnswerGameProps = {
  slug: string;
  title: string;
  questions: TypedQuestion[];
  durationSeconds: number;
  maxWrongAllowed: number;
  warningThreshold?: number;
  inputPlaceholder?: string;
  winTitle: string;
  winMessage: string;
  loseTitle: string;
  loseMessage: string;
};

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "");
}

export default function TypedAnswerGame({
  slug,
  title,
  questions,
  durationSeconds,
  maxWrongAllowed,
  warningThreshold = 10,
  inputPlaceholder = "Escribe tu respuesta",
  winTitle,
  winMessage,
  loseTitle,
  loseMessage,
}: TypedAnswerGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const answered = correctCount + wrongCount;

  const { secondsLeft, start: startTimer, stop: stopTimer, reset } = useCountdown(
    durationSeconds,
    () => {
      if (status !== "playing") return;
      const unanswered = questions.length - answered;
      const finalWrong = wrongCount + unanswered;
      if (finalWrong > maxWrongAllowed) {
        setStatus("lost");
      } else {
        setStatus("won");
        markGameCompleted(slug);
      }
    }
  );

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "playing" || feedback !== null || !value.trim()) return;

    const question = questions[currentIndex];
    const isCorrect = question.answers.some((a) => normalize(a) === normalize(value));
    const updatedWrong = wrongCount + (isCorrect ? 0 : 1);
    const updatedCorrect = correctCount + (isCorrect ? 1 : 0);

    setFeedback(isCorrect ? "correct" : "wrong");
    setWrongCount(updatedWrong);
    setCorrectCount(updatedCorrect);

    setTimeout(() => {
      setFeedback(null);
      setValue("");
      const isLast = currentIndex + 1 >= questions.length;

      if (isLast) {
        stopTimer();
        if (updatedWrong > maxWrongAllowed) {
          setStatus("lost");
        } else {
          setStatus("won");
          markGameCompleted(slug);
        }
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, 600);
  }

  function handleRetry() {
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setValue("");
    setFeedback(null);
    setStatus("playing");
    reset(durationSeconds);
    startTimer();
  }

  if (status !== "playing") {
    return (
      <div className="w-full max-w-xl mt-8">
        <GameResultOverlay
          status={status === "won" ? "won" : "lost"}
          slug={slug}
          title={status === "won" ? winTitle : loseTitle}
          message={status === "won" ? winMessage : loseMessage}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="w-full max-w-xl mt-8">
      <GameHeader title={title} secondsLeft={secondsLeft} warningThreshold={warningThreshold} />

      <p className="text-xs font-bold text-gray-500 uppercase mb-2">
        Palabra {currentIndex + 1} de {questions.length}
      </p>

      <div className="border-2 border-[#37464f] rounded-2xl p-8 mb-4 text-center">
        <p className="text-3xl font-extrabold text-white">{question.prompt}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={feedback !== null}
          placeholder={inputPlaceholder}
          autoFocus
          className={`w-full text-center py-4 px-4 rounded-2xl border-2 bg-[#131f24] text-white placeholder:text-gray-500 focus:outline-none font-bold text-lg ${
            feedback === "correct"
              ? "border-[#58cc02]"
              : feedback === "wrong"
                ? "border-red-500"
                : "border-[#37464f] focus:border-[#1cb0f6]"
          }`}
        />
        <button
          type="submit"
          disabled={feedback !== null || !value.trim()}
          className="w-full max-w-xs bg-[#58cc02] border-b-4 border-[#46a302] text-white py-3 rounded-2xl font-extrabold text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Comprobar
        </button>
      </form>
    </div>
  );
}
