import Link from 'next/link';

const trustPoints = ['Pilot at your first site', 'Offline-tolerant', 'English + German'];

export function FinalCta() {
  return (
    <section id="demo" className="bg-ink">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(15,118,110,0.45),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-28 text-center lg:py-36">
          <p className="text-body-sm font-medium text-white/70">FCOS Flow</p>
          <h2 className="text-paper mx-auto mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.02em]">
            Run every shift with confidence.
          </h2>
          <p className="text-body-sm mx-auto mt-6 max-w-xl leading-[1.47] text-white/60">
            See how one structured environment replaces spreadsheets, whiteboards, and tribal
            knowledge — starting with your first site.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/quick-and-dirty"
              className="bg-electric-blue text-body-sm text-paper flex h-12 w-full max-w-xs items-center justify-center rounded-full px-8 font-medium transition-opacity hover:opacity-90 sm:w-auto"
            >
              Steer your shift
            </Link>
            <Link
              href="#modules"
              className="text-body-sm text-paper flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-white/25 px-8 font-medium transition-colors hover:bg-white/10 sm:w-auto"
            >
              Talk to sales
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {trustPoints.map((point) => (
              <li key={point} className="text-caption flex items-center gap-2 text-white/60">
                <svg
                  viewBox="0 0 24 24"
                  className="text-brand-300 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
