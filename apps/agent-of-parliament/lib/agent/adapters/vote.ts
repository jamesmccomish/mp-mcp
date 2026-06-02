import type { Citation, GetDivisionData, House } from '@jamesmccomish/mp-mcp/types';

export interface PartyTally {
  party: string;
  count: number;
}

export interface VoteViewModel {
  divisionId: number;
  house: House;
  divisionNumber: number;
  title: string;
  date: string;
  ayes: number;
  noes: number;
  passed: boolean;
  ayesByParty: PartyTally[];
  noesByParty: PartyTally[];
  sources: Citation[];
}

// Sort a {party: count} map into a descending array; ties break alphabetically
// so the breakdown order is stable across renders.
function toTally(byParty: Record<string, number>): PartyTally[] {
  return Object.entries(byParty)
    .map(([party, count]) => ({ party, count }))
    .sort((a, b) => b.count - a.count || a.party.localeCompare(b.party));
}

// parliament_get_division result -> vote card view-model. `data` is the parsed
// envelope payload from a trusted mp-mcp tool, so it is narrowed to its contract.
export function adaptVote(data: unknown, sources: Citation[]): VoteViewModel {
  const d = data as GetDivisionData;
  return {
    divisionId: d.id,
    house: d.house,
    divisionNumber: d.division_number,
    title: d.title,
    date: d.date,
    ayes: d.ayes,
    noes: d.noes,
    passed: d.passed,
    ayesByParty: toTally(d.ayes_by_party),
    noesByParty: toTally(d.noes_by_party),
    sources,
  };
}
