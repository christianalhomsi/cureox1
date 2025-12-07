'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  index?: number;
  isVisible?: boolean;
};

export default function ProductCard({ title, description, image, href, index = 0, isVisible = true }: ProductCardProps) {
  const t = useTranslations('products');

  return (
    <article
      className={`
        bg-theme-card rounded-xl overflow-hidden shadow-lg border border-theme flex flex-col
        card-animated hover-glow group
        ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
      `}
      style={{ animationDelay: `${(index + 1) * 150}ms` }}
    >
      <div className="h-44 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-theme-primary group-hover:text-[#01C4F0] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-theme-secondary text-sm mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <Link
            href={href}
            className="text-sm font-medium transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1"
            style={{ color: '#01C4F0' }}
          >
            {t('viewDetails')}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href={{ pathname: '/checkout', query: { product: href.split('/').pop() } }}
            className="btn-primary btn-animated text-xs hover:scale-105 transition-transform duration-300"
          >
            {t('buyNow')}
          </Link>
        </div>
      </div>
    </article>
  );
}

