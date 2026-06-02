import { z } from 'zod';
import { type RawCommitteeMembership, getMemberCommittees } from '../clients/committees.js';
import {
  type RawContact,
  type RawContributionSummaryItem,
  type RawFocus,
  type RawMember,
  type RawRegisteredInterestCategory,
  type RawVotingItem,
  getContact,
  getContributionSummary,
  getFocus,
  getMember,
  getRegisteredInterests,
  getSynopsis,
  getVoting,
} from '../clients/members.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import type { Interest } from '../domain/interest.js';
import { memberDetailed, memberSummary } from '../domain/mappers.js';
import type { MemberDetailed, MemberSummary } from '../domain/member.js';
import type { MemberVote } from '../domain/vote.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';
import { mapVoteFromRaw } from './_voteMapper.js';

export const MemberOverviewInputSchema = z.object({
  member_id: z
    .number()
    .int()
    .positive()
    .describe('Numeric member id from parliament_find_member. Example: 467 for Sir Lindsay Hoyle.'),
  recent_votes_limit: z
    .number()
    .int()
    .min(0)
    .max(20)
    .default(5)
    .describe('How many recent voting records to include (0–20). Default 5.'),
  response_format: ResponseFormatSchema,
});

export type MemberOverviewInput = z.infer<typeof MemberOverviewInputSchema>;

export type MemberOverviewData = {
  member: MemberSummary | MemberDetailed;
  synopsis: string;
  focus: Array<{ category: string; topics: string[] }>;
  contact_summary: {
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
  };
  committees: Array<{
    id: number;
    name: string;
    house: 'Commons' | 'Lords';
    current_role: string | null;
    is_chair: boolean;
  }>;
  recent_votes: MemberVote[];
  recent_contributions: Array<{
    debate_title: string;
    date: string;
    section: string;
    debate_ext_id: string;
  }>;
  interests: Interest[];
};

export async function memberOverview(
  input: MemberOverviewInput,
): Promise<ToolResponse<MemberOverviewData>> {
  const settled = await Promise.allSettled([
    getMember(input.member_id),
    getSynopsis(input.member_id),
    getFocus(input.member_id),
    getContact(input.member_id),
    getMemberCommittees(input.member_id),
    getVoting(input.member_id, { take: Math.max(input.recent_votes_limit, 1) }),
    getContributionSummary(input.member_id, 5),
    getRegisteredInterests(input.member_id),
  ]);

  const member = unwrapRequired(settled[0], 'member');
  if (member == null) {
    throw new ParliamentToolError(
      'NO_MEMBER_FOUND',
      `No member with id ${input.member_id}.`,
      'Use parliament_find_member to resolve the member id first.',
    );
  }

  const synopsis = unwrapOptional<string>(settled[1]) ?? '';
  const focus = unwrapOptional<RawFocus>(settled[2]) ?? [];
  const contact = unwrapOptional<RawContact[]>(settled[3]) ?? [];
  const committees = unwrapOptional<RawCommitteeMembership[]>(settled[4]) ?? [];
  const voting = unwrapOptional<RawVotingItem[]>(settled[5]) ?? [];
  const contributions = unwrapOptional<RawContributionSummaryItem[]>(settled[6]) ?? [];
  const interests = unwrapOptional<RawRegisteredInterestCategory[]>(settled[7]) ?? [];

  const data: MemberOverviewData = {
    member: input.response_format === 'detailed' ? memberDetailed(member) : memberSummary(member),
    synopsis,
    focus: focus.map((f) => ({ category: f.category, topics: f.focus })),
    contact_summary: summariseContact(contact),
    committees: committees.slice(0, 10).map(committeeRow),
    recent_votes: voting.slice(0, input.recent_votes_limit).map(mapVoteFromRaw),
    recent_contributions: contributions.slice(0, 5).map((c) => ({
      debate_title: c.debateTitle,
      date: c.sittingDate,
      section: c.section,
      debate_ext_id: c.debateWebsiteId,
    })),
    interests: shapeInterests(interests),
  };

  const sources = buildSources(member, committees, voting);
  return buildResponse(data, sources, { upstream_calls: 8 });
}

function summariseContact(contact: RawContact[]): MemberOverviewData['contact_summary'] {
  const constituency = contact.find((c) => c.type === 'Constituency');
  const parliamentary = contact.find((c) => c.type === 'Parliamentary');
  const website = contact.find((c) => c.website)?.website ?? null;
  const preferred = constituency ?? parliamentary ?? contact[0] ?? null;
  return {
    email: preferred?.email ?? null,
    phone: preferred?.phone ?? null,
    website,
    address: preferred?.line1 ?? null,
  };
}

function committeeRow(c: RawCommitteeMembership): MemberOverviewData['committees'][number] {
  const currentRole = c.roles.find((r) => r.endDate === null) ?? c.roles[c.roles.length - 1];
  return {
    id: c.id,
    name: c.name,
    house: c.house,
    current_role: currentRole?.role.name ?? null,
    is_chair: currentRole?.role.isChair ?? false,
  };
}

function shapeInterests(raw: RawRegisteredInterestCategory[]): Interest[] {
  return raw.slice(0, 5).map((cat) => ({
    category: cat.name,
    entries: cat.interests.slice(0, 5).map((e) => ({
      interest: e.interest,
      registered_on: e.registrationDate,
      published_on: e.publishedDate,
    })),
  }));
}

function buildSources(
  member: RawMember,
  committees: RawCommitteeMembership[],
  voting: RawVotingItem[],
): Citation[] {
  return [
    Citations.member(member.id, member.nameDisplayAs),
    ...collectSources(committees, (c) => Citations.committee(c.id, c.name), 3),
    ...collectSources(
      voting,
      (v) => Citations.division(v.house === 1 ? 'Commons' : 'Lords', v.id, v.title),
      3,
    ),
  ];
}

function unwrapRequired<T>(settled: PromiseSettledResult<T>, label: string): T {
  if (settled.status === 'fulfilled') return settled.value;
  throw new ParliamentToolError(
    'UPSTREAM_UNAVAILABLE',
    `Failed to load ${label}: ${String(settled.reason)}.`,
    'Retry the call. If the failure persists, narrow the request or use parliament_find_member to confirm the member exists.',
  );
}

function unwrapOptional<T>(settled: PromiseSettledResult<T>): T | null {
  return settled.status === 'fulfilled' ? settled.value : null;
}

export const memberOverviewToolDefinition = {
  name: 'parliament_member_overview',
  description: [
    'One-call overview of an MP: synopsis, policy focus, contact, current committees, recent voting record, recent contributions, and registered interests.',
    '',
    'Good for: "tell me about my MP", "what does Diane Abbott do?", "give me a report card for member 172".',
    '',
    'Wrong for: deep voting history with topic filters (use parliament_member_voting_history); a specific debate (use parliament_get_debate); deep interest detail (use parliament_member_interests).',
    '',
    'Inputs: member_id (resolve via parliament_find_member first), recent_votes_limit (default 5, max 20), response_format (concise|detailed, default concise).',
    '',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: MemberOverviewInputSchema,
  handler: memberOverview,
} as const;
