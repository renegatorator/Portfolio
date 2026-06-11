import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

import classes from './TechBackground.module.scss';

// three.js is loaded client-side only, after the page content has painted.
const BackgroundCanvas = dynamic(() => import('./BackgroundCanvas'), { ssr: false });

const TechBackground = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  // Keep the fixed canvas aligned with the visual viewport — inset: 0 tracks
  // the layout viewport and leaves a gap when the URL bar hides on mobile.
  useEffect(() => {
    const root = rootRef.current;
    const viewport = window.visualViewport;

    if (!root || !viewport) {
      return;
    }

    const sync = () => {
      root.style.height = `${viewport.height}px`;
      root.style.transform = `translateY(${viewport.offsetTop}px)`;
    };

    sync();
    viewport.addEventListener('resize', sync);
    viewport.addEventListener('scroll', sync);

    return () => {
      viewport.removeEventListener('resize', sync);
      viewport.removeEventListener('scroll', sync);
    };
  }, []);

  return (
    <div ref={rootRef} className={classes.background} aria-hidden="true">
      <BackgroundCanvas />
      <div className={classes.scrim} />
    </div>
  );
};

export default TechBackground;
