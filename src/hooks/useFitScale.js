"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scale factor that makes content designed for `baseWidth x baseHeight` fit inside the element
 * the returned ref is attached to (never grows past 1, never shrinks below `min`).
 * `ready` turns true after the first measurement so callers can avoid a size flash.
 */
export function useFitScale({ baseWidth, baseHeight, min = 0.5 }) {
  const ref = useRef(null);
  const [state, setState] = useState({ scale: 1, ready: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const scale = Math.min(1, width / baseWidth, height / baseHeight);
      setState({ scale: Math.max(min, Number(scale.toFixed(3))), ready: true });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [baseWidth, baseHeight, min]);

  return { ref, ...state };
}
