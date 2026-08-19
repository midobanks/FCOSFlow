import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { StatusPill } from '@/components/ui/StatusPill';
import type { StatusTone } from '@/components/ui/StatusPill';

type Incident = {
  id: string;
  incidentType: string;
  submittedBy: string;
  injuredPersonName: string | null;
  status: string;
  createdAt: string;
  ambulanceOnSite: boolean;
  finishedShift: boolean | null;
};
type Dashboard = {
  total: number;
  types: Record<string, number>;
  statuses: Record<string, number>;
  month: string;
};

async function getIncidents() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/incidents`, { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch {
    return [];
  }
}

async function getDashboard() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/v1/incidents/dashboard`, { cache: 'no-store' });
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
const typeTones: Record<string, StatusTone> = {
  LTI: 'danger',
  NM: 'warning',
  PHI: 'info',
  MI: 'neutral',
};
const statusTones: Record<string, StatusTone> = {
  OPEN: 'danger',
  CONTAINED: 'warning',
  RESOLVED: 'success',
  CLOSED: 'neutral',
};

export default async function IncidentsPage() {
  const [incidents, dashboard] = await Promise.all([getIncidents(), getDashboard()]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Incidents"
        subtitle="Log and track safety incidents"
        action={
          <Link
            href="/incidents/new"
            className="bg-electric-blue text-paper inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90"
          >
            New incident
          </Link>
        }
      />

      {dashboard && (
        <div className="mb-8">
          <h2 className="text-caption text-ink mb-3 font-semibold">{dashboard.month} summary</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {['LTI', 'NM', 'PHI', 'MI'].map((type) => {
              const count = dashboard.types[type] ?? 0;
              return <StatCard key={type} label={typeLabels[type] ?? type} value={count} />;
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {incidents.length === 0 ? (
          <Card className="text-quiet-dot p-8 text-center">No incidents logged.</Card>
        ) : (
          incidents.map((i: Incident) => (
            <Link key={i.id} href={`/incidents/${i.id}`} className="block transition-colors">
              <Card className="hover:border-brand-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <StatusPill
                        tone={typeTones[i.incidentType] ?? 'neutral'}
                        label={i.incidentType}
                      />
                      <span className="text-ink text-sm font-semibold">
                        {typeLabels[i.incidentType] ?? i.incidentType}
                      </span>
                    </div>
                    <p className="text-mid-gray mt-1 text-xs">
                      Submitted by: {i.submittedBy}
                      {i.injuredPersonName ? ` | Injured: ${i.injuredPersonName}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {i.ambulanceOnSite && (
                      <span className="text-danger-text text-xs font-medium">Ambulance</span>
                    )}
                    <StatusPill tone={statusTones[i.status] ?? 'neutral'} label={i.status} />
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
