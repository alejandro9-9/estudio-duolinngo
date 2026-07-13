import MultipleChoiceGame from "../_components/MultipleChoiceGame";
import { QUESTIONS } from "./_data";

export default function BiologoPage() {
  return (
    <MultipleChoiceGame
      slug="biologo"
      title="Biólogo"
      questions={QUESTIONS}
      durationSeconds={30}
      maxWrongAllowed={2}
      warningThreshold={10}
      winTitle="¡Buen ojo de biólogo!"
      winMessage="Acertaste suficientes preguntas sobre animales."
      loseTitle="Te faltó estudiar fauna"
      loseMessage="Fallaste más de 2 preguntas. Vuelve a intentarlo."
    />
  );
}
