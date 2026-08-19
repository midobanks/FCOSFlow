const guarantees = [
  {
    title: 'Server-enforced permissions',
    detail: 'Deny by default. Every record is scoped to your organization and site.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z M9 12l2 2 4-4"
      />
    ),
  },
  {
    title: 'Immutable published versions',
    detail: 'Approved SOPs can never be silently edited. Changes ship as new versions.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1m-8.6 8.6-2.1 2.1"
      />
    ),
  },
  {
    title: 'Append-only evidence',
    detail: 'Scans, handovers, and amendments can be added to but never rewritten.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 6h13m0 0-3-3m3 3-3 3M8 13h13m0 0-3-3m3 3-3 3M3 6h2m-2 7h2m-2 7h2"
      />
    ),
  },
  {
    title: 'Tenant isolation',
    detail: 'Every query, cache key, and export is scoped to your organization.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 21V3m8 18V3M4 21V9m16 12V5" />,
  },
];

export function SecurityBand() {
  return (
    <section id="security" className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h2 className="text-ink text-[clamp(2rem,4.5vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.015em]">
            Audit by default. Trust by design.
          </h2>
          <p className="text-body-sm text-mid-gray mt-5 max-w-2xl leading-[1.47] tracking-[-0.02em]">
            FCOS Flow treats operational data like compliance data. Every approval, acknowledgement,
            and evidence record is logged — and nothing can be quietly rewritten after the fact.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => (
            <div key={item.title} className="bg-canvas rounded-3xl p-7">
              <span className="bg-brand-50 text-brand-600 flex h-10 w-10 items-center justify-center rounded-2xl">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  {item.icon}
                </svg>
              </span>
              <p className="text-body-sm text-ink mt-4 font-semibold">{item.title}</p>
              <p className="text-caption text-mid-gray mt-1.5 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
