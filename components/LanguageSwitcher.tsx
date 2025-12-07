'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nProvider';
import { localeNames } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
    const handleStorage = () => {
      const newTheme = window.localStorage.getItem('theme');
      if (newTheme === 'light' || newTheme === 'dark') {
        setTheme(newTheme);
      }
    };
    window.addEventListener('storage', handleStorage);

    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains('light-mode');
      setTheme(isLight ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('storage', handleStorage);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const flags: Record<Locale, string> = {
    en: '/lang_icon/uk_icon.png',
    ar: '/lang_icon/ksa_icon.png',
    fr: '/lang_icon/france_icon.png'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors text-sm ${
          theme === 'light'
            ? 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            : 'border-gray-700 text-slate-200 hover:bg-gray-800 hover:text-white'
        }`}
        aria-label="Select language"
      >
        <Image src={flags[locale]} alt="" width={20} height={20} className="rounded-sm" />
        <span>{localeNames[locale]}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-36 rounded-md border shadow-lg z-50 ${
          theme === 'light'
            ? 'bg-white border-slate-200'
            : 'bg-slate-900 border-gray-700'
        }`}>
          {(['en', 'ar', 'fr'] as Locale[]).map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                locale === loc
                  ? theme === 'light'
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'bg-gray-800 text-white font-medium'
                  : theme === 'light'
                    ? 'text-slate-600 hover:bg-slate-50'
                    : 'text-slate-200 hover:bg-gray-800'
              }`}
            >
              <Image src={flags[loc]} alt="" width={20} height={20} className="inline rounded-sm mr-2" />
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

