const modules = [
  {
    name: 'Command Center',
    detail: 'Live site and shift health, linked to source records.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2-7 4 14 2-7h6" />,
  },
  {
    name: 'Captain Companion',
    detail: 'Personal shift workspace with checks, tasks, and escalation.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-8 9a8 8 0 0 1 16 0"
      />
    ),
  },
  {
    name: 'Shift Handover',
    detail: 'Structured, acknowledged continuity. Amendments append-only.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10m0 0-3-3m3 3-3 3M17 16H7m0 0 3 3m-3-3 3-3"
      />
    ),
  },
  {
    name: 'Warehouse Wiki',
    detail: 'Versioned SOPs, governed and always current.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.3C10.8 4.9 8.9 4 6.8 4 5.2 4 3.8 4.6 3 5.5v13c.8-.9 2.2-1.5 3.8-1.5 2.1 0 4 .9 5.2 2.3m0-11c1.2-1.4 3.1-2.3 5.2-2.3 1.6 0 3 .6 3.8 1.5v13c-.8-.9-2.2-1.5-3.8-1.5-2.1 0-4 .9-5.2 2.3m0-11v11"
      />
    ),
  },
  {
    name: 'Incident Center',
    detail: 'Log, assign, escalate, and resolve with closure criteria.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
      />
    ),
  },
  {
    name: 'Quality Intelligence',
    detail: 'Freshness, damages, offenders, and corrective actions.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V9m7 12V4m7 17v-7" />,
  },
  {
    name: 'Frame Management',
    detail: 'G4/G6 availability and shortage risk, with QR entry.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h6v6H4Zm10 0h6v6h-6ZM4 14h6v6H4Zm10 0h6v6h-6Z"
      />
    ),
  },
  {
    name: 'Cold Chain Manager',
    detail: 'Scan compliance across every step and shipment.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v20m10-10H2m17.6-7.6-15.2 15.2M19.6 4.4 4.4 19.6"
      />
    ),
  },
  {
    name: 'Improvement Hub',
    detail: 'Convert recurring pain into measured, verified gains.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8m0 0h-6m6 0v6" />,
  },
];

export function ModuleGrid() {
  return (
    <section id="modules" className="bg-canvas">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h2 className="text-ink text-[clamp(2rem,4.5vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.015em]">
            Everything a Captain needs.
          </h2>
          <p className="text-body-sm text-mid-gray mt-5 max-w-2xl leading-[1.47] tracking-[-0.02em]">
            Nine modules, one operating system. Each captures context once and reuses it everywhere
            — from the start-of-shift check to the handover and the improvement review.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <div
              key={mod.name}
              className="bg-paper hover:bg-faded-surface rounded-3xl p-7 transition-colors"
            >
              <span className="bg-brand-50 text-brand-600 flex h-10 w-10 items-center justify-center rounded-2xl">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  {mod.icon}
                </svg>
              </span>
              <p className="text-body-sm text-ink mt-4 font-semibold">{mod.name}</p>
              <p className="text-caption text-mid-gray mt-1.5 leading-relaxed">{mod.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
