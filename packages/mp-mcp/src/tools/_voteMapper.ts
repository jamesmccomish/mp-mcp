import type { RawMemberVotingRecord } from '../clients/commonsVotes.js';
import type { RawLordsMemberVotingRecord } from '../clients/lordsVotes.js';
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

// Lords records report content/not-content; we surface them as aye/no. The
// membervoting feed only returns divisions the peer voted in, so a non-teller
// non-content record is a "no" (not-content), never an abstention.
export function mapVoteFromLordsMemberVotingRecord(raw: RawLordsMemberVotingRecord): MemberVote {
  const div = raw.publishedDivision;
  const vote: MemberVote['vote'] = raw.memberWasTeller
    ? 'teller'
    : raw.memberWasContent
      ? 'aye'
      : 'no';
  const ayes = div.authoritativeContentCount;
  const noes = div.authoritativeNotContentCount;
  return {
    division_id: div.divisionId,
    division_number: div.number,
    house: 'Lords',
    title: div.title ?? '',
    date: div.date,
    vote,
    ayes,
    noes,
    passed: ayes > noes,
  };
}
