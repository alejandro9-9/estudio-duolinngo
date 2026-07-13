"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(initialSeconds: number, onExpire?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!running) return undefined;

    if (secondsLeft <= 0) {
      setRunning(false);
      onExpireRef.current?.();
      return undefined;
    }

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, secondsLeft]);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(
    (seconds: number = initialSeconds) => {
      setSecondsLeft(seconds);
      setRunning(false);
    },
    [initialSeconds]
  );

  return { secondsLeft, running, start, stop, reset };
}
