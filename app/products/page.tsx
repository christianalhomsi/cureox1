'use client';

import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from './products-data';

export default function ProductsPage() {
  const t = useTranslations('productsPage');
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
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={productCopy(`${product.i18nKey}.name`)}
              description={productCopy(`${product.i18nKey}.short`)}
              image={product.image}
              href={`/products/${product.id}`}
              index={index}
              isVisible
            />
          ))}
        </div>
      </div>
    </div>
  );
}
