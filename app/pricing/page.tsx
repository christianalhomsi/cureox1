'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/utils/format';
import { getAllProducts } from '@/app/products/products-data';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const productCopy = useTranslations('productContent');
  const products = getAllProducts();

  return (
    <div className="py-24 bg-[var(--bg-secondary)]">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            {t('titlePart1')} <span className="text-gradient">{t('titlePart2')}</span>
          </h1>
          <p className="text-theme-secondary">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const name = productCopy(`${product.i18nKey}.name`);
            const short = productCopy(`${product.i18nKey}.short`);
            const highlights =
              (productCopy.raw(`${product.i18nKey}.highlights`) as string[]) ?? [];

            return (
              <div
                key={product.id}
                className="bg-theme-card border border-theme rounded-2xl p-6 flex flex-col shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-2 text-theme-primary">{name}</h2>
                <p className="text-theme-secondary text-sm mb-4">{short}</p>

              <p className="text-3xl font-bold mb-1 text-theme-primary">
                {formatCurrency(product.annualPrice)}
                <span className="text-sm text-theme-muted font-normal"> {t('perMonth')}</span>
              </p>

                <ul className="mt-4 mb-6 space-y-2 text-sm text-theme-secondary">
                  {highlights.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="mr-2" style={{ color: '#01C4F0' }}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3">
                  <Link
                    href={{ pathname: '/checkout', query: { product: product.id } }}
                    className="btn-primary w-full text-center"
                  >
                    {t('choosePlan')}
                  </Link>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm text-center"
                    style={{ color: '#01C4F0' }}
                  >
                    {t('viewProductDetails')}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
