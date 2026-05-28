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
};

export async function searchCommonsDivisions(
  params: CommonsVotesSearchParams,
): Promise<RawDivisionSummary[]> {
  return getJson<RawDivisionSummary[]>(`${BASE}/divisions.json/search`, {
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

export const __testing__ = { BASE };
