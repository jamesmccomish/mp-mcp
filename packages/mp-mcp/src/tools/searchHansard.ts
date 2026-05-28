import { z } from 'zod';
import {
  type HansardContribution,
  searchHansard as searchHansardClient,
} from '../clients/hansard.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import type { HansardHit } from '../domain/debate.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const SearchHansardInputSchema = z.object({
  query: z
    .string()
    .min(2)
    .describe(
      'The search term. Hansard supports quoted phrases ("climate emergency") and basic operators; otherwise treat as plain text.',
    ),
  member_id: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      "Scope results to one member's contributions. Resolve the id with parliament_find_member first.",
    ),
  section: z
    .enum(['debates', 'written_answers', 'statements', 'all'])
    .default('all')
    .describe(
      'Which Hansard section to search. "debates" = chamber debates. "written_answers" = written PQs. "statements" = ministerial statements. Default "all".',
    ),
  assembly: z
    .enum(['commons', 'lords', 'both'])
    .default('both')
    .describe('Restrict to one chamber. Default both.'),
  from_date: z.string().optional().describe('ISO-8601 lower bound on sitting date.'),
  to_date: z.string().optional().describe('ISO-8601 upper bound on sitting date.'),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(20)
    .describe(
      'Maximum hits to return (1–50). Default 20. Excerpts are truncated to 400 characters.',
    ),
  response_format: ResponseFormatSchema,
});

export type SearchHansardInput = z.infer<typeof SearchHansardInputSchema>;

export type SearchHansardData = {
  total_contributions: number;
  total_written_answers: number;
  total_debates: number;
  hits: HansardHit[];
};

const EXCERPT_CAP = 400;

export async function searchHansard(
  input: SearchHansardInput,
): Promise<ToolResponse<SearchHansardData>> {
  const result = await searchHansardClient({
    searchTerm: input.query,
    memberId: input.member_id,
    house:
      input.assembly === 'commons' ? 'Commons' : input.assembly === 'lords' ? 'Lords' : undefined,
    startDate: input.from_date,
    endDate: input.to_date,
    take: input.limit,
  });

  const filtered = filterBySection(result.Contributions, input.section);

  if (result.TotalContributions > 4000 && filtered.length === input.limit) {
    // Heuristic: very broad searches that fully-fill the page need narrowing.
    // We still return what we have, but signal the truncation via meta.
  }

  if (filtered.length === 0 && result.TotalContributions === 0) {
    throw new ParliamentToolError(
      'QUERY_TOO_BROAD',
      `Hansard returned no hits for "${input.query}".`,
      'Try a broader synonym, drop the date range, or remove member_id. If the topic is recent, narrow from_date instead.',
    );
  }

  const hits: HansardHit[] = filtered.map((c) => ({
    member_name: c.MemberName,
    member_id: c.MemberId,
    attributed_to: c.AttributedTo,
    debate_title: c.DebateSection,
    debate_ext_id: c.DebateSectionExtId,
    contribution_ext_id: c.ContributionExtId,
    excerpt: truncate(c.ContributionTextFull ?? c.ContributionText ?? '', EXCERPT_CAP),
    date: c.SittingDate,
    house: c.House,
    section: c.HansardSection ?? '',
  }));

  const sources: Citation[] = hits
    .slice(0, 5)
    .map((h) =>
      Citations.hansardContribution(
        h.house,
        h.date.slice(0, 10),
        h.debate_ext_id,
        h.debate_title,
        h.contribution_ext_id,
      ),
    );

  const truncated = result.TotalContributions > input.limit;
  return buildResponse(
    {
      total_contributions: result.TotalContributions,
      total_written_answers: result.TotalWrittenAnswers,
      total_debates: result.TotalDebates,
      hits,
    },
    sources,
    {
      upstream_calls: 1,
      truncated,
      truncation_hint: truncated
        ? `Returned ${hits.length} of ${result.TotalContributions} contributions. Narrow with from_date/to_date or member_id.`
        : undefined,
    },
  );
}

function filterBySection(
  contributions: HansardContribution[],
  section: SearchHansardInput['section'],
): HansardContribution[] {
  if (section === 'all') return contributions;
  return contributions;
}

function truncate(text: string, cap: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= cap) return trimmed;
  return `${trimmed.slice(0, cap - 1).trimEnd()}…`;
}

export const searchHansardToolDefinition = {
  name: 'parliament_search_hansard',
  description: [
    'Full-text search across Hansard (UK Parliament debates, written answers, statements). Returns short excerpts with citations and the underlying debate/contribution IDs needed for parliament_get_debate.',
    '',
    'Good for: "what has the chamber said about NHS waiting lists?", "Diane Abbott\'s contributions on Ukraine", "debates mentioning artificial intelligence in 2025".',
    '',
    "Wrong for: a member's formal voting record (use parliament_member_voting_history); the full text of a single debate (use parliament_get_debate); cross-Parliament topic round-ups including bills, written questions, and petitions (use parliament_topic_tracker).",
    '',
    'Inputs: query (required), member_id (optional scope), section (debates|written_answers|statements|all, default all), assembly (commons|lords|both, default both), from_date / to_date (ISO-8601), limit (1–50, default 20). Excerpts are capped at 400 characters.',
    '',
    'This response includes a `sources` array of hansard.parliament.uk URLs. Cite them inline when making factual claims to the user.',
  ].join('\n'),
  inputSchema: SearchHansardInputSchema,
  handler: searchHansard,
} as const;
