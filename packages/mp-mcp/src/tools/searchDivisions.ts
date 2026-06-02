import { z } from 'zod';
import { type RawDivisionSummary, searchCommonsDivisions } from '../clients/commonsVotes.js';
import type { ToolResponse } from '../domain/citation.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const SearchDivisionsInputSchema = z.object({
  topic: z
    .string()
    .min(2)
    .describe(
      'Keyword matched (case-insensitive) against the division title. Best as a short, literal title term: "tax", "Finance", "Renters", "immigration". The upstream match is a literal substring, so prefer the word that actually appears in the division title (e.g. "Finance" finds the Finance Bill; "tax" finds Budget/Council Tax divisions).',
    ),
  from_date: z
    .string()
    .optional()
    .describe('ISO-8601 lower bound (inclusive) on the division date. Example: "2025-01-01".'),
  to_date: z
    .string()
    .optional()
    .describe('ISO-8601 upper bound (inclusive) on the division date. Example: "2025-12-31".'),
  limit: z
    .number()
    .int()
    .min(1)
    .max(20)
    .default(10)
    .describe('Maximum divisions to return (1–20). Default 10. Results are most-recent-first.'),
  response_format: ResponseFormatSchema,
});

export type SearchDivisionsInput = z.infer<typeof SearchDivisionsInputSchema>;

export type DivisionHit = {
  division_id: number;
  number?: number;
  title: string;
  date: string;
  ayes: number;
  noes: number;
  passed: boolean;
};

export type SearchDivisionsData = {
  topic: string;
  window: { from: string | null; to: string | null };
  divisions: DivisionHit[];
};

export async function searchDivisions(
  input: SearchDivisionsInput,
): Promise<ToolResponse<SearchDivisionsData>> {
  const raw = await searchCommonsDivisions({
    searchTerm: input.topic,
    startDate: input.from_date,
    endDate: input.to_date,
    take: input.limit,
  });

  const detailed = input.response_format === 'detailed';
  const divisions: DivisionHit[] = raw.slice(0, input.limit).map((d) => toHit(d, detailed));

  const sources = collectSources(raw, (d) => Citations.division('Commons', d.DivisionId, d.Title));

  return buildResponse(
    {
      topic: input.topic,
      window: { from: input.from_date ?? null, to: input.to_date ?? null },
      divisions,
    },
    sources,
    {
      upstream_calls: 1,
      truncation_hint:
        divisions.length === 0
          ? 'No divisions matched. The match is a literal title substring — try the word that appears in the division title (e.g. "Finance" rather than "tax"), drop the date range, or widen the term.'
          : undefined,
    },
  );
}

function toHit(d: RawDivisionSummary, detailed: boolean): DivisionHit {
  return {
    division_id: d.DivisionId,
    title: d.Title,
    date: d.Date,
    ayes: d.AyeCount,
    noes: d.NoCount,
    passed: d.AyeCount > d.NoCount,
    ...(detailed ? { number: d.Number } : {}),
  };
}

export const searchDivisionsToolDefinition = {
  name: 'parliament_search_divisions',
  description: [
    'Find Commons divisions (recorded votes) on a topic. Returns each division with its division_id, title, date, and the aggregate aye/no counts — the entry point for "what was voted on" and "how did a party vote on X". Most-recent-first.',
    '',
    'For a party or per-MP breakdown, chain the returned division_id into parliament_get_division (ayes/noes by party, and per-MP lists in detailed mode). Example for "how did Conservatives vote on the latest tax measure?": parliament_search_divisions(topic="tax") -> parliament_get_division(division_id).',
    '',
    'Good for: "recent votes on tax", "divisions about immigration this year", "how did parties vote on the Finance Bill?". Wrong for: one member\'s record (use parliament_member_voting_history); a cross-domain topic round-up with bills/debates/petitions (use parliament_topic_tracker); a division you already have the id for (use parliament_get_division).',
    '',
    'Inputs: topic (required; literal title substring), from_date / to_date (ISO-8601, optional — omit to search all dates), limit (1–20, default 10), response_format (concise|detailed; detailed adds the division number).',
    '',
    'Response envelope: `meta` carries `upstream_calls`; when nothing matched it sets a `truncation_hint` on how to broaden the search.',
  ].join('\n'),
  inputSchema: SearchDivisionsInputSchema,
  handler: searchDivisions,
} as const;
