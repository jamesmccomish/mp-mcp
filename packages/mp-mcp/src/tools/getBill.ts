import { z } from 'zod';
import {
  type RawBillDetail,
  type RawBillStage,
  type RawSponsor,
  getBill as fetchBill,
  getBillStages,
} from '../clients/bills.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import { Citations } from '../lib/citations.js';
import { ParliamentToolError } from '../lib/errors.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const GetBillInputSchema = z.object({
  bill_id: z
    .number()
    .int()
    .positive()
    .describe('Numeric bill id. Resolve it from parliament_topic_tracker.bills_in_progress[].id.'),
  include_stages: z
    .boolean()
    .default(false)
    .describe(
      "When true, append the bill's stage history (description, house, date). Default false to keep the response small.",
    ),
  response_format: ResponseFormatSchema,
});

export type GetBillInput = z.infer<typeof GetBillInputSchema>;

export type GetBillData = {
  id: number;
  short_title: string;
  current_house: string;
  current_stage: string | null;
  is_act: boolean;
  is_defeated: boolean;
  last_update: string;
  sponsors: string[];
  long_title?: string | null;
  summary?: string | null;
  originating_house?: string;
  stages?: Array<{ description: string; house: string | null; date: string | null }>;
};

const SUMMARY_CAP = 400;
const SPONSOR_CAP_CONCISE = 3;

export async function getBill(input: GetBillInput): Promise<ToolResponse<GetBillData>> {
  const detailed = input.response_format === 'detailed';

  const bill = await loadBill(input.bill_id);

  const sponsorNames = (bill.sponsors ?? [])
    .map(sponsorName)
    .filter((name): name is string => name != null);

  const data: GetBillData = {
    id: bill.billId,
    short_title: bill.shortTitle,
    current_house: bill.currentHouse,
    current_stage: bill.currentStage?.description ?? null,
    is_act: bill.isAct,
    is_defeated: bill.isDefeated,
    last_update: bill.lastUpdate,
    sponsors: detailed ? sponsorNames : sponsorNames.slice(0, SPONSOR_CAP_CONCISE),
  };

  if (detailed) {
    data.long_title = bill.longTitle;
    data.summary = bill.summary ? truncate(bill.summary, SUMMARY_CAP) : null;
    data.originating_house = bill.originatingHouse;
  }

  let upstreamCalls = 1;
  if (input.include_stages) {
    const stages = await getBillStages(bill.billId);
    upstreamCalls += 1;
    data.stages = stages.map((s: RawBillStage) => ({
      description: s.description ?? '',
      house: s.house,
      date: latestSittingDate(s),
    }));
  }

  const sources: Citation[] = [Citations.bill(bill.billId, bill.shortTitle)];
  return buildResponse(data, sources, { upstream_calls: upstreamCalls });
}

async function loadBill(billId: number): Promise<RawBillDetail> {
  try {
    return await fetchBill(billId);
  } catch (error) {
    if (error instanceof ParliamentToolError && /\b404\b/.test(error.message)) {
      throw new ParliamentToolError(
        'NO_BILL_FOUND',
        `No bill with id ${billId}.`,
        'Resolve the bill_id via parliament_topic_tracker.bills_in_progress[].id, then retry.',
      );
    }
    throw error;
  }
}

function sponsorName(sponsor: RawSponsor): string | null {
  return sponsor.member?.name ?? sponsor.organisation?.name ?? null;
}

function latestSittingDate(stage: RawBillStage): string | null {
  const dates = (stage.stageSittings ?? [])
    .map((s) => s.date)
    .filter((d): d is string => d != null);
  if (dates.length === 0) return null;
  return dates.sort((a, b) => b.localeCompare(a))[0] ?? null;
}

function truncate(text: string, cap: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= cap) return trimmed;
  return `${trimmed.slice(0, cap - 1).trimEnd()}…`;
}

export const getBillToolDefinition = {
  name: 'parliament_get_bill',
  description: [
    'Full detail of a single UK Parliament bill: short title, current house and stage, whether it has become an Act or been defeated, sponsors, and (optionally) its stage history.',
    '',
    'Good for: expanding a bill surfaced by parliament_topic_tracker.bills_in_progress, "what stage is the Renters Rights Bill at?", "who sponsors bill 3680?".',
    '',
    'Wrong for: finding bills by topic in the first place (use parliament_topic_tracker); divisions on a bill (use parliament_search_divisions then parliament_get_division); the debate text (use parliament_search_hansard).',
    '',
    'Inputs: bill_id (required; resolve via parliament_topic_tracker), include_stages (default false), response_format (concise|detailed; detailed adds the long title, a truncated summary, the originating house, and the full sponsor list).',
    '',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: GetBillInputSchema,
  handler: getBill,
} as const;
