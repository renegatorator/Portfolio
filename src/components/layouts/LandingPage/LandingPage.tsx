import AboutSection from '@/components/UI/AboutSection/AboutSection';
import HeroSection from '@/components/UI/HeroSection/HeroSection';
import TechStack from '@/components/UI/TechStack/TechStack';
import WorkExperienceSection from '@/components/UI/WorkExperienceSection/WorkExperienceSection';
import { Routes } from '@/constants/routes';

import PageLayout from '../PageLayout/PageLayout';

const LandingPage = () => {
  return (
    <PageLayout route={Routes.LANDING_PAGE}>
      <HeroSection />
      <TechStack />
      <AboutSection />
      <WorkExperienceSection />
    </PageLayout>
  );
};

export default LandingPage;
