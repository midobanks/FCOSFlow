import { MetricCard } from '@/components/MetricCard';
import { getBaseUrl } from '@/lib/base-url';

type Tile = {
  id: string;
  label: string;
  value: number | string;
  subtitle: string;
  status: string;
  link: string;
};

async function getDashboard() {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/command-center`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}

export default async function WallboardPage() {
  const data = await getDashboard();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 px-12 py-12">
      <h1 className="mb-2 text-4xl font-bold text-neutral-0">FCOS Flow</h1>
      <p className="mb-10 text-xl text-neutral-400">Command Center</p>

      {!data ? (
        <p className="text-lg text-neutral-500">Loading...</p>
      ) : (
        <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.tiles.map((tile: Tile) => (
            <div key={tile.id} className="rounded-xl bg-neutral-800 p-8">
              <p className="text-lg font-medium text-neutral-400">{tile.label}</p>
              <p className="mt-2 text-5xl font-bold text-neutral-0">{tile.value}</p>
              <p className="mt-2 text-base text-neutral-500">{tile.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-12 text-sm text-neutral-600">Auto-refreshing</p>
    </div>
  );
}

