import HeroSection from '../components/HeroSection';
import StatsStrip from '../components/StatsStrip';
import ProblemSolution from '../components/ProblemSolution';
import WhatWeDo from '../components/WhatWeDo';
import TestimonialsSection from '../components/TestimonialsSection';
import CTABanner from '../components/CTABanner';

interface HomePageProps {
  lang: 'en' | 'ar';
  toggleLang: () => void;
}

export default function HomePage({ lang }: HomePageProps) {
  return (
    <>
      <HeroSection lang={lang} />
      <StatsStrip lang={lang} />
      <ProblemSolution lang={lang} />
      <WhatWeDo lang={lang} />
      <TestimonialsSection lang={lang} />
      <CTABanner lang={lang} />
    </>
  );
}
