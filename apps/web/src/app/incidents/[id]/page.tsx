import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getIncident(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/incidents/${id}`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch { return null; }
}

const typeLabels: Record<string, string> = { LTI: 'Lost Time Injury', NM: 'Near Miss', PHI: 'PHI', MI: 'MI' };

export default async function IncidentDetailPage({ params }: any) {
  const { id } = await params;
  const incident = await getIncident(id);
  if (!incident) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Link href="/incidents" className="text-sm text-brand-500 hover:text-brand-600">&larr; All incidents</Link>
      <div className="mt-4 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-neutral-900">{typeLabels[incident.incidentType] ?? incident.incidentType}</h1>
        <span className="rounded bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">{incident.status}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Submitted by</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{incident.submittedBy}</p>
        </div>
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Incident type</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{incident.incidentType}</p>
        </div>
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Injured person</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{incident.injuredPersonName ?? 'N/A'}</p>
        </div>
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Ambulance on site</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{incident.ambulanceOnSite ? 'Yes' : 'No'}</p>
        </div>
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Finished shift</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{incident.finishedShift === null ? '—' : incident.finishedShift ? 'Yes' : 'No'}</p>
        </div>
        <div className="rounded-lg bg-neutral-50 p-4">
          <p className="text-xs font-medium text-neutral-500">Date logged</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{new Date(incident.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      {incident.description && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-semibold text-neutral-800">Description</h2>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700">{incident.description}</div>
        </div>
      )}
    </div>
  );
}
