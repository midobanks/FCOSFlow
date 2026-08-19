const handoverMetrics = [
  { label: 'Units', value: '1,240' },
  { label: 'Incidents', value: '3' },
  { label: 'Readiness', value: '92%' },
];

const risks = [
  { title: 'G4 frames below safety buffer', tone: 'text-warning-base', pill: 'bg-warning-bg' },
  {
    title: 'Picking zone A3 understaffed after 09:00',
    tone: 'text-warning-base',
    pill: 'bg-warning-bg',
  },
];

const timeline = [
  { title: 'Handover locked', detail: 'R. Mwangi · 05:58', done: true },
  { title: 'Acknowledged', detail: 'M. Novak · 06:02', done: true },
  { title: 'Amendment appended', detail: 'Cold-chain scan added · 06:10', done: false },
];

export function ShiftHandoverMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of a structured FCOS Flow shift handover with pre-filled metrics, risks, and acknowledgement"
      className="border-hairline bg-paper mx-auto w-full max-w-xl rounded-3xl border p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-caption text-mid-gray font-medium">Shift handover</p>
          <p className="text-body text-ink font-semibold tracking-[-0.01em]">Morning → Afternoon</p>
        </div>
        <span className="bg-success-bg text-micro text-success-text flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold">
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Acknowledged
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {handoverMetrics.map((metric) => (
          <div key={metric.label} className="bg-canvas rounded-2xl p-3.5">
            <p className="text-micro text-mid-gray">{metric.label}</p>
            <p className="text-body text-ink mt-1 font-bold tracking-[-0.02em] tabular-nums">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-caption text-ink font-semibold">Risks for next shift</p>
        <ul className="mt-2.5 space-y-2">
          {risks.map((risk) => (
            <li
              key={risk.title}
              className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 ${risk.pill}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="text-warning-base h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                />
              </svg>
              <p className={`text-caption font-medium ${risk.tone}`}>{risk.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-caption text-ink font-semibold">Timeline</p>
        <ol className="mt-3 space-y-0">
          {timeline.map((step) => (
            <li key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
              {step.done ? (
                <span className="bg-brand-500 text-paper mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              ) : (
                <span className="border-brand-500 bg-paper mt-0.5 h-5 w-5 shrink-0 rounded-full border-2" />
              )}
              <div>
                <p className="text-caption text-ink font-medium">{step.title}</p>
                <p className="text-micro text-mid-gray">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        className="bg-brand-500 text-body-sm text-paper mt-6 h-11 w-full rounded-full font-medium"
      >
        Acknowledge handover
      </button>
    </div>
  );
}
