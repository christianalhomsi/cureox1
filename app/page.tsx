import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import ProcessSection from '@/components/ProcessSection';
import ProductsSection from '@/components/ProductsSection';
import AboutSection from '@/components/AboutSection';
import OfflineApps from '@/components/OfflineApps';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ProductsSection />
      <OfflineApps />
      <Services />
      <ProcessSection />
      <AboutSection />
      <CTA />
    </>
  );
}

