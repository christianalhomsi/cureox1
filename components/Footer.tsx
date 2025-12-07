'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="mt-24 border-t border-theme bg-[var(--bg-primary)] py-12 sm:py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo/logo.png"
                alt="CureOx Logo"
                width={48}
                height={48}
                className="h-10 w-10 md:h-12 md:w-12"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-theme-muted">
              {t('tagline')}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-theme-primary">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="relative inline-flex items-center text-theme-muted transition-colors hover:text-[#01C4F0]"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="relative inline-flex items-center text-theme-muted transition-colors hover:text-[#01C4F0]"
                >
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="relative inline-flex items-center text-theme-muted transition-colors hover:text-[#01C4F0]"
                >
                  {t('products')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-theme-primary">
              {t('contact')}
            </h3>
            <p className="text-sm text-theme-muted">{t('location')}</p>
            <p className="mt-2 text-sm text-theme-muted">info@cureox.com</p>
            <p className="mt-2 text-sm text-theme-muted">+359 87 760 8877</p>
          </div>

          <div className="space-y-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-theme-primary">
              {t('legal')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="relative inline-flex items-center text-theme-muted transition-colors hover:text-[#01C4F0]"
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="relative inline-flex items-center text-theme-muted transition-colors hover:text-[#01C4F0]"
                >
                  {t('contactSupport')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-theme pt-6 text-center text-xs text-theme-muted sm:mt-12 sm:pt-8">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

