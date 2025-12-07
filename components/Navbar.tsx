"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/#about', label: t('about') },
    { href: '/#services', label: t('services') },
    { href: '/#products', label: t('products') },
    { href: '/pricing', label: t('pricing') },
    { href: '/demo', label: t('requestDemo') }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('light-mode', stored === 'light');
      document.documentElement.classList.toggle('dark-mode', stored === 'dark');
      return;
    }
    setTheme('dark');
    document.documentElement.classList.add('dark-mode');
    window.localStorage.setItem('theme', 'dark');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 backdrop-blur-2xl transition-all duration-300 ${
      scrolled
        ? theme === 'light'
          ? 'bg-white/80 supports-[backdrop-filter]:bg-white/70 shadow-lg shadow-slate-200/50'
          : 'bg-slate-950/80 supports-[backdrop-filter]:bg-slate-950/70 shadow-lg shadow-black/20'
        : theme === 'light'
          ? 'bg-white/40 supports-[backdrop-filter]:bg-white/30'
          : 'bg-slate-950/40 supports-[backdrop-filter]:bg-slate-950/20'
    }`}>
	      <div className="section-container">
	        <div className="flex h-20 items-center justify-between gap-6">
	          <Link
	            href="/"
	            className={`flex items-center text-xl font-semibold tracking-tight md:text-2xl transition-opacity hover:opacity-90 ${
	              theme === 'light'
	                ? 'bg-clip-text text-transparent'
	                : 'text-gradient'
	            }`}
	            style={theme === 'light' ? { backgroundImage: 'linear-gradient(to right, #0061A5, #01C4F0)' } : undefined}
	          >
	            <Image
              src="/logo/logo.png"
              alt="CureOx Logo"
              width={56}
              height={56}
              className="h-12 w-12 md:h-14 md:w-14"
              priority
            />
	          </Link>

	          <div className="hidden md:flex items-center space-x-6 text-sm">
	            {navLinks.map((link) => (
	              <Link
	                key={link.href}
	                href={link.href}
	                className={`nav-link nav-link-underline relative text-sm font-medium transition-colors after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
	                  theme === 'light'
	                    ? 'text-slate-600 hover:bg-transparent hover:text-slate-900'
	                    : 'text-slate-200/80 hover:bg-transparent hover:text-white'
	                }`}
	              >
	                {link.label}
	              </Link>
	            ))}
	            <button
	              type="button"
	              onClick={toggleTheme}
	              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
	                theme === 'light'
	                  ? 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 focus-visible:ring-offset-white'
	                  : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white focus-visible:ring-offset-slate-950'
	              }`}
	              style={{ ['--tw-ring-color' as string]: '#01C4F0' }}
	            >
	              {theme === 'dark' ? (
	                /* Moon icon - Heroicons (MIT License) */
	                <svg
	                  className="h-5 w-5"
	                  viewBox="0 0 24 24"
	                  fill="none"
	                  stroke="currentColor"
	                  strokeWidth={2}
	                  strokeLinecap="round"
	                  strokeLinejoin="round"
	                >
	                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	                </svg>
	              ) : (
	                /* Sun icon - Heroicons (MIT License) */
	                <svg
	                  className="h-5 w-5"
	                  viewBox="0 0 24 24"
	                  fill="none"
	                  stroke="currentColor"
	                  strokeWidth={2}
	                  strokeLinecap="round"
	                  strokeLinejoin="round"
	                >
	                  <circle cx="12" cy="12" r="5" />
	                  <line x1="12" y1="1" x2="12" y2="3" />
	                  <line x1="12" y1="21" x2="12" y2="23" />
	                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
	                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
	                  <line x1="1" y1="12" x2="3" y2="12" />
	                  <line x1="21" y1="12" x2="23" y2="12" />
	                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
	                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	                </svg>
	              )}
	              <span className="sr-only">{t('toggleTheme')}</span>
	            </button>
	            <LanguageSwitcher />
	            {/* Modern CTA Button with glassmorphism and gradient effects */}
	            <Link
	              href="/contact"
	              className={`group relative ml-3 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
	                theme === 'light'
	                  ? 'focus-visible:ring-offset-white'
	                  : 'focus-visible:ring-offset-slate-950'
	              }`}
	              style={{
	                background: 'linear-gradient(to right, #01C4F0, #0061A5)',
	                boxShadow: theme === 'light' ? '0 10px 15px -3px rgba(0, 97, 165, 0.3)' : '0 10px 15px -3px rgba(1, 196, 240, 0.25)',
	                ['--tw-ring-color' as string]: '#01C4F0'
	              }}
	            >
	              {/* Animated background shimmer effect */}
	              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
	              {/* Glow effect on hover */}
	              <span
	                className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
	                style={{ background: 'linear-gradient(to right, #01C4F0, #0061A5)' }}
	              />
	              {/* Button content */}
	              <span className="relative z-10 flex items-center gap-2">
	                {t('contactUs')}
	                {/* Arrow Right icon - Heroicons (MIT License) */}
	                <svg
	                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
	                  viewBox="0 0 24 24"
	                  fill="none"
	                  stroke="currentColor"
	                  strokeWidth={2}
	                  strokeLinecap="round"
	                  strokeLinejoin="round"
	                >
	                  <path d="M5 12h14M12 5l7 7-7 7" />
	                </svg>
	              </span>
	            </Link>
	          </div>
	
	          <div className="flex items-center md:hidden">
	            <button
	              type="button"
	              onClick={toggleTheme}
	              className={`mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
	                theme === 'light'
	                  ? 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 focus-visible:ring-offset-white'
	                  : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white focus-visible:ring-offset-slate-950'
	              }`}
	              style={{ ['--tw-ring-color' as string]: '#01C4F0' }}
	            >
	              {theme === 'dark' ? (
	                /* Moon icon - Heroicons (MIT License) */
	                <svg
	                  className="h-5 w-5"
	                  viewBox="0 0 24 24"
	                  fill="none"
	                  stroke="currentColor"
	                  strokeWidth={2}
	                  strokeLinecap="round"
	                  strokeLinejoin="round"
	                >
	                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	                </svg>
	              ) : (
	                /* Sun icon - Heroicons (MIT License) */
	                <svg
	                  className="h-5 w-5"
	                  viewBox="0 0 24 24"
	                  fill="none"
	                  stroke="currentColor"
	                  strokeWidth={2}
	                  strokeLinecap="round"
	                  strokeLinejoin="round"
	                >
	                  <circle cx="12" cy="12" r="5" />
	                  <line x1="12" y1="1" x2="12" y2="3" />
	                  <line x1="12" y1="21" x2="12" y2="23" />
	                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
	                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
	                  <line x1="1" y1="12" x2="3" y2="12" />
	                  <line x1="21" y1="12" x2="23" y2="12" />
	                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
	                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	                </svg>
	              )}
	              <span className="sr-only">{t('toggleTheme')}</span>
	            </button>
	            <LanguageSwitcher />
	            <button
	              type="button"
	              onClick={() => setMobileOpen((v) => !v)}
	              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
	                theme === 'light'
	                  ? 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 focus-visible:ring-offset-white'
	                  : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white focus-visible:ring-offset-slate-950'
	              }`}
	              style={{ ['--tw-ring-color' as string]: '#01C4F0' }}
	            >
	              {/* Menu icon - Heroicons (MIT License) */}
	              <svg
	                className="h-5 w-5"
	                viewBox="0 0 24 24"
	                fill="none"
	                stroke="currentColor"
	                strokeWidth={2}
	                strokeLinecap="round"
	                strokeLinejoin="round"
	              >
	                <line x1="3" y1="6" x2="21" y2="6" />
	                <line x1="3" y1="12" x2="21" y2="12" />
	                <line x1="3" y1="18" x2="21" y2="18" />
	              </svg>
	            </button>
	          </div>
	        </div>
	      </div>

      {mobileOpen && (
        <div className={`md:hidden backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? theme === 'light'
              ? 'bg-white/90'
              : 'bg-slate-950/90'
            : theme === 'light'
              ? 'bg-white/70'
              : 'bg-slate-950/70'
        }`}>
	          <div className="space-y-1 px-4 pt-3 pb-6 text-sm">
	            {navLinks.map((link) => (
	              <Link
	                key={link.href}
	                href={link.href}
	                className={`block nav-link w-full text-left transition-colors ${
	                  theme === 'light'
	                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
	                    : 'text-slate-200/80 hover:bg-white/5'
	                }`}
	                onClick={() => setMobileOpen(false)}
	              >
	                {link.label}
	              </Link>
	            ))}
	            {/* Mobile Modern CTA Button */}
	            <Link
	              href="/contact"
	              className={`group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
	                theme === 'light'
	                  ? 'focus-visible:ring-offset-white'
	                  : 'focus-visible:ring-offset-slate-950'
	              }`}
	              style={{
	                background: 'linear-gradient(to right, #01C4F0, #0061A5)',
	                boxShadow: theme === 'light' ? '0 10px 15px -3px rgba(0, 97, 165, 0.3)' : '0 10px 15px -3px rgba(1, 196, 240, 0.25)',
	                ['--tw-ring-color' as string]: '#01C4F0'
	              }}
	              onClick={() => setMobileOpen(false)}
	            >
	              {/* Shimmer effect */}
	              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
	              {/* Glow effect */}
	              <span
	                className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
	                style={{ background: 'linear-gradient(to right, #01C4F0, #0061A5)' }}
	              />
	              {/* Button content */}
	              <span className="relative z-10 flex items-center gap-2">
	                {t('contactUs')}
	                {/* Arrow Right icon - Heroicons (MIT License) */}
	                <svg
	                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
	                  viewBox="0 0 24 24"
	                  fill="none"
	                  stroke="currentColor"
	                  strokeWidth={2}
	                  strokeLinecap="round"
	                  strokeLinejoin="round"
	                >
	                  <path d="M5 12h14M12 5l7 7-7 7" />
	                </svg>
	              </span>
	            </Link>
	          </div>
	        </div>
	      )}
	    </nav>
	  );
}

