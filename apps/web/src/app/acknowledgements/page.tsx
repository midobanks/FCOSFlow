import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';

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
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Acknowledgements</h1>
      <p className="mt-1 text-sm text-neutral-600">Required reading and acknowledgements.</p>

      <div className="mt-8 space-y-3">
        {acks.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
            <p className="text-neutral-400">No pending acknowledgements.</p>
          </div>
        ) : (
          acks.map((ack) => (
            <div
              key={`${ack.article.id}-${ack.version}`}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4"
            >
              <div>
                <Link href={`/wiki/${ack.article.id}`} className="text-sm font-medium text-brand-500 hover:text-brand-600">
                  {ack.article.title}
                </Link>
                <p className="text-xs text-neutral-400">Version {ack.version}</p>
              </div>
              {ack.completedAt ? (
                <span className="rounded bg-success-bg px-2.5 py-0.5 text-xs font-medium text-success-text">
                  Completed
                </span>
              ) : (
                <span className="rounded bg-warning-bg px-2.5 py-0.5 text-xs font-medium text-warning-text">
                  Pending
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

