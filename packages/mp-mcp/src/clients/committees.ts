import { getJson } from './http.js';

const BASE = 'https://committees-api.parliament.uk/api';

export type RawCommitteeRole = {
  startDate: string;
  endDate: string | null;
  role: { id: number; name: string; isChair: boolean };
};

export type RawCommittee = {
  id: number;
  name: string;
  house: 'Commons' | 'Lords';
  startDate: string;
  endDate: string | null;
  category: { id: number; name: string } | null;
};

export type RawCommitteeMembership = RawCommittee & {
  roles: RawCommitteeRole[];
};

export async function getMemberCommittees(memberId: number): Promise<RawCommitteeMembership[]> {
  const results = await getJson<Array<{ committees: RawCommitteeMembership[] }>>(
    `${BASE}/Members`,
    { query: { Members: memberId } },
  );
  return results[0]?.committees ?? [];
}

export type RawCommitteeDetail = RawCommittee & {
  subCommittees: RawCommittee[];
  parentCommittee: RawCommittee | null;
};

export async function getCommittee(committeeId: number): Promise<RawCommitteeDetail> {
  return getJson<RawCommitteeDetail>(`${BASE}/Committees/${committeeId}`);
}

export type RawCommitteeMember = {
  memberFrom: string;
  thumbnailUrl: string | null;
  partyName: string;
  partyId: number;
  memberId: number;
  name: string;
  startDate: string;
  endDate: string | null;
  isChair: boolean;
};

export async function getCommitteeMembers(committeeId: number): Promise<RawCommitteeMember[]> {
  const envelope = await getJson<{ items?: RawCommitteeMember[] } | RawCommitteeMember[]>(
    `${BASE}/Committees/${committeeId}/Members`,
  );
  if (Array.isArray(envelope)) return envelope;
  return envelope.items ?? [];
}

export type RawCommitteeSearchResult = {
  items: RawCommittee[];
  totalResults: number;
};

export async function searchCommittees(name: string, take = 5): Promise<RawCommittee[]> {
  const envelope = await getJson<RawCommitteeSearchResult | { items?: RawCommittee[] }>(
    `${BASE}/Committees`,
    { query: { SearchTerm: name, Take: take } },
  );
  return envelope.items ?? [];
}

export type CommitteeBusinessSummary = {
  id: number;
  title: string;
  date: string;
};

export type RawPublication = {
  id: number;
  title: string;
  type: { id: number; name: string } | null;
  publicationStartDate: string;
};

export async function getCommitteePublications(
  committeeId: number,
  take = 5,
): Promise<RawPublication[]> {
  const envelope = await getJson<{ items?: RawPublication[] }>(
    `${BASE}/Committees/${committeeId}/Publications/Summary`,
    { query: { Take: take } },
  );
  return envelope.items ?? [];
}

export const __testing__ = { BASE };
