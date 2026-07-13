import styles from "../quiz.module.css";
import Mascot from "./Mascot";
import OptionButton from "./OptionButton";
import type { QuizQuestion } from "../data/questions";

type QuestionScreenProps = {
  step: QuizQuestion;
  onSelect: (level: number) => void;
};

export default function QuestionScreen({ step, onSelect }: QuestionScreenProps) {
  return (
    <div>
      <div className="flex items-start mb-8 space-x-4">
        <Mascot className={`${styles.characterBounce} shrink-0 mt-4`} />

        <div className="relative bg-transparent border-2 border-[#37464f] rounded-2xl p-4 ml-2">
          <p className="text-xl font-bold text-white">{step.question}</p>
          <div className="absolute top-6 -left-2 w-4 h-4 bg-[#131f24] border-l-2 border-b-2 border-[#37464f] transform rotate-45" />
        </div>
      </div>

      <div className="space-y-3">
        {step.options.map((opt, index) => (
          <OptionButton key={index} option={opt} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
