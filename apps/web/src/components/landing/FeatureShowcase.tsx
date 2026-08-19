import type { ReactNode } from 'react';

type FeatureShowcaseProps = {
  id?: string;
  bgClass?: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  mockup: ReactNode;
  reverse?: boolean;
};

export function FeatureShowcase({
  id,
  bgClass = 'bg-paper',
  eyebrow,
  title,
  body,
  bullets = [],
  mockup,
  reverse = false,
}: FeatureShowcaseProps) {
  return (
    <section id={id} className={bgClass}>
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div className={reverse ? 'lg:order-2' : ''}>
          <p className="text-body-sm text-ink font-medium tracking-[-0.01em]">{eyebrow}</p>
          <h2 className="text-ink mt-3 text-[clamp(2rem,4.5vw,2.5rem)] leading-[1.08] font-bold tracking-[-0.015em]">
            {title}
          </h2>
          <p className="text-body-sm text-mid-gray mt-5 max-w-lg leading-[1.47] tracking-[-0.02em]">
            {body}
          </p>
          {bullets.length > 0 && (
            <ul className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
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
                  <span className="text-body-sm text-deep-gray leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={reverse ? 'lg:order-1' : ''}>{mockup}</div>
      </div>
    </section>
  );
}
