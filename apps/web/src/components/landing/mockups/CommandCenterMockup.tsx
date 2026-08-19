const kpis = [
  { label: 'Shift health', value: '92%', note: 'vs. plan +6', accent: 'bg-brand-500' },
  { label: 'Units picked', value: '1,240', note: 'on plan', accent: 'bg-electric-blue' },
  { label: 'Open incidents', value: '3', note: '2 contained', accent: 'bg-warning-base' },
  { label: 'Cold chain', value: '98%', note: 'all scans logged', accent: 'bg-success-base' },
];

const attentionItems = [
  {
    tone: 'warning',
    toneClass: 'text-warning-base',
    dotClass: 'bg-warning-base',
    title: 'G4 frames running low',
    detail: '24 available vs. 40 demand',
    owner: 'L. Santos',
    due: 'Due 09:30',
  },
  {
    tone: 'danger',
    toneClass: 'text-danger-base',
    dotClass: 'bg-danger-base',
    title: 'Cold-chain scan missing',
    detail: 'Shipment #4821 · Chilled',
    owner: 'Unassigned',
    due: 'Due now',
  },
  {
    tone: 'neutral',
    toneClass: 'text-mid-gray',
    dotClass: 'bg-mid-gray',
    title: 'Handover draft not submitted',
    detail: 'Outgoing: R. Mwangi',
    owner: 'R. Mwangi',
    due: 'Due 05:45',
  },
];

const healthBars = [
  { label: 'Picking readiness', value: 88, tone: 'bg-brand-500' },
  { label: 'Stockflow', value: 95, tone: 'bg-brand-300' },
  { label: 'Quality checks', value: 97, tone: 'bg-success-base' },
];

export function CommandCenterMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of the FCOS Flow Command Center dashboard showing shift health, incidents, and needs attention"
      className="bg-paper"
    >
      <div className="border-hairline bg-faded-surface flex items-center gap-2 border-b px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="bg-paper text-caption text-mid-gray mx-auto hidden w-full max-w-sm rounded-md px-3 py-1.5 sm:block">
          fcos.flow/command-center
        </div>
      </div>

      <div className="border-brand-100 bg-canvas border-t p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-caption text-mid-gray font-medium">Command Center</p>
            <p className="text-body-sm text-ink font-semibold">Site A · Morning shift</p>
          </div>
          <span className="bg-brand-50 text-micro text-brand-700 flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold">
            <span className="bg-brand-500 h-1.5 w-1.5 rounded-full" />
            LIVE
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-paper rounded-2xl p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-micro text-mid-gray font-medium">{kpi.label}</p>
                <span className={`h-2 w-2 rounded-full ${kpi.accent}`} />
              </div>
              <p className="text-ink mt-2 text-[1.75rem] leading-none font-bold tracking-[-0.02em] tabular-nums">
                {kpi.value}
              </p>
              <p className="text-micro text-quiet-dot mt-1.5">{kpi.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-5">
          <div className="bg-paper rounded-2xl p-4 lg:col-span-3">
            <p className="text-caption text-ink font-semibold">Needs attention</p>
            <ul className="mt-3 space-y-3">
              {attentionItems.map((item) => (
                <li key={item.title} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${item.dotClass}`} />
                    <div>
                      <p className="text-caption text-ink font-medium">{item.title}</p>
                      <p className="text-micro text-mid-gray">{item.detail}</p>
                    </div>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className={`text-micro font-medium ${item.toneClass}`}>{item.owner}</p>
                    <p className="text-micro text-quiet-dot">{item.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-paper rounded-2xl p-4 lg:col-span-2">
            <p className="text-caption text-ink font-semibold">Throughput vs. plan</p>
            <svg viewBox="0 0 280 96" className="mt-2 h-24 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="flow-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f766e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="52"
                x2="280"
                y2="52"
                stroke="#e9edf2"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M0 76 L40 68 L80 71 L120 58 L160 62 L200 46 L240 50 L280 34 L280 96 L0 96 Z"
                fill="url(#flow-fill)"
              />
              <path
                d="M0 76 L40 68 L80 71 L120 58 L160 62 L200 46 L240 50 L280 34"
                fill="none"
                stroke="#0f766e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0 52 L80 52 L160 52 L240 52"
                fill="none"
                stroke="#2b6cb0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>
            <div className="text-micro text-mid-gray mt-2 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="bg-brand-500 h-1.5 w-1.5 rounded-full" /> Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="bg-info-base h-1.5 w-1.5 rounded-full" /> Plan
              </span>
            </div>
          </div>
        </div>

        <div className="bg-paper mt-3 rounded-2xl p-4">
          <p className="text-caption text-ink font-semibold">Site health</p>
          <div className="mt-3 space-y-3">
            {healthBars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-4">
                <p className="text-micro text-deep-gray w-32 shrink-0 font-medium">{bar.label}</p>
                <div className="bg-cool-wash h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${bar.tone}`}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
                <p className="text-micro text-ink w-10 shrink-0 text-right font-semibold tabular-nums">
                  {bar.value}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
