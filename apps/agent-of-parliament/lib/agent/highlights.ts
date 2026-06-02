import { normalizeConstituency } from '@/lib/map/geo';
import type { MemberOverviewData } from '@jamesmccomish/mp-mcp/types';
import type { CardKind } from './events';

export interface ConstituencyRef {
  name: string;
  party: string;
}

interface CardLike {
  kind: CardKind;
  data: unknown;
}

// Pulls the constituencies currently in view from the assembled cards so the map can
// highlight them. Only MP cards carry a reliable constituency+party; deduped by the
// same normalized name the map joins on, so asking about one MP twice lights one seat.
export function highlightsFromCards(cards: CardLike[]): ConstituencyRef[] {
  const byNorm = new Map<string, ConstituencyRef>();
  for (const card of cards) {
    if (card.kind !== 'mp') continue;
    const member = (card.data as MemberOverviewData | undefined)?.member;
    if (!member?.constituency) continue;
    const norm = normalizeConstituency(member.constituency);
    if (!byNorm.has(norm)) byNorm.set(norm, { name: member.constituency, party: member.party });
  }
  return [...byNorm.values()];
}
