"use client";

import { useCallback, useState } from "react";

const SHAKE_DURATION = 400;

/** Shake state for modals: call `triggerShake` when the backdrop is clicked. */
export function useShake() {
  const [shake, setShake] = useState(false);

  const triggerShake = useCallback(() => {
    if (shake) return;
    setShake(true);
    setTimeout(() => setShake(false), SHAKE_DURATION);
  }, [shake]);

  const shakeAnimation = shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {};
  const shakeTransition = { duration: SHAKE_DURATION / 1000, type: "tween" };

  return { shake, triggerShake, shakeAnimation, shakeTransition };
}
