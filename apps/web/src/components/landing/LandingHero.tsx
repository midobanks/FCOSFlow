import Link from 'next/link';
import { CommandCenterMockup } from '@/components/landing/mockups/CommandCenterMockup';

export function LandingHero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-6 pt-14 text-center sm:pt-20 lg:pt-24">
        <p className="text-body-sm text-ink font-medium tracking-[-0.01em]">FCOS Flow</p>
        <h1 className="text-ink mx-auto mt-3 max-w-4xl text-[clamp(2.75rem,8.5vw,6rem)] leading-[1.04] font-bold tracking-[-0.02em]">
          Run every shift
          <br className="hidden sm:block" />
          with confidence.
        </h1>
        <p className="text-mid-gray mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,2.2vw,1.25rem)] leading-[1.4] tracking-[-0.01em]">
          The AI-assisted operating system for fulfillment centres. One structured environment to
          prepare, run, monitor, hand over, and improve every shift.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/quick-and-dirty"
            className="bg-electric-blue text-body-sm text-paper flex h-11 w-full max-w-xs items-center justify-center rounded-full px-7 font-medium transition-opacity hover:opacity-90 sm:w-auto"
          >
            Steer your shift
          </Link>
          <Link
            href="#product"
            className="border-ink/20 text-body-sm text-ink hover:bg-cool-wash flex h-11 w-full max-w-xs items-center justify-center rounded-full border px-7 font-medium transition-colors sm:w-auto"
          >
            Explore the product
          </Link>
        </div>
        <p className="text-caption text-mid-gray mt-4">
          Pilot for your first site · English + German · Works offline
        </p>
      </div>

      <div className="relative mt-16 overflow-hidden bg-[linear-gradient(184deg,#1d1d1f_0%,#0a3f3b_58%,#0f766e_100%)] sm:mt-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(105,195,188,0.35),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-[1200px] px-6 pt-10 sm:pt-14 lg:pt-16">
          <div className="overflow-hidden rounded-t-[28px]">
            <CommandCenterMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
