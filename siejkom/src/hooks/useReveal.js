// src/hooks/useReveal.js
import { useEffect, useRef } from "react";

/**
 * Attach to any element — adds `.visible` class when it enters the viewport.
 * Usage:
 *   const ref = useReveal();
 *   <div ref={ref} className="reveal">…</div>
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
