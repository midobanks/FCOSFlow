export const ENABLE_PG_TRGM = `CREATE EXTENSION IF NOT EXISTS pg_trgm;`;

export const CREATE_SEARCH_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_article_title_trgm ON "Article" USING gin (title gin_trgm_ops);
  CREATE INDEX IF NOT EXISTS idx_article_organization_status ON "Article" ("organizationId", status);
`;
