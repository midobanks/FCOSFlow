import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';

async function getFrameData() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/frames/counts`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
  }
}

export default async function FramesPage() {
  const frames = await getFrameData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader title="Frame Management" subtitle="G4/G6 availability and shortage monitoring." />
      <div className="grid gap-4 sm:grid-cols-2">
        {frames.map((f: any) => {
          const c = f.latestCount;
          const total = c
            ? c.fullCount + c.looseCount + c.damagedCount + c.reservedCount + c.unavailableCount
            : 0;
          const shortfall = c?.demand ? c.demand - c.fullCount : null;
          return (
            <Card key={f.id}>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-caption text-ink font-semibold">
                  {f.name} ({f.code})
                </h2>
                {shortfall !== null && shortfall > 0 && (
                  <StatusPill tone="danger" label={`Shortfall: ${shortfall}`} />
                )}
              </div>
              <p className="text-deep-gray mt-1 text-sm">Capacity: {f.capacity}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-mid-gray">Full:</span>{' '}
                  <span className="text-ink font-medium tabular-nums">{c?.fullCount ?? 0}</span>
                </div>
                <div>
                  <span className="text-mid-gray">Loose:</span>{' '}
                  <span className="text-ink font-medium tabular-nums">{c?.looseCount ?? 0}</span>
                </div>
                <div>
                  <span className="text-mid-gray">Damaged:</span>{' '}
                  <span className="text-ink font-medium tabular-nums">{c?.damagedCount ?? 0}</span>
                </div>
                <div>
                  <span className="text-mid-gray">Total:</span>{' '}
                  <span className="text-ink font-medium tabular-nums">{total}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
