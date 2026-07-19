import Link from 'next/link';

type Incident = { id: string; incidentType: string; submittedBy: string; injuredPersonName: string | null; status: string; createdAt: string; ambulanceOnSite: boolean; finishedShift: boolean | null };
type Dashboard = { total: number; types: Record<string, number>; statuses: Record<string, number>; month: string };

async function getIncidents() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/incidents', { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch { return []; }
}

async function getDashboard() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/incidents/dashboard', { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : null;
  } catch { return null; }
}

const typeLabels: Record<string, string> = { LTI: 'Lost Time Injury', NM: 'Near Miss', PHI: 'PHI', MI: 'MI' };
const typeColors: Record<string, string> = { LTI: 'border-l-danger-base bg-danger-bg', NM: 'border-l-warning-base bg-warning-bg', PHI: 'border-l-info-base bg-info-bg', MI: 'border-l-neutral-400 bg-neutral-50' };
const typeBadgeColors: Record<string, string> = { LTI: 'bg-danger-bg text-danger-text', NM: 'bg-warning-bg text-warning-text', PHI: 'bg-info-bg text-info-text', MI: 'bg-neutral-100 text-neutral-600' };
const statusColors: Record<string, string> = { OPEN: 'bg-danger-bg text-danger-text', CONTAINED: 'bg-warning-bg text-warning-text', RESOLVED: 'bg-success-bg text-success-text', CLOSED: 'bg-neutral-100 text-neutral-600' };

export default async function IncidentsPage() {
  const [incidents, dashboard] = await Promise.all([getIncidents(), getDashboard()]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Incidents</h1>
          <p className="mt-1 text-sm text-neutral-600">Log and track safety incidents</p>
        </div>
        <Link href="/incidents/new" className="inline-flex h-11 items-center rounded-md bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600">
          New incident
        </Link>
      </div>

      {dashboard && (
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-neutral-700">{dashboard.month} summary</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {['LTI', 'NM', 'PHI', 'MI'].map((type) => {
              const count = dashboard.types[type] ?? 0;
              return (
                <div key={type} className={`rounded-lg border-l-4 p-4 ${typeColors[type] ?? typeColors.MI}`}>
                  <p className="text-2xl font-bold text-neutral-900">{count}</p>
                  <p className="mt-0.5 text-xs font-medium text-neutral-600">{typeLabels[type]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {incidents.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-neutral-400">No incidents logged.</div>
        ) : incidents.map((i: Incident) => (
          <Link key={i.id} href={`/incidents/${i.id}`} className="block rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-brand-300">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${typeBadgeColors[i.incidentType] ?? ''}`}>{i.incidentType}</span>
                  <span className="text-sm font-semibold text-neutral-900">{typeLabels[i.incidentType] ?? i.incidentType}</span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">Submitted by: {i.submittedBy}{i.injuredPersonName ? ` | Injured: ${i.injuredPersonName}` : ''}</p>
              </div>
              <div className="flex items-center gap-2">
                {i.ambulanceOnSite && <span className="text-xs font-medium text-danger-text">Ambulance</span>}
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[i.status] ?? ''}`}>{i.status}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
