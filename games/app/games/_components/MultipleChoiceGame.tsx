"use client";

import { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import GameResultOverlay from "./GameResultOverlay";
import { useCountdown } from "./useCountdown";
import { markGameCompleted } from "../_lib/gameProgress";

export type MCQuestion = {
  id: number | string;
  question: string;
  options: string[];
  correctIndex: number;
};

type MultipleChoiceGameProps = {
  slug: string;
  title: string;
  questions: MCQuestion[];
  durationSeconds: number;
  maxWrongAllowed: number;
  warningThreshold?: number;
  winTitle: string;
  winMessage: string;
  loseTitle: string;
  loseMessage: string;
};

export default function MultipleChoiceGame({
  slug,
  title,
  questions,
  durationSeconds,
  maxWrongAllowed,
  warningThreshold = 10,
  winTitle,
  winMessage,
  loseTitle,
  loseMessage,
}: MultipleChoiceGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
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

  function handleSelect(index: number) {
    if (status !== "playing" || selected !== null) return;

    const question = questions[currentIndex];
    const isCorrect = index === question.correctIndex;
    const updatedWrong = wrongCount + (isCorrect ? 0 : 1);
    const updatedCorrect = correctCount + (isCorrect ? 1 : 0);

    setSelected(index);
    setWrongCount(updatedWrong);
    setCorrectCount(updatedCorrect);

    setTimeout(() => {
      setSelected(null);
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
    }, 500);
  }

  function handleRetry() {
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSelected(null);
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
        Pregunta {currentIndex + 1} de {questions.length}
      </p>

      <div className="border-2 border-[#37464f] rounded-2xl p-5 mb-4">
        <p className="text-lg font-bold text-white">{question.question}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrectOption = index === question.correctIndex;
          const showFeedback = selected !== null;

          let colorClasses = "border-[#37464f] hover:bg-[#202f36] text-gray-300";
          if (showFeedback && isCorrectOption) {
            colorClasses = "border-[#58cc02] bg-[#17251b] text-[#58cc02]";
          } else if (showFeedback && isSelected && !isCorrectOption) {
            colorClasses = "border-red-500 bg-[#2b1a1a] text-red-400";
          }

          return (
            <button
              key={index}
              type="button"
              disabled={showFeedback}
              onClick={() => handleSelect(index)}
              className={`w-full text-left p-4 rounded-2xl border-2 font-bold transition ${colorClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
