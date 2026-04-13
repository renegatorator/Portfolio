import classNames from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';

import classes from './Reveal.module.scss';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'left' | 'right';
  once?: boolean;
}

const Reveal = ({
  children,
  className,
  delayMs = 0,
  direction = 'up',
  once = true,
}: RevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px',
      },
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  return (
    <div
      ref={elementRef}
      className={classNames(classes.reveal, classes[direction], className, {
        [classes.visible]: isVisible,
      })}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
