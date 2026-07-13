"use client";

import { useEffect, useState } from "react";
import TypedAnswerGame, { type TypedQuestion } from "../_components/TypedAnswerGame";
import { generateEquations } from "./_generateEquations";

export default function MatematicoGame() {
  const [questions, setQuestions] = useState<TypedQuestion[] | null>(null);

  useEffect(() => {
    setQuestions(generateEquations());
  }, []);

  if (!questions) {
    return <p className="text-gray-400 mt-16">Preparando ecuaciones...</p>;
  }

  return (
    <TypedAnswerGame
      slug="matematico"
      title="Matemático"
      questions={questions}
      durationSeconds={60}
      maxWrongAllowed={1}
      warningThreshold={10}
      inputPlaceholder="Escribe el resultado"
      winTitle="¡Mente rápida!"
      winMessage="Resolviste las ecuaciones a tiempo."
      loseTitle="Necesitas más velocidad mental"
      loseMessage="Fallaste más de 1 ecuación. Vuelve a intentarlo."
    />
  );
}
