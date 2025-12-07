'use client';

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="py-24 bg-[var(--bg-secondary)]">
      <div className="section-container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-theme-primary">{t('title')}</h1>
        <p className="text-sm text-theme-muted mb-10">{t('lastUpdated')}</p>

        <section className="space-y-4 mb-8 text-theme-secondary text-sm md:text-base">
          <p>{t('intro1')}</p>
          <p>{t('intro2')}</p>
        </section>

        <section className="mb-8 text-theme-secondary text-sm md:text-base">
          <h2 className="text-xl font-semibold mb-3 text-theme-primary">{t('infoCollectTitle')}</h2>
          <p>{t('infoCollectText')}</p>
        </section>

        <section className="mb-8 text-theme-secondary text-sm md:text-base">
          <h2 className="text-xl font-semibold mb-3 text-theme-primary">{t('howWeUseTitle')}</h2>
          <p>{t('howWeUseText')}</p>
        </section>

        <section className="mb-8 text-theme-secondary text-sm md:text-base">
          <h2 className="text-xl font-semibold mb-3 text-theme-primary">{t('securityTitle')}</h2>
          <p>{t('securityText')}</p>
        </section>

        <section className="text-theme-secondary text-sm md:text-base">
          <h2 className="text-xl font-semibold mb-3 text-theme-primary">{t('contactTitle')}</h2>
          <p>{t('contactText')}</p>
        </section>
      </div>
    </div>
  );
}
