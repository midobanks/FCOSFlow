import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';

type Ack = {
  article: { id: string; title: string };
  version: number;
  completedAt: string | null;
};

async function getAcknowledgements(): Promise<Ack[]> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/wiki/acknowledgements`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
  }
}

export default async function AcknowledgementsPage() {
  const acks = await getAcknowledgements();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader title="Acknowledgements" subtitle="Required reading and acknowledgements." />

      <div className="mt-8 space-y-3">
        {acks.length === 0 ? (
          <Card padded={false} className="p-8 text-center">
            <p className="text-quiet-dot">No pending acknowledgements.</p>
          </Card>
        ) : (
          acks.map((ack) => (
            <Card
              key={`${ack.article.id}-${ack.version}`}
              className="flex items-center justify-between"
            >
              <div>
                <Link
                  href={`/wiki/${ack.article.id}`}
                  className="text-link-blue text-sm font-medium hover:underline"
                >
                  {ack.article.title}
                </Link>
                <p className="text-quiet-dot text-xs">Version {ack.version}</p>
              </div>
              {ack.completedAt ? (
                <StatusPill tone="success" label="Completed" />
              ) : (
                <StatusPill tone="warning" label="Pending" />
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
