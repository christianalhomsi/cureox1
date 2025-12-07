"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { verifyEmail } from '@/utils/api';
import { getErrorMessage, isEmail } from '@/utils/helpers';

export default function VerifyEmailForm() {
  const t = useTranslations('verifyEmail');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isEmail(email)) {
      setError(t('invalidEmail'));
      return;
    }
    if (!code.trim()) {
      setError(t('enterCode'));
      return;
    }

    try {
      setLoading(true);
      const result = await verifyEmail({ email, code });
      if (result.success) {
        setSuccess(t('successMessage'));
        setTimeout(() => router.push('/login'), 1200);
      } else {
        setError(t('failedMessage'));
      }
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
        <label htmlFor="code" className="form-label">
          {t('verificationCode')}
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="form-input"
          required
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-emerald-500">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary flex justify-center items-center h-11 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t('verifying') : t('verifyEmail')}
      </button>
    </form>
  );
}

