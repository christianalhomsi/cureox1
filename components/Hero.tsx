'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0, 97, 165, 0.6), #020617)' }} />
        <Image
          src="/images/HeroSection.jpg"
          alt="Healthcare software hero"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-64 h-64 bg-[#01C4F0]/10 rounded-full blur-3xl transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ transitionDelay: '300ms' }}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 bg-[#0061A5]/10 rounded-full blur-3xl transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ transitionDelay: '500ms' }}
        />
      </div>

      <div className="section-container relative">
        <div className="max-w-3xl text-center mx-auto">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {t('title')} <span className="text-gradient">{t('titleHighlight')}</span> {t('titleEnd')}
          </h1>
          <p
            className={`text-lg md:text-xl text-gray-200 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('description')}
          </p>
          <div
            className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <Link
              href="/demo"
              className="btn-primary btn-animated flex items-center px-6 py-3 hover:scale-105 hover:shadow-lg hover:shadow-[#0061A5]/30 transition-all duration-300"
            >
              <span className="mr-2">{t('requestDemo')}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-medium border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40"
            >
              {t('viewPricing')}
            </Link>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '800ms' }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
}





