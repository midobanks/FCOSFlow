import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

const processAreas = [
  {
    id: 'RECEIPT',
    title: 'Receipt',
    description: 'Inbound goods receipt, verification, and staging',
    count: 0,
  },
  {
    id: 'PICKING',
    title: 'Picking',
    description: 'Order picking, packing, and dispatch preparation',
    count: 0,
  },
  {
    id: 'STOCKFLOW',
    title: 'Stockflow',
    description: 'Inventory flow, replenishment, and stock organisation',
    count: 0,
  },
  {
    id: 'TRUNKING',
    title: 'Trunking',
    description: 'Cross-dock, trunk management, and transfer coordination',
    count: 0,
  },
  {
    id: 'INFLOW',
    title: 'Inflow',
    description: 'Supplier intake, quality checks, and put-away',
    count: 0,
  },
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Process libraries"
        subtitle="Browse standard operating procedures and knowledge by process area."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {processAreas.map((area) => {
          const count = counts[area.id] ?? 0;
          return (
            <Card key={area.id} className="hover:border-brand-300 transition-colors">
              <Link href={`/processes/${area.id.toLowerCase()}`} className="block">
                <h2 className="text-ink text-lg font-semibold">{area.title}</h2>
                <p className="text-deep-gray mt-1 text-sm">{area.description}</p>
                <p className="text-quiet-dot mt-3 text-xs">
                  {count} article{count === 1 ? '' : 's'}
                </p>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
