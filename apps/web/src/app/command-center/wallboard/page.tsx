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
    <div className="bg-ink flex min-h-screen flex-col items-center justify-center px-12 py-12">
      <h1 className="text-paper mb-2 text-4xl font-bold">FCOS Flow</h1>
      <p className="text-quiet-dot mb-10 text-xl">Dashboard</p>

      {!data ? (
        <p className="text-mid-gray text-lg">Loading...</p>
      ) : (
        <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.tiles.map((tile: Tile) => (
            <div key={tile.id} className="rounded-xl border border-white/10 bg-white/5 p-8">
              <p className="text-quiet-dot text-lg font-medium">{tile.label}</p>
              <p className="text-paper mt-2 text-5xl font-bold">{tile.value}</p>
              <p className="text-mid-gray mt-2 text-base">{tile.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-quiet-dot mt-12 text-sm">Auto-refreshing</p>
    </div>
  );
}
