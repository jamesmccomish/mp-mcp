import type { RawVotingItem } from '../clients/members.js';
import { houseFromId } from '../domain/mappers.js';
import type { MemberVote } from '../domain/vote.js';

export function mapVoteFromRaw(raw: RawVotingItem): MemberVote {
  const vote: MemberVote['vote'] = raw.actedAsTeller
    ? 'teller'
    : raw.inAffirmativeLobby
      ? 'aye'
      : raw.inNegativeLobby
        ? 'no'
        : 'absent';
  return {
    division_id: raw.id,
    division_number: raw.divisionNumber,
    house: houseFromId(raw.house),
    title: raw.title,
    date: raw.date,
    vote,
    ayes: raw.numberInFavour,
    noes: raw.numberAgainst,
    passed: raw.numberInFavour > raw.numberAgainst,
  };
}
