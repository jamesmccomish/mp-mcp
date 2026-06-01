import type { RawMemberVotingRecord } from '../clients/commonsVotes.js';
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

export function mapVoteFromMemberVotingRecord(raw: RawMemberVotingRecord): MemberVote {
  const div = raw.PublishedDivision;
  const vote: MemberVote['vote'] = raw.MemberWasTeller
    ? 'teller'
    : raw.MemberVotedAye
      ? 'aye'
      : raw.MemberVotedNo
        ? 'no'
        : 'absent';
  return {
    division_id: div.DivisionId,
    division_number: div.Number,
    house: 'Commons',
    title: div.Title,
    date: div.Date,
    vote,
    ayes: div.AyeCount,
    noes: div.NoCount,
    passed: div.AyeCount > div.NoCount,
  };
}
