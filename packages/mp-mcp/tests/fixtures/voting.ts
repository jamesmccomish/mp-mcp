import type { RawMemberVotingRecord } from '../../src/clients/commonsVotes.js';
import type { RawVotingItem } from '../../src/clients/members.js';

export const VOTE_AYE_CLIMATE: RawVotingItem = {
  house: 1,
  id: 1001,
  title: 'Climate Change Bill: Third Reading',
  date: '2025-03-15T00:00:00',
  divisionNumber: 100,
  inAffirmativeLobby: true,
  inNegativeLobby: false,
  actedAsTeller: false,
  numberInFavour: 320,
  numberAgainst: 200,
};

export const VOTE_NO_TAX: RawVotingItem = {
  house: 1,
  id: 1002,
  title: 'Finance Bill (No. 2): Second Reading',
  date: '2025-02-10T00:00:00',
  divisionNumber: 87,
  inAffirmativeLobby: false,
  inNegativeLobby: true,
  actedAsTeller: false,
  numberInFavour: 290,
  numberAgainst: 230,
};

export const VOTE_TELLER: RawVotingItem = {
  house: 1,
  id: 1003,
  title: 'Renters Rights Bill: Lords Amendments',
  date: '2024-12-04T00:00:00',
  divisionNumber: 45,
  inAffirmativeLobby: false,
  inNegativeLobby: false,
  actedAsTeller: true,
  numberInFavour: 310,
  numberAgainst: 210,
};

export const VOTING_PAGE = [VOTE_AYE_CLIMATE, VOTE_NO_TAX, VOTE_TELLER];

export function votingEnvelope(items: RawVotingItem[]) {
  return {
    items: items.map((value) => ({ value })),
    totalResults: items.length,
  };
}

// Commons Votes /membervoting records: the embedded PublishedDivision carries
// the summary; its Ayes/Noes arrays come back empty (roster lives in get_division).
function summary(divisionId: number, title: string, date: string, aye: number, no: number) {
  return {
    DivisionId: divisionId,
    Date: date,
    Number: divisionId % 1000,
    Title: title,
    AyeCount: aye,
    NoCount: no,
  };
}

export const MV_FINANCE_AYE: RawMemberVotingRecord = {
  MemberId: 172,
  MemberVotedAye: true,
  MemberVotedNo: false,
  MemberWasTeller: false,
  PublishedDivision: summary(
    2281,
    'Finance (No. 2) Bill: Third Reading',
    '2026-03-11T00:00:00',
    292,
    161,
  ),
};

export const MV_FINANCE_NO: RawMemberVotingRecord = {
  MemberId: 172,
  MemberVotedAye: false,
  MemberVotedNo: true,
  MemberWasTeller: false,
  PublishedDivision: summary(
    2280,
    'Finance (No. 2) Bill Report Stage: Amendment 6',
    '2026-03-11T00:00:00',
    175,
    292,
  ),
};

export const MV_TELLER: RawMemberVotingRecord = {
  MemberId: 172,
  MemberVotedAye: false,
  MemberVotedNo: false,
  MemberWasTeller: true,
  PublishedDivision: summary(
    2270,
    'Renters Rights Bill: Lords Amendments',
    '2025-12-04T00:00:00',
    310,
    210,
  ),
};

export const MEMBER_VOTING_RECORDS = [MV_FINANCE_AYE, MV_FINANCE_NO, MV_TELLER];
