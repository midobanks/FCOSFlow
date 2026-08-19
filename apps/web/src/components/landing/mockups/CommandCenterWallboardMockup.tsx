const wallStats = [
  { label: 'Shift health', value: '92%', note: 'vs. plan' },
  { label: 'Units today', value: '1,240', note: 'on plan' },
  { label: 'Open incidents', value: '3', note: '2 contained' },
  { label: 'Cold chain', value: '98%', note: 'compliant' },
];

const wallZones = [
  { zone: 'Receipt', status: 'On plan', tone: 'text-success-base', bar: 'w-4/5' },
  { zone: 'Picking', status: 'On plan', tone: 'text-success-base', bar: 'w-3/4' },
  { zone: 'Stockflow', status: 'Ahead', tone: 'text-info-base', bar: 'w-5/6' },
  { zone: 'Packaging', status: 'Watch', tone: 'text-warning-base', bar: 'w-3/5' },
];

export function CommandCenterWallboardMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of the FCOS Flow wallboard showing large site-level key figures with no personal data"
      className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1b22]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <p className="text-caption font-medium text-white/80">Command Center · Wallboard</p>
        <span className="text-micro flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold text-white/80">
          <span className="bg-success-base h-1.5 w-1.5 animate-pulse rounded-full" />
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4">
        {wallStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white/5 p-5">
            <p className="text-micro font-medium text-white/50">{stat.label}</p>
            <p className="text-paper mt-2 text-4xl leading-none font-bold tracking-[-0.02em] tabular-nums lg:text-5xl">
              {stat.value}
            </p>
            <p className="text-micro mt-2 text-white/50">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="p-6 pt-0">
        <div className="rounded-2xl bg-white/5 p-5">
          <p className="text-caption font-medium text-white/80">Zone status</p>
          <div className="mt-4 space-y-4">
            {wallZones.map((zone) => (
              <div key={zone.zone} className="flex items-center gap-4">
                <p className="text-body-sm text-paper w-24 shrink-0 font-medium">{zone.zone}</p>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className={`bg-brand-500 h-full rounded-full ${zone.bar}`} />
                </div>
                <p className={`text-caption w-16 shrink-0 text-right font-semibold ${zone.tone}`}>
                  {zone.status}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-micro mt-4 text-white/40">
          Privacy-safe mode — no names, no personal data. Refreshes every 60 seconds.
        </p>
      </div>
    </div>
  );
}
