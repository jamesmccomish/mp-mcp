import { z } from 'zod';
import {
  type HansardContribution,
  type HansardSearchResult,
  searchHansard as searchHansardClient,
  searchHansardDebates,
} from '../clients/hansard.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import type { HansardDebateHit, HansardHit } from '../domain/debate.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const SearchHansardInputSchema = z.object({
  query: z
    .string()
    .min(2)
    .describe(
      'The search term. Quoted phrases ("net zero") and short noun phrases work best; otherwise treat as plain text.',
    ),
  member_id: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      "Toggle: omit for debate-title discovery (the only useful general-topic mode); supply to drill into one member's contributions on the topic. Resolve the id with parliament_find_member first.",
    ),
  section: z
    .enum(['debates', 'written_answers', 'statements', 'all'])
    .default('all')
    .describe(
      'Only meaningful when member_id is set. Filters that member\'s contributions: "debates" = chamber speeches, "written_answers" = written PQs, "statements" = ministerial statements. Default "all". Ignored in debate-title mode.',
    ),
  assembly: z
    .enum(['commons', 'lords', 'both'])
    .default('both')
    .describe('Restrict to one chamber. Default both — one call already covers both chambers.'),
  from_date: z.string().optional().describe('ISO-8601 lower bound on sitting date.'),
  to_date: z.string().optional().describe('ISO-8601 upper bound on sitting date.'),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(20)
    .describe(
      'Maximum hits to return (1–50). Default 20. In member-contribution mode, excerpts are truncated to 200 characters (concise) or 400 (detailed).',
    ),
  response_format: ResponseFormatSchema,
});

export type SearchHansardInput = z.infer<typeof SearchHansardInputSchema>;

export type SearchHansardData = {
  // Discriminator: which Hansard layer the tool returned. `debates` is debate
  // titles for topic discovery; `member_contributions` is one member's speeches
  // / written answers filtered by the query.
  mode: 'debates' | 'member_contributions';
  total: number;
  debates: HansardDebateHit[];
  contributions: HansardHit[];
};

const EXCERPT_CONCISE = 200;
const EXCERPT_DETAILED = 400;

export async function searchHansard(
  input: SearchHansardInput,
): Promise<ToolResponse<SearchHansardData>> {
  return input.member_id == null
    ? searchDebatesMode(input)
    : searchMemberContributionsMode(input, input.member_id);
}

async function searchDebatesMode(
  input: SearchHansardInput,
): Promise<ToolResponse<SearchHansardData>> {
  const result = await searchHansardDebates({
    searchTerm: input.query,
    house:
      input.assembly === 'commons' ? 'Commons' : input.assembly === 'lords' ? 'Lords' : undefined,
    startDate: input.from_date,
    endDate: input.to_date,
    take: input.limit,
  });

  const total = result.TotalResultCount ?? 0;
  const hits: HansardDebateHit[] = (result.Results ?? []).slice(0, input.limit).map((d) => ({
    title: d.Title,
    house: d.House,
    date: d.SittingDate,
    debate_ext_id: d.DebateSectionExtId,
  }));

  if (hits.length === 0 && total === 0) {
    throw new ParliamentToolError(
      'QUERY_TOO_BROAD',
      `Hansard returned no debates matching "${input.query}".`,
      'Try a different phrasing, broaden the date range, or for cross-Parliament activity use parliament_topic_tracker.',
    );
  }

  const sources = collectSources<HansardDebateHit>(hits, (h) =>
    Citations.hansardDebate(h.house, h.date.slice(0, 10), h.debate_ext_id, h.title),
  );

  const truncated = total > input.limit;
  return buildResponse(
    { mode: 'debates' as const, total, debates: hits, contributions: [] },
    sources,
    {
      upstream_calls: 1,
      truncated,
      truncation_hint: truncated
        ? `Returned ${hits.length} of ${total} debates. Narrow with from_date/to_date or a more specific query; chain to parliament_get_debate for full text.`
        : undefined,
    },
  );
}

async function searchMemberContributionsMode(
  input: SearchHansardInput,
  memberId: number,
): Promise<ToolResponse<SearchHansardData>> {
  const result = await searchHansardClient({
    searchTerm: input.query,
    memberId,
    house:
      input.assembly === 'commons' ? 'Commons' : input.assembly === 'lords' ? 'Lords' : undefined,
    startDate: input.from_date,
    endDate: input.to_date,
    take: input.limit,
  });

  // /search.json returns HTTP 200 with {"Message":"An error has occurred."} on
  // transient upstream failures. TotalContributions is absent in that error
  // body and present (even when 0) in a valid empty result.
  if (result.TotalContributions == null) {
    throw new ParliamentToolError(
      'UNEXPECTED_UPSTREAM_SHAPE',
      `Hansard search returned an unexpected error for "${input.query}".`,
      'This is usually transient. Retry once; if it persists, drop member_id to fall back to debate-title search.',
    );
  }

  const selected = selectBySection(result, input.section);
  const total = sectionTotal(result, input.section);

  if (selected.length === 0 && total === 0) {
    throw new ParliamentToolError(
      'QUERY_TOO_BROAD',
      `No Hansard contributions by member ${memberId} matching "${input.query}".`,
      'Drop section, widen the date range, or drop member_id to see all debates on this topic.',
    );
  }

  const cap = input.response_format === 'detailed' ? EXCERPT_DETAILED : EXCERPT_CONCISE;
  const hits: HansardHit[] = selected.slice(0, input.limit).map((c) => ({
    member_name: c.MemberName,
    member_id: c.MemberId,
    attributed_to: c.AttributedTo,
    debate_title: c.DebateSection,
    debate_ext_id: c.DebateSectionExtId,
    contribution_ext_id: c.ContributionExtId,
    excerpt: truncate(c.ContributionTextFull ?? c.ContributionText ?? '', cap),
    date: c.SittingDate,
    house: c.House,
    section: c.Section || c.HansardSection || '',
  }));

  const sources: Citation[] = collectSources<HansardHit>(hits, (h) =>
    Citations.hansardContribution(
      h.house,
      h.date.slice(0, 10),
      h.debate_ext_id,
      h.debate_title,
      h.contribution_ext_id,
    ),
  );

  const truncated = total > input.limit;
  return buildResponse(
    {
      mode: 'member_contributions' as const,
      total,
      debates: [],
      contributions: hits,
    },
    sources,
    {
      upstream_calls: 1,
      truncated,
      truncation_hint: truncated
        ? `Returned ${hits.length} of ${total} matches. Narrow with from_date/to_date or a tighter section.`
        : undefined,
    },
  );
}

// Hansard's combined /search.json returns each content type in its own array,
// so honouring `section` means picking the right array — not filtering rows.
function selectBySection(
  result: HansardSearchResult,
  section: SearchHansardInput['section'],
): HansardContribution[] {
  const contributions = result.Contributions ?? [];
  const writtenAnswers = result.WrittenAnswers ?? [];
  const statements = result.WrittenStatements ?? [];
  switch (section) {
    case 'debates':
      return contributions;
    case 'written_answers':
      return writtenAnswers;
    case 'statements':
      return statements;
    default:
      return [...contributions, ...writtenAnswers, ...statements].sort((a, b) =>
        b.SittingDate.localeCompare(a.SittingDate),
      );
  }
}

function sectionTotal(result: HansardSearchResult, section: SearchHansardInput['section']): number {
  switch (section) {
    case 'debates':
      return result.TotalContributions ?? 0;
    case 'written_answers':
      return result.TotalWrittenAnswers ?? 0;
    case 'statements':
      return result.TotalWrittenStatements ?? 0;
    default:
      return (
        (result.TotalContributions ?? 0) +
        (result.TotalWrittenAnswers ?? 0) +
        (result.TotalWrittenStatements ?? 0)
      );
  }
}

function truncate(text: string, cap: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= cap) return trimmed;
  return `${trimmed.slice(0, cap - 1).trimEnd()}…`;
}

export const searchHansardToolDefinition = {
  name: 'parliament_search_hansard',
  description: [
    'Hansard search with two modes, toggled by whether member_id is supplied.',
    '',
    'Default mode (no member_id) returns DEBATE TITLES matching the query — the lightweight metadata-only layer of Hansard. Each hit carries a debate_ext_id to chain into parliament_get_debate for the full text. Use this for any "what has Parliament discussed about X?" question.',
    '',
    'Member mode (member_id supplied) returns that member\'s CONTRIBUTIONS matching the query — short excerpts of their speeches, written answers, or statements with citations. Use this for "what has <MP> said about X?". The result set is naturally bounded to one member, so excerpts stay meaningful.',
    '',
    'Good for: "recent debates on NHS waiting lists" (default mode), "Diane Abbott\'s contributions on Ukraine" (member mode), "AI debates in 2026" (default mode).',
    '',
    "Wrong for: a member's formal voting record (use parliament_member_voting_history); the full text of a single debate you already have an id for (use parliament_get_debate); cross-Parliament topic round-ups including bills, written questions, and petitions (use parliament_topic_tracker).",
    '',
    'Inputs: query (required), member_id (optional — toggles mode), section (only meaningful in member mode: debates|written_answers|statements|all, default all), assembly (commons|lords|both, default both), from_date / to_date (ISO-8601), limit (1–50, default 20), response_format (concise|detailed; member mode widens contribution excerpts from 200 to 400 characters).',
    '',
    'Response: `mode` tells you which array was populated — `debates` (default mode) or `contributions` (member mode). The other array is always empty. `total` is the upstream match count. `meta.truncated` and `meta.truncation_hint` are set when the page was capped.',
  ].join('\n'),
  inputSchema: SearchHansardInputSchema,
  handler: searchHansard,
} as const;
