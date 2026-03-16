import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import Section from '@/components/UI/Section/Section';
import { reneKrajnc } from '@/constants/rene';
import { Routes } from '@/constants/routes';

import classes from './HeroSection.module.scss';
import { useMemo } from 'react';
import StatCard from '../StatCard/StatCard';

const HeroSection = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const statCards = useMemo(() => ([{
    title: t('hero.stats.experience.value'),
    description: t('hero.stats.experience.label'),
  }, {
    title: t('hero.stats.seniority.value'),
    description: t('hero.stats.seniority.label'),
  }, {
    title: t('hero.stats.specialization.value'),
    description: t('hero.stats.specialization.label'),
  }]), [t]);

  return (
    <Section alignment="center" background="default" shadow="large" gap={24} className={classes.heroSection}>
      <div className={classes.heroGrid}>
        <Reveal direction="left" className={classes.heroPortraitWrap}>
          <Image
            src="/images/rene-profile.jpg"
            alt={reneKrajnc}
            width={340}
            height={420}
            priority
            className={classes.heroPortrait}
          />
        </Reveal>

        <div className={classes.heroContent}>
          <Reveal className={classes.heroAvailability}>
            <span className={classes.availabilityDot} />
            <Typography variant="caption" component="p">
              {t('availability')}
            </Typography>
          </Reveal>

          <Reveal delayMs={100}>
            <Typography variant="h2" component="p" className={classes.heroRole}>
              {t('role')}
            </Typography>
            <Typography variant="h1" component="h1" className={classes.heroName}>
              {reneKrajnc}
            </Typography>
          </Reveal>

          <Reveal delayMs={180}>
            <Typography variant="subtitle1" component="p" className={classes.heroTagline}>
              <Trans
                i18nKey="tagline"
                components={{
                  highlight: <span className={classes.highlight} />,
                }}
              />
            </Typography>
          </Reveal>

          <Reveal delayMs={260} className={classes.heroActions}>
            <Link href={Routes.CONTACT} locale={router.locale} className={classes.ctaLink}>
              <Button
                variant="contained"
                endIcon={<ArrowOutwardIcon />}
                className={classes.primaryCta}
                sx={{
                  borderRadius: '999px',
                  px: 3,
                  py: 1.15,
                  fontWeight: 700,
                  textTransform: 'none',
                }}
              >
                {t('hero.cta.contact')}
              </Button>
            </Link>
            <Link href={Routes.PROJECTS} locale={router.locale} className={classes.ctaLink}>
              <Button
                variant="outlined"
                endIcon={<ArrowOutwardIcon />}
                className={classes.secondaryCta}
                sx={{
                  borderRadius: '999px',
                  px: 3,
                  py: 1.15,
                  fontWeight: 700,
                  textTransform: 'none',
                }}
              >
                {t('hero.cta.projects')}
              </Button>
            </Link>
          </Reveal>
        </div>
      </div>

      <Reveal delayMs={340} className={classes.heroStats}>
        {statCards.map((card, idx) => (
            <StatCard key={idx} {...card} />
        ))}
      </Reveal>
    </Section>
  );
};

export default HeroSection;
