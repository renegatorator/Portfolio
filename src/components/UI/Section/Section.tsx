import { ReactNode } from 'react';
import classes from './Section.module.scss';
import classNames from 'classnames';

interface SectionProps {
  children: ReactNode;
  gap?: number;
  alignment?: 'left' | 'center' | 'right';
  background?: 'transparent' | 'default' | 'gradient';
  shadow?: 'medium' | 'large';
  border?: boolean;
}

const Section = ({
  children,
  gap = 16,
  alignment = 'left',
  background = 'default',
  shadow = 'medium',
  border = true,
}: SectionProps) => {
  return (
    <section
      className={classNames(
        classes.container,
        classes[alignment],
        classes[background],
        classes[shadow],
        { [classes.border]: border },
      )}
      style={{ gap: `${gap}px` }}
    >
      {children}
    </section>
  );
};

export default Section;
