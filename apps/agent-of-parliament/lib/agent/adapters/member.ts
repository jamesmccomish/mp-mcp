import type { Citation, FindMemberData, House, MemberStatus } from '@jamesmccomish/mp-mcp/types';

export interface MemberMatch {
  id: number;
  name: string;
  party: string;
  constituency: string | null;
  house: House;
  status: MemberStatus;
  thumbnailUrl: string | null;
}

export interface MemberListViewModel {
  matches: MemberMatch[];
  queryKind: FindMemberData['query_kind'];
  sources: Citation[];
}

// parliament_find_member result -> lightweight member card view-model. `data` is the
// parsed envelope payload from a trusted mp-mcp tool, so it is narrowed to its contract.
export function adaptMember(data: unknown, sources: Citation[]): MemberListViewModel {
  const d = data as FindMemberData;

  return {
    matches: d.matches.map((m) => ({
      id: m.id,
      name: m.name,
      party: m.party,
      constituency: m.constituency,
      house: m.house,
      status: m.status,
      thumbnailUrl: 'thumbnail_url' in m ? m.thumbnail_url : null,
    })),
    queryKind: d.query_kind,
    sources,
  };
}

// The member ids a find_member result resolved. The page uses this to hide the
// summary card once a detailed member_overview card covers the same member.
export function memberIdsFromFindResult(data: unknown): number[] {
  const d = data as FindMemberData | undefined;
  return d?.matches?.map((m) => m.id) ?? [];
}
