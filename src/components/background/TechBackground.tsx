import dynamic from 'next/dynamic';

import classes from './TechBackground.module.scss';

// three.js is loaded client-side only, after the page content has painted.
const BackgroundCanvas = dynamic(() => import('./BackgroundCanvas'), { ssr: false });

const TechBackground = () => (
  <div className={classes.background} aria-hidden="true">
    <BackgroundCanvas />
    <div className={classes.scrim} />
  </div>
);

export default TechBackground;
