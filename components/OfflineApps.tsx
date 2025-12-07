'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function OfflineApps() {
  const t = useTranslations('offlineApps');

  const apps = [
    { id: 'dental', image: '/images/Dentist.jpg' },
    { id: 'pharmacy', image: '/images/Pharmacy.png' },
    { id: 'medical', image: '/images/Doctor.jpg' }
  ];

  return (
    <section className="py-20 bg-theme-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-theme-primary">{t('title')} </span>
            <span style={{ color: '#01C4F0' }}>{t('titleHighlight')}</span>
          </h2>
          <p className="text-theme-secondary text-lg max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-theme-card border border-theme rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={app.image}
                  alt={t(`${app.id}.name`)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-theme-primary mb-3">
                  {t(`${app.id}.name`)}
                </h3>
                <p className="text-theme-secondary mb-4">
                  {t(`${app.id}.description`)}
                </p>
                <Link
                  href={`/offline/${app.id}-offline`}
                  className="inline-block text-sm px-4 py-2 rounded-md border border-theme hover:bg-theme-card-hover transition-colors text-theme-primary"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
