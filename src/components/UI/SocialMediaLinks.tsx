import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import classes from './SocialMediaLinks.module.scss';

interface SocialMediaLink {
  name: string;
  url: string;
  icon: IconDefinition;
  color: string;
}

const socialLinks: SocialMediaLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/renegatorator',
    icon: faGithub,
    color: '#777',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/rene-krajnc-a3400b190',
    icon: faLinkedin,
    color: '#0077b5',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/rene.krajnc',
    icon: faFacebook,
    color: '#3b5998',
  },
  {
    name: 'Email',
    url: 'mailto:renekrajnc@hotmail.com',
    icon: faEnvelope,
    color: '#999',
  },
  /*{
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: faTwitter,
    color: '#1da1f2',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/yourusername',
    icon: faInstagram,
    color: '#e4405f',
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/yourusername',
    icon: faDiscord,
    color: '#7289da',
  },*/
];

const SocialMediaLinks = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.socialMediaContainer}>
      <Typography variant="h3">{t('contact.socialMedia.title')}</Typography>
      <Typography variant="body1" component="p" className={classes.socialDescription}>
        {t('contact.socialMedia.description')}
      </Typography>
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
