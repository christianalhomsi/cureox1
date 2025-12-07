'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Locale, defaultLocale, isRTL } from './config';

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

type Props = {
  children: ReactNode;
};

export default function I18nProvider({ children }: Props) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'ar')) {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    // Load messages for current locale
    async function loadMessages() {
      try {
        const msgs = await import(`../messages/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    }
    loadMessages();

    // Update document attributes for RTL support
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';
    
    // Add/remove RTL class for styling
    if (isRTL(locale)) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  if (!messages) {
    // Show loading state or return null while messages load
    return null;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, isRTL: isRTL(locale) }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </I18nContext.Provider>
  );
}

