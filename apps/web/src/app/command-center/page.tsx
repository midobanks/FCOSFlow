import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { MetricCard } from '@/components/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Dashboard"
        subtitle="Live site and shift health overview"
        action={
          <div className="flex items-center gap-3">
            {data && (
              <span className="text-quiet-dot text-xs">
                Refreshed: {new Date(data.refreshedAt).toLocaleTimeString()}
              </span>
            )}
            <Link
              href="/command-center/wallboard"
              className="border-ink/15 bg-paper text-ink hover:bg-cool-wash inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Wallboard mode
            </Link>
          </div>
        }
      />

      {!data ? (
        <Card padded={false} className="p-12 text-center">
          <p className="text-quiet-dot">Unable to load Dashboard.</p>
        </Card>
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
