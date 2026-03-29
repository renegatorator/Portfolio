import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import Section from '@/components/UI/Section/Section';

import classes from './AboutSection.module.scss';

const aboutCards = [
  {
    key: 'frontendMastery',
    visualClass: classes.frontendVisual,
    visual: (
      <>
        <span className={classes.codeLine} />
        <span className={classes.codeLine} />
        <span className={classes.codeLine} />
        <span className={classes.codeCursor} />
      </>
    ),
  },
  {
    key: 'mobileReady',
    visualClass: classes.mobileVisual,
    visual: (
      <>
        <span className={classes.deviceLaptop} />
        <span className={classes.deviceTablet} />
        <span className={classes.devicePhone} />
        <span className={classes.deviceDot} />
      </>
    ),
  },
  {
    key: 'designDriven',
    visualClass: classes.designVisual,
    visual: (
      <>
        <span className={classes.uiShape} />
        <span className={classes.uiShape} />
        <span className={classes.uiShape} />
        <span className={classes.uiPulse} />
      </>
    ),
  },
] as const;

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <Section gap={24} alignment="left" className={classes.aboutSection}>
      <Reveal>
        <Typography variant="h3" component="h2" className={classes.aboutTitle}>
          {t('about.title')}
        </Typography>
      </Reveal>
      <Reveal delayMs={120}>
        <Typography variant="subtitle1" component="p">
          {t('about.headline')}
        </Typography>
      </Reveal>
      <Reveal delayMs={200}>
        <Typography variant="body1" component="p" className={classes.aboutDescription}>
          {t('about.description')}
        </Typography>
      </Reveal>

      <div className={classes.aboutCards}>
        {aboutCards.map((card, index) => (
          <Reveal key={card.key} delayMs={index * 120}>
            <article className={classes.aboutCard}>
              <div className={`${classes.aboutCardVisual} ${card.visualClass}`}>{card.visual}</div>
              <div className={classes.aboutCardContent}>
                <Typography variant="h4" component="h3">
                  {t(`about.cards.${card.key}.title`)}
                </Typography>
                <Typography variant="body1" component="p">
                  {t(`about.cards.${card.key}.description`)}
                </Typography>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
