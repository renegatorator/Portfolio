import { RefObject, useEffect, useRef } from 'react';

/**
 * Exposes the scroll position normalized by viewport height through a ref,
 * updated by a passive listener — reading it never triggers React re-renders.
 * Intended to be consumed inside an animation loop (e.g. R3F's useFrame).
 */
export const useScrollParallax = (enabled: boolean): RefObject<number> => {
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      scrollRef.current = 0;
      return;
    }

    const update = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, [enabled]);

  return scrollRef;
};
