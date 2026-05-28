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

export type RawSynopsis = string;

export async function getSynopsis(id: number): Promise<RawSynopsis> {
  const envelope = await getJson<{ value: string }>(`${BASE}/Members/${id}/Synopsis`);
  return envelope.value;
}

export type RawFocus = Array<{ category: string; focus: string[] }>;

export async function getFocus(id: number): Promise<RawFocus> {
  const envelope = await getJson<{ value: RawFocus }>(`${BASE}/Members/${id}/Focus`);
  return envelope.value;
}

export type RawContact = {
  type: string | null;
  typeDescription: string | null;
  line1: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
};

export async function getContact(id: number): Promise<RawContact[]> {
  const envelope = await getJson<{ value: RawContact[] }>(`${BASE}/Members/${id}/Contact`);
  return envelope.value ?? [];
}

export type RawVotingItem = {
  house: HouseId;
  id: number;
  title: string;
  date: string;
  divisionNumber: number;
  inAffirmativeLobby: boolean;
  inNegativeLobby: boolean;
  actedAsTeller: boolean;
  numberInFavour: number;
  numberAgainst: number;
};

export type MemberVotingParams = {
  house?: HouseId;
  take?: number;
  skip?: number;
};

export async function getVoting(
  id: number,
  params: MemberVotingParams = {},
): Promise<RawVotingItem[]> {
  const envelope = await getJson<SearchEnvelope<RawVotingItem>>(`${BASE}/Members/${id}/Voting`, {
    query: {
      house: params.house ?? 1,
      take: params.take ?? 20,
      skip: params.skip ?? 0,
    },
  });
  return (envelope.items ?? []).map((it) => it.value);
}

export type RawContributionSummaryItem = {
  totalContributions: number;
  debateTitle: string;
  debateId: number;
  debateWebsiteId: string;
  sittingDate: string;
  section: string;
  house: 'Commons' | 'Lords';
};

export async function getContributionSummary(
  id: number,
  take = 10,
): Promise<RawContributionSummaryItem[]> {
  const envelope = await getJson<SearchEnvelope<RawContributionSummaryItem>>(
    `${BASE}/Members/${id}/ContributionSummary`,
    { query: { take } },
  );
  return (envelope.items ?? []).map((it) => it.value);
}

export type RawRegisteredInterestEntry = {
  id: number;
  interest: string;
  registrationDate: string | null;
  publishedDate: string | null;
};

export type RawRegisteredInterestCategory = {
  id: number;
  name: string;
  interests: RawRegisteredInterestEntry[];
};

export async function getRegisteredInterests(id: number): Promise<RawRegisteredInterestCategory[]> {
  const envelope = await getJson<{
    value: { interestCategories?: RawRegisteredInterestCategory[] };
  }>(`${BASE}/Members/${id}/RegisteredInterests`);
  return envelope.value.interestCategories ?? [];
}

export const __testing__ = { BASE };
