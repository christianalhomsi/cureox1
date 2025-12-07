'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById } from '@/app/products/products-data';

export default function ContactPage() {
  const t = useTranslations('contact');
  const productCopy = useTranslations('productContent');
  const checkoutT = useTranslations('checkout');
  const searchParams = useSearchParams();
  const [planInfo, setPlanInfo] = useState('');

  useEffect(() => {
    const planId = searchParams.get('plan');
    const productId = searchParams.get('product');
    const price = searchParams.get('price');

    if (planId && productId) {
      const product = getProductById(productId);
      const productName = product ? productCopy(`${product.i18nKey}.name`) : productId;
      const planNames: Record<string, string> = {
        trial: checkoutT('plan1'),
        '2months': checkoutT('plan2'),
        '1year': checkoutT('plan3'),
        '2years': checkoutT('plan4')
      };
      const planName = planNames[planId] || planId;
      setPlanInfo(`${planName} ($${price}) - ${productName}`);
    }
  }, [searchParams, productCopy, checkoutT]);

  return (
    <div className="py-24 bg-[var(--bg-secondary)]">
      <div className="section-container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">{t('title')}</h1>
          <p className="text-theme-secondary text-lg">
            {t('description')}
          </p>
        </div>

        {planInfo && (
          <div className="bg-[#01C4F0]/10 border border-[#01C4F0]/30 rounded-xl p-6 mb-8 text-center">
            <p className="text-sm text-theme-muted mb-2">{t('selectedPlan')}</p>
            <p className="text-xl font-bold text-theme-primary">{planInfo}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="https://wa.me/359877608877"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-theme-card border border-theme rounded-2xl p-8 hover:border-[#25D366] transition-colors group"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366]/10 mb-4 mx-auto group-hover:bg-[#25D366]/20 transition-colors">
              <svg className="w-8 h-8" style={{ color: '#25D366' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 text-theme-primary text-center">{t('whatsapp')}</h2>
            <p className="text-theme-secondary text-center text-sm mb-4">{t('whatsappDesc')}</p>
            <p className="text-[#25D366] font-semibold text-center">+359 87 760 8877</p>
          </a>

          <a
            href="mailto:info@cureox.com"
            className="bg-theme-card border border-theme rounded-2xl p-8 hover:border-[#0061A5] transition-colors group"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0061A5]/10 mb-4 mx-auto group-hover:bg-[#0061A5]/20 transition-colors">
              <svg className="w-8 h-8" style={{ color: '#0061A5' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 text-theme-primary text-center">{t('emailContact')}</h2>
            <p className="text-theme-secondary text-center text-sm mb-4">{t('emailDesc')}</p>
            <p className="text-[#0061A5] font-semibold text-center">info@cureox.com</p>
          </a>
        </div>
      </div>
    </div>
  );
}
