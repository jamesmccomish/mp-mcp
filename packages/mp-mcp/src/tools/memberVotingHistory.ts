import { z } from 'zod';
import { getMemberVoting } from '../clients/commonsVotes.js';
import { type HouseId, type RawVotingItem, getVoting } from '../clients/members.js';
import type { ToolResponse, ToolResponseMeta } from '../domain/citation.js';
import type { MemberVote } from '../domain/vote.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';
import { mapVoteFromMemberVotingRecord, mapVoteFromRaw } from './_voteMapper.js';

export const MemberVotingHistoryInputSchema = z.object({
  member_id: z.number().int().positive().describe('Numeric member id from parliament_find_member.'),
  topic: z
    .string()
    .optional()
    .describe(
      'Keyword filter applied to division titles (case-insensitive). Example: "climate" matches "Climate Change Bill: Third Reading".',
    ),
  from_date: z
    .string()
    .optional()
    .describe('ISO-8601 lower bound (inclusive) on the division date. Example: "2024-01-01".'),
  to_date: z
    .string()
    .optional()
    .describe('ISO-8601 upper bound (inclusive) on the division date. Example: "2025-12-31".'),
  assembly: z
    .enum(['commons', 'lords'])
    .default('commons')
    .describe("Which house's voting record to load. Default commons."),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20)
    .describe('Maximum rows to return (1–100). Default 20.'),
  response_format: ResponseFormatSchema,
});

export type MemberVotingHistoryInput = z.infer<typeof MemberVotingHistoryInputSchema>;

export type MemberVoteConcise = Pick<MemberVote, 'house' | 'title' | 'date' | 'vote' | 'passed'>;

export type MemberVotingHistoryData = {
  member_id: number;
  votes: MemberVote[] | MemberVoteConcise[];
  filter: {
    topic: string | null;
    from_date: string | null;
    to_date: string | null;
    assembly: 'commons' | 'lords';
  };
};

export async function memberVotingHistory(
  input: MemberVotingHistoryInput,
): Promise<ToolResponse<MemberVotingHistoryData>> {
  const { fullVotes, upstreamCalls } =
    input.assembly === 'commons' ? await loadCommons(input) : await loadLords(input);

  const sources = collectSources(fullVotes, (v) =>
    Citations.division(v.house, v.division_id, v.title),
  );

  const votes = input.response_format === 'detailed' ? fullVotes : fullVotes.map(conciseVote);

  // An empty set is a legitimate answer, not an error: the member may have
  // abstained/been absent (membervoting only reports lobbies actually cast), or
  // the topic filter (a literal title substring upstream) was too specific.
  const meta: ToolResponseMeta = { upstream_calls: upstreamCalls };
  if (fullVotes.length === 0) {
    meta.truncation_hint = input.topic
      ? `No recorded aye/no by member ${input.member_id} matched topic="${input.topic}". The member may have abstained or been absent, or the title-substring match was too specific — try a broader term or drop the topic filter.`
      : `No recorded votes for member ${input.member_id} in the requested range.`;
  }

  return buildResponse(
    {
      member_id: input.member_id,
      votes,
      filter: {
        topic: input.topic ?? null,
        from_date: input.from_date ?? null,
        to_date: input.to_date ?? null,
        assembly: input.assembly,
      },
    },
    sources,
    meta,
  );
}

// Commons: the Commons Votes membervoting endpoint filters by topic and date
// server-side and returns the member's lobby per division directly.
async function loadCommons(
  input: MemberVotingHistoryInput,
): Promise<{ fullVotes: MemberVote[]; upstreamCalls: number }> {
  const records = await getMemberVoting({
    memberId: input.member_id,
    searchTerm: input.topic,
    startDate: input.from_date,
    endDate: input.to_date,
    includeWhenMemberWasTeller: true,
    take: input.limit,
  });
  return { fullVotes: records.map(mapVoteFromMemberVotingRecord), upstreamCalls: 1 };
}

// Lords: the Members API /Voting endpoint has no server-side topic/date filter,
// so page a recency-capped window and filter in memory. (Lords reroute to the
// symmetric Lords Votes endpoints is a follow-up.)
async function loadLords(
  input: MemberVotingHistoryInput,
): Promise<{ fullVotes: MemberVote[]; upstreamCalls: number }> {
  const house: HouseId = 2;
  const pageSize = 100;
  const cap = Math.min(input.limit * 4, 500);

  const collected: RawVotingItem[] = [];
  for (let skip = 0; skip < cap; skip += pageSize) {
    const page = await getVoting(input.member_id, { house, take: pageSize, skip });
    if (page.length === 0) break;
    collected.push(...page);
    if (collected.length >= cap) break;
  }

  const filtered = applyFilters(collected, input).slice(0, input.limit);
  return {
    fullVotes: filtered.map(mapVoteFromRaw),
    upstreamCalls: Math.max(1, Math.ceil(collected.length / pageSize)),
  };
}

function conciseVote(v: MemberVote): MemberVoteConcise {
  return { house: v.house, title: v.title, date: v.date, vote: v.vote, passed: v.passed };
}

function applyFilters(items: RawVotingItem[], input: MemberVotingHistoryInput): RawVotingItem[] {
  const topic = input.topic?.toLowerCase().trim();
  const from = input.from_date ? new Date(input.from_date).getTime() : Number.NEGATIVE_INFINITY;
  const to = input.to_date ? new Date(input.to_date).getTime() : Number.POSITIVE_INFINITY;

  return items.filter((v) => {
    const ts = new Date(v.date).getTime();
    if (Number.isFinite(from) && ts < from) return false;
    if (Number.isFinite(to) && ts > to) return false;
    if (topic && !v.title.toLowerCase().includes(topic)) return false;
    return true;
  });
}

export const memberVotingHistoryToolDefinition = {
  name: 'parliament_member_voting_history',
  description: [
    "One MP's voting record over time, optionally filtered by topic keyword and date range. Returns how that member voted (aye/no/teller) per division plus the aggregate aye/no counts. Commons records are filtered server-side; an empty result is a truthful answer (the member abstained/was absent, or the term was too specific), not an error.",
    '',
    'Good for: "how has Diane Abbott voted on climate?", "Keir Starmer\'s rebellions against his own party", "votes by member 172 in 2025".',
    '',
    'Wrong for: how a whole PARTY voted on a topic (use parliament_search_divisions); ayes-by-party for one division (use parliament_get_division); cross-domain topic round-ups (use parliament_topic_tracker); the underlying debate text (use parliament_get_debate).',
    '',
    'Inputs: member_id (required, resolve via parliament_find_member), topic (literal substring matched against division title), from_date / to_date (ISO-8601), assembly (commons|lords, default commons), limit (1–100, default 20), response_format (concise|detailed; detailed adds division_id/number and aye/no counts for chaining to parliament_get_division).',
    '',
    'This response includes a `sources` array of parliament.uk URLs. Cite them inline when making factual claims to the user.',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: MemberVotingHistoryInputSchema,
  handler: memberVotingHistory,
} as const;
