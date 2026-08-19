import Link from 'next/link';
import { Logo } from '@/components/Logo';

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Command Center', href: '#product' },
      { label: 'Captain Companion', href: '#product' },
      { label: 'Shift Handover', href: '#product' },
      { label: 'Warehouse Wiki', href: '#wiki' },
    ],
  },
  {
    heading: 'Modules',
    links: [
      { label: 'Incident Center', href: '#modules' },
      { label: 'Quality Intelligence', href: '#modules' },
      { label: 'Frame Management', href: '#modules' },
      { label: 'Cold Chain Manager', href: '#modules' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Security', href: '#security' },
      { label: 'AI assistance', href: '#ai' },
      { label: 'Pilot program', href: '#demo' },
      { label: 'Sign in', href: '/admin/login' },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="bg-canvas">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo width={140} height={38} />
            <p className="text-caption text-mid-gray mt-4 max-w-xs leading-relaxed">
              The AI-assisted operating system for fulfillment centres. Run every shift with
              confidence.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="text-caption text-ink font-semibold">{column.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-caption text-mid-gray hover:text-link-blue transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-hairline mt-16 border-t pt-6">
          <p className="text-micro text-mid-gray leading-[1.5]">
            © 2026 FCOS Flow. Run every shift with confidence. FCOS Flow supports English and
            German, operates across IANA time zones, and keeps all operational data scoped to your
            organization. Published versions of operational knowledge are immutable.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/admin/login" className="text-micro text-link-blue hover:underline">
              Privacy
            </Link>
            <Link href="/admin/login" className="text-micro text-link-blue hover:underline">
              Terms
            </Link>
            <Link href="/admin/login" className="text-micro text-link-blue hover:underline">
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
