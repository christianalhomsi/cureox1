'use client';

import { Code2, Plug, Files, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslations } from 'next-intl';

const serviceIcons = [Code2, Plug, Files, MessageSquare];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const t = useTranslations('services');

  const services = [
    { key: 'softwareDevelopment', icon: Code2 },
    { key: 'integrationServices', icon: Plug },
    { key: 'dataManagement', icon: Files },
    { key: 'technicalSupport', icon: MessageSquare }
  ];

  return (
    <section ref={ref} id="our-services" className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            {t('title')} <span className="text-gradient">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-theme-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className={`
                  bg-theme-card p-6 rounded-xl shadow-lg border border-theme
                  card-animated hover-glow group
                  ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <IconComponent className="w-6 h-6 text-[#01C4F0]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-theme-primary">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-theme-secondary text-sm">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
