import { z } from 'zod';
import { type RawDivisionVoter, getCommonsDivision } from '../clients/commonsVotes.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import type { DivisionDetail } from '../domain/vote.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const GetDivisionInputSchema = z.object({
  division_id: z
    .number()
    .int()
    .positive()
    .describe(
      'Numeric DivisionId from parliament_member_voting_history or parliament_topic_tracker.',
    ),
  assembly: z
    .enum(['commons', 'lords'])
    .default('commons')
    .describe("Which house's division to fetch. Default commons. Lords support arrives in v1.1."),
  response_format: ResponseFormatSchema,
});

export type GetDivisionInput = z.infer<typeof GetDivisionInputSchema>;

export type GetDivisionData = DivisionDetail;

export async function getDivision(input: GetDivisionInput): Promise<ToolResponse<GetDivisionData>> {
  if (input.assembly === 'lords') {
    throw new ParliamentToolError(
      'INVALID_INPUT',
      'Lords divisions are not yet supported.',
      'Pass assembly="commons", or fetch the underlying division separately. Lords support is v1.1.',
    );
  }

  const detail = await getCommonsDivision(input.division_id);

  if (!detail) {
    throw new ParliamentToolError(
      'NO_DIVISION_FOUND',
      `No Commons division with id ${input.division_id}.`,
      'Re-check the id via parliament_member_voting_history.votes[i].division_id.',
    );
  }

  const data: DivisionDetail = {
    id: detail.DivisionId,
    house: 'Commons',
    division_number: detail.Number,
    title: detail.Title,
    date: detail.Date,
    ayes: detail.AyeCount,
    noes: detail.NoCount,
    passed: detail.AyeCount > detail.NoCount,
    ayes_by_party: tallyByParty(detail.Ayes),
    noes_by_party: tallyByParty(detail.Noes),
  };

  if (input.response_format === 'detailed') {
    data.ayes_members = detail.Ayes.map((v) => ({
      id: v.MemberId,
      name: v.Name,
      party: v.Party,
    }));
    data.noes_members = detail.Noes.map((v) => ({
      id: v.MemberId,
      name: v.Name,
      party: v.Party,
    }));
  }

  const sources: Citation[] = [Citations.division('Commons', detail.DivisionId, detail.Title)];

  return buildResponse(data, sources, { upstream_calls: 1 });
}

function tallyByParty(voters: RawDivisionVoter[]): Record<string, number> {
  const tally: Record<string, number> = {};
  for (const v of voters) {
    tally[v.Party] = (tally[v.Party] ?? 0) + 1;
  }
  return tally;
}

export const getDivisionToolDefinition = {
  name: 'parliament_get_division',
  description: [
    'Full detail of a single Commons division: ayes and noes by party, tellers, total counts, and (in detailed mode) the names of every aye/no voter.',
    '',
    'Good for: "show me the party breakdown for division 2347", "how did Conservatives vote on the latest tax measure?" (after finding the division via parliament_search_divisions), drilling in from a division surfaced by parliament_member_voting_history or parliament_topic_tracker.',
    '',
    "Wrong for: a single member's voting record (use parliament_member_voting_history); finding divisions by topic in the first place (use parliament_search_divisions).",
    '',
    'Inputs: division_id (required; resolve via parliament_search_divisions, parliament_member_voting_history, or parliament_topic_tracker), assembly (commons|lords, default commons; Lords support v1.1), response_format (concise|detailed; detailed includes per-MP voter lists).',
    '',
    'This response includes a `sources` array of votes.parliament.uk URLs. Cite them inline when making factual claims to the user.',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetDivisionInputSchema,
  handler: getDivision,
} as const;
