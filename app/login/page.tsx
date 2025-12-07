'use client';

import { useTranslations } from 'next-intl';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const t = useTranslations('login');

  return (
    <div className="py-24">
      <div className="section-container">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">{t('title')}</h1>
          <p className="text-theme-secondary">
            {t('description')}
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
