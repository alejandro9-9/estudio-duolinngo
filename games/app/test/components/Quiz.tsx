"use client";

import { useEffect, useState } from "react";
import ProgressHeader from "./ProgressHeader";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";
import { getResultMessage, questions } from "../data/questions";
import { levelBucketFromAverage, saveQuizLevel } from "../../games/_lib/gameProgress";

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const isFinished = currentStep >= questions.length;
  const progress = isFinished
    ? 100
    : ((currentStep + 1) / questions.length) * 100;

  const average = isFinished ? totalScore / questions.length : 0;

  useEffect(() => {
    if (isFinished) {
      saveQuizLevel(levelBucketFromAverage(average));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  function handleSelect(level: number) {
    setTotalScore((prev) => prev + level);
    setCurrentStep((prev) => prev + 1);
  }

  function handleRestart() {
    setCurrentStep(0);
    setTotalScore(0);
  }

  return (
    <>
      <ProgressHeader progress={progress} />

      <div className="w-full max-w-xl mt-12">
        {isFinished ? (
          <ResultScreen message={getResultMessage(average)} onRestart={handleRestart} />
        ) : (
          <QuestionScreen step={questions[currentStep]} onSelect={handleSelect} />
        )}
      </div>
    </>
  );
}
