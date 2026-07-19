import Link from 'next/link';

async function getOffenders() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/quality/offenders', { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch { return []; }
}

export default async function QualityPage() {
  const offenders = await getOffenders();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Quality Intelligence</h1>
      <p className="mt-1 text-sm text-neutral-600">Freshness, damages, and top-offending SKUs.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/quality/observations" className="rounded-lg border border-neutral-200 bg-white p-5 hover:border-brand-300">
          <h2 className="text-lg font-semibold">Record observation</h2>
          <p className="mt-1 text-sm text-neutral-600">Log a quality issue by SKU, location, and type</p>
        </Link>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Top offenders</h2>
          <div className="mt-3 space-y-2">
            {offenders.length === 0 ? <p className="text-sm text-neutral-400">No data yet</p> : (
              offenders.slice(0, 5).map((o: any, i: number) => (
                <div key={o.sku} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{i + 1}. {o.sku}</span>
                  <span className="text-neutral-500">{o._count.sku} observations</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
