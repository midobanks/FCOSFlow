import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/v1/handovers/${id}`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    PENDING: 'bg-neutral-100 text-neutral-600',
    SUBMITTED: 'bg-warning-bg text-warning-text',
    ACKNOWLEDGED: 'bg-success-bg text-success-text',
  };
  return (
    <span className={`rounded px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? styles.PENDING}`}>
      {status}
    </span>
  );
}

export default async function HandoverDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const handover = await getHandover(id);

  if (!handover) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6">
        <Link href="/handovers" className="text-sm text-brand-500 hover:text-brand-600">
          &larr; All handovers
        </Link>
      </div>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{handover.shift.name}</h1>
          <p className="mt-1 text-sm text-neutral-600">
            {new Date(handover.shift.startTime).toLocaleDateString('en-GB', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
        {statusBadge(handover.status)}
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Outgoing Captain</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{handover.outgoingUser.name}</p>
        </div>
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Incoming Captain</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">
            {handover.incomingUser?.name ?? '—'}
          </p>
        </div>
      </div>

      {handover.notes && (
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-neutral-800">Notes</h2>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
            {handover.notes}
          </div>
        </div>
      )}

      {handover.riskSummary && (
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-danger-text">Unresolved risks</h2>
          <div className="rounded-lg border border-danger-bg bg-danger-bg/50 p-4 text-sm text-neutral-700">
            {handover.riskSummary}
          </div>
        </div>
      )}

      {handover.priorityActions && (
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-neutral-800">Priority actions</h2>
          <div className="rounded-lg border border-warning-bg bg-warning-bg/50 p-4 text-sm text-neutral-700">
            {handover.priorityActions}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-neutral-800">
          Amendments ({handover.amendments.length})
        </h2>
        <div className="space-y-2">
          {handover.amendments.length === 0 ? (
            <p className="text-sm text-neutral-400">No amendments.</p>
          ) : (
            handover.amendments.map((a) => (
              <div key={a.id} className="rounded-lg border border-neutral-200 bg-white p-3">
                <p className="text-sm text-neutral-700">{a.content}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  {a.user.name} &middot; {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
