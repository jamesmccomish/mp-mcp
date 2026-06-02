import type {
  Citation,
  House,
  Interest,
  MemberOverviewData,
  MemberStatus,
  Vote,
} from '@jamesmccomish/mp-mcp/types';
import { plainText } from './html';

export interface MpVote {
  divisionId: number;
  title: string;
  date: string;
  vote: Vote;
  passed: boolean;
}

export interface MpContribution {
  title: string;
  date: string;
  section: string;
}

export interface MpCommittee {
  name: string;
  role: string | null;
  isChair: boolean;
}

export interface MpViewModel {
  id: number;
  name: string;
  party: string;
  constituency: string | null;
  house: House;
  status: MemberStatus;
  thumbnailUrl: string | null;
  synopsis: string;
  contact: MemberOverviewData['contact_summary'];
  committees: MpCommittee[];
  recentVotes: MpVote[];
  recentContributions: MpContribution[];
  interests: Interest[];
  sources: Citation[];
}

// parliament_member_overview result -> MP card view-model. `data` is the parsed
// envelope payload from a trusted mp-mcp tool, so it is narrowed to its contract.
export function adaptMp(data: unknown, sources: Citation[]): MpViewModel {
  const d = data as MemberOverviewData;
  const { member } = d;

  return {
    id: member.id,
    name: member.name,
    party: member.party,
    constituency: member.constituency,
    house: member.house,
    status: member.status,
    thumbnailUrl: 'thumbnail_url' in member ? member.thumbnail_url : null,
    synopsis: plainText(d.synopsis),
    contact: d.contact_summary,
    committees: d.committees.map((c) => ({
      name: c.name,
      role: c.current_role,
      isChair: c.is_chair,
    })),
    recentVotes: d.recent_votes.map((v) => ({
      divisionId: v.division_id,
      title: v.title,
      date: v.date,
      vote: v.vote,
      passed: v.passed,
    })),
    recentContributions: d.recent_contributions.map((c) => ({
      title: c.debate_title,
      date: c.date,
      section: c.section,
    })),
    interests: d.interests,
    sources,
  };
}
