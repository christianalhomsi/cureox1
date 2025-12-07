'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/utils/format';
import { getOfflineProductById } from '../offline-data';

type OfflineProductPageProps = {
  params: Promise<{ id: string }>;
};

export default function OfflineProductPage({ params }: OfflineProductPageProps) {
  const { id } = use(params);
  const t = useTranslations('products');
  const productCopy = useTranslations('offlineProductContent');
  const product = getOfflineProductById(id);

  if (!product) {
    notFound();
  }

  const copy = productCopy.raw(`${product.i18nKey}`) as {
    name: string;
    long: string;
    highlights: string[];
  };

  return (
    <div className="py-24">
      <div className="section-container">
        {product && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
              <div>
                <p className="text-sm uppercase tracking-wide mb-2" style={{ color: '#01C4F0' }}>{t('productLabel')}</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">
                  {copy.name}
                </h1>
                <p className="text-theme-secondary mb-6">
                  {copy.long}
                </p>
                <p className="text-3xl font-bold mb-6 text-theme-primary">
                  {formatCurrency(product.annualPrice)}{' '}
                  <span className="text-sm text-theme-muted font-normal">{t('perMonth')}</span>
                </p>
                <Link
                  href="/contact"
                  className="btn-primary"
                >
                  {t('startSubscription')}
                </Link>
              </div>

              <div className="rounded-2xl overflow-hidden border border-theme shadow-2xl">
                <img
                  src={product.image}
                  alt={copy.name}
                  className="w-full h-80 md:h-[400px] object-cover"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.highlights?.map((highlight) => (
                <div
                  key={highlight}
                  className="bg-theme-card border border-theme rounded-xl p-5 text-sm text-theme-secondary"
                >
                  {highlight}
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
