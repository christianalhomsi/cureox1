'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CTA() {
  const t = useTranslations('cta');
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Animated decorative circles */}
      <div
        className={`absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      />
      <div
        className={`absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        style={{ transitionDelay: '200ms' }}
      />

      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 text-theme-primary ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            {t('title')} <span className="text-gradient">{t('title') ? '' : ''}</span>
          </h2>
          <p
            className={`text-lg text-theme-secondary max-w-2xl mx-auto mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '150ms' }}
          >
            {t('description')}
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}
          >
            {/* Primary Button - Modern gradient style */}
            <Link
              href="/demo"
              className="group relative inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 btn-animated"
              style={{
                background: 'linear-gradient(to right, #0061A5, #01C4F0)',
                boxShadow: '0 10px 15px -3px rgba(0, 97, 165, 0.25)'
              }}
            >
              {t('requestDemo')}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Secondary Button - Outlined style */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-theme-card hover:opacity-90 text-theme-primary px-8 py-3.5 rounded-lg font-semibold border border-theme transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#01C4F0]/50 hover:shadow-lg"
            >
              {t('talkToSales')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

