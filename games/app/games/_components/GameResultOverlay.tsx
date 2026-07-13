"use client";

import { useState } from "react";
import Link from "next/link";
import { TOTAL_GAMES } from "../_lib/gamesConfig";
import { getNextUnlockedGame, getUnlockedCount, isCodeUnlocked } from "../_lib/gameProgress";
import CodeUnlockPanel from "./CodeUnlockPanel";

type GameResultOverlayProps = {
  status: "won" | "lost";
  slug: string;
  title: string;
  message: string;
  onRetry?: () => void;
};

export default function GameResultOverlay({
  status,
  slug,
  title,
  message,
  onRetry,
}: GameResultOverlayProps) {
  const [, forceRerender] = useState(0);
  const won = status === "won";

  const codeUnlocked = isCodeUnlocked();
  const unlockedCount = getUnlockedCount();
  const nextGame = won ? getNextUnlockedGame(slug) : null;
  const showCodePanel = won && !nextGame && !codeUnlocked && unlockedCount < TOTAL_GAMES;
  const allGamesDone = won && !nextGame && !showCodePanel;

  function handleCodeUnlocked() {
    // The code was verified and saved to localStorage inside CodeUnlockPanel.
    // Force a re-render so nextGame / codeUnlocked are recomputed and the
    // "Ir al siguiente nivel" button shows up immediately.
    forceRerender((n) => n + 1);
  }

  return (
    <div className="text-center border-2 border-[#37464f] rounded-2xl p-8 bg-[#1c2a30]">
      <p className="text-4xl mb-3">{won ? "🎉" : "😵"}</p>
      <h2 className={`text-2xl font-extrabold mb-2 ${won ? "text-[#58cc02]" : "text-red-400"}`}>
        {title}
      </h2>
      <p className="text-gray-300 mb-6">{message}</p>

      <div className="flex flex-col gap-3 items-center">
        {!won && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="w-full max-w-xs bg-[#58cc02] border-b-4 border-[#46a302] text-white py-3 rounded-2xl font-extrabold text-sm uppercase tracking-wider hover:bg-[#61e002] transition"
          >
            Intentar de nuevo
          </button>
        )}

        {won && nextGame && (
          <Link
            href={`/games/${nextGame.slug}`}
            className="w-full max-w-xs text-center bg-[#58cc02] border-b-4 border-[#46a302] text-white py-3 rounded-2xl font-extrabold text-sm uppercase tracking-wider hover:bg-[#61e002] transition"
          >
            Ir al siguiente nivel
          </Link>
        )}

        {allGamesDone && (
          <p className="text-sm text-gray-400">
            ¡Completaste todos los juegos disponibles!
          </p>
        )}

        <Link
          href="/games"
          className="w-full max-w-xs text-center bg-transparent border-2 border-[#37464f] hover:bg-[#202f36] text-[#afbbbe] py-3 rounded-2xl font-extrabold text-sm uppercase tracking-wider transition"
        >
          Volver a juegos
        </Link>
      </div>

      {showCodePanel && (
        <div className="mt-6 text-left">
          <CodeUnlockPanel onUnlock={handleCodeUnlocked} />
        </div>
      )}
    </div>
  );
}
