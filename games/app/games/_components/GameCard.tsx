import Link from "next/link";
import styles from "../games.module.css";
import type { GameMeta } from "../_lib/gamesConfig";

type GameCardProps = {
  meta: GameMeta;
  status: "locked" | "available" | "completed";
};

export default function GameCard({ meta, status }: GameCardProps) {
  const locked = status === "locked";
  const completed = status === "completed";

  const content = (
    <div
      className={`${styles.card} h-full p-5 rounded-2xl border-2 ${
        completed ? "border-[#58cc02] bg-[#17251b]" : "border-[#37464f] bg-[#1c2a30]"
      } ${locked ? styles.lockedCard : "hover:bg-[#202f36]"}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-400 uppercase">
          Juego {meta.order}
        </span>
        {locked && <span className="text-lg">🔒</span>}
        {completed && <span className="text-lg">✅</span>}
      </div>
      <h2 className="text-xl font-extrabold text-white mb-1">{meta.name}</h2>
      <p className="text-sm text-gray-400 mb-3">{meta.description}</p>
      <span className="text-xs font-bold text-[#1cb0f6] uppercase">{meta.duration}</span>
    </div>
  );

  if (locked) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/games/${meta.slug}`} className="block">
      {content}
    </Link>
  );
}
