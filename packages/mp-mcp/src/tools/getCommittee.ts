import { z } from 'zod';
import {
  type RawCommitteeMember,
  type RawPublication,
  getCommitteeMembers,
  getCommitteePublications,
  getCommittee as getCommitteeRaw,
  searchCommittees,
} from '../clients/committees.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const GetCommitteeInputSchema = z.object({
  committee_id: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      'Numeric committee id (preferred when known). Resolve via parliament_member_overview.committees[i].id.',
    ),
  name: z
    .string()
    .optional()
    .describe(
      'Committee name (e.g. "Treasury Committee", "Health and Social Care"). Only used when committee_id is not provided.',
    ),
  include_evidence: z
    .boolean()
    .default(false)
    .describe(
      'When true, include the most recent publications (reports, evidence sessions). Default false to keep responses small.',
    ),
  response_format: ResponseFormatSchema,
});

export type GetCommitteeInput = z.infer<typeof GetCommitteeInputSchema>;

export type GetCommitteeData = {
  id: number;
  name: string;
  house: 'Commons' | 'Lords';
  category?: string | null;
  start_date?: string;
  end_date?: string | null;
  chair: { id: number; name: string; party: string } | null;
  members: Array<{ id: number; name: string; party: string; from?: string; is_chair?: boolean }>;
  recent_publications?: Array<{ id: number; title: string; type: string | null; date: string }>;
};

export async function getCommittee(
  input: GetCommitteeInput,
): Promise<ToolResponse<GetCommitteeData>> {
  const committeeId = await resolveCommitteeId(input);
  const [detailR, membersR, publicationsR] = await Promise.allSettled([
    getCommitteeRaw(committeeId),
    getCommitteeMembers(committeeId),
    input.include_evidence ? getCommitteePublications(committeeId, 5) : Promise.resolve([]),
  ]);

  if (detailR.status === 'rejected') {
    throw new ParliamentToolError(
      'NO_COMMITTEE_FOUND',
      `No committee with id ${committeeId}.`,
      'Confirm the id via parliament_member_overview.committees[i].id, or pass `name` instead.',
    );
  }

  const detail = detailR.value;
  const members = membersR.status === 'fulfilled' ? membersR.value : [];
  const publications = publicationsR.status === 'fulfilled' ? publicationsR.value : [];

  const chair = pickChair(members);
  const detailed = input.response_format === 'detailed';

  const data: GetCommitteeData = {
    id: detail.id,
    name: detail.name,
    house: detail.house,
    chair: chair ? { id: chair.memberId, name: chair.name, party: chair.partyName } : null,
    members: members.map((m) => {
      const base = { id: m.memberId, name: m.name, party: m.partyName };
      return detailed ? { ...base, from: m.memberFrom, is_chair: m.isChair } : base;
    }),
  };

  if (detailed) {
    data.category = detail.category?.name ?? null;
    data.start_date = detail.startDate;
    data.end_date = detail.endDate;
  }

  if (input.include_evidence) {
    data.recent_publications = publications.map((p: RawPublication) => ({
      id: p.id,
      title: p.title,
      type: p.type?.name ?? null,
      date: p.publicationStartDate,
    }));
  }

  const sources: Citation[] = [Citations.committee(detail.id, detail.name)];

  return buildResponse(data, sources, { upstream_calls: input.include_evidence ? 3 : 2 });
}

async function resolveCommitteeId(input: GetCommitteeInput): Promise<number> {
  if (input.committee_id) return input.committee_id;
  if (!input.name) {
    throw new ParliamentToolError(
      'INVALID_INPUT',
      'getCommittee requires one of committee_id or name.',
      'Pass committee_id (preferred, from parliament_member_overview) or name (substring match).',
    );
  }
  const matches = await searchCommittees(input.name, 5);
  const first = matches[0];
  if (!first) {
    throw new ParliamentToolError(
      'NO_COMMITTEE_FOUND',
      `No committee matched "${input.name}".`,
      'Try a more specific name, or look up the committee_id via parliament_member_overview.committees[].',
    );
  }
  return first.id;
}

function pickChair(members: RawCommitteeMember[]): RawCommitteeMember | null {
  return members.find((m) => m.isChair && m.endDate === null) ?? null;
}

export const getCommitteeToolDefinition = {
  name: 'parliament_get_committee',
  description: [
    'Full detail of a UK Parliament committee: current membership, chair, category (Select/Joint/etc.), and (optionally) recent reports + evidence sessions.',
    '',
    'Good for: "who is on the Treasury Committee?", "tell me about the Health Committee", drilling in from parliament_member_overview when the user asks "what does committee X actually do?".',
    '',
    "Wrong for: an MP's committee memberships across all committees (use parliament_member_overview); searching debates a committee sat in (use parliament_search_hansard).",
    '',
    "Inputs: one of committee_id (preferred) or name (substring match), include_evidence (default false), response_format (concise|detailed; detailed adds the committee category, start/end dates, and each member's seat and chair flag).",
    '',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetCommitteeInputSchema,
  handler: getCommittee,
} as const;
