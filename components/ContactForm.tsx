"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getProductById } from '@/app/products/products-data';
import { sleep } from '@/utils/helpers';

export default function ContactForm() {
  const t = useTranslations('contact');
  const productCopy = useTranslations('productContent');
  const checkoutT = useTranslations('checkout');
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

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
      setSubject(`${t('planInquiry')}: ${planName} - ${productName}`);
      setMessage(`${t('planMessage')} ${planName} ($${price}) ${t('forProduct')} ${productName}.`);
    }
  }, [searchParams, productCopy, checkoutT, t]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSuccess(null);
    setLoading(true);

    try {
      await sleep(800);
      setSuccess(t('successMessage'));
      setName('');
      setEmail('');
      setSubject('');
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
            {t('emailLabel')}
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
        <label htmlFor="subject" className="form-label">
          {t('subject')}
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-input"
          required
        />
      </div>

      {success && <p className="text-sm text-emerald-500">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto btn-primary flex justify-center items-center h-11 px-8 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t('sending') : t('sendMessage')}
      </button>
    </form>
  );
}

