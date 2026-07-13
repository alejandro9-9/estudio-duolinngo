import MultipleChoiceGame from "../_components/MultipleChoiceGame";
import { QUESTIONS } from "./_data";

export default function SabiondoPage() {
  return (
    <MultipleChoiceGame
      slug="sabiondo"
      title="Sabiondo"
      questions={QUESTIONS}
      durationSeconds={120}
      maxWrongAllowed={4}
      warningThreshold={20}
      winTitle="¡Eres un Sabiondo!"
      winMessage="Respondiste correctamente suficientes preguntas para pasar al siguiente nivel."
      loseTitle="Casi lo logras"
      loseMessage="Necesitas al menos 6 respuestas correctas de 10 para pasar. Inténtalo de nuevo."
    />
  );
}
