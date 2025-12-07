'use client';

import ProductCard from '@/components/ProductCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslations } from 'next-intl';

const featuredProducts = [
  {
    id: 'dental-clinic-management',
    i18nKey: 'dental',
    image: '/images/Dentist.jpg',
    href: '/products/dental-clinic-management'
  },
  {
    id: 'pharmacy-management',
    i18nKey: 'pharmacy',
    image: '/images/Pharmacy.png',
    href: '/products/pharmacy-management'
  },
  {
    id: 'medical-clinic-management',
    i18nKey: 'medical',
    image: '/images/Doctor.jpg',
    href: '/products/medical-clinic-management'
  },
  {
    id: 'patient-companion-app',
    i18nKey: 'patient',
    image: '/images/Patient.jpg',
    href: '/products/patient-companion-app'
  },
  {
    id: 'distributor-management',
    i18nKey: 'distributor',
    image: '/images/Distributor.jpg',
    href: '/products/distributor-management'
  }
];

export default function ProductsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const t = useTranslations('homeProducts');

  return (
    <section ref={ref} id="products" className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            {t('title')} <span className="text-gradient">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-theme-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={t(`items.${product.i18nKey}.title`)}
              description={t(`items.${product.i18nKey}.description`)}
              image={product.image}
              href={product.href}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

