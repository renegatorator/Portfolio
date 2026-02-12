import { faCode, faHammer, faRocket, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import IconCard, { IconCardProps } from '@/components/UI/IconCard/IconCard';
import ProgressBar from '@/components/UI/ProgressBar';
import Section from '@/components/UI/Section/Section';
import { Routes } from '@/constants/routes';

import PageLayout from '../PageLayout/PageLayout';
import classes from './ComingSoonPage.module.scss';
import { MaintenanceReason } from '@/constants/maintenance';

interface ComingSoonPageProps {
  maintenanceReasons: MaintenanceReason[];
}

const ComingSoonPage = ({ maintenanceReasons }: ComingSoonPageProps) => {
  const { t } = useTranslation();

  const reasonsMap: Record<MaintenanceReason, IconCardProps> = {
    update: {
      icon: faCode,
      title: t('comingSoon.features.modernTech'),
    },
    performance: {
      icon: faRocket,
      title: t('comingSoon.features.performance'),
    },
    construction: {
      icon: faHammer,
      title: t('comingSoon.features.construction'),
    },
  };

  return (
    <PageLayout route={Routes.PROJECTS}>
      <Section alignment="center" gap={32}>
        <div className={classes.icons}>
          <FontAwesomeIcon icon={faHammer} className={classes.mainIcon} />
          <FontAwesomeIcon icon={faWrench} className={classes.secondaryIcon} />
        </div>
        <Typography variant="h1">{t('comingSoon.title')}</Typography>
        <Typography variant="body1" className={classes.description}>
          {t('comingSoon.description')}
        </Typography>
        <div className={classes.reasons}>
          {maintenanceReasons?.map((reason, idx) => (
            <IconCard key={idx} {...reasonsMap[reason]} />
          ))}
        </div>
        <ProgressBar progress={60} animated />
        <Typography variant="caption" component="p" className={classes.progressText}>
          {t('comingSoon.progress')}
        </Typography>
      </Section>
    </PageLayout>
  );
};

export default ComingSoonPage;
