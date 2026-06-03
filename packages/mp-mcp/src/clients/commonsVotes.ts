import { getJson } from './http.js';

const BASE = 'https://commonsvotes-api.parliament.uk/data';

export type RawDivisionSummary = {
  DivisionId: number;
  Date: string;
  Number: number;
  Title: string;
  AyeCount: number;
  NoCount: number;
};

export type RawDivisionVoter = {
  MemberId: number;
  Name: string;
  Party: string;
  SubParty: string | null;
  MemberIsTeller: boolean;
};

export type RawDivisionDetail = RawDivisionSummary & {
  PublicationUpdated: string;
  AyeTellers: RawDivisionVoter[] | null;
  NoTellers: RawDivisionVoter[] | null;
  Ayes: RawDivisionVoter[];
  Noes: RawDivisionVoter[];
  NoVoteRecorded: RawDivisionVoter[];
};

export type CommonsVotesSearchParams = {
  searchTerm: string;
  startDate?: string;
  endDate?: string;
  take?: number;
  skip?: number;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export async function searchCommonsDivisions(
  params: CommonsVotesSearchParams,
): Promise<RawDivisionSummary[]> {
  return getJson<RawDivisionSummary[]>(`${BASE}/divisions.json/search`, {
    signal: params.signal,
    timeoutMs: params.timeoutMs,
    query: {
      'queryParameters.searchTerm': params.searchTerm,
      'queryParameters.startDate': params.startDate,
      'queryParameters.endDate': params.endDate,
      'queryParameters.take': params.take ?? 5,
      'queryParameters.skip': params.skip ?? 0,
    },
  });
}

export async function getCommonsDivision(divisionId: number): Promise<RawDivisionDetail> {
  return getJson<RawDivisionDetail>(`${BASE}/division/${divisionId}.json`);
}

// The Commons Votes membervoting endpoint filters a single member's record
// server-side (searchTerm/date), unlike the Members API /Voting endpoint which
// only pages by recency. The embedded PublishedDivision carries the summary
// (counts + title), but its Ayes/Noes arrays always come back empty here — use
// getCommonsDivision for the per-MP roster.
export type RawMemberVotingRecord = {
  MemberId: number;
  MemberVotedAye: boolean;
  MemberVotedNo: boolean;
  MemberWasTeller: boolean;
  PublishedDivision: RawDivisionSummary;
};

export type MemberVotingSearchParams = {
  memberId: number;
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  includeWhenMemberWasTeller?: boolean;
  take?: number;
  skip?: number;
};

export async function getMemberVoting(
  params: MemberVotingSearchParams,
): Promise<RawMemberVotingRecord[]> {
  return getJson<RawMemberVotingRecord[]>(`${BASE}/divisions.json/membervoting`, {
    query: {
      'queryParameters.memberId': params.memberId,
      'queryParameters.searchTerm': params.searchTerm,
      'queryParameters.startDate': params.startDate,
      'queryParameters.endDate': params.endDate,
      'queryParameters.includeWhenMemberWasTeller': params.includeWhenMemberWasTeller ?? true,
      'queryParameters.take': params.take ?? 25,
      'queryParameters.skip': params.skip ?? 0,
    },
  });
}

export const __testing__ = { BASE };
