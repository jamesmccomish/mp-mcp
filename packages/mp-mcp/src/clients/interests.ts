import { getJson } from './http.js';

const BASE = 'https://interests-api.parliament.uk/api/v1';

export type RawInterestField = {
  name: string;
  description: string;
  type: string;
  value: unknown;
};

export type RawInterestCategory = {
  id: number;
  number: string;
  name: string;
  type: 'Commons' | 'Lords';
};

export type RawInterest = {
  id: number;
  summary: string;
  parentInterestId: number | null;
  registrationDate: string | null;
  publishedDate: string | null;
  category: RawInterestCategory;
  member: { id: number; nameDisplayAs: string } | null;
  fields: RawInterestField[];
};

export type InterestsSearchParams = {
  memberId?: number;
  categoryId?: number;
  publishedSince?: string;
  take?: number;
  skip?: number;
  expandChildren?: boolean;
};

export async function searchInterests(params: InterestsSearchParams): Promise<RawInterest[]> {
  const envelope = await getJson<{ items?: RawInterest[]; totalResults?: number }>(
    `${BASE}/Interests`,
    {
      query: {
        MemberId: params.memberId,
        CategoryId: params.categoryId,
        PublishedSince: params.publishedSince,
        ExpandChildInterests: params.expandChildren ?? false,
        Take: params.take ?? 25,
        Skip: params.skip ?? 0,
      },
    },
  );
  return envelope.items ?? [];
}

export const __testing__ = { BASE };
