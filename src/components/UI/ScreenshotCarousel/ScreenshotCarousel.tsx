import { Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Screenshot } from '@/constants/projects';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';

import classes from './ScreenshotCarousel.module.scss';

const AUTO_ADVANCE_MS = 5000;

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
  const { t } = useTranslation();
  const total = screenshots.length;
  const isXs = useBreakpoint('xs');

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  // Stable ref so interval/timeout callbacks always read latest values
  const stateRef = useRef({ currentIndex, isAnimating, paused, total });
  useEffect(() => {
    stateRef.current = { currentIndex, isAnimating, paused, total };
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
      if (!stateRef.current.paused) {
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
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleManualPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleManualNext();
      }
    },
    [handleManualPrev, handleManualNext],
  );

  // Only unpause when focus leaves the carousel entirely
  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setPaused(false);
    }
  }, []);

  if (total === 0) return null;

  return (
    <div
      className={classes.carousel}
      role="region"
      aria-label={t('projects.page.carousel.galleryLabel')}
      aria-live="off"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={handleBlur}
    >
      <div className={classes.viewport}>
        <div
          className={classes.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-atomic="true"
        >
          {screenshots.map((screenshot, idx) => (
            <div
              key={screenshot.src}
              className={classes.slide}
              aria-hidden={idx !== currentIndex}
              aria-label={`${screenshot.caption} — ${t('projects.page.carousel.slideLabel', { current: idx + 1, total })}`}
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
                    key={screenshot.src}
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 960px"
                    loading={idx === initialIndex ? 'eager' : 'lazy'}
                  />
                  {screenshot.subtitle && (
                    <div className={classes.slideOverlay}>
                      <Typography
                        variant="caption"
                        component="span"
                        className={classes.overlayCaptionTitle}
                      >
                        {screenshot.caption}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="span"
                        className={classes.overlayCaptionSubtitle}
                      >
                        {screenshot.subtitle}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.progressBar}>
        <div
          className={classes.progressFill}
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {isXs ? (
        <div className={classes.dotRow} aria-label={t('projects.page.carousel.navigationLabel')}>
          {screenshots.map((screenshot, idx) => (
            <button
              key={screenshot.src}
              type="button"
              aria-current={idx === currentIndex ? true : undefined}
              aria-label={`${t('projects.page.carousel.goToLabel', { index: idx + 1 })}: ${screenshot.caption}`}
              className={`${classes.dotBtn} ${idx === currentIndex ? classes.dotActive : ''}`}
              onClick={() => handleManualGoTo(idx)}
            />
          ))}
        </div>
      ) : (
        <div
          className={classes.thumbStrip}
          aria-label={t('projects.page.carousel.navigationLabel')}
        >
          {screenshots.map((screenshot, idx) => (
            <button
              key={screenshot.src}
              type="button"
              aria-current={idx === currentIndex ? true : undefined}
              aria-label={`${t('projects.page.carousel.goToLabel', { index: idx + 1 })}: ${screenshot.caption}`}
              className={`${classes.thumb} ${idx === currentIndex ? classes.thumbActive : ''}`}
              onClick={() => handleManualGoTo(idx)}
            >
              <Image
                src={screenshot.src}
                alt=""
                fill
                sizes="72px"
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScreenshotCarousel;
