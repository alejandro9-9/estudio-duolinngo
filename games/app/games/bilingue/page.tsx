import TypedAnswerGame from "../_components/TypedAnswerGame";
import { WORDS } from "./_data";

export default function BilinguePage() {
  return (
    <TypedAnswerGame
      slug="bilingue"
      title="Bilingüe"
      questions={WORDS}
      durationSeconds={60}
      maxWrongAllowed={3}
      warningThreshold={10}
      inputPlaceholder="Escribe la traducción en español"
      winTitle="¡Eres bilingüe!"
      winMessage="Tradujiste correctamente suficientes palabras."
      loseTitle="Necesitas repasar vocabulario"
      loseMessage="Te equivocaste en 4 o más palabras. Vuelve a intentarlo."
    />
  );
}
