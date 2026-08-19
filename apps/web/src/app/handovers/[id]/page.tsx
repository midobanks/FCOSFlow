import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';

type Amendment = {
  id: string;
  content: string;
  user: { name: string };
  createdAt: string;
};

type Handover = {
  id: string;
  shift: { name: string; startTime: string };
  outgoingUser: { name: string };
  incomingUser: { name: string } | null;
  notes: string | null;
  riskSummary: string | null;
  priorityActions: string | null;
  status: string;
  submittedAt: string | null;
  acknowledgedAt: string | null;
  amendments: Amendment[];
};

async function getHandover(id: string): Promise<Handover | null> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/handovers/${id}`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}

function statusBadge(status: string) {
  const tone =
    status === 'ACKNOWLEDGED' ? 'success' : status === 'SUBMITTED' ? 'warning' : 'neutral';
  return <StatusPill tone={tone} label={status} />;
}

export default async function HandoverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const handover = await getHandover(id);

  if (!handover) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <Link href="/handovers" className="text-link-blue text-sm hover:underline">
          &larr; All handovers
        </Link>
      </div>

      <PageHeader
        title={handover.shift.name}
        subtitle={new Date(handover.shift.startTime).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        action={statusBadge(handover.status)}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-mid-gray text-xs font-medium">Outgoing Captain</p>
          <p className="text-ink mt-1 text-sm font-medium">{handover.outgoingUser.name}</p>
        </Card>
        <Card>
          <p className="text-mid-gray text-xs font-medium">Incoming Captain</p>
          <p className="text-ink mt-1 text-sm font-medium">{handover.incomingUser?.name ?? '—'}</p>
        </Card>
      </div>

      {handover.notes && (
        <div className="mb-6">
          <h2 className="text-caption text-ink mb-2 font-semibold">Notes</h2>
          <Card className="text-deep-gray text-sm">{handover.notes}</Card>
        </div>
      )}

      {handover.riskSummary && (
        <div className="mb-6">
          <h2 className="text-caption text-danger-text mb-2 font-semibold">Unresolved risks</h2>
          <div className="border-danger-bg bg-danger-bg/50 text-deep-gray rounded-3xl border p-5 text-sm">
            {handover.riskSummary}
          </div>
        </div>
      )}

      {handover.priorityActions && (
        <div className="mb-6">
          <h2 className="text-caption text-ink mb-2 font-semibold">Priority actions</h2>
          <div className="border-warning-bg bg-warning-bg/50 text-deep-gray rounded-3xl border p-5 text-sm">
            {handover.priorityActions}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-caption text-ink mb-3 font-semibold">
          Amendments ({handover.amendments.length})
        </h2>
        <div className="space-y-2">
          {handover.amendments.length === 0 ? (
            <p className="text-quiet-dot text-sm">No amendments.</p>
          ) : (
            handover.amendments.map((a) => (
              <Card key={a.id} padded={false} className="text-deep-gray p-4 text-sm">
                <p>{a.content}</p>
                <p className="text-quiet-dot mt-1 text-xs">
                  {a.user.name} &middot; {new Date(a.createdAt).toLocaleString()}
                </p>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
