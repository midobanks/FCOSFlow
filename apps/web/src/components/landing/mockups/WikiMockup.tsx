const articles = [
  {
    title: 'Cold-chain log tags',
    type: 'SOP · Stockflow',
    badge: 'Approved',
    badgeClass: 'bg-success-bg text-success-text',
    meta: 'v4.2 · 12 Aug',
  },
  {
    title: 'G4/G6 frame counting',
    type: 'SOP · Packaging',
    badge: 'Approved',
    badgeClass: 'bg-success-bg text-success-text',
    meta: 'v3.1 · 3 Aug',
  },
  {
    title: 'Receipt start-of-shift checklist',
    type: 'Checklist · Receipt',
    badge: 'In review',
    badgeClass: 'bg-warning-bg text-warning-text',
    meta: 'draft · 18 Aug',
  },
];

export function WikiMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of the FCOS Flow Warehouse Wiki showing approved articles and version control"
      className="border-hairline bg-paper mx-auto w-full max-w-xl rounded-3xl border p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-caption text-mid-gray font-medium">Warehouse Wiki</p>
          <p className="text-body text-ink font-semibold tracking-[-0.01em]">
            Approved operational knowledge
          </p>
        </div>
        <div className="bg-canvas text-caption text-mid-gray flex items-center gap-2 rounded-full px-3 py-2">
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
              d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            />
          </svg>
          Search processes, SKUs, roles…
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {articles.map((article) => (
          <li
            key={article.title}
            className="bg-canvas hover:bg-cool-wash flex items-center justify-between gap-3 rounded-2xl p-4 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-caption text-ink truncate font-medium">{article.title}</p>
              <p className="text-micro text-mid-gray">
                {article.type} · {article.meta}
              </p>
            </div>
            <span
              className={`text-micro shrink-0 rounded-full px-3 py-1 font-semibold ${article.badgeClass}`}
            >
              {article.badge}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-hairline bg-faded-surface mt-5 rounded-2xl border p-4">
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 24 24"
            className="text-brand-600 h-4 w-4"
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
          <div>
            <p className="text-caption text-ink font-semibold">Cold-chain log tags · Version 4.2</p>
            <p className="text-micro text-mid-gray">
              Published · immutable · reviewed by K. Bremer on 12 Aug
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
