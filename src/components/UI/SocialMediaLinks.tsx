import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
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
    url: 'https://github.com/yourusername',
    icon: faGithub,
    color: '#333',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: faLinkedin,
    color: '#0077b5',
  },
  {
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
  },
];

const SocialMediaLinks = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.socialMediaContainer}>
      <h3>{t('contact.socialMedia.title')}</h3>
      <p className={classes.socialDescription}>{t('contact.socialMedia.description')}</p>
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
