import { z } from 'zod';
import { type RawInterest, searchInterests } from '../clients/interests.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const MemberInterestsInputSchema = z.object({
  member_id: z.number().int().positive().describe('Numeric member id from parliament_find_member.'),
  category_number: z
    .string()
    .optional()
    .describe(
      'Filter to one Register category by its number (e.g. "1.1" for employment ad-hoc payments). Omit to return all categories.',
    ),
  from_date: z
    .string()
    .optional()
    .describe('ISO-8601 lower bound on publication date (e.g. "2024-01-01").'),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(20)
    .describe('Maximum entries to return (1–50). Default 20.'),
  response_format: ResponseFormatSchema,
});

export type MemberInterestsInput = z.infer<typeof MemberInterestsInputSchema>;

export type MemberInterestEntry = {
  id: number;
  category_number: string;
  category_name: string;
  summary: string;
  registered_on: string | null;
  published_on: string | null;
  fields?: Array<{ name: string; value: unknown }>;
};

export type MemberInterestsData = {
  member_id: number;
  entries: MemberInterestEntry[];
};

export async function memberInterests(
  input: MemberInterestsInput,
): Promise<ToolResponse<MemberInterestsData>> {
  const raw = await searchInterests({
    memberId: input.member_id,
    publishedSince: input.from_date,
    take: input.limit,
    expandChildren: input.response_format === 'detailed',
  });

  if (raw.length === 0) {
    throw new ParliamentToolError(
      'INVALID_INPUT',
      `No registered interests for member ${input.member_id}${input.from_date ? ` since ${input.from_date}` : ''}.`,
      'Try widening from_date, drop category_number, or confirm the member_id via parliament_find_member.',
    );
  }

  const filtered = input.category_number
    ? raw.filter((r) => r.category.number === input.category_number)
    : raw;

  const entries: MemberInterestEntry[] = filtered.slice(0, input.limit).map((r) => {
    const entry: MemberInterestEntry = {
      id: r.id,
      category_number: r.category.number,
      category_name: r.category.name,
      summary: r.summary,
      registered_on: r.registrationDate,
      published_on: r.publishedDate,
    };
    if (input.response_format === 'detailed') {
      entry.fields = r.fields.map((f) => ({ name: f.name, value: f.value }));
    }
    return entry;
  });

  const sources: Citation[] = [Citations.member(input.member_id, `Member ${input.member_id}`)];

  return buildResponse({ member_id: input.member_id, entries }, sources, { upstream_calls: 1 });
}

export const memberInterestsToolDefinition = {
  name: 'parliament_member_interests',
  description: [
    "An MP's entries in the Register of Members' Financial Interests — earnings, gifts, donations, shareholdings, employment, and visits. Returns the category, summary, and registration date.",
    '',
    'IMPORTANT: this tool returns the *declared* register. Do not characterise overlap with voting as a "conflict of interest" — the Register is a transparency mechanism, not a conflicts list. Surface the facts and let the user form their own conclusions.',
    '',
    'Good for: "what has Diane Abbott declared?", "show me the MP for SW1A 0AA\'s interests since 2024", drilling in from parliament_member_overview.interests.',
    '',
    "Wrong for: cross-member interest patterns (no good tool for this in v1); a member's voting record (use parliament_member_voting_history); a non-financial declaration (use parliament_member_overview).",
    '',
    'Inputs: member_id (required), category_number (e.g. "1.1"), from_date (ISO-8601), limit (1–50, default 20), response_format (concise|detailed; detailed includes typed fields).',
    '',
    'This response includes a `sources` array of parliament.uk URLs. Cite them inline when making factual claims to the user.',
  ].join('\n'),
  inputSchema: MemberInterestsInputSchema,
  handler: memberInterests,
} as const;
