import MultipleChoiceGame from "../_components/MultipleChoiceGame";
import { QUESTIONS } from "./_data";

export default function ElectronicoPage() {
  return (
    <MultipleChoiceGame
      slug="electronico"
      title="Electrónico"
      questions={QUESTIONS}
      durationSeconds={30}
      maxWrongAllowed={1}
      warningThreshold={10}
      winTitle="¡Circuito completo!"
      winMessage="Dominas los conceptos básicos de electricidad."
      loseTitle="Cortocircuito"
      loseMessage="Fallaste más de 1 pregunta. Vuelve a intentarlo."
    />
  );
}
