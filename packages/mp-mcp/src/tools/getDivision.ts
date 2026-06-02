import { z } from 'zod';
import { getCommonsDivision } from '../clients/commonsVotes.js';
import { getLordsDivision } from '../clients/lordsVotes.js';
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
    .describe(
      "Which house's division to fetch. Default commons. Lords divisions use content/not-content, surfaced here as ayes/noes.",
    ),
  response_format: ResponseFormatSchema,
});

export type GetDivisionInput = z.infer<typeof GetDivisionInputSchema>;

export type GetDivisionData = DivisionDetail;

export async function getDivision(input: GetDivisionInput): Promise<ToolResponse<GetDivisionData>> {
  const detailed = input.response_format === 'detailed';
  const data =
    input.assembly === 'lords'
      ? await loadLordsDivision(input.division_id, detailed)
      : await loadCommonsDivision(input.division_id, detailed);

  const sources: Citation[] = [Citations.division(data.house, data.id, data.title)];
  return buildResponse(data, sources, { upstream_calls: 1 });
}

async function loadCommonsDivision(divisionId: number, detailed: boolean): Promise<DivisionDetail> {
  const detail = await getCommonsDivision(divisionId);
  if (!detail) {
    throw new ParliamentToolError(
      'NO_DIVISION_FOUND',
      `No Commons division with id ${divisionId}.`,
      'Re-check the id via parliament_member_voting_history.votes[i].division_id, and confirm assembly="commons".',
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
    ayes_by_party: tallyByParty(detail.Ayes, (v) => v.Party),
    noes_by_party: tallyByParty(detail.Noes, (v) => v.Party),
  };

  if (detailed) {
    data.ayes_members = detail.Ayes.map((v) => ({ id: v.MemberId, name: v.Name, party: v.Party }));
    data.noes_members = detail.Noes.map((v) => ({ id: v.MemberId, name: v.Name, party: v.Party }));
  }

  return data;
}

async function loadLordsDivision(divisionId: number, detailed: boolean): Promise<DivisionDetail> {
  const detail = await getLordsDivision(divisionId);
  if (!detail) {
    throw new ParliamentToolError(
      'NO_DIVISION_FOUND',
      `No Lords division with id ${divisionId}.`,
      'Re-check the id via parliament_member_voting_history (assembly="lords").',
    );
  }

  const contents = detail.contents ?? [];
  const notContents = detail.notContents ?? [];
  const ayes = detail.authoritativeContentCount;
  const noes = detail.authoritativeNotContentCount;

  const data: DivisionDetail = {
    id: detail.divisionId,
    house: 'Lords',
    division_number: detail.number,
    title: detail.title ?? '',
    date: detail.date,
    ayes,
    noes,
    passed: ayes > noes,
    ayes_by_party: tallyByParty(contents, (v) => v.party ?? 'Unknown'),
    noes_by_party: tallyByParty(notContents, (v) => v.party ?? 'Unknown'),
  };

  if (detailed) {
    data.ayes_members = contents.map((v) => ({
      id: v.memberId,
      name: v.name ?? '',
      party: v.party ?? 'Unknown',
    }));
    data.noes_members = notContents.map((v) => ({
      id: v.memberId,
      name: v.name ?? '',
      party: v.party ?? 'Unknown',
    }));
  }

  return data;
}

// The by-id division endpoints return voter rosters, not pre-grouped party
// counts (the upstream groupedbyparty endpoint is keyed by division *number*,
// not id, so it cannot serve a by-id drill-in). Tally locally.
function tallyByParty<T>(voters: T[], party: (voter: T) => string): Record<string, number> {
  const tally: Record<string, number> = {};
  for (const voter of voters) {
    const name = party(voter);
    tally[name] = (tally[name] ?? 0) + 1;
  }
  return tally;
}

export const getDivisionToolDefinition = {
  name: 'parliament_get_division',
  description: [
    'Full detail of a single division (recorded vote): ayes and noes by party, total counts, and (in detailed mode) the names of every aye/no voter. Supports both Commons and Lords (Lords content/not-content is surfaced as ayes/noes).',
    '',
    'Good for: "show me the party breakdown for division 2347", "how did Conservatives vote on the latest tax measure?" (after finding the division via parliament_search_divisions), drilling in from a division surfaced by parliament_member_voting_history or parliament_topic_tracker.',
    '',
    "Wrong for: a single member's voting record (use parliament_member_voting_history); finding divisions by topic in the first place (use parliament_search_divisions).",
    '',
    'Inputs: division_id (required; resolve via parliament_search_divisions, parliament_member_voting_history, or parliament_topic_tracker), assembly (commons|lords, default commons), response_format (concise|detailed; detailed includes per-MP voter lists).',
    '',
    'This response includes a `sources` array of votes.parliament.uk URLs. Cite them inline when making factual claims to the user.',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetDivisionInputSchema,
  handler: getDivision,
} as const;
