import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';

const processAreas = [
  { id: 'RECEIPT', title: 'Receipt', description: 'Inbound goods receipt, verification, and staging', count: 0 },
  { id: 'PICKING', title: 'Picking', description: 'Order picking, packing, and dispatch preparation', count: 0 },
  { id: 'STOCKFLOW', title: 'Stockflow', description: 'Inventory flow, replenishment, and stock organisation', count: 0 },
  { id: 'TRUNKING', title: 'Trunking', description: 'Cross-dock, trunk management, and transfer coordination', count: 0 },
  { id: 'INFLOW', title: 'Inflow', description: 'Supplier intake, quality checks, and put-away', count: 0 },
];

async function getProcessCounts(): Promise<Record<string, number>> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/wiki/articles?limit=200`, { cache: 'no-store' });
    const json = await res.json();
    if (!json.ok) return {};
    const articles: any[] = json.data.articles;
    const counts: Record<string, number> = {};
    for (const a of articles) {
      if (a.processArea) {
        counts[a.processArea] = (counts[a.processArea] ?? 0) + 1;
      }
    }
    return counts;
  } catch {
    return {};
  }
}

export default async function ProcessesPage() {
  const counts = await getProcessCounts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Process libraries</h1>
      <p className="mt-1 text-sm text-neutral-600">
        Browse standard operating procedures and knowledge by process area.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {processAreas.map((area) => {
          const count = counts[area.id] ?? 0;
          return (
            <Link
              key={area.id}
              href={`/processes/${area.id.toLowerCase()}`}
              className="rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-brand-300"
            >
              <h2 className="text-lg font-semibold text-neutral-900">{area.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{area.description}</p>
              <p className="mt-3 text-xs text-neutral-400">
                {count} article{count === 1 ? '' : 's'}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

