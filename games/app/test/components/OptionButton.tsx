import styles from "../quiz.module.css";
import type { QuizOption } from "../data/questions";

type OptionButtonProps = {
  option: QuizOption;
  onSelect: (level: number) => void;
};

export default function OptionButton({ option, onSelect }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.level)}
      className={`${styles.optionButton} w-full flex items-center p-4 rounded-2xl border-2 border-[#37464f] hover:bg-[#202f36] text-left group`}
    >
      <div className="flex items-end space-x-0.5 mr-4 h-6 w-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`${i <= option.bars ? "bg-[#1cb0f6]" : "bg-[#37464f]"} w-1.5 rounded-sm`}
            style={{ height: `${i * 25}%` }}
          />
        ))}
      </div>
      <span className="text-lg font-bold text-gray-300 group-hover:text-white">
        {option.text}
      </span>
    </button>
  );
}
