import type { CardKind } from './events';

// Maps an mp-mcp tool name to the card kind its result renders as.
// find_member renders a lightweight 'member' card (identity only); the detailed
// 'mp' card comes from member_overview and supersedes it (see CardView dedupe).
// find_constituency stays unmapped — it only resolves ids for the tool-trace.
export const CARD_FOR_TOOL: Record<string, CardKind | undefined> = {
  parliament_find_member: 'member',
  parliament_member_overview: 'mp',
  parliament_get_division: 'vote',
  parliament_get_debate: 'debate',
  parliament_search_hansard: 'debate',
  parliament_topic_tracker: 'topic',
};

export function cardKindForTool(name: string): CardKind | undefined {
  return CARD_FOR_TOOL[name];
}
