import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';

async function getImprovements() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/improvements`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch { return []; }
}

export default async function ImprovementsPage() {
  const improvements = await getImprovements();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Improvement Hub</h1>
          <p className="mt-1 text-sm text-neutral-600">Kaizen and measurable improvements.</p>
        </div>
        <Link href="/improvements/new" className="inline-flex h-11 items-center rounded-md bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600">New improvement</Link>
      </div>
      <div className="space-y-3">
        {improvements.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-neutral-400">No improvements yet.</div>
        ) : improvements.map((imp: any) => (
          <div key={imp.id} className="rounded-lg border border-neutral-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">{imp.title}</h3>
              <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">{imp.status}</span>
            </div>
            <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{imp.problem}</p>
            <p className="mt-2 text-xs text-neutral-400">
              {imp.baseline && `Baseline: ${imp.baseline}`}{imp.target && ` → Target: ${imp.target}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
