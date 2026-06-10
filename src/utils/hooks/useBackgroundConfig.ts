import { BACKGROUND_TIER_CONFIGS, BackgroundTiers } from '@/constants/background';
import type { BackgroundTierConfig } from '@/types/background';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';

/** Resolves the background complexity tier from the current viewport width. */
export const useBackgroundConfig = (): BackgroundTierConfig => {
  const isTablet = useBreakpoint('md');
  const isMobile = useBreakpoint('sm');

  const tier = isMobile
    ? BackgroundTiers.MOBILE
    : isTablet
      ? BackgroundTiers.TABLET
      : BackgroundTiers.DESKTOP;

  return BACKGROUND_TIER_CONFIGS[tier];
};
