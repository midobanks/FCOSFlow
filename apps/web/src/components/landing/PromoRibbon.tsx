import Link from 'next/link';

export function PromoRibbon() {
  return (
    <div className="border-hairline bg-paper border-b">
      <p className="text-micro text-ink mx-auto max-w-[1200px] px-6 py-2.5 text-center tracking-[-0.01em]">
        The Warehouse Wiki is live — Phase&nbsp;1 is now in pilot at our first site.{' '}
        <Link href="#wiki" className="text-link-blue font-medium hover:underline">
          See what&apos;s inside&nbsp;›
        </Link>
      </p>
    </div>
  );
}
