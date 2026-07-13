"use client";

import { useEffect, useState } from "react";
import { games, TOTAL_GAMES } from "./_lib/gamesConfig";
import { getCompletedGames, getUnlockedCount, isCodeUnlocked } from "./_lib/gameProgress";
import GameCard from "./_components/GameCard";
import CodeUnlockPanel from "./_components/CodeUnlockPanel";

export default function GamesHubPage() {
  const [mounted, setMounted] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(3);
  const [completed, setCompleted] = useState<string[]>([]);
  const [codeUnlocked, setCodeUnlockedState] = useState(false);

  function refresh() {
    setUnlockedCount(getUnlockedCount());
    setCompleted(getCompletedGames());
    setCodeUnlockedState(isCodeUnlocked());
  }

  useEffect(() => {
    refresh();
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p className="text-gray-400 mt-16">Cargando tus juegos...</p>;
  }

  const unlockedGames = games.filter((g) => g.order <= unlockedCount);
  const allUnlockedCompleted =
    unlockedGames.length > 0 && unlockedGames.every((g) => completed.includes(g.slug));
  const showPaywall = allUnlockedCompleted && !codeUnlocked && unlockedCount < TOTAL_GAMES;

  return (
    <div className="w-full max-w-2xl mt-8 mb-16 px-2">
      <h1 className="text-3xl font-extrabold text-white mb-2 text-center">
        Juegos de Cultura General
      </h1>
      <p className="text-gray-400 text-center mb-8">
        Completa los juegos disponibles para tu nivel.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map((game) => {
          const unlocked = game.order <= unlockedCount;
          const isCompleted = completed.includes(game.slug);
          return (
            <GameCard
              key={game.slug}
              meta={game}
              status={unlocked ? (isCompleted ? "completed" : "available") : "locked"}
            />
          );
        })}
      </div>

      {showPaywall && (
        <div className="mt-10">
          <CodeUnlockPanel onUnlock={refresh} />
        </div>
      )}
    </div>
  );
}
