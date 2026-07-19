import type { ArticleStatus, ArticleType, ProcessArea, GovernanceLevel } from './index';

export const ARTICLE_STATUS_TRANSITIONS: Record<ArticleStatus, ArticleStatus[]> = {
  DRAFT: ['IN_REVIEW', 'ARCHIVED'],
  IN_REVIEW: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
  PUBLISHED: ['DRAFT', 'SUPERSEDED', 'ARCHIVED'],
  SUPERSEDED: ['ARCHIVED'],
  ARCHIVED: [],
};

export function canTransition(from: ArticleStatus, to: ArticleStatus): boolean {
  return ARTICLE_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export type ArticleSnapshot = {
  id: string;
  organizationId: string;
  siteId: string | null;
  title: string;
  slug: string;
  summary: string | null;
  articleType: ArticleType;
  processArea: ProcessArea | null;
  status: ArticleStatus;
  governanceLevel: GovernanceLevel;
  ownerId: string;
  language: string;
  relatedArticleId: string | null;
  effectiveDate: Date | null;
  reviewDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleVersionSnapshot = {
  id: string;
  articleId: string;
  version: number;
  content: Record<string, unknown>;
  changeNotes: string | null;
  status: ArticleStatus;
  createdById: string;
  createdAt: Date;
};
