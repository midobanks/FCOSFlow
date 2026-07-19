export {
  canTransition,
  ARTICLE_STATUS_TRANSITIONS,
  type ArticleSnapshot,
  type ArticleVersionSnapshot,
} from './article';

export type ArticleStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'SUPERSEDED' | 'ARCHIVED';
export type ArticleType =
  | 'SOP'
  | 'PROCESS'
  | 'FAQ'
  | 'TEMPLATE'
  | 'TRAINING_GUIDE'
  | 'POLICY'
  | 'CHECKLIST'
  | 'TROUBLESHOOTING'
  | 'QUICK_REFERENCE';
export type ProcessArea = 'RECEIPT' | 'PICKING' | 'STOCKFLOW' | 'TRUNKING' | 'INFLOW';
export type GovernanceLevel = 'LOCAL' | 'SITE' | 'NETWORK';
export type IncidentSeverity = 'P1' | 'P2' | 'P3' | 'P4';
export type IncidentStatus =
  | 'OPEN'
  | 'CONTAINED'
  | 'INVESTIGATING'
  | 'MONITORING'
  | 'RESOLVED'
  | 'CLOSED';
