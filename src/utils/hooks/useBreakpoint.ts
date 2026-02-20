import { useEffect, useState } from 'react';

import { Breakpoint, breakpoints } from '@/constants/theme';

/**
 * Hook that returns true if the screen width is at or below the specified breakpoint
 * @param breakpoint - The breakpoint to check against (xs, sm, md, lg, xl)
 * @returns boolean - true if screen width <= breakpoint, false otherwise
 */
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setMatches(window.innerWidth <= breakpoints[breakpoint]);
    };

    // Initial check
    checkBreakpoint();

    // Add event listener
    window.addEventListener('resize', checkBreakpoint);

    // Cleanup
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);

  return matches;
};
