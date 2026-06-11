import { RefObject, useEffect, useRef } from 'react';

// visualViewport tracks the visible area when mobile browser chrome animates;
// innerHeight is the fallback on browsers without the API.
const getViewportHeight = () => window.visualViewport?.height ?? window.innerHeight;

/**
 * Exposes the scroll position normalized by viewport height through a ref,
 * updated every animation frame — reading it never triggers React re-renders.
 * Intended to be consumed inside an animation loop (e.g. R3F's useFrame).
 */
export const useScrollParallax = (enabled: boolean): RefObject<number> => {
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      scrollRef.current = 0;
      return;
    }

    let rafId = 0;

    // RAF instead of scroll events — real mobile browsers throttle scroll
    // during touch drags, which left parallax frozen until finger lift.
    const tick = () => {
      scrollRef.current = window.scrollY / getViewportHeight();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [enabled]);

  return scrollRef;
};
