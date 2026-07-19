import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://fcos-flow.vercel.app'),
  title: {
    default: 'FCOS Flow',
    template: '%s | FCOS Flow',
  },
  description: 'Run every shift with confidence.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'FCOS Flow',
    description: 'Run every shift with confidence.',
    siteName: 'FCOS Flow',
    images: [{ url: '/logo.png', width: 256, height: 256 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-25">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
