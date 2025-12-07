'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslations } from 'next-intl';
import { Target, Eye, Users } from 'lucide-react';

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const t = useTranslations('about');

  const aboutCards = [
    { key: 'mission', icon: Target },
    { key: 'vision', icon: Eye },
    { key: 'team', icon: Users }
  ];

  return (
    <section ref={ref} id="about" className="py-20 bg-[var(--bg-primary)]">
      <div className="section-container">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            {t('title')} <span className="text-gradient">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-theme-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.key}
                className={`
                  bg-theme-card p-8 rounded-xl shadow-lg border border-theme
                  card-animated hover-glow group
                  ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-[#01C4F0]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-theme-primary">
                  {t(`${card.key}.title`)}
                </h3>
                <p className="text-theme-secondary text-sm leading-relaxed">
                  {t(`${card.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
