import type { CardKind } from './events';

// Maps an mp-mcp tool name to the card kind its result renders as.
// Tools not listed here (find_member, find_constituency) only resolve ids;
// they drive the tool-trace, not their own card.
export const CARD_FOR_TOOL: Record<string, CardKind | undefined> = {
  parliament_member_overview: 'mp',
  parliament_get_division: 'vote',
  parliament_get_debate: 'debate',
  parliament_search_hansard: 'debate',
  parliament_topic_tracker: 'topic',
};

export function cardKindForTool(name: string): CardKind | undefined {
  return CARD_FOR_TOOL[name];
}
