'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { Field, inputClass } from '@/components/ui/Field';
import { PillButton } from '@/components/ui/PillButton';

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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader title="New incident" subtitle="Document a safety incident." />

      {error && (
        <div className="bg-danger-bg text-danger-text mb-6 rounded-lg p-3 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Submitted by">
            <input
              id="submittedBy"
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Injured person">
            <input
              id="injuredPersonName"
              value={injuredPersonName}
              onChange={(e) => setInjuredPersonName(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Incident type">
          <select
            id="incidentType"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            required
            className={inputClass}
          >
            <option value="LTI">Lost Time Injury (LTI)</option>
            <option value="NM">Near Miss (NM)</option>
            <option value="PHI">PHI</option>
            <option value="MI">MI</option>
          </select>
        </Field>

        <Field label="Description">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={inputClass}
          />
        </Field>

        <fieldset className="border-hairline bg-paper rounded-3xl border p-5 sm:p-6">
          <legend className="text-caption text-ink font-semibold">Additional details</legend>
          <div className="mt-4 space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={ambulanceOnSite}
                onChange={(e) => setAmbulanceOnSite(e.target.checked)}
                className="border-hairline accent-brand-500 h-4 w-4 rounded"
              />
              <span className="text-deep-gray text-sm">Ambulance on site?</span>
            </label>
            <div>
              <p className="text-deep-gray mb-2 text-sm">Did the person finish the shift?</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="finishedShift"
                    value="yes"
                    checked={finishedShift === 'yes'}
                    onChange={(e) => setFinishedShift(e.target.value)}
                    className="border-hairline accent-brand-500 h-4 w-4"
                  />
                  <span className="text-deep-gray text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="finishedShift"
                    value="no"
                    checked={finishedShift === 'no'}
                    onChange={(e) => setFinishedShift(e.target.value)}
                    className="border-hairline accent-brand-500 h-4 w-4"
                  />
                  <span className="text-deep-gray text-sm">No</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="finishedShift"
                    value=""
                    checked={finishedShift === ''}
                    onChange={(e) => setFinishedShift(e.target.value)}
                    className="border-hairline accent-brand-500 h-4 w-4"
                  />
                  <span className="text-deep-gray text-sm">N/A</span>
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="flex gap-4">
          <PillButton type="submit" size="lg" disabled={submitting}>
            {submitting ? 'Saving...' : 'Log incident'}
          </PillButton>
          <a
            href="/incidents"
            className="border-ink/15 bg-paper text-ink hover:bg-cool-wash inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
