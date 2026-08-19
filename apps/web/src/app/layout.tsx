import type { Metadata } from 'next';
import { ConditionalSiteHeader } from '@/components/ConditionalSiteHeader';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://fcos-flow.vercel.app'),
  title: {
    default: 'FCOS Flow — Run every shift with confidence.',
    template: '%s | FCOS Flow',
  },
  description:
    'The AI-assisted operating system for fulfillment centres. One structured environment to prepare, run, monitor, hand over, and improve every shift.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'FCOS Flow — Run every shift with confidence.',
    description:
      'The AI-assisted operating system for fulfillment centres. One structured environment to prepare, run, monitor, hand over, and improve every shift.',
    siteName: 'FCOS Flow',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-25 min-h-screen">
        <ConditionalSiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
