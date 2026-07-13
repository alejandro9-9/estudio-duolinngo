"use client";

import { useEffect, useState } from "react";
import GameHeader from "../_components/GameHeader";
import GameResultOverlay from "../_components/GameResultOverlay";
import { useCountdown } from "../_components/useCountdown";
import { markGameCompleted } from "../_lib/gameProgress";
import styles from "../games.module.css";
import { generateGrid } from "./_generateGrid";
import { WORDS } from "./_data";

type Cell = { row: number; col: number };

const DURATION_SECONDS = 120;

function cellsAligned(start: Cell, end: Cell) {
  return (
    start.row === end.row ||
    start.col === end.col ||
    Math.abs(start.row - end.row) === Math.abs(start.col - end.col)
  );
}

function getPath(start: Cell, end: Cell): Cell[] {
  const dr = Math.sign(end.row - start.row);
  const dc = Math.sign(end.col - start.col);
  const steps = Math.max(Math.abs(end.row - start.row), Math.abs(end.col - start.col));
  const path: Cell[] = [];
  for (let i = 0; i <= steps; i++) {
    path.push({ row: start.row + dr * i, col: start.col + dc * i });
  }
  return path;
}

function cellKey(cell: Cell) {
  return `${cell.row}-${cell.col}`;
}

export default function WordSearch() {
  const [grid, setGrid] = useState(() => generateGrid(WORDS));
  const [remaining, setRemaining] = useState<string[]>(WORDS);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [wrongCells, setWrongCells] = useState<Set<string>>(new Set());
  const [start, setStart] = useState<Cell | null>(null);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const {
    secondsLeft,
    start: startTimer,
    stop: stopTimer,
    reset,
  } = useCountdown(DURATION_SECONDS, () =>
    setStatus((current) => (current === "playing" ? "lost" : current))
  );

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCellClick(cell: Cell) {
    if (status !== "playing") return;

    if (!start) {
      setStart(cell);
      return;
    }

    if (cellKey(start) === cellKey(cell)) {
      setStart(null);
      return;
    }

    if (!cellsAligned(start, cell)) {
      setStart(cell);
      return;
    }

    const path = getPath(start, cell);
    const letters = path.map(({ row, col }) => grid[row][col]).join("");
    const reversed = letters.split("").reverse().join("");
    const matchWord = remaining.find((w) => w === letters || w === reversed);

    if (matchWord) {
      setFoundCells((prev) => {
        const next = new Set(prev);
        path.forEach((c) => next.add(cellKey(c)));
        return next;
      });
      const nextRemaining = remaining.filter((w) => w !== matchWord);
      setRemaining(nextRemaining);
      setStart(null);

      if (nextRemaining.length === 0) {
        setStatus("won");
        stopTimer();
        markGameCompleted("sopa-de-letras");
      }
    } else {
      const keys = new Set(path.map(cellKey));
      setWrongCells(keys);
      setStart(null);
      setTimeout(() => setWrongCells(new Set()), 400);
    }
  }

  function handleRetry() {
    setGrid(generateGrid(WORDS));
    setRemaining(WORDS);
    setFoundCells(new Set());
    setWrongCells(new Set());
    setStart(null);
    setStatus("playing");
    reset(DURATION_SECONDS);
    startTimer();
  }

  if (status !== "playing") {
    return (
      <div className="w-full max-w-xl mt-8">
        <GameResultOverlay
          status={status === "won" ? "won" : "lost"}
          slug="sopa-de-letras"
          title={status === "won" ? "¡Sopa de letras completada!" : "Se acabó el tiempo"}
          message={
            status === "won"
              ? "Encontraste las 6 palabras."
              : "No encontraste las 6 palabras a tiempo. Inténtalo de nuevo."
          }
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mt-8">
      <GameHeader title="Sopa de letras" secondsLeft={secondsLeft} warningThreshold={20} />

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {WORDS.map((word) => (
          <span
            key={word}
            className={`text-xs font-bold px-2 py-1 rounded-full border ${
              remaining.includes(word)
                ? "border-[#37464f] text-gray-400"
                : "border-[#58cc02] text-[#58cc02] line-through"
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-10 gap-1 bg-[#1c2a30] p-2 rounded-2xl border-2 border-[#37464f] select-none">
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const isFound = foundCells.has(key);
            const isWrong = wrongCells.has(key);
            const isStart = start !== null && cellKey(start) === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleCellClick({ row: rowIndex, col: colIndex })}
                className={`${styles.cell} aspect-square w-full text-[10px] sm:text-xs font-extrabold rounded flex items-center justify-center ${
                  isFound
                    ? `${styles.cellFound} text-white`
                    : isWrong
                      ? "bg-red-500 text-white"
                      : isStart
                        ? `${styles.cellSelected} text-white`
                        : "bg-[#202f36] text-gray-300"
                }`}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
