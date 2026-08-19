import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

async function getWorkflows() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/cold-chain/workflows`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
  }
}

export default async function ColdChainPage() {
  const workflows = await getWorkflows();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader title="Cold Chain Manager" subtitle="Temperature compliance and scan tracking." />
      <div className="space-y-4">
        {workflows.length === 0 ? (
          <Card padded={false} className="text-quiet-dot p-8">
            No workflows configured.
          </Card>
        ) : (
          workflows.map((w: any) => (
            <Card key={w.id}>
              <h2 className="text-caption text-ink font-semibold">{w.name}</h2>
              <div className="mt-4 space-y-2">
                {w.steps.map((s: any, i: number) => (
                  <div
                    key={s.id}
                    className="bg-cool-wash flex items-center gap-4 rounded-lg px-4 py-3 text-sm"
                  >
                    <span className="bg-brand-500 text-paper flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs">
                      {i + 1}
                    </span>
                    <span className="text-ink">{s.label}</span>
                    {s.responsibleRole && (
                      <span className="text-quiet-dot ml-auto text-xs">{s.responsibleRole}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
