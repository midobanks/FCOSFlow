import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FCOS Flow',
    template: '%s | FCOS Flow',
  },
  description: 'Run every shift with confidence.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
