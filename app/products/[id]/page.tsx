'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/utils/format';
import { getProductById } from '../products-data';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const t = useTranslations('products');
  const productCopy = useTranslations('productContent');
  const product = getProductById(id);

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
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={{ pathname: '/checkout', query: { product: product.id } }}
                    className="btn-primary"
                  >
                    {t('startSubscription')}
                  </Link>
                  <Link
                    href={{ pathname: '/demo', query: { product: product.id } }}
                    className="bg-theme-card border border-theme text-sm px-5 py-2 rounded-md hover:opacity-80 text-theme-primary transition-opacity"
                  >
                    {t('requestLiveDemo')}
                  </Link>
                </div>
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

            <section className="mt-16 bg-gradient-to-br from-[#0061A5] to-[#01C4F0] rounded-2xl p-8 md:p-10 text-white">
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('mobileApp.title')}</h2>
                <p className="text-white/90 mb-6">{t('mobileApp.description')}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="bg-white text-[#0061A5] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    {t('mobileApp.downloadIOS')}
                  </a>
                  <a
                    href="#"
                    className="bg-white text-[#0061A5] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    {t('mobileApp.downloadAndroid')}
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
