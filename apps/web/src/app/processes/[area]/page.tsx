import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/ArticleCard';

const areaNames: Record<string, { title: string; sections: string[] }> = {
  receipt: {
    title: 'Receipt',
    sections: ['Process overview', 'Roles & responsibilities', 'Start-of-shift checklist', 'Incident & escalation guide', 'Handover template', 'FAQ', 'Training guide', 'Operational template', 'Glossary'],
  },
  picking: {
    title: 'Picking',
    sections: ['Process overview', 'Roles & responsibilities', 'Start-of-shift checklist', 'Incident & escalation guide', 'Handover template', 'FAQ', 'Training guide', 'Operational template', 'Glossary'],
  },
  stockflow: {
    title: 'Stockflow',
    sections: ['Process overview', 'Roles & responsibilities', 'Start-of-shift checklist', 'Incident & escalation guide', 'Handover template', 'FAQ', 'Training guide', 'Operational template', 'Glossary'],
  },
  trunking: {
    title: 'Trunking',
    sections: ['Process overview', 'Roles & responsibilities', 'Start-of-shift checklist', 'Incident & escalation guide', 'Handover template', 'FAQ', 'Training guide', 'Operational template', 'Glossary'],
  },
  inflow: {
    title: 'Inflow',
    sections: ['Process overview', 'Roles & responsibilities', 'Start-of-shift checklist', 'Incident & escalation guide', 'Handover template', 'FAQ', 'Training guide', 'Operational template', 'Glossary'],
  },
};

async function getProcessArticles(area: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
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

export default async function ProcessAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const areaConfig = areaNames[area];

  if (!areaConfig) {
    notFound();
  }

  const articles = await getProcessArticles(area);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-6">
        <Link href="/processes" className="text-sm text-brand-500 hover:text-brand-600">
          &larr; All process libraries
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">{areaConfig.title}</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Standard operating procedures, checklists, and guides for {areaConfig.title.toLowerCase()}.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-neutral-800">Content sections</h2>
        <div className="flex flex-wrap gap-2">
          {areaConfig.sections.map((section) => (
            <span
              key={section}
              className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-600 hover:border-brand-300"
            >
              {section}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-neutral-800">Articles</h2>
        {articles.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
            <p className="text-neutral-400">No articles yet for this process area.</p>
            <Link
              href="/admin/wiki/new"
              className="mt-3 inline-flex h-10 items-center rounded-md bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600"
            >
              Create first article
            </Link>
          </div>
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
