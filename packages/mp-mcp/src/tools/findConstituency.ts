import { z } from 'zod';
import { searchConstituencies } from '../clients/members.js';
import { isPostcode, lookupPostcode } from '../clients/postcodes.js';
import type { ToolResponse } from '../domain/citation.js';
import { constituencySummary } from '../domain/mappers.js';
import type { ConstituencySummary } from '../domain/member.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const FindConstituencyInputSchema = z.object({
  query: z
    .string()
    .min(2)
    .describe(
      'Constituency name (e.g. "Chorley") or a full UK postcode (e.g. "SW1A 0AA"). Postcodes are auto-detected and routed via postcodes.io.',
    ),
  response_format: ResponseFormatSchema,
});

export type FindConstituencyInput = z.infer<typeof FindConstituencyInputSchema>;

export type ConstituencyConcise = Pick<ConstituencySummary, 'name' | 'current_member'>;

export type FindConstituencyData = {
  matches: ConstituencySummary[] | ConstituencyConcise[];
};

export async function findConstituency(
  input: FindConstituencyInput,
): Promise<ToolResponse<FindConstituencyData>> {
  const trimmed = input.query.trim();
  let upstreamCalls = 0;
  let searchText: string;

  if (isPostcode(trimmed)) {
    const postcode = await lookupPostcode(trimmed);
    upstreamCalls += 1;
    searchText = postcode.parliamentaryConstituency;
  } else {
    searchText = trimmed;
  }

  const raw = await searchConstituencies({ searchText, take: 10 });
  upstreamCalls += 1;

  if (raw.length === 0) {
    throw new ParliamentToolError(
      'NO_CONSTITUENCY_FOUND',
      `No constituency matched "${trimmed}".`,
      'Try the full constituency name (e.g. "Cities of London and Westminster") or pass a full UK postcode (e.g. "SW1A 0AA").',
    );
  }

  const summaries = raw.map(constituencySummary);
  const matches =
    input.response_format === 'detailed' ? summaries : summaries.map(toConciseConstituency);
  const sources = collectSources(raw, (c) => Citations.constituency(c.id, c.name));

  return buildResponse({ matches }, sources, { upstream_calls: upstreamCalls });
}

function toConciseConstituency(c: ConstituencySummary): ConstituencyConcise {
  return { name: c.name, current_member: c.current_member };
}

export const findConstituencyToolDefinition = {
  name: 'parliament_find_constituency',
  description: [
    'Find a UK parliamentary constituency by name or postcode. Returns the constituency record plus the current MP.',
    '',
    'Good for: "what constituency is BS3 4QH?", "which seat covers Easington?".',
    '',
    'Wrong for: detail about the MP (use parliament_find_member or parliament_member_overview instead). Wrong for general member lookup by name (use parliament_find_member).',
    '',
    'Inputs: query (constituency name | postcode), response_format (concise|detailed; detailed adds the constituency id and start/end dates).',
    '',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: FindConstituencyInputSchema,
  handler: findConstituency,
} as const;
