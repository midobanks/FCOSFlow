import { SearchField } from '@/components/SearchField';
import { ArticleCard } from '@/components/ArticleCard';

type SearchResult = {
  article: {
    id: string;
    title: string;
    summary: string | null;
    articleType: string;
    processArea: string | null;
    status: string;
    governanceLevel: string;
    ownerId: string;
    updatedAt: string;
  };
  matchType: string;
};

async function searchArticles(q: string): Promise<SearchResult[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/v1/wiki/search?q=${encodeURIComponent(q)}&limit=50`, {
      cache: 'no-store',
    });
    const json = await res.json();
    return json.ok ? json.data.results : [];
  } catch {
    return [];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const results = q ? await searchArticles(q) : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <SearchField large autoFocus initialValue={q ?? ''} />
      </div>

      {q && (
        <div className="mb-6">
          <p className="text-sm text-neutral-600">
            {results.length === 0
              ? `No results for "${q}"`
              : `${results.length} result${results.length === 1 ? '' : 's'} for "${q}"`}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {results.map((result) => (
          <ArticleCard
            key={result.article.id}
            {...result.article}
            matchType={result.matchType}
          />
        ))}
      </div>
    </div>
  );
}
