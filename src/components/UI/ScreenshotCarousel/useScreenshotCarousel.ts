import { useCallback, useEffect, useRef, useState } from 'react';

const AUTO_ADVANCE_MS = 5000;

interface UseScreenshotCarouselOptions {
  total: number;
  initialIndex: number;
}

// Encapsulates the carousel state machine: auto-advance, manual navigation, pause-on-hover/focus,
// keyboard handling, and the lightbox lifecycle (open/close, navigation, scroll lock).
export const useScreenshotCarousel = ({ total, initialIndex }: UseScreenshotCarouselOptions) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Stable ref so interval/timeout callbacks always read latest values
  const stateRef = useRef({ currentIndex, isAnimating, paused, total, lightboxIndex });
  useEffect(() => {
    stateRef.current = { currentIndex, isAnimating, paused, total, lightboxIndex };
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Store animation timeout id so we can cancel it on unmount
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  const goTo = useCallback(
    (index: number, fromAuto = false) => {
      if (stateRef.current.total === 0) return;
      const { isAnimating: anim } = stateRef.current;
      if (anim) return;
      const clamped = ((index % total) + total) % total;
      if (!fromAuto && clamped === stateRef.current.currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(clamped);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => setIsAnimating(false), 340);
    },
    [total],
  );

  const prev = useCallback(() => goTo(stateRef.current.currentIndex - 1), [goTo]);
  const next = useCallback(() => goTo(stateRef.current.currentIndex + 1), [goTo]);

  // Auto-advance
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!stateRef.current.paused && stateRef.current.lightboxIndex === null) {
        goTo(stateRef.current.currentIndex + 1, true);
      }
    }, AUTO_ADVANCE_MS);
  }, [goTo]);

  useEffect(() => {
    if (total <= 1) return;
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval, total]);

  const handleManualPrev = useCallback(() => {
    prev();
    startInterval();
  }, [prev, startInterval]);

  const handleManualNext = useCallback(() => {
    next();
    startInterval();
  }, [next, startInterval]);

  const handleManualGoTo = useCallback(
    (idx: number) => {
      goTo(idx);
      startInterval();
    },
    [goTo, startInterval],
  );

  // Keyboard nav scoped to the carousel container (tabIndex={0} + onKeyDown)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (lightboxIndex !== null) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleManualPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleManualNext();
      }
    },
    [handleManualPrev, handleManualNext, lightboxIndex],
  );

  // Only unpause when focus leaves the carousel entirely
  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setPaused(false);
    }
  }, []);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prevIdx) => {
      if (prevIdx === null) return prevIdx;
      const nextIdx = (((prevIdx - 1) % total) + total) % total;
      goTo(nextIdx);
      return nextIdx;
    });
  }, [goTo, total]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prevIdx) => {
      if (prevIdx === null) return prevIdx;
      const nextIdx = (prevIdx + 1) % total;
      goTo(nextIdx);
      return nextIdx;
    });
  }, [goTo, total]);

  // Restart auto-advance timer when the lightbox closes so the next slide
  // gets a fresh AUTO_ADVANCE_MS window. The interval callback itself skips
  // ticks while the lightbox is open (see startInterval).
  useEffect(() => {
    if (lightboxIndex === null && total > 1) {
      startInterval();
    }
  }, [lightboxIndex, startInterval, total]);

  // Lock document scroll while the lightbox is open. We toggle it on
  // <html> rather than <body> because the global stylesheet pins
  // `body { padding-right: 0 !important }` which defeats MUI's default lock.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previous;
    };
  }, [lightboxIndex]);

  const handleLightboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (total <= 1) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        lightboxPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        lightboxNext();
      }
    },
    [lightboxPrev, lightboxNext, total],
  );

  return {
    currentIndex,
    lightboxIndex,
    setPaused,
    handleKeyDown,
    handleBlur,
    openLightbox,
    closeLightbox,
    handleManualGoTo,
    lightboxPrev,
    lightboxNext,
    handleLightboxKeyDown,
  };
};
