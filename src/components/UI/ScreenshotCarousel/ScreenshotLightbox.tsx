import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, Modal } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { Screenshot } from '@/constants/projects';

import classes from './ScreenshotCarousel.module.scss';

interface ScreenshotLightboxProps {
  screenshot: Screenshot | null;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const ScreenshotLightbox = ({
  screenshot,
  total,
  onClose,
  onPrev,
  onNext,
  onKeyDown,
}: ScreenshotLightboxProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={screenshot !== null}
      onClose={onClose}
      aria-label={t('projects.page.carousel.lightboxLabel')}
      className={classes.lightbox}
      slotProps={{
        backdrop: { className: classes.lightboxBackdrop },
      }}
    >
      <div
        className={classes.lightboxInner}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        tabIndex={-1}
      >
        {total > 1 && (
          <IconButton
            className={`${classes.lightboxNav} ${classes.lightboxPrev}`}
            onClick={onPrev}
            aria-label={t('projects.page.carousel.prevLightboxLabel')}
          >
            <KeyboardArrowLeftIcon fontSize="inherit" />
          </IconButton>
        )}
        <div
          className={classes.lightboxStage}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {screenshot && (
            <div className={classes.lightboxImageWrap}>
              <IconButton
                className={classes.lightboxClose}
                onClick={onClose}
                aria-label={t('projects.page.carousel.closeLightboxLabel')}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={screenshot.src}
                src={screenshot.src}
                alt={screenshot.alt}
                className={classes.lightboxImage}
              />
            </div>
          )}
        </div>
        {total > 1 && (
          <IconButton
            className={`${classes.lightboxNav} ${classes.lightboxNext}`}
            onClick={onNext}
            aria-label={t('projects.page.carousel.nextLightboxLabel')}
          >
            <KeyboardArrowRightIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>
    </Modal>
  );
};

export default ScreenshotLightbox;
