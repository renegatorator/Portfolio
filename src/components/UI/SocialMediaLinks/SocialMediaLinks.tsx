import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { EmailAddresses } from '@/constants/rene';
import { SocialUrls } from '@/constants/social';

import classes from './SocialMediaLinks.module.scss';

interface SocialMediaLink {
  name: string;
  url: string;
  icon: IconDefinition;
  color: string;
}

interface SocialMediaLinksProps {
  compact?: boolean;
}

const socialLinks: SocialMediaLink[] = [
  {
    name: 'GitHub',
    url: SocialUrls.GITHUB,
    icon: faGithub,
    color: '#777',
  },
  {
    name: 'LinkedIn',
    url: SocialUrls.LINKEDIN,
    icon: faLinkedin,
    color: '#0077b5',
  },
  {
    name: 'Facebook',
    url: SocialUrls.FACEBOOK,
    icon: faFacebook,
    color: '#3b5998',
  },
  {
    name: 'Email',
    url: `mailto:${EmailAddresses.RENE}`,
    icon: faEnvelope,
    color: '#999',
  },
];

const SocialMediaLinks = ({ compact = false }: SocialMediaLinksProps) => {
  const { t } = useTranslation();

  return (
    <div className={`${classes.container} ${compact ? classes.compact : ''}`}>
      {!compact && <Typography variant="h3">{t('contact.socialMedia.title')}</Typography>}
      {!compact && (
        <Typography variant="body1" component="p">
          {t('contact.socialMedia.description')}
        </Typography>
      )}
      <div className={classes.socialLinks}>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialLink}
            title={link.name}
            style={{ '--social-color': link.color } as React.CSSProperties}
          >
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
