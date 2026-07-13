import Link from "next/link";
import styles from "../quiz.module.css";

type ResultScreenProps = {
  message: string;
  onRestart: () => void;
};

export default function ResultScreen({ message, onRestart }: ResultScreenProps) {
  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#ffc800" />
          <text x="50" y="65" fontSize="40" textAnchor="middle" fill="white">
            🏆
          </text>
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold text-[#58cc02] mb-4">¡Nivel Determinado!</h1>
      <p className="text-xl text-gray-300 mb-8">{message}</p>

      <div className="space-y-4">
        <Link
          href="/games"
          className={`${styles.optionButton} block w-full text-center bg-[#58cc02] border-b-4 border-[#46a302] text-white py-4 rounded-2xl font-extrabold text-lg uppercase tracking-wider hover:bg-[#61e002] transition duration-200`}
        >
          Continuar
        </Link>

        <button
          type="button"
          onClick={onRestart}
          className={`${styles.optionButton} w-full bg-transparent border-2 border-[#37464f] hover:bg-[#202f36] text-[#afbbbe] py-3 rounded-2xl font-extrabold text-sm uppercase tracking-wider transition duration-200`}
        >
          Volver a empezar
        </button>
      </div>
    </div>
  );
}
