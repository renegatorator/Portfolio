import { Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { Screenshot } from '@/constants/projects';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';

import classes from './ScreenshotCarousel.module.scss';
import ScreenshotLightbox from './ScreenshotLightbox';
import { useScreenshotCarousel } from './useScreenshotCarousel';

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

  const {
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
  } = useScreenshotCarousel({ total, initialIndex });

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

      <ScreenshotLightbox
        screenshot={lightboxScreenshot}
        total={total}
        onClose={closeLightbox}
        onPrev={lightboxPrev}
        onNext={lightboxNext}
        onKeyDown={handleLightboxKeyDown}
      />
    </div>
  );
};

export default ScreenshotCarousel;
