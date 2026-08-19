const checks = [
  { label: 'Confirm cold-chain log tags', state: 'done' },
  { label: 'Review previous handover', state: 'done' },
  { label: 'Acknowledge open incidents', state: 'active' },
  { label: 'Confirm frame counts', state: 'pending' },
];

const tasks = [
  { label: 'Cover picking zone A3', time: '09:00', owner: 'D. Chen', tone: 'bg-electric-blue' },
  {
    label: 'Escalate G4 frame shortage',
    time: '09:30',
    owner: 'L. Santos',
    tone: 'bg-warning-base',
  },
];

const tabs = ['Today', 'Tasks', 'Incidents', 'Wiki', 'More'];

export function CaptainCompanionMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of the FCOS Flow Captain Companion on a mobile device showing start-of-shift checks and tasks"
      className="border-ink bg-ink mx-auto w-full max-w-[300px] rounded-[44px] border p-2"
    >
      <div className="bg-paper overflow-hidden rounded-[34px]">
        <div className="bg-canvas text-micro text-ink flex items-center justify-between px-5 pt-3 font-medium">
          <span className="tabular-nums">06:12</span>
          <span className="bg-ink/80 h-2 w-16 rounded-full" />
          <span aria-hidden="true">●●●</span>
        </div>

        <div className="px-5 pt-3">
          <p className="text-micro text-mid-gray">Morning shift · Receipt</p>
          <p className="text-body text-ink mt-0.5 font-semibold tracking-[-0.01em]">
            Good morning, Aisha
          </p>
        </div>

        <div className="px-5 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-caption text-ink font-semibold">Start-of-shift checks</p>
            <p className="text-micro text-brand-600 font-semibold tabular-nums">2/4</p>
          </div>
          <div className="bg-cool-wash mt-2 h-1.5 overflow-hidden rounded-full">
            <div className="bg-brand-500 h-full w-1/2 rounded-full" />
          </div>
          <ul className="mt-3 space-y-2.5">
            {checks.map((check) => (
              <li key={check.label} className="flex items-center gap-2.5">
                {check.state === 'done' ? (
                  <span className="bg-brand-500 text-paper flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
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
                  <span
                    className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                      check.state === 'active' ? 'border-brand-500' : 'border-neutral-200'
                    }`}
                  />
                )}
                <p
                  className={`text-caption ${
                    check.state === 'pending' ? 'text-mid-gray' : 'text-ink font-medium'
                  }`}
                >
                  {check.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 pt-4">
          <p className="text-caption text-ink font-semibold">Tasks</p>
          <ul className="mt-2.5 space-y-2.5">
            {tasks.map((task) => (
              <li key={task.label} className="bg-canvas flex items-center gap-2.5 rounded-2xl p-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${task.tone}`} />
                <div className="flex-1">
                  <p className="text-caption text-ink font-medium">{task.label}</p>
                  <p className="text-micro text-mid-gray">
                    {task.owner} · {task.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 pt-4">
          <button
            type="button"
            className="bg-electric-blue text-caption text-paper h-10 w-full rounded-full font-medium"
          >
            Escalate an issue
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 px-5 py-3">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={`text-micro ${index === 0 ? 'text-brand-600 font-semibold' : 'text-quiet-dot'}`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
