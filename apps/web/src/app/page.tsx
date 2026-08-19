import { AiBand } from '@/components/landing/AiBand';
import { FeatureShowcase } from '@/components/landing/FeatureShowcase';
import { FinalCta } from '@/components/landing/FinalCta';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingNav } from '@/components/landing/LandingNav';
import { ModuleGrid } from '@/components/landing/ModuleGrid';
import { ProblemBand } from '@/components/landing/ProblemBand';
import { PromoRibbon } from '@/components/landing/PromoRibbon';
import { SecurityBand } from '@/components/landing/SecurityBand';
import { CaptainCompanionMockup } from '@/components/landing/mockups/CaptainCompanionMockup';
import { CommandCenterWallboardMockup } from '@/components/landing/mockups/CommandCenterWallboardMockup';
import { ShiftHandoverMockup } from '@/components/landing/mockups/ShiftHandoverMockup';
import { WikiMockup } from '@/components/landing/mockups/WikiMockup';

export default function HomePage() {
  return (
    <>
      <PromoRibbon />
      <LandingNav />
      <LandingHero />
      <ProblemBand />
      <ModuleGrid />
      <FeatureShowcase
        id="product"
        bgClass="bg-paper"
        eyebrow="Command Center"
        title="Know your site at a glance."
        body="A live picture of shift health, risks, and ownership — where every metric links to its source record, so a glance never hides the detail."
        bullets={[
          'Readiness, incidents, quality, and frames in one place',
          'Risks surfaced before they become failures',
          'Wallboard mode for privacy-safe floor displays',
        ]}
        mockup={<CommandCenterWallboardMockup />}
      />
      <FeatureShowcase
        bgClass="bg-canvas"
        eyebrow="Captain Companion"
        title="A Captain's operating system."
        body="Start the shift with structured checks, keep tasks and escalations in one place, and carry the context that matters into the handover."
        bullets={[
          'Start-of-shift checks that close out cleanly',
          'Quick completion and one-tap escalation',
          'Drafts survive imperfect connectivity',
        ]}
        mockup={<CaptainCompanionMockup />}
        reverse
      />
      <FeatureShowcase
        bgClass="bg-paper"
        eyebrow="Shift Handover"
        title="No information lost between shifts."
        body="Handovers are pre-populated from live modules, locked when submitted, and acknowledged by the incoming Captain. Amendments stay append-only."
        bullets={[
          'Metrics, incidents, and risks pre-filled',
          'Outgoing context captured every time',
          'Acknowledged, audited, never silently rewritten',
        ]}
        mockup={<ShiftHandoverMockup />}
      />
      <FeatureShowcase
        id="wiki"
        bgClass="bg-canvas"
        eyebrow="Warehouse Wiki"
        title="Approved knowledge, always current."
        body="Versioned SOPs, processes, FAQs, and training guides with owners, review dates, and mandatory acknowledgements. Searchable in English and German."
        bullets={[
          'Immutable published versions',
          'Local and network approval levels',
          'Permission-aware full-text search',
        ]}
        mockup={<WikiMockup />}
        reverse
      />
      <SecurityBand />
      <AiBand />
      <FinalCta />
      <LandingFooter />
    </>
  );
}
