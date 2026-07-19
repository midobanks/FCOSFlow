import { getBaseUrl } from '@/lib/base-url';

async function getWorkflows() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/cold-chain/workflows`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch { return []; }
}

export default async function ColdChainPage() {
  const workflows = await getWorkflows();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Cold Chain Manager</h1>
      <p className="mt-1 text-sm text-neutral-600">Temperature compliance and scan tracking.</p>
      <div className="mt-8 space-y-4">
        {workflows.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-neutral-400">No workflows configured.</div>
        ) : workflows.map((w: any) => (
          <div key={w.id} className="rounded-lg border border-neutral-200 bg-white p-5">
            <h2 className="text-lg font-semibold">{w.name}</h2>
            <div className="mt-4 space-y-2">
              {w.steps.map((s: any, i: number) => (
                <div key={s.id} className="flex items-center gap-4 rounded-md bg-neutral-50 px-4 py-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs text-white">{i + 1}</span>
                  <span className="text-neutral-800">{s.label}</span>
                  {s.responsibleRole && <span className="ml-auto text-xs text-neutral-400">{s.responsibleRole}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
