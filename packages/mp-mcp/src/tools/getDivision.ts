import { z } from 'zod';
import { getCommonsDivision } from '../clients/commonsVotes.js';
import { getLordsDivision } from '../clients/lordsVotes.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import type { DivisionDetail, DivisionRebellion } from '../domain/vote.js';
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
  include_rebellions: z
    .boolean()
    .default(false)
    .describe(
      "When true, list members who voted against their own party's majority in THIS division (computed from the recorded lobbies; no extra upstream call). This is a single-division signal, not a cross-history rebellion count. Default false.",
    ),
  response_format: ResponseFormatSchema,
});

export type GetDivisionInput = z.infer<typeof GetDivisionInputSchema>;

export type GetDivisionData = DivisionDetail;

// A voter normalized across the Commons (aye/no) and Lords (content/not-content)
// shapes, with the lobby they were recorded in.
type NormalizedVoter = { id: number; name: string; party: string; lobby: 'aye' | 'no' };

type DivisionCore = {
  id: number;
  house: 'Commons' | 'Lords';
  division_number: number;
  title: string;
  date: string;
  ayes: number;
  noes: number;
  ayeVoters: NormalizedVoter[];
  noeVoters: NormalizedVoter[];
};

export async function getDivision(input: GetDivisionInput): Promise<ToolResponse<GetDivisionData>> {
  const core =
    input.assembly === 'lords'
      ? await loadLordsDivision(input.division_id)
      : await loadCommonsDivision(input.division_id);

  const detailed = input.response_format === 'detailed';

  const data: DivisionDetail = {
    id: core.id,
    house: core.house,
    division_number: core.division_number,
    title: core.title,
    date: core.date,
    ayes: core.ayes,
    noes: core.noes,
    passed: core.ayes > core.noes,
    ayes_by_party: tallyByParty(core.ayeVoters),
    noes_by_party: tallyByParty(core.noeVoters),
  };

  if (detailed) {
    data.ayes_members = core.ayeVoters.map(stripLobby);
    data.noes_members = core.noeVoters.map(stripLobby);
  }

  if (input.include_rebellions) {
    data.rebellions = computeRebellions(core.ayeVoters, core.noeVoters);
  }

  const sources: Citation[] = [Citations.division(data.house, data.id, data.title)];
  return buildResponse(data, sources, { upstream_calls: 1 });
}

async function loadCommonsDivision(divisionId: number): Promise<DivisionCore> {
  const detail = await getCommonsDivision(divisionId);
  if (!detail) {
    throw new ParliamentToolError(
      'NO_DIVISION_FOUND',
      `No Commons division with id ${divisionId}.`,
      'Re-check the id via parliament_member_voting_history.votes[i].division_id, and confirm assembly="commons".',
    );
  }
  return {
    id: detail.DivisionId,
    house: 'Commons',
    division_number: detail.Number,
    title: detail.Title,
    date: detail.Date,
    ayes: detail.AyeCount,
    noes: detail.NoCount,
    ayeVoters: detail.Ayes.map((v) => ({
      id: v.MemberId,
      name: v.Name,
      party: v.Party,
      lobby: 'aye' as const,
    })),
    noeVoters: detail.Noes.map((v) => ({
      id: v.MemberId,
      name: v.Name,
      party: v.Party,
      lobby: 'no' as const,
    })),
  };
}

async function loadLordsDivision(divisionId: number): Promise<DivisionCore> {
  const detail = await getLordsDivision(divisionId);
  if (!detail) {
    throw new ParliamentToolError(
      'NO_DIVISION_FOUND',
      `No Lords division with id ${divisionId}.`,
      'Re-check the id via parliament_member_voting_history (assembly="lords").',
    );
  }
  const toVoter =
    (lobby: 'aye' | 'no') =>
    (v: { memberId: number; name: string | null; party: string | null }): NormalizedVoter => ({
      id: v.memberId,
      name: v.name ?? '',
      party: v.party ?? 'Unknown',
      lobby,
    });
  return {
    id: detail.divisionId,
    house: 'Lords',
    division_number: detail.number,
    title: detail.title ?? '',
    date: detail.date,
    ayes: detail.authoritativeContentCount,
    noes: detail.authoritativeNotContentCount,
    ayeVoters: (detail.contents ?? []).map(toVoter('aye')),
    noeVoters: (detail.notContents ?? []).map(toVoter('no')),
  };
}

function stripLobby(v: NormalizedVoter): { id: number; name: string; party: string } {
  return { id: v.id, name: v.name, party: v.party };
}

// The by-id division endpoints return voter rosters, not pre-grouped party
// counts (the upstream groupedbyparty endpoint is keyed by division *number*,
// not id, so it cannot serve a by-id drill-in). Tally locally.
function tallyByParty(voters: NormalizedVoter[]): Record<string, number> {
  const tally: Record<string, number> = {};
  for (const voter of voters) {
    tally[voter.party] = (tally[voter.party] ?? 0) + 1;
  }
  return tally;
}

// A rebel voted against their own party's majority lobby in this division.
// Ties (equal ayes/noes within a party) have no majority, so yield no rebels.
function computeRebellions(
  ayeVoters: NormalizedVoter[],
  noeVoters: NormalizedVoter[],
): DivisionRebellion[] {
  const ayesByParty = tallyByParty(ayeVoters);
  const noesByParty = tallyByParty(noeVoters);
  const parties = new Set([...Object.keys(ayesByParty), ...Object.keys(noesByParty)]);

  const majority = new Map<string, 'aye' | 'no'>();
  for (const party of parties) {
    const ayes = ayesByParty[party] ?? 0;
    const noes = noesByParty[party] ?? 0;
    if (ayes === noes) continue;
    majority.set(party, ayes > noes ? 'aye' : 'no');
  }

  const rebellions: DivisionRebellion[] = [];
  for (const voter of [...ayeVoters, ...noeVoters]) {
    const partyMajority = majority.get(voter.party);
    if (partyMajority && voter.lobby !== partyMajority) {
      rebellions.push({
        member_id: voter.id,
        name: voter.name,
        party: voter.party,
        voted: voter.lobby,
        party_majority: partyMajority,
      });
    }
  }
  return rebellions;
}

export const getDivisionToolDefinition = {
  name: 'parliament_get_division',
  description: [
    'Full detail of a single division (recorded vote): ayes and noes by party, total counts, and (in detailed mode) the names of every aye/no voter. Supports both Commons and Lords (Lords content/not-content is surfaced as ayes/noes).',
    '',
    'Good for: "show me the party breakdown for division 2347", "how did Conservatives vote on the latest tax measure?" (after finding the division via parliament_search_divisions), "who rebelled against their party on division 2347?" (set include_rebellions), drilling in from parliament_member_voting_history or parliament_topic_tracker.',
    '',
    "Wrong for: a single member's voting record (use parliament_member_voting_history); finding divisions by topic in the first place (use parliament_search_divisions); a member's rebellions across their whole record (not supported — this tool only reports rebellions within one division).",
    '',
    'Inputs: division_id (required; resolve via parliament_search_divisions, parliament_member_voting_history, or parliament_topic_tracker), assembly (commons|lords, default commons), include_rebellions (default false; lists members who voted against their party majority in this division), response_format (concise|detailed; detailed includes per-MP voter lists).',
    '',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetDivisionInputSchema,
  handler: getDivision,
} as const;
