import MultipleChoiceGame from "../_components/MultipleChoiceGame";
import { QUESTIONS } from "./_data";

export default function GeografoPage() {
  return (
    <MultipleChoiceGame
      slug="geografo"
      title="Geógrafo"
      questions={QUESTIONS}
      durationSeconds={30}
      maxWrongAllowed={1}
      warningThreshold={10}
      winTitle="¡Dominas el mapa!"
      winMessage="Acertaste suficientes preguntas de geografía."
      loseTitle="Te perdiste en el mapa"
      loseMessage="Fallaste más de 1 pregunta. Vuelve a intentarlo."
    />
  );
}
