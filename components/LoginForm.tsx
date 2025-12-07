"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { login } from '@/utils/api';
import { getErrorMessage, isEmail } from '@/utils/helpers';

export default function LoginForm() {
  const t = useTranslations('login');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!isEmail(email)) {
      setError(t('invalidEmail'));
      return;
    }
    if (!password) {
      setError(t('enterPassword'));
      return;
    }

    try {
      setLoading(true);
      const response = await login({ email, password });
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cureox_token', response.token);
        window.localStorage.setItem('cureox_user_email', response.user.email);
      }
      router.push('/');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="email" className="form-label">
          {t('emailAddress')}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="form-label">
          {t('password')}
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary flex justify-center items-center h-11 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t('signingIn') : t('signIn')}
      </button>

      <p className="text-xs text-theme-muted text-center">
        {t('termsNotice')}
      </p>
    </form>
  );
}

