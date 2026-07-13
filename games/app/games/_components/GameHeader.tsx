import Link from "next/link";
import styles from "../games.module.css";

type GameHeaderProps = {
  title: string;
  secondsLeft: number;
  warningThreshold?: number;
};

export default function GameHeader({
  title,
  secondsLeft,
  warningThreshold = 10,
}: GameHeaderProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const warning = secondsLeft <= warningThreshold;

  return (
    <div className="w-full flex items-center justify-between mb-6">
      <Link href="/games" className="text-gray-500 hover:text-white text-sm font-bold">
        ← Juegos
      </Link>
      <h1 className="text-xl font-extrabold text-white">{title}</h1>
      <span
        className={`text-lg font-extrabold ${
          warning ? `text-red-400 ${styles.timerWarning}` : "text-[#1cb0f6]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
