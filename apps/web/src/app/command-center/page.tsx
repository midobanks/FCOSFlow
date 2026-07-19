import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { MetricCard } from '@/components/MetricCard';

type Tile = {
  id: string;
  label: string;
  value: number | string;
  subtitle: string;
  status: string;
  link: string;
};

type DashboardData = {
  tiles: Tile[];
  stale: boolean;
  refreshedAt: string;
};

async function getDashboard(): Promise<DashboardData | null> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/command-center`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}

export default async function CommandCenterPage() {
  const data = await getDashboard();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Command Center</h1>
          <p className="mt-1 text-sm text-neutral-600">Live site and shift health overview</p>
        </div>
        <div className="flex items-center gap-3">
          {data && (
            <span className="text-xs text-neutral-400">
              Refreshed: {new Date(data.refreshedAt).toLocaleTimeString()}
            </span>
          )}
          <Link
            href="/command-center/wallboard"
            className="inline-flex h-10 items-center rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Wallboard mode
          </Link>
        </div>
      </div>

      {!data ? (
        <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center">
          <p className="text-neutral-400">Unable to load Command Center.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.tiles.map((tile) => (
            <MetricCard
              key={tile.id}
              id={tile.id}
              label={tile.label}
              value={tile.value}
              subtitle={tile.subtitle}
              status={tile.status as any}
              link={tile.link}
            />
          ))}
        </div>
      )}
    </div>
  );
}

