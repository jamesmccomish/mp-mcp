import { z } from 'zod';
import {
  type HouseId,
  type MemberSearchParams,
  type RawMember,
  searchMembers,
} from '../clients/members.js';
import { isPostcode, lookupPostcode } from '../clients/postcodes.js';
import type { ToolResponse } from '../domain/citation.js';
import { memberDetailed, memberSummary } from '../domain/mappers.js';
import type { MemberDetailed, MemberSummary } from '../domain/member.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse, shape } from '../lib/responseFormat.js';

export const FindMemberInputSchema = z.object({
  query: z
    .string()
    .min(2)
    .describe(
      'Member name (e.g. "Lindsay Hoyle"), constituency name (e.g. "Chorley"), or a full UK postcode (e.g. "SW1A 0AA"). Postcodes are auto-detected and routed via postcodes.io to find the constituency first.',
    ),
  assembly: z
    .enum(['commons', 'lords', 'both'])
    .default('commons')
    .describe(
      'Which house to search. "commons" (default) matches the agent\'s most common intent ("my MP"); use "lords" only when the user explicitly asks about a peer.',
    ),
  current_only: z
    .boolean()
    .default(true)
    .describe(
      'When true (default), restricts results to sitting members. Set to false only if the user explicitly asks about a former MP.',
    ),
  response_format: ResponseFormatSchema,
});

export type FindMemberInput = z.infer<typeof FindMemberInputSchema>;

export type FindMemberData = {
  matches: MemberSummary[] | MemberDetailed[];
  query_kind: 'name' | 'postcode' | 'constituency';
};

export async function findMember(input: FindMemberInput): Promise<ToolResponse<FindMemberData>> {
  const trimmed = input.query.trim();
  const searchParams: MemberSearchParams = {
    take: 20,
    isCurrentMember: input.current_only ? true : undefined,
    house: assemblyToHouseId(input.assembly),
  };

  let queryKind: FindMemberData['query_kind'];
  let upstreamCalls = 0;

  if (isPostcode(trimmed)) {
    const postcode = await lookupPostcode(trimmed);
    upstreamCalls += 1;
    searchParams.location = postcode.parliamentaryConstituency;
    queryKind = 'postcode';
  } else {
    searchParams.name = trimmed;
    queryKind = 'name';
  }

  let raw = await searchMembers(searchParams);
  upstreamCalls += 1;

  if (raw.length === 0 && queryKind === 'name') {
    raw = await searchMembers({ ...searchParams, name: undefined, location: trimmed });
    upstreamCalls += 1;
    if (raw.length > 0) queryKind = 'constituency';
  }

  if (raw.length === 0) {
    throw new ParliamentToolError(
      'NO_MEMBER_FOUND',
      `No ${input.assembly === 'lords' ? 'peer' : 'MP'} matched "${trimmed}".`,
      'Try a different spelling, a full constituency name, or a postcode like "SW1A 0AA". For historic members, set current_only=false.',
    );
  }

  const matches =
    input.response_format === 'detailed' ? raw.map(memberDetailed) : raw.map(memberSummary);

  const sources = collectSources(raw, (m) => Citations.member(m.id, m.nameDisplayAs));
  return buildResponse({ matches, query_kind: queryKind }, sources, {
    upstream_calls: upstreamCalls,
  });
}

function assemblyToHouseId(assembly: FindMemberInput['assembly']): HouseId | undefined {
  if (assembly === 'commons') return 1;
  if (assembly === 'lords') return 2;
  return undefined;
}

// Concise vs detailed only affects which mapper runs. The shape() helper isn't
// needed since findMember decides per-match, not per-response. Re-export for
// other callers that want the same projection.
export const findMemberShapes = {
  concise: (raw: RawMember) => memberSummary(raw),
  detailed: (raw: RawMember) => memberDetailed(raw),
};

export function projectMember(
  raw: RawMember,
  format: 'concise' | 'detailed',
): MemberSummary | MemberDetailed {
  return shape(raw, format, findMemberShapes);
}

export const findMemberToolDefinition = {
  name: 'parliament_find_member',
  description: [
    'Find a sitting (or former) UK Parliament member by name, constituency, or postcode.',
    'Returns a list of matched members with id, name, party, constituency, and house.',
    '',
    'Good for: "who is the MP for SW1A 0AA?", "find Diane Abbott", "Aberdeen South MP".',
    '',
    'Wrong for: a member\'s recent activity (use parliament_member_overview), their voting record (use parliament_member_voting_history), or anything cross-member like "Conservative MPs interested in climate" (use parliament_topic_tracker).',
    '',
    'Inputs: query (name | constituency | postcode), assembly (commons|lords|both, default commons), current_only (default true), response_format (concise|detailed, default concise).',
    '',
    'This response includes a `sources` array of parliament.uk URLs. Cite them inline when making factual claims to the user.',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: FindMemberInputSchema,
  handler: findMember,
} as const;
