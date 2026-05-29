import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ClientEnhancements } from '@/components/layout/ClientEnhancements';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const BASE_URL = 'https://gastrosingles.de/magazin';

export const metadata: Metadata = {
  title: {
    default: 'Partnersuche in der Gastronomie ❤️',
    template: '%s ❤️',
  },
  description:
    'Magazin für Köche, Sommeliers, Wirte und Servicekräfte. Partnersuche-Guides, Erfolgsgeschichten und Tipps für Dating trotz Schichtdienst.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    types: {
      'application/rss+xml': `${BASE_URL}/rss.xml`,
    },
  },
  openGraph: {
    title: 'Partnersuche in der Gastronomie ❤️',
    description: 'Magazin für Köche, Sommeliers, Wirte und Servicekräfte. Partnersuche-Guides, Erfolgsgeschichten und Dating-Tipps für den Schichtdienst.',
    url: BASE_URL,
    type: 'website',
    siteName: 'Gastrosingles Magazin',
    locale: 'de_DE',
    images: [{ url: `${BASE_URL}/images/hero-startseite.webp`, width: 1920, height: 1080, alt: 'Gastrosingles — Partnersuche für Köche, Sommeliers, Servicekräfte und Wirte' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partnersuche in der Gastronomie ❤️',
    description: 'Magazin für Köche, Sommeliers und Servicekräfte. Partnersuche-Guides und Dating-Tipps für den Schichtdienst.',
    images: [`${BASE_URL}/images/hero-startseite.webp`],
  },
  verification: {
    google: 'sBM54LsgZvWu9O8S8sMGQ4cGZqqMCyVWuxg7rBSyVos',
  },
  // Icons unter /magazin/images/icons/ — ICONY-Proxy whitelistet /images/* (top-level
  // /magazin/icon.png oder /magazin/favicon.ico würden vom Proxy mit 404 geblockt).
  // src/app/favicon.ico bleibt für lokale dev/SDK-Tools als Fallback liegen.
  icons: {
    icon: [
      { url: '/magazin/images/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/magazin/images/icons/favicon.ico',
    apple: '/magazin/images/icons/apple-icon-180.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider theme="light">
          <Header />
          <main id="main-content" className="flex-1 pt-20 pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <ClientEnhancements />
        </ThemeProvider>
      </body>
    </html>
  );
}
