import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';

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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader title="Shift handovers" subtitle="View and manage shift handovers." />

      <div className="space-y-3">
        {handovers.length === 0 ? (
          <Card padded={false} className="p-8 text-center">
            <p className="text-quiet-dot">No handovers yet.</p>
          </Card>
        ) : (
          handovers.map((h) => (
            <Card key={h.id} padded={false} className="hover:border-brand-300 transition-colors">
              <Link
                href={`/handovers/${h.id}`}
                className="flex items-start justify-between p-5 sm:p-6"
              >
                <div>
                  <h3 className="text-ink text-sm font-semibold">{h.shift.name}</h3>
                  <p className="text-mid-gray mt-1 text-xs">
                    Outgoing: {h.outgoingUser.name} &middot;{' '}
                    {new Date(h.shift.startTime).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill
                    tone={
                      h.status === 'ACKNOWLEDGED'
                        ? 'success'
                        : h.status === 'SUBMITTED'
                          ? 'warning'
                          : 'neutral'
                    }
                    label={h.status}
                  />
                  <span className="text-quiet-dot text-xs">{h._count.amendments} amendments</span>
                </div>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
