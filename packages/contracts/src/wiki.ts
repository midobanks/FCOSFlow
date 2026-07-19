import { z } from 'zod';

export const articleTypeEnum = z.enum([
  'SOP',
  'PROCESS',
  'FAQ',
  'TEMPLATE',
  'TRAINING_GUIDE',
  'POLICY',
  'CHECKLIST',
  'TROUBLESHOOTING',
  'QUICK_REFERENCE',
]);

export const processAreaEnum = z.enum([
  'RECEIPT',
  'PICKING',
  'STOCKFLOW',
  'TRUNKING',
  'INFLOW',
]);

export const articleStatusEnum = z.enum([
  'DRAFT',
  'IN_REVIEW',
  'PUBLISHED',
  'SUPERSEDED',
  'ARCHIVED',
]);

export const governanceLevelEnum = z.enum(['LOCAL', 'SITE', 'NETWORK']);

export const createArticleSchema = z.object({
  title: z.string().min(1).max(200),
  summary: z.string().max(500).optional(),
  articleType: articleTypeEnum,
  processArea: processAreaEnum.optional(),
  governanceLevel: governanceLevelEnum.optional().default('LOCAL'),
  content: z.record(z.unknown()),
  language: z.string().length(2).optional().default('en'),
  siteId: z.string().optional(),
});

export const updateArticleSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  summary: z.string().max(500).optional(),
  articleType: articleTypeEnum.optional(),
  processArea: processAreaEnum.optional(),
  governanceLevel: governanceLevelEnum.optional(),
  content: z.record(z.unknown()).optional(),
  language: z.string().length(2).optional(),
  changeNotes: z.string().max(500).optional(),
});

export const submitForReviewSchema = z.object({
  changeNotes: z.string().max(500).optional(),
});

export const reviewDecisionSchema = z.object({
  decision: z.enum(['approved', 'changes_requested', 'rejected']),
  notes: z.string().max(1000).optional(),
});

export const articleParamsSchema = z.object({
  id: z.string(),
});

export const searchArticlesSchema = z.object({
  q: z.string().min(1).max(200),
  articleType: articleTypeEnum.optional(),
  processArea: processAreaEnum.optional(),
  status: articleStatusEnum.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type SubmitForReviewInput = z.infer<typeof submitForReviewSchema>;
export type ReviewDecisionInput = z.infer<typeof reviewDecisionSchema>;
export type SearchArticlesInput = z.infer<typeof searchArticlesSchema>;
