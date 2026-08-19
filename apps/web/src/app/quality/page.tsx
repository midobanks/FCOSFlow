import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

async function getOffenders() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/quality/offenders`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
  }
}

export default async function QualityPage() {
  const offenders = await getOffenders();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Quality Intelligence"
        subtitle="Freshness, damages, and top-offending SKUs."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/quality/observations"
          className="border-hairline bg-paper hover:bg-cool-wash rounded-3xl border p-5 transition-colors"
        >
          <h2 className="text-caption text-ink font-semibold">Record observation</h2>
          <p className="text-mid-gray mt-1 text-sm">
            Log a quality issue by SKU, location, and type
          </p>
        </Link>
        <Card>
          <h2 className="text-caption text-ink font-semibold">Top offenders</h2>
          <div className="mt-3 space-y-2">
            {offenders.length === 0 ? (
              <p className="text-quiet-dot text-sm">No data yet</p>
            ) : (
              offenders.slice(0, 5).map((o: any, i: number) => (
                <div key={o.sku} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-deep-gray">
                    {i + 1}. {o.sku}
                  </span>
                  <span className="text-mid-gray tabular-nums">{o._count.sku} observations</span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
