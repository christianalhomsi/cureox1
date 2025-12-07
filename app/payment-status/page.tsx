'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function PaymentStatusPage() {
  const t = useTranslations('paymentStatus');
  const searchParams = useSearchParams();

  const status = (searchParams.get('status') || 'processing').toLowerCase();
  const reference = searchParams.get('reference');

  let heading = t('processingTitle');
  let message = t('processingMessage');

  if (status === 'success') {
    heading = t('successTitle');
    message = t('successMessage');
  } else if (status === 'failed') {
    heading = t('failedTitle');
    message = t('failedMessage');
  }

  return (
    <div className="py-24 bg-[var(--bg-secondary)]">
      <div className="section-container max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">{heading}</h1>
        <p className="text-theme-secondary mb-4">{message}</p>
        {reference && (
          <p className="text-sm text-theme-muted">
            {t('reference')} <span className="font-mono">{reference}</span>
          </p>
        )}
      </div>
    </div>
  );
}
