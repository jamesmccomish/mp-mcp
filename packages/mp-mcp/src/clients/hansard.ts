import { getJson } from './http.js';

const BASE = 'https://hansard-api.parliament.uk';

export type HansardHouse = 'Commons' | 'Lords';

export type HansardContribution = {
  MemberName: string;
  MemberId: number;
  AttributedTo: string;
  ItemId: number;
  ContributionExtId: string;
  ContributionText: string;
  ContributionTextFull: string;
  HansardSection: string | null;
  DebateSection: string;
  DebateSectionId: number;
  DebateSectionExtId: string;
  SittingDate: string;
  House: HansardHouse;
};

export type HansardSearchResult = {
  TotalContributions: number;
  TotalWrittenStatements: number;
  TotalWrittenAnswers: number;
  TotalDebates: number;
  TotalDivisions: number;
  Contributions: HansardContribution[];
};

export type HansardSearchParams = {
  searchTerm: string;
  memberId?: number;
  house?: HansardHouse;
  startDate?: string;
  endDate?: string;
  take?: number;
  skip?: number;
};

export async function searchHansard(params: HansardSearchParams): Promise<HansardSearchResult> {
  return getJson<HansardSearchResult>(`${BASE}/search.json`, {
    query: {
      searchTerm: params.searchTerm,
      'queryParameters.memberId': params.memberId,
      'queryParameters.house': params.house,
      startDate: params.startDate,
      endDate: params.endDate,
      take: params.take ?? 20,
      skip: params.skip ?? 0,
    },
  });
}

export type HansardDebateSearchHit = {
  DebateSection: string;
  SittingDate: string;
  House: HansardHouse;
  Title: string;
  DebateSectionExtId: string;
};

export async function searchHansardDebates(
  params: HansardSearchParams,
): Promise<{ Results: HansardDebateSearchHit[]; TotalResultCount: number }> {
  return getJson(`${BASE}/search/debates.json`, {
    query: {
      searchTerm: params.searchTerm,
      'queryParameters.memberId': params.memberId,
      'queryParameters.house': params.house,
      startDate: params.startDate,
      endDate: params.endDate,
      take: params.take ?? 20,
      skip: params.skip ?? 0,
    },
  });
}

export type HansardDebateOverview = {
  Id: number;
  ExtId: string;
  Title: string;
  Date: string;
  Location: string;
  House: HansardHouse;
  VolumeNo: number;
  NextDebateExtId: string | null;
  NextDebateTitle: string | null;
  PreviousDebateExtId: string | null;
  PreviousDebateTitle: string | null;
};

export type HansardDebateItem = {
  ItemId: number;
  ItemType: string;
  Value: string;
  AttributedTo: string | null;
  MemberId: number | null;
  Timecode: string | null;
};

export type HansardDebateDetail = {
  Overview: HansardDebateOverview;
  Items: HansardDebateItem[];
  ChildDebates?: HansardDebateDetail[];
};

export async function getDebateByExtId(extId: string): Promise<HansardDebateDetail> {
  return getJson<HansardDebateDetail>(`${BASE}/debates/debate/${extId}.json`);
}

export async function getDebateByColumn(
  house: HansardHouse,
  sittingDate: string,
  column: string,
): Promise<HansardDebateDetail> {
  return getJson<HansardDebateDetail>(`${BASE}/search/debatebycolumn.json`, {
    query: { house, sittingDate, columnNumber: column },
  });
}

export const __testing__ = { BASE };
