import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, Modal, Typography } from '@mui/material';
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
      const nextIdx = ((prevIdx - 1) % total + total) % total;
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

  if (total === 0) return null;

  const lightboxScreenshot = lightboxIndex !== null ? screenshots[lightboxIndex] : null;

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
              <button
                type="button"
                className={classes.frame}
                onClick={() => openLightbox(idx)}
                aria-label={t('projects.page.carousel.openLightboxLabel', {
                  caption: screenshot.caption,
                })}
                tabIndex={idx === currentIndex ? 0 : -1}
              >
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
              </button>
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

      <Modal
        open={lightboxScreenshot !== null}
        onClose={closeLightbox}
        aria-label={t('projects.page.carousel.lightboxLabel')}
        className={classes.lightbox}
        slotProps={{
          backdrop: { className: classes.lightboxBackdrop },
        }}
      >
        <div
          className={classes.lightboxInner}
          onKeyDown={handleLightboxKeyDown}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          tabIndex={-1}
        >
          {total > 1 && (
            <IconButton
              className={`${classes.lightboxNav} ${classes.lightboxPrev}`}
              onClick={lightboxPrev}
              aria-label={t('projects.page.carousel.prevLightboxLabel')}
            >
              <KeyboardArrowLeftIcon fontSize="inherit" />
            </IconButton>
          )}
          <div
            className={classes.lightboxStage}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            {lightboxScreenshot && (
              <div className={classes.lightboxImageWrap}>
                <IconButton
                  className={classes.lightboxClose}
                  onClick={closeLightbox}
                  aria-label={t('projects.page.carousel.closeLightboxLabel')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={lightboxScreenshot.src}
                  src={lightboxScreenshot.src}
                  alt={lightboxScreenshot.alt}
                  className={classes.lightboxImage}
                />
              </div>
            )}
          </div>
          {total > 1 && (
            <IconButton
              className={`${classes.lightboxNav} ${classes.lightboxNext}`}
              onClick={lightboxNext}
              aria-label={t('projects.page.carousel.nextLightboxLabel')}
            >
              <KeyboardArrowRightIcon fontSize="inherit" />
            </IconButton>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ScreenshotCarousel;
