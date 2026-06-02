import { z } from 'zod';
import {
  type HouseId,
  type RawPartySeatCount,
  getStateOfParties as fetchStateOfParties,
} from '../clients/members.js';
import type { Citation, House, ToolResponse } from '../domain/citation.js';
import { Citations } from '../lib/citations.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const GetStateOfPartiesInputSchema = z.object({
  assembly: z
    .enum(['commons', 'lords'])
    .default('commons')
    .describe('Which house to count seats for. Default commons.'),
  on_date: z
    .string()
    .optional()
    .describe('ISO-8601 date to count seats as of (e.g. "2025-01-01"). Defaults to today.'),
  response_format: ResponseFormatSchema,
});

export type GetStateOfPartiesInput = z.infer<typeof GetStateOfPartiesInputSchema>;

export type PartyStanding = {
  party: string;
  seats: number;
  abbreviation?: string | null;
  gender?: { male: number | null; female: number | null; non_binary: number | null };
};

export type GetStateOfPartiesData = {
  house: House;
  on_date: string;
  parties: PartyStanding[];
};

export async function getStateOfParties(
  input: GetStateOfPartiesInput,
): Promise<ToolResponse<GetStateOfPartiesData>> {
  const house: House = input.assembly === 'lords' ? 'Lords' : 'Commons';
  const houseId: HouseId = input.assembly === 'lords' ? 2 : 1;
  const onDate = input.on_date ?? new Date().toISOString().slice(0, 10);
  const detailed = input.response_format === 'detailed';

  const raw = await fetchStateOfParties(houseId, onDate);

  const parties: PartyStanding[] = raw
    .map((p) => toStanding(p, detailed))
    .sort((a, b) => b.seats - a.seats);

  const sources: Citation[] = [Citations.stateOfParties(house)];
  return buildResponse({ house, on_date: onDate, parties }, sources, { upstream_calls: 1 });
}

function toStanding(raw: RawPartySeatCount, detailed: boolean): PartyStanding {
  const standing: PartyStanding = {
    party: raw.party?.name ?? 'Unknown',
    seats: raw.total,
  };
  if (detailed) {
    standing.abbreviation = raw.party?.abbreviation ?? null;
    standing.gender = { male: raw.male, female: raw.female, non_binary: raw.nonBinary };
  }
  return standing;
}

export const getStateOfPartiesToolDefinition = {
  name: 'parliament_get_state_of_parties',
  description: [
    'Seat counts by party for a house of Parliament on a given date — the current (or historical) party balance.',
    '',
    'Good for: "what is the state of the parties in the Commons?", "how many seats does each party hold in the Lords?", "party balance on 2024-07-05".',
    '',
    "Wrong for: a single member's details (use parliament_find_member); who holds ministerial roles (use parliament_get_ministerial_roles); election results for a seat (use parliament_get_election_results).",
    '',
    'Inputs: assembly (commons|lords, default commons), on_date (ISO-8601, default today), response_format (concise|detailed; detailed adds the party abbreviation and a gender breakdown).',
    '',
    'Response envelope: `meta` carries `upstream_calls`.',
  ].join('\n'),
  inputSchema: GetStateOfPartiesInputSchema,
  handler: getStateOfParties,
} as const;
