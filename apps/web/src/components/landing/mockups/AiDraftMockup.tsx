const sources = ['Incident #1042', 'Handover · 05 Aug', 'Cold-chain log v4.2'];

export function AiDraftMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of an AI-drafted shift summary that stays in draft until a human approves it"
      className="border-hairline bg-paper mx-auto w-full max-w-xl rounded-3xl border p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="bg-brand-500 text-paper flex h-8 w-8 items-center justify-center rounded-full">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1m-8.6 8.6-2.1 2.1"
              />
            </svg>
          </span>
          <div>
            <p className="text-caption text-ink font-semibold">AI Shift Summary</p>
            <p className="text-micro text-mid-gray">Drafted for the Captain · 06:00</p>
          </div>
        </div>
        <span className="bg-brand-50 text-micro text-brand-700 rounded-full px-3 py-1.5 font-semibold">
          Draft — not published
        </span>
      </div>

      <div className="bg-canvas mt-5 rounded-2xl p-4">
        <p className="text-caption text-deep-gray leading-relaxed">
          Overnight, three incidents were logged in packaging. The G4 frame count dropped below the
          safety buffer for the morning peak. Recommended: prioritise frame returns before 08:00 and
          confirm picking zone A3 staffing after 09:00.
        </p>
      </div>

      <div className="mt-4">
        <p className="text-micro text-mid-gray font-semibold">SOURCES</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {sources.map((source) => (
            <span
              key={source}
              className="border-hairline bg-faded-surface text-micro text-deep-gray rounded-full border px-3 py-1.5 font-medium"
            >
              {source}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          className="bg-brand-500 text-body-sm text-paper h-11 flex-1 rounded-full font-medium"
        >
          Approve &amp; publish
        </button>
        <button
          type="button"
          className="border-ink/20 text-body-sm text-ink h-11 flex-1 rounded-full border font-medium"
        >
          Edit draft
        </button>
      </div>
      <p className="text-micro text-quiet-dot mt-3 text-center">
        Human approval is required before AI content is published.
      </p>
    </div>
  );
}
