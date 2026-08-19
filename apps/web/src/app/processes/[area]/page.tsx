import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/ArticleCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { getBaseUrl } from '@/lib/base-url';

const areaNames: Record<string, { title: string; sections: string[] }> = {
  receipt: {
    title: 'Receipt',
    sections: [
      'Process overview',
      'Roles & responsibilities',
      'Start-of-shift checklist',
      'Incident & escalation guide',
      'Handover template',
      'FAQ',
      'Training guide',
      'Operational template',
      'Glossary',
    ],
  },
  picking: {
    title: 'Picking',
    sections: [
      'Process overview',
      'Roles & responsibilities',
      'Start-of-shift checklist',
      'Incident & escalation guide',
      'Handover template',
      'FAQ',
      'Training guide',
      'Operational template',
      'Glossary',
    ],
  },
  stockflow: {
    title: 'Stockflow',
    sections: [
      'Process overview',
      'Roles & responsibilities',
      'Start-of-shift checklist',
      'Incident & escalation guide',
      'Handover template',
      'FAQ',
      'Training guide',
      'Operational template',
      'Glossary',
    ],
  },
  trunking: {
    title: 'Trunking',
    sections: [
      'Process overview',
      'Roles & responsibilities',
      'Start-of-shift checklist',
      'Incident & escalation guide',
      'Handover template',
      'FAQ',
      'Training guide',
      'Operational template',
      'Glossary',
    ],
  },
  inflow: {
    title: 'Inflow',
    sections: [
      'Process overview',
      'Roles & responsibilities',
      'Start-of-shift checklist',
      'Incident & escalation guide',
      'Handover template',
      'FAQ',
      'Training guide',
      'Operational template',
      'Glossary',
    ],
  },
};

async function getProcessArticles(area: string) {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/wiki/articles?limit=100`, { cache: 'no-store' });
    const json = await res.json();
    if (!json.ok) return [];
    return (json.data.articles as any[])
      .filter((a: any) => a.processArea?.toLowerCase() === area.toLowerCase())
      .map((a: any) => ({ ...a, matchType: undefined }));
  } catch {
    return [];
  }
}

export default async function ProcessAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const areaConfig = areaNames[area];

  if (!areaConfig) {
    notFound();
  }

  const articles = await getProcessArticles(area);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <Link href="/processes" className="text-link-blue text-sm hover:underline">
          &larr; All process libraries
        </Link>
      </div>

      <PageHeader
        title={areaConfig.title}
        subtitle={`Standard operating procedures, checklists, and guides for ${areaConfig.title.toLowerCase()}.`}
      />

      <div className="mb-10">
        <h2 className="text-caption text-ink mb-4 font-semibold">Content sections</h2>
        <div className="flex flex-wrap gap-2">
          {areaConfig.sections.map((section) => (
            <span
              key={section}
              className="border-hairline bg-paper text-deep-gray hover:border-brand-300 rounded-full border px-3 py-1.5 text-sm"
            >
              {section}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-caption text-ink mb-4 font-semibold">Articles</h2>
        {articles.length === 0 ? (
          <Card padded={false} className="p-8 text-center">
            <p className="text-quiet-dot">No articles yet for this process area.</p>
            <Link
              href="/admin/wiki/new"
              className="bg-electric-blue text-paper mt-3 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium hover:opacity-90"
            >
              Create first article
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {articles.map((article: any) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
