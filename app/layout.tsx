import type { Metadata } from 'next';
import './globals.css';
import { Cairo } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import I18nProvider from '@/i18n/I18nProvider';
import NavigationLoader from '@/components/NavigationLoader';
import TopLoadingBar from '@/components/TopLoadingBar';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-cairo'
});

export const metadata: Metadata = {
  title: 'Cureox',
  description: 'Healthcare software solutions for clinics, pharmacies, and patients.',
  keywords: [
    'healthcare software',
    'medical clinic management',
    'dental clinic software',
    'pharmacy management system',
    'patient companion app',
    'electronic health records',
    'EHR software',
    'clinic management system',
    'medical practice software',
    'healthcare technology',
    'digital prescriptions',
    'appointment scheduling',
    'patient management',
    'medical billing software',
    'pharmacy inventory management',
    'distributor management',
    'healthcare solutions',
    'CureOx',
    'برمجيات الرعاية الصحية',
    'إدارة العيادات الطبية',
    'برنامج عيادات الأسنان',
    'نظام إدارة الصيدلية',
    'تطبيق المرافق للمرضى',
    'السجلات الصحية الإلكترونية',
    'نظام إدارة العيادات',
    'برمجيات الممارسة الطبية',
    'تكنولوجيا الرعاية الصحية',
    'الوصفات الرقمية',
    'جدولة المواعيد',
    'إدارة المرضى',
    'برنامج الفوترة الطبية',
    'إدارة مخزون الصيدلية',
    'إدارة الموزعين',
    'حلول الرعاية الصحية'
  ],
  icons: {
    icon: '/logo/logo.png',
    shortcut: '/logo/logo.png',
    apple: '/logo/logo.png',
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cairo.variable} dark-mode`} suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <I18nProvider>
          <TopLoadingBar />
          <NavigationLoader />
          <Navbar />
          <main className="pt-20 min-h-screen">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}

