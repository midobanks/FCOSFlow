'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewIncidentPage() {
  const router = useRouter();
  const [submittedBy, setSubmittedBy] = useState('');
  const [injuredPersonName, setInjuredPersonName] = useState('');
  const [incidentType, setIncidentType] = useState('LTI');
  const [description, setDescription] = useState('');
  const [ambulanceOnSite, setAmbulanceOnSite] = useState(false);
  const [finishedShift, setFinishedShift] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/v1/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentType,
          submittedBy,
          injuredPersonName: injuredPersonName || null,
          description: description || null,
          ambulanceOnSite,
          finishedShift: finishedShift === '' ? null : finishedShift === 'yes',
        }),
      });

      const json = await res.json();
      if (json.ok) {
        router.push('/incidents');
        router.refresh();
      } else {
        setError(json.error?.message ?? 'Failed to create incident.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">New incident</h1>
      <p className="mt-1 text-sm text-neutral-600">Document a safety incident.</p>

      {error && (
        <div className="mt-4 rounded-md bg-danger-bg p-3 text-sm text-danger-text">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="submittedBy" className="label-md block text-sm font-medium text-neutral-800">Submitted by</label>
            <input id="submittedBy" value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} required
              className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
          </div>
          <div>
            <label htmlFor="injuredPersonName" className="label-md block text-sm font-medium text-neutral-800">Injured person</label>
            <input id="injuredPersonName" value={injuredPersonName} onChange={(e) => setInjuredPersonName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
          </div>
        </div>

        <div>
          <label htmlFor="incidentType" className="label-md block text-sm font-medium text-neutral-800">Incident type</label>
          <select id="incidentType" value={incidentType} onChange={(e) => setIncidentType(e.target.value)} required
            className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500">
            <option value="LTI">Lost Time Injury (LTI)</option>
            <option value="NM">Near Miss (NM)</option>
            <option value="PHI">PHI</option>
            <option value="MI">MI</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="label-md block text-sm font-medium text-neutral-800">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
            className="mt-1 block w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
        </div>

        <fieldset className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <legend className="text-sm font-medium text-neutral-800">Additional details</legend>
          <div className="mt-4 space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={ambulanceOnSite} onChange={(e) => setAmbulanceOnSite(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-brand-500" />
              <span className="text-sm text-neutral-700">Ambulance on site?</span>
            </label>
            <div>
              <p className="mb-2 text-sm text-neutral-700">Did the person finish the shift?</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="finishedShift" value="yes" checked={finishedShift === 'yes'} onChange={(e) => setFinishedShift(e.target.value)}
                    className="h-4 w-4 border-neutral-300 text-brand-500" />
                  <span className="text-sm text-neutral-700">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="finishedShift" value="no" checked={finishedShift === 'no'} onChange={(e) => setFinishedShift(e.target.value)}
                    className="h-4 w-4 border-neutral-300 text-brand-500" />
                  <span className="text-sm text-neutral-700">No</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="finishedShift" value="" checked={finishedShift === ''} onChange={(e) => setFinishedShift(e.target.value)}
                    className="h-4 w-4 border-neutral-300 text-brand-500" />
                  <span className="text-sm text-neutral-700">N/A</span>
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="flex gap-4">
          <button type="submit" disabled={submitting}
            className="inline-flex h-11 items-center rounded-md bg-brand-500 px-5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50">
            {submitting ? 'Saving...' : 'Log incident'}
          </button>
          <a href="/incidents"
            className="inline-flex h-11 items-center rounded-md border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
