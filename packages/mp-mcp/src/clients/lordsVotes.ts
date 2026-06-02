import { getJson } from './http.js';

const BASE = 'https://lordsvotes-api.parliament.uk/data';

// Lords votes use content/not-content terminology rather than aye/no. We map
// content -> aye and notContent -> no at the tool boundary so the agent-facing
// vocabulary stays consistent with the Commons.

export type RawLordsVoter = {
  memberId: number;
  name: string | null;
  party: string | null;
  partyAbbreviation: string | null;
};

export type RawLordsDivision = {
  divisionId: number;
  date: string;
  number: number;
  title: string | null;
  // Authoritative counts are the official tallies (teller counts when tellers
  // were present, otherwise member counts).
  authoritativeContentCount: number;
  authoritativeNotContentCount: number;
  isWhipped?: boolean;
  isGovernmentContent?: boolean | null;
  isGovernmentWin?: boolean | null;
  contentTellers: RawLordsVoter[] | null;
  notContentTellers: RawLordsVoter[] | null;
  contents: RawLordsVoter[] | null;
  notContents: RawLordsVoter[] | null;
};

export async function getLordsDivision(divisionId: number): Promise<RawLordsDivision> {
  return getJson<RawLordsDivision>(`${BASE}/Divisions/${divisionId}`);
}

// The Lords membervoting endpoint filters a single peer's record server-side
// (search term + date), so there is no need to page-and-filter in memory.
export type RawLordsMemberVotingRecord = {
  memberId: number;
  memberWasContent: boolean;
  memberWasTeller: boolean;
  publishedDivision: RawLordsDivision;
};

export type LordsMemberVotingSearchParams = {
  memberId: number;
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  includeWhenMemberWasTeller?: boolean;
  take?: number;
  skip?: number;
};

export async function getLordsMemberVoting(
  params: LordsMemberVotingSearchParams,
): Promise<RawLordsMemberVotingRecord[]> {
  return getJson<RawLordsMemberVotingRecord[]>(`${BASE}/Divisions/membervoting`, {
    query: {
      MemberId: params.memberId,
      SearchTerm: params.searchTerm,
      StartDate: params.startDate,
      EndDate: params.endDate,
      IncludeWhenMemberWasTeller: params.includeWhenMemberWasTeller ?? true,
      take: params.take ?? 25,
      skip: params.skip ?? 0,
    },
  });
}

export const __testing__ = { BASE };
