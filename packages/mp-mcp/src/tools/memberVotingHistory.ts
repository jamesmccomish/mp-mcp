import { z } from 'zod';
import { type HouseId, type RawVotingItem, getVoting } from '../clients/members.js';
import type { ToolResponse } from '../domain/citation.js';
import type { MemberVote } from '../domain/vote.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';
import { mapVoteFromRaw } from './_voteMapper.js';

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
  const house: HouseId = input.assembly === 'commons' ? 1 : 2;
  const pageSize = 100;
  const cap = Math.min(input.limit * 4, 500);

  const collected: RawVotingItem[] = [];
  for (let skip = 0; skip < cap; skip += pageSize) {
    const page = await getVoting(input.member_id, { house, take: pageSize, skip });
    if (page.length === 0) break;
    collected.push(...page);
    if (collected.length >= cap) break;
  }

  const filtered = applyFilters(collected, input);

  if (filtered.length === 0 && collected.length > 0) {
    throw new ParliamentToolError(
      'QUERY_TOO_BROAD',
      `No divisions matched topic="${input.topic ?? ''}" in the requested date range.`,
      'Widen the date range (from_date/to_date) or drop the topic filter to see all recent votes.',
    );
  }

  const fullVotes = filtered.slice(0, input.limit).map(mapVoteFromRaw);

  const sources = collectSources(fullVotes, (v) =>
    Citations.division(v.house, v.division_id, v.title),
  );

  const votes = input.response_format === 'detailed' ? fullVotes : fullVotes.map(conciseVote);

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
    { upstream_calls: Math.ceil(collected.length / pageSize) },
  );
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
    "An MP's voting record over time, optionally filtered by topic keyword and date range. Returns aye/no/teller/absent plus the aggregate aye/no counts.",
    '',
    'Good for: "how has Diane Abbott voted on climate?", "Keir Starmer\'s rebellions against his own party", "votes by member 172 in 2025".',
    '',
    'Wrong for: details of a single division like ayes-by-party (use parliament_get_division); cross-member voting analysis (use parliament_topic_tracker); the underlying debate text (use parliament_get_debate).',
    '',
    'Inputs: member_id (required, resolve via parliament_find_member), topic (substring matched against division title), from_date / to_date (ISO-8601), assembly (commons|lords, default commons), limit (1–100, default 20), response_format (concise|detailed; detailed adds division_id/number and aye/no counts for chaining to parliament_get_division).',
    '',
    'This response includes a `sources` array of parliament.uk URLs. Cite them inline when making factual claims to the user.',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: MemberVotingHistoryInputSchema,
  handler: memberVotingHistory,
} as const;
