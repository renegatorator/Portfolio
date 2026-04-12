import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Screenshot } from '@/constants/projects';

import classes from './ScreenshotCarousel.module.scss';

const AUTO_ADVANCE_MS = 4000;

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
  initialIndex?: number;
  urlBase?: string;
}

const ScreenshotCarousel = ({
  screenshots,
  initialIndex = 0,
  urlBase = 'app.renekrajnc.com',
}: ScreenshotCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = screenshots.length;

  // Stable ref so the interval callback always reads the latest values
  const stateRef = useRef({ currentIndex, isAnimating, paused, total });
  stateRef.current = { currentIndex, isAnimating, paused, total };

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number, fromAuto = false) => {
      const { isAnimating: anim } = stateRef.current;
      if (anim) return;
      const clamped = ((index % total) + total) % total; // always loop
      if (!fromAuto && clamped === stateRef.current.currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(clamped);
      setTimeout(() => setIsAnimating(false), 340);
    },
    [total],
  );

  const prev = useCallback(() => goTo(stateRef.current.currentIndex - 1), [goTo]);
  const next = useCallback(() => goTo(stateRef.current.currentIndex + 1), [goTo]);

  // Auto-advance
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!stateRef.current.paused) {
        goTo(stateRef.current.currentIndex + 1, true);
      }
    }, AUTO_ADVANCE_MS);
  }, [goTo]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  // Reset the timer when the user manually navigates
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

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleManualPrev();
      if (e.key === 'ArrowRight') handleManualNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleManualPrev, handleManualNext]);

  const current = screenshots[currentIndex];
  const currentGroup = current?.group ?? '';

  return (
    <div
      className={classes.carousel}
      role="region"
      aria-label="Screenshot gallery"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={classes.viewport}>
        <div
          className={classes.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-atomic="true"
        >
          {screenshots.map((screenshot, idx) => (
            <div
              key={idx}
              className={classes.slide}
              aria-hidden={idx !== currentIndex}
              aria-label={`${screenshot.caption} — screenshot ${idx + 1} of ${total}`}
            >
              <div className={classes.frame}>
                <div className={classes.browserBar}>
                  <div className={classes.dots}>
                    <span className={`${classes.dot} ${classes.red}`} />
                    <span className={`${classes.dot} ${classes.yellow}`} />
                    <span className={`${classes.dot} ${classes.green}`} />
                  </div>
                  <div className={classes.urlBar}>
                    <span className={classes.urlText}>{urlBase}</span>
                  </div>
                </div>
                <div className={classes.screenshotWrapper}>
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 960px"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.controls}>
        <button
          className={classes.navBtn}
          onClick={handleManualPrev}
          aria-label="Previous screenshot"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className={classes.controlCenter}>
          {currentGroup && (
            <span className={classes.groupChip}>
              <Typography variant="caption" component="span">
                {currentGroup}
              </Typography>
            </span>
          )}
          <Typography variant="caption" component="span" className={classes.counter}>
            {currentIndex + 1} / {total}
          </Typography>
        </div>

        <button
          className={classes.navBtn}
          onClick={handleManualNext}
          aria-label="Next screenshot"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className={classes.caption}>
        <Typography variant="caption" component="p" className={classes.captionText}>
          {current?.caption}
        </Typography>
      </div>

      <div className={classes.progressBar}>
        <div
          className={classes.progressFill}
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className={classes.dotRow} role="tablist" aria-label="Screenshot navigation">
        {screenshots.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Go to screenshot ${idx + 1}: ${screenshots[idx]?.caption}`}
            className={`${classes.dotBtn} ${idx === currentIndex ? classes.dotActive : ''}`}
            onClick={() => handleManualGoTo(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
