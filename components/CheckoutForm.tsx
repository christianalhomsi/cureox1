"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getProductById } from '@/app/products/products-data';
import Link from 'next/link';

type Plan = {
  id: string;
  name: string;
  price: number;
  duration: string;
  popular?: boolean;
};

export default function CheckoutForm() {
  const t = useTranslations('checkout');
  const productCopy = useTranslations('productContent');
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState('');

  useEffect(() => {
    const fromQuery = searchParams.get('product');
    if (fromQuery) {
      setProductId(fromQuery);
    }
  }, [searchParams]);

  const product = productId ? getProductById(productId) : null;
  const productName = product ? productCopy(`${product.i18nKey}.name`) : '';

  const individualPlans: Plan[] = [
    { id: 'trial', name: t('plan1'), price: 0, duration: t('plan1Duration') },
    { id: '2months', name: t('plan2'), price: 5, duration: t('plan2Duration') },
    { id: '1year', name: t('plan3'), price: 29, duration: t('plan3Duration'), popular: true },
    { id: '2years', name: t('plan4'), price: 49, duration: t('plan4Duration') }
  ];

  return (
    <div className="space-y-8">
      {productId && (
        <div className="bg-theme-card border border-theme rounded-xl p-4 text-center">
          <p className="text-sm text-theme-muted mb-1">{t('selectedProduct')}</p>
          <p className="text-xl font-bold text-theme-primary">{productName}</p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6 text-theme-primary text-center">{t('individualPlans')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {individualPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-theme-card border rounded-xl p-6 flex flex-col relative ${
                plan.popular ? 'border-[#0061A5] shadow-lg' : 'border-theme'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0061A5] text-white text-xs font-medium rounded-full">
                  {t('popular')}
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2 text-theme-primary">{plan.name}</h3>
              <p className="text-sm text-theme-muted mb-4">{plan.duration}</p>
              <p className="text-3xl font-bold mb-6 text-theme-primary">
                ${plan.price}
              </p>
              <Link
                href={`/contact?plan=${plan.id}&product=${productId}&price=${plan.price}`}
                className="mt-auto btn-primary w-full text-center"
                style={plan.popular ? { backgroundColor: '#0061A5' } : {}}
              >
                {t('selectPlan')}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-theme-primary text-center">{t('centerPlans')}</h2>
        <div className="max-w-md mx-auto">
          <div className="bg-theme-card border border-theme rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-3 text-theme-primary">{t('enterprisePlan')}</h3>
            <p className="text-theme-secondary mb-6">{t('enterpriseDescription')}</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#01C4F0] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

