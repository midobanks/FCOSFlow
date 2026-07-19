import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';

type Handover = {
  id: string;
  shift: { name: string; startTime: string };
  outgoingUser: { name: string };
  status: string;
  submittedAt: string | null;
  acknowledgedAt: string | null;
  _count: { amendments: number };
};

async function getHandovers(): Promise<Handover[]> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/handovers`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
  }
}

export default async function HandoversPage() {
  const handovers = await getHandovers();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Shift handovers</h1>
        <p className="mt-1 text-sm text-neutral-600">View and manage shift handovers.</p>
      </div>

      <div className="space-y-3">
        {handovers.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
            <p className="text-neutral-400">No handovers yet.</p>
          </div>
        ) : (
          handovers.map((h) => (
            <Link
              key={h.id}
              href={`/handovers/${h.id}`}
              className="block rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-brand-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">{h.shift.name}</h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Outgoing: {h.outgoingUser.name} &middot;{' '}
                    {new Date(h.shift.startTime).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${
                    h.status === 'ACKNOWLEDGED' ? 'bg-success-bg text-success-text'
                    : h.status === 'SUBMITTED' ? 'bg-warning-bg text-warning-text'
                    : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {h.status}
                  </span>
                  <span className="text-xs text-neutral-400">{h._count.amendments} amendments</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

