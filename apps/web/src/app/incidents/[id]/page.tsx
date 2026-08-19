import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import type { StatusTone } from '@/components/ui/StatusPill';

async function getIncident(id: string) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/incidents/${id}`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}

const typeLabels: Record<string, string> = {
  LTI: 'Lost Time Injury',
  NM: 'Near Miss',
  PHI: 'PHI',
  MI: 'MI',
};
const statusTones: Record<string, StatusTone> = {
  OPEN: 'danger',
  CONTAINED: 'warning',
  RESOLVED: 'success',
  CLOSED: 'neutral',
};

export default async function IncidentDetailPage({ params }: any) {
  const { id } = await params;
  const incident = await getIncident(id);
  if (!incident) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/incidents" className="text-link-blue text-sm hover:underline">
        &larr; All incidents
      </Link>
      <PageHeader
        title={typeLabels[incident.incidentType] ?? incident.incidentType}
        action={
          <StatusPill tone={statusTones[incident.status] ?? 'neutral'} label={incident.status} />
        }
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="bg-canvas rounded-xl p-4">
          <p className="text-mid-gray text-xs font-medium">Submitted by</p>
          <p className="text-ink mt-1 text-sm font-medium">{incident.submittedBy}</p>
        </div>
        <div className="bg-canvas rounded-xl p-4">
          <p className="text-mid-gray text-xs font-medium">Incident type</p>
          <p className="text-ink mt-1 text-sm font-medium">{incident.incidentType}</p>
        </div>
        <div className="bg-canvas rounded-xl p-4">
          <p className="text-mid-gray text-xs font-medium">Injured person</p>
          <p className="text-ink mt-1 text-sm font-medium">{incident.injuredPersonName ?? 'N/A'}</p>
        </div>
        <div className="bg-canvas rounded-xl p-4">
          <p className="text-mid-gray text-xs font-medium">Ambulance on site</p>
          <p className="text-ink mt-1 text-sm font-medium">
            {incident.ambulanceOnSite ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="bg-canvas rounded-xl p-4">
          <p className="text-mid-gray text-xs font-medium">Finished shift</p>
          <p className="text-ink mt-1 text-sm font-medium">
            {incident.finishedShift === null ? '—' : incident.finishedShift ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="bg-canvas rounded-xl p-4">
          <p className="text-mid-gray text-xs font-medium">Date logged</p>
          <p className="text-ink mt-1 text-sm font-medium">
            {new Date(incident.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      {incident.description && (
        <div className="mt-6">
          <h2 className="text-caption text-ink mb-2 font-semibold">Description</h2>
          <Card>
            <p className="text-deep-gray text-sm">{incident.description}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
