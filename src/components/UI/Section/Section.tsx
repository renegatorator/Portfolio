import classNames from 'classnames';
import { ReactNode } from 'react';

import classes from './Section.module.scss';

interface SectionProps {
  children: ReactNode;
  gap?: number;
  alignment?: 'left' | 'center' | 'right';
  background?: 'transparent' | 'default' | 'gradient';
  shadow?: 'medium' | 'large';
  border?: boolean;
  noPadding?: boolean;
  className?: string;
}

const Section = ({
  children,
  gap = 16,
  alignment = 'left',
  background = 'default',
  shadow = 'medium',
  border = true,
  noPadding,
  className = '',
}: SectionProps) => {
  return (
    <section
      className={classNames(
        classes.container,
        classes[alignment],
        classes[background],
        classes[shadow],
        className,
        { [classes.border]: border },
        { [classes.noPadding]: noPadding },
      )}
      style={{ gap: `${gap}px` }}
    >
      {children}
    </section>
  );
};

export default Section;
