import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import type { StatusTone } from '@/components/ui/StatusPill';

function mapStatusTone(status: string): StatusTone {
  const s = status.toLowerCase();
  if (['done', 'completed', 'complete', 'approved', 'published', 'implemented'].includes(s)) {
    return 'success';
  }
  if (['in_progress', 'in-progress', 'in_review', 'under_review', 'reviewing'].includes(s)) {
    return 'warning';
  }
  if (['open', 'new', 'todo', 'backlog', 'proposed'].includes(s)) {
    return 'info';
  }
  if (['rejected', 'declined', 'cancelled', 'canceled', 'blocked'].includes(s)) {
    return 'danger';
  }
  return 'neutral';
}

async function getImprovements() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/improvements`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
  }
}

export default async function ImprovementsPage() {
  const improvements = await getImprovements();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Improvement Hub"
        subtitle="Kaizen and measurable improvements."
        action={
          <Link
            href="/improvements/new"
            className="bg-electric-blue text-paper inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-90"
          >
            New improvement
          </Link>
        }
      />
      <div className="space-y-3">
        {improvements.length === 0 ? (
          <Card padded={false} className="p-8 text-center">
            <p className="text-quiet-dot">No improvements yet.</p>
          </Card>
        ) : (
          improvements.map((imp: any) => (
            <Card key={imp.id} className="space-y-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-ink text-sm font-semibold">{imp.title}</h3>
                <StatusPill tone={mapStatusTone(imp.status)} label={imp.status} />
              </div>
              <p className="text-deep-gray mt-1 line-clamp-2 text-sm">{imp.problem}</p>
              <p className="text-quiet-dot mt-2 text-xs">
                {imp.baseline && `Baseline: ${imp.baseline}`}
                {imp.target && ` → Target: ${imp.target}`}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
