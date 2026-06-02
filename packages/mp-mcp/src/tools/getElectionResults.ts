import { z } from 'zod';
import {
  type RawElectionResult,
  getElectionResults as fetchElectionResults,
  getLatestElectionResult,
} from '../clients/members.js';
import type { Citation, ToolResponse, ToolResponseMeta } from '../domain/citation.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const GetElectionResultsInputSchema = z.object({
  constituency_id: z
    .number()
    .int()
    .positive()
    .describe('Numeric constituency id. Resolve it via parliament_find_constituency.'),
  include_history: z
    .boolean()
    .default(false)
    .describe(
      'When true, return a summary of past elections for the seat as well as the latest. Default false (latest only).',
    ),
  response_format: ResponseFormatSchema,
});

export type GetElectionResultsInput = z.infer<typeof GetElectionResultsInputSchema>;

export type ElectionCandidateSummary = {
  name: string | null;
  party: string | null;
  votes: number;
  vote_share: number | null;
};

export type ElectionSummary = {
  election_date: string;
  election_title: string | null;
  is_general_election: boolean;
  result: string | null;
  winner: { name: string | null; party: string | null } | null;
  majority: number;
  turnout: number;
  electorate: number;
  candidates?: ElectionCandidateSummary[];
};

export type GetElectionResultsData = {
  constituency_id: number;
  constituency_name: string | null;
  latest: ElectionSummary;
  history?: ElectionSummary[];
};

const CANDIDATE_CAP = 10;

export async function getElectionResults(
  input: GetElectionResultsInput,
): Promise<ToolResponse<GetElectionResultsData>> {
  const detailed = input.response_format === 'detailed';

  const latestRaw = await getLatestElectionResult(input.constituency_id);
  if (!latestRaw) {
    throw new ParliamentToolError(
      'NO_CONSTITUENCY_FOUND',
      `No election results for constituency ${input.constituency_id}.`,
      'Confirm the constituency_id via parliament_find_constituency, then retry.',
    );
  }

  const meta: ToolResponseMeta = { upstream_calls: 1 };
  // Latest gets the candidate breakdown (in detailed); history entries stay
  // summary-only to keep the payload bounded.
  const latest = toSummary(latestRaw, detailed, meta);

  const data: GetElectionResultsData = {
    constituency_id: input.constituency_id,
    constituency_name: latestRaw.constituencyName,
    latest,
  };

  if (input.include_history) {
    const all = await fetchElectionResults(input.constituency_id);
    meta.upstream_calls = 2;
    data.history = all.map((r) => toSummary(r, false, meta));
  }

  const sources: Citation[] = [
    Citations.constituency(input.constituency_id, latestRaw.constituencyName ?? 'Constituency'),
  ];
  return buildResponse(data, sources, meta);
}

function toSummary(
  raw: RawElectionResult,
  withCandidates: boolean,
  meta: ToolResponseMeta,
): ElectionSummary {
  const candidates = (raw.candidates ?? []).slice().sort((a, b) => b.votes - a.votes);
  const top = candidates[0];

  const summary: ElectionSummary = {
    election_date: raw.electionDate,
    election_title: raw.electionTitle,
    is_general_election: raw.isGeneralElection,
    result: raw.result,
    winner: top
      ? { name: top.name, party: top.party?.name ?? raw.winningParty?.name ?? null }
      : null,
    majority: raw.majority,
    turnout: raw.turnout,
    electorate: raw.electorate,
  };

  if (withCandidates) {
    summary.candidates = candidates.slice(0, CANDIDATE_CAP).map((c) => ({
      name: c.name,
      party: c.party?.name ?? null,
      votes: c.votes,
      vote_share: c.voteShare,
    }));
    if (candidates.length > CANDIDATE_CAP) {
      meta.truncated = true;
      meta.truncation_hint = `Showing the top ${CANDIDATE_CAP} of ${candidates.length} candidates by votes.`;
    }
  }

  return summary;
}

export const getElectionResultsToolDefinition = {
  name: 'parliament_get_election_results',
  description: [
    'Election results for a UK parliamentary constituency: the winner, party, majority, turnout, electorate, and (in detailed mode) the full candidate breakdown. Latest election by default, with optional history.',
    '',
    'Good for: "who won Chorley and by how much?", "turnout in Bristol South at the last election", "election history for constituency 4109".',
    '',
    'Wrong for: who the current MP is (use parliament_find_member); the constituency record itself (use parliament_find_constituency); national party balance (use parliament_get_state_of_parties).',
    '',
    'Inputs: constituency_id (required; resolve via parliament_find_constituency), include_history (default false), response_format (concise|detailed; detailed adds the per-candidate vote breakdown, capped at the top 10).',
    '',
    'Response envelope: `meta` carries `upstream_calls`; when the candidate list is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetElectionResultsInputSchema,
  handler: getElectionResults,
} as const;
