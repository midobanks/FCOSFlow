const pains = [
  { n: '01', title: 'Information loss', detail: 'between shifts' },
  { n: '02', title: 'Unclear accountability', detail: 'across teams' },
  { n: '03', title: 'Late detection', detail: 'of operational risk' },
  { n: '04', title: 'Inconsistent execution', detail: 'across Captains' },
  { n: '05', title: 'Knowledge fragmentation', detail: 'tribal and outdated' },
];

export function ProblemBand() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h2 className="text-ink text-[clamp(2rem,4.5vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.015em]">
            The operating layer is fragmented.
          </h2>
          <p className="text-body-sm text-mid-gray mt-5 max-w-2xl leading-[1.47] tracking-[-0.02em]">
            Your WMS tracks inventory and orders. But the daily operating layer still lives in
            spreadsheets, paper, whiteboards, Slack, verbal handovers, and tribal knowledge. That is
            where shifts fail.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pains.map((pain) => (
            <div key={pain.n} className="bg-canvas rounded-3xl p-6">
              <p className="text-micro text-brand-600 font-semibold tracking-[-0.01em]">{pain.n}</p>
              <p className="text-body-sm text-ink mt-3 leading-snug font-semibold">{pain.title}</p>
              <p className="text-caption text-mid-gray mt-1.5 leading-snug">{pain.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
