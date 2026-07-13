"use client";

import { useState, type FormEvent } from "react";
import styles from "../games.module.css";
import {
  MAX_CODE_ATTEMPTS,
  getCodeAttemptsUsed,
  incrementCodeAttempts,
  setCodeUnlocked,
} from "../_lib/gameProgress";

const YAPE_NUMBER = "917471964";

type CodeUnlockPanelProps = {
  onUnlock: () => void;
};

export default function CodeUnlockPanel({ onUnlock }: CodeUnlockPanelProps) {
  const [code, setCode] = useState("");
  const [attemptsUsed, setAttemptsUsed] = useState(getCodeAttemptsUsed());
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const blocked = attemptsUsed >= MAX_CODE_ATTEMPTS;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (blocked || checking || !code.trim()) return;

    setChecking(true);
    setError("");

    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.success) {
        setCodeUnlocked();
        onUnlock();
      } else {
        const used = incrementCodeAttempts();
        setAttemptsUsed(used);
        setError(
          used >= MAX_CODE_ATTEMPTS
            ? "Código incorrecto. Se acabaron tus intentos."
            : `Código incorrecto. Te queda ${MAX_CODE_ATTEMPTS - used} intento.`
        );
      }
    } catch {
      setError("No se pudo verificar el código. Intenta de nuevo.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="border-2 border-[#37464f] rounded-2xl p-6 text-center bg-[#1c2a30]">
      <p className="text-2xl mb-2">😅</p>
      <h3 className="text-xl font-extrabold text-white mb-2">
        ¡Ups! Se te han acabado los créditos para tu nivel
      </h3>
      <p className="text-gray-300 mb-4">
        Desbloquea los siguientes niveles yapeando a este número:
      </p>
      <p className="text-2xl font-extrabold text-[#58cc02] mb-6">{YAPE_NUMBER}</p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={blocked || checking}
          placeholder="Inserta el código que te facilitaron aquí"
          className="w-full max-w-xs text-center bg-[#131f24] border-2 border-[#37464f] rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#1cb0f6] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={blocked || checking || !code.trim()}
          className={`${styles.card} w-full max-w-xs bg-[#58cc02] border-b-4 border-[#46a302] text-white py-3 rounded-2xl font-extrabold text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition`}
        >
          {checking ? "Verificando..." : "Desbloquear"}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
}
