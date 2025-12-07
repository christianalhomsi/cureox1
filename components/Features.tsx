'use client';

import { useTranslations } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Stethoscope, Pill, Heart } from 'lucide-react';

const featureIcons = [Stethoscope, Pill, Heart];

export default function Features() {
  const t = useTranslations('features');
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const features = [
    { key: 'clinicManagement', descKey: 'clinicManagementDesc' },
    { key: 'pharmacyInventory', descKey: 'pharmacyInventoryDesc' },
    { key: 'patientExperience', descKey: 'patientExperienceDesc' },
  ];

  return (
    <section ref={ref} id="services" className="py-20 bg-[var(--bg-primary)]">
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
          {features.map((feature, index) => {
            const IconComponent = featureIcons[index];
            return (
              <div
                key={feature.key}
                className={`
                  bg-theme-card p-6 rounded-xl shadow-lg border border-theme
                  card-animated hover-glow group
                  ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-[#01C4F0]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-theme-primary">{t(feature.key)}</h3>
                <p className="text-theme-secondary text-sm">
                  {t(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

