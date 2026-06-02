import { z } from 'zod';
import { type HansardDebateDetail, getDebateByExtId } from '../clients/hansard.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import type { DebateContribution, DebateDetail } from '../domain/debate.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const GetDebateInputSchema = z.object({
  debate_ext_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'Hansard debate ExternalId (a GUID, e.g. "4B8243B1-AF90-4FF1-A54C-646AEA4CABDE"). Use the value returned by parliament_search_hansard.debate_ext_id or parliament_member_overview.recent_contributions.debate_ext_id. Either this or hansard_url is required.',
    ),
  hansard_url: z
    .string()
    .url()
    .optional()
    .describe(
      'Full hansard.parliament.uk URL. Useful when the user pasted a link; the ExternalId GUID is extracted automatically. Either this or debate_ext_id is required.',
    ),
  response_format: ResponseFormatSchema,
});

export type GetDebateInput = z.infer<typeof GetDebateInputSchema>;

type DebateContributionConcise = Pick<DebateContribution, 'attributed_to' | 'text'>;

export type GetDebateData = Omit<DebateDetail, 'contributions'> & {
  contributions: DebateContribution[] | DebateContributionConcise[];
  truncated: boolean;
  total_items: number;
};

const APPROX_TOKEN_BUDGET = 15_000;
const CHARS_PER_TOKEN = 4;
const CHAR_BUDGET = APPROX_TOKEN_BUDGET * CHARS_PER_TOKEN;

export async function getDebate(input: GetDebateInput): Promise<ToolResponse<GetDebateData>> {
  if (!input.debate_ext_id && !input.hansard_url) {
    throw new ParliamentToolError(
      'INVALID_INPUT',
      'getDebate requires either debate_ext_id or hansard_url.',
      'Pass the debate ExternalId from parliament_search_hansard, or a hansard.parliament.uk URL.',
    );
  }
  const extId = resolveExtId(input);
  const detail = await getDebateByExtId(extId);

  if (!detail?.Overview) {
    throw new ParliamentToolError(
      'NO_DEBATE_FOUND',
      `No Hansard debate with ext_id "${extId}".`,
      'Confirm the ExternalId via parliament_search_hansard. If you have a column number, supply it instead.',
    );
  }

  const flattened = flatten(detail);
  const { contributions, truncated } = truncateByBudget(flattened);

  const projected: DebateContribution[] | DebateContributionConcise[] =
    input.response_format === 'detailed'
      ? contributions
      : contributions.map((c) => ({ attributed_to: c.attributed_to, text: c.text }));

  const data: GetDebateData = {
    ext_id: detail.Overview.ExtId,
    title: detail.Overview.Title,
    date: detail.Overview.Date,
    house: detail.Overview.House,
    location: detail.Overview.Location,
    volume: detail.Overview.VolumeNo,
    previous: detail.Overview.PreviousDebateExtId
      ? {
          ext_id: detail.Overview.PreviousDebateExtId,
          title: detail.Overview.PreviousDebateTitle ?? '',
        }
      : null,
    next: detail.Overview.NextDebateExtId
      ? {
          ext_id: detail.Overview.NextDebateExtId,
          title: detail.Overview.NextDebateTitle ?? '',
        }
      : null,
    contributions: projected,
    truncated,
    total_items: flattened.length,
  };

  const sources: Citation[] = [
    Citations.hansardDebate(
      detail.Overview.House,
      detail.Overview.Date.slice(0, 10),
      detail.Overview.ExtId,
      detail.Overview.Title,
    ),
  ];

  return buildResponse(data, sources, {
    upstream_calls: 1,
    truncated,
    truncation_hint: truncated
      ? `Debate exceeded ${APPROX_TOKEN_BUDGET} tokens; returned the first ${contributions.length} of ${flattened.length} contributions. Re-call this tool against the linked debate sub-sections via parliament_search_hansard for more.`
      : undefined,
  });
}

function resolveExtId(input: GetDebateInput): string {
  if (input.debate_ext_id) return input.debate_ext_id;
  const url = input.hansard_url as string;
  const match = url.match(/[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/i);
  if (!match) {
    throw new ParliamentToolError(
      'INVALID_INPUT',
      `Could not extract a debate ExternalId from "${url}".`,
      'Pass debate_ext_id explicitly. Search via parliament_search_hansard to find the right id.',
    );
  }
  return match[0];
}

function flatten(debate: HansardDebateDetail): DebateDetail['contributions'] {
  const out: DebateDetail['contributions'] = [];
  const walk = (d: HansardDebateDetail): void => {
    for (const item of d.Items ?? []) {
      out.push({
        attributed_to: item.AttributedTo,
        member_id: item.MemberId,
        type: item.ItemType,
        text: item.Value ?? '',
      });
    }
    for (const child of d.ChildDebates ?? []) walk(child);
  };
  walk(debate);
  return out;
}

function truncateByBudget(items: DebateDetail['contributions']): {
  contributions: DebateDetail['contributions'];
  truncated: boolean;
} {
  let chars = 0;
  const kept: DebateDetail['contributions'] = [];
  for (const item of items) {
    chars += item.text.length;
    if (chars > CHAR_BUDGET) {
      return { contributions: kept, truncated: true };
    }
    kept.push(item);
  }
  return { contributions: kept, truncated: false };
}

export const getDebateToolDefinition = {
  name: 'parliament_get_debate',
  description: [
    'Fetch the full text of a single Hansard debate by ExternalId or a hansard.parliament.uk URL. Returns title, sitting date, house, and the ordered contributions. Caps the response at ~15K tokens; if the debate is longer, sets meta.truncated and steers you toward narrower follow-up searches.',
    '',
    'Good for: "show me the climate change debate from 19 March 2026", "give me the full text of debate 4B8243B1-AF90-4FF1-A54C-646AEA4CABDE".',
    '',
    'Wrong for: searching across debates by keyword (use parliament_search_hansard); a specific division within the debate (use parliament_get_division).',
    '',
    "Inputs: one of debate_ext_id (GUID) or hansard_url (full hansard.parliament.uk link), response_format (concise|detailed; detailed adds each contribution's member_id and Hansard item type).",
    '',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetDebateInputSchema,
  handler: getDebate,
} as const;
