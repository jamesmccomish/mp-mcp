import type { PartyTally } from '@/lib/agent/adapters/vote';

// AYES/NOES share a baseline track; the larger lobby fills the track and the
// smaller is drawn proportional to it. Guards against an empty division.
export function lobbyFill(ayes: number, noes: number): { aye: number; no: number } {
  const max = Math.max(ayes, noes);
  if (max === 0) return { aye: 0, no: 0 };
  return { aye: ayes / max, no: noes / max };
}

export interface PartyShare extends PartyTally {
  fraction: number;
}

// Each party's share of a combined tally, for the party-breakdown stack.
export function partyShare(tally: PartyTally[]): PartyShare[] {
  const total = tally.reduce((sum, t) => sum + t.count, 0);
  if (total === 0) return [];
  return tally.map((t) => ({ ...t, fraction: t.count / total }));
}
