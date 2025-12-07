"use client";

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { sleep } from '@/utils/helpers';

export default function DemoRequestForm() {
  const t = useTranslations('demo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSuccess(null);
    setLoading(true);

    try {
      // Placeholder for real API call
      await sleep(800);
      setSuccess(t('successMessage'));
      setName('');
      setEmail('');
      setOrganization('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="form-label">
            {t('fullName')}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            {t('workEmail')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="form-label">
          {t('organization')}
        </label>
        <input
          id="organization"
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          {t('demoQuestion')}
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-input"
        />
      </div>

      {success && <p className="text-sm text-emerald-500">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto btn-primary flex justify-center items-center h-11 px-8 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t('sendingRequest') : t('requestDemo')}
      </button>
    </form>
  );
}

