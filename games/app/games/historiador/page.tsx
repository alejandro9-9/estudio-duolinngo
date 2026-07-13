import MultipleChoiceGame from "../_components/MultipleChoiceGame";
import { QUESTIONS } from "./_data";

export default function HistoriadorPage() {
  return (
    <MultipleChoiceGame
      slug="historiador"
      title="Historiador"
      questions={QUESTIONS}
      durationSeconds={30}
      maxWrongAllowed={1}
      warningThreshold={10}
      winTitle="¡Conoces tu historia!"
      winMessage="Acertaste suficientes preguntas de historia."
      loseTitle="Te falta repasar el pasado"
      loseMessage="Fallaste más de 1 pregunta. Vuelve a intentarlo."
    />
  );
}
