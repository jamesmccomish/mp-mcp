import { getJson } from './http.js';

const BASE = 'https://members-api.parliament.uk/api';

export type HouseId = 1 | 2;

export type RawMember = {
  id: number;
  nameListAs: string;
  nameDisplayAs: string;
  nameFullTitle: string;
  nameAddressAs: string | null;
  latestParty: { id: number; name: string; abbreviation: string | null } | null;
  gender: string | null;
  latestHouseMembership: {
    membershipFrom: string | null;
    membershipFromId: number | null;
    house: HouseId;
    membershipStartDate: string;
    membershipEndDate: string | null;
    membershipStatus: { statusIsActive: boolean; statusDescription: string } | null;
  } | null;
  thumbnailUrl: string | null;
};

export type RawConstituency = {
  id: number;
  name: string;
  startDate: string;
  endDate: string | null;
  currentRepresentation: {
    member: { value: RawMember } | null;
  } | null;
};

type SearchEnvelope<T> = {
  items: Array<{ value: T }> | null;
  totalResults: number;
};

export type MemberSearchParams = {
  name?: string;
  location?: string;
  constituencyId?: number;
  house?: HouseId;
  isCurrentMember?: boolean;
  take?: number;
  skip?: number;
};

export async function searchMembers(params: MemberSearchParams): Promise<RawMember[]> {
  const query = {
    Name: params.name,
    Location: params.location,
    ConstituencyId: params.constituencyId,
    House: params.house,
    IsCurrentMember: params.isCurrentMember,
    take: params.take ?? 20,
    skip: params.skip ?? 0,
  } as Record<string, string | number | boolean | undefined>;

  const envelope = await getJson<SearchEnvelope<RawMember>>(`${BASE}/Members/Search`, {
    query,
  });
  return (envelope.items ?? []).map((it) => it.value);
}

export type ConstituencySearchParams = {
  searchText: string;
  take?: number;
};

export async function searchConstituencies(
  params: ConstituencySearchParams,
): Promise<RawConstituency[]> {
  const envelope = await getJson<SearchEnvelope<RawConstituency>>(
    `${BASE}/Location/Constituency/Search`,
    {
      query: {
        searchText: params.searchText,
        take: params.take ?? 20,
      },
    },
  );
  return (envelope.items ?? []).map((it) => it.value);
}

export async function getMember(id: number): Promise<RawMember> {
  const envelope = await getJson<{ value: RawMember }>(`${BASE}/Members/${id}`);
  return envelope.value;
}

export const __testing__ = { BASE };
