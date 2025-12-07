'use client';

import { useTranslations } from 'next-intl';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const t = useTranslations('checkout');

  return (
    <div className="py-24 bg-[var(--bg-secondary)]">
      <div className="section-container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">{t('title')}</h1>
        <p className="text-theme-secondary mb-8">
          {t('description')}
        </p>
        <CheckoutForm />
      </div>
    </div>
  );
}
