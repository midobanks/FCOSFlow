import { AiDraftMockup } from '@/components/landing/mockups/AiDraftMockup';

const aiPoints = [
  'AI content stays draft until a human approves it',
  'Sources are always shown, never guessed',
  'Retrieval respects your permissions — no cross-tenant leaks',
  'Provider-abstracted, so the best model wins later too',
];

export function AiBand() {
  return (
    <section id="ai" className="bg-canvas">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div>
          <p className="text-body-sm text-ink font-medium tracking-[-0.01em]">AI Assistance</p>
          <h2 className="text-ink mt-3 text-[clamp(2rem,4.5vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.015em]">
            AI that earns its place on the floor.
          </h2>
          <p className="text-body-sm text-mid-gray mt-5 max-w-lg leading-[1.47] tracking-[-0.02em]">
            Shift summaries, standup drafts, and root-cause hypotheses — drafted in seconds,
            reviewed by people, published only on approval.
          </p>
          <ul className="mt-8 space-y-4">
            {aiPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="bg-brand-100 text-brand-700 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-body-sm text-deep-gray leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:order-2">
          <AiDraftMockup />
        </div>
      </div>
    </section>
  );
}
