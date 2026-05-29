import { z } from 'zod';
import { type RawBill, searchBills } from '../clients/bills.js';
import { type RawDivisionSummary, searchCommonsDivisions } from '../clients/commonsVotes.js';
import { type HansardDebateSearchHit, searchHansardDebates } from '../clients/hansard.js';
import { type RawPetition, searchPetitions } from '../clients/petitions.js';
import { type RawWrittenQuestion, searchWrittenQuestions } from '../clients/writtenQuestions.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
import { collectSources } from '../lib/buildSources.js';
import { Citations } from '../lib/citations.js';
import { ResponseFormatSchema, buildResponse } from '../lib/responseFormat.js';

export const TopicTrackerInputSchema = z.object({
  topic: z
    .string()
    .min(2)
    .describe(
      'The policy topic to track. Best as a short noun phrase the agent expects to appear in titles. Examples: "renters reform", "NHS waiting lists", "AI", "climate change".',
    ),
  lookback_days: z
    .number()
    .int()
    .min(1)
    .max(365)
    .default(90)
    .describe('How many days back to search. Default 90; maximum 365.'),
  response_format: ResponseFormatSchema,
});

export type TopicTrackerInput = z.infer<typeof TopicTrackerInputSchema>;

export type TopicTrackerData = {
  topic: string;
  window: { from: string; to: string };
  bills_in_progress: Array<{
    id: number;
    short_title: string;
    current_house?: string;
    current_stage: string | null;
    last_update?: string;
    is_act: boolean;
  }>;
  recent_debates: Array<{
    title: string;
    house: 'Commons' | 'Lords';
    date: string;
    debate_ext_id?: string;
  }>;
  recent_votes: Array<{
    division_id?: number;
    number?: number;
    title: string;
    date: string;
    ayes: number;
    noes: number;
  }>;
  recent_written_questions: Array<{
    uin?: string;
    asking_member_id?: number;
    house: 'Commons' | 'Lords';
    date_tabled: string;
    question: string;
    answered: boolean;
  }>;
  active_petitions: Array<{
    id: number;
    action: string;
    state?: string;
    signature_count: number;
    created_at?: string;
  }>;
};

const MAX_INTERNAL_CALLS = 12;

export async function topicTracker(
  input: TopicTrackerInput,
): Promise<ToolResponse<TopicTrackerData>> {
  const to = new Date();
  const from = new Date(to.getTime() - input.lookback_days * 86_400_000);
  const fromIso = toIsoDate(from);
  const toIso = toIsoDate(to);

  const [billsR, debatesR, votesR, questionsR, petitionsR] = await Promise.allSettled([
    searchBills({ searchTerm: input.topic, take: 5 }),
    searchHansardDebates({ searchTerm: input.topic, startDate: fromIso, endDate: toIso, take: 5 }),
    searchCommonsDivisions({
      searchTerm: input.topic,
      startDate: fromIso,
      endDate: toIso,
      take: 5,
    }),
    searchWrittenQuestions({
      searchTerm: input.topic,
      askedStartDate: fromIso,
      askedEndDate: toIso,
      take: 5,
    }),
    searchPetitions({ search: input.topic, state: 'open' }),
  ]);

  const bills = unwrap<RawBill[]>(billsR) ?? [];
  const debates = unwrap<{ Results: HansardDebateSearchHit[] }>(debatesR)?.Results ?? [];
  const votes = unwrap<RawDivisionSummary[]>(votesR) ?? [];
  const questions = unwrap<RawWrittenQuestion[]>(questionsR) ?? [];
  const petitions = unwrap<RawPetition[]>(petitionsR) ?? [];

  const topPetitions = [...petitions]
    .sort((a, b) => b.attributes.signature_count - a.attributes.signature_count)
    .slice(0, 5);

  const detailed = input.response_format === 'detailed';

  const data: TopicTrackerData = {
    topic: input.topic,
    window: { from: fromIso, to: toIso },
    bills_in_progress: bills.slice(0, 5).map((b) => ({
      id: b.billId,
      short_title: b.shortTitle,
      current_stage: b.currentStage?.description ?? null,
      is_act: b.isAct,
      ...(detailed ? { current_house: b.currentHouse, last_update: b.lastUpdate } : {}),
    })),
    recent_debates: debates.slice(0, 5).map((d) => ({
      title: d.Title,
      house: d.House,
      date: d.SittingDate,
      ...(detailed ? { debate_ext_id: d.DebateSectionExtId } : {}),
    })),
    recent_votes: votes.slice(0, 5).map((v) => ({
      title: v.Title,
      date: v.Date,
      ayes: v.AyeCount,
      noes: v.NoCount,
      ...(detailed ? { division_id: v.DivisionId, number: v.Number } : {}),
    })),
    recent_written_questions: questions.slice(0, 5).map((q) => ({
      house: q.house,
      date_tabled: q.dateTabled,
      question: truncate(q.questionText, detailed ? 400 : 200),
      answered: q.dateAnswered != null,
      ...(detailed ? { uin: q.uin, asking_member_id: q.askingMemberId } : {}),
    })),
    active_petitions: topPetitions.map((p) => ({
      id: p.id,
      action: p.attributes.action,
      signature_count: p.attributes.signature_count,
      ...(detailed ? { state: p.attributes.state, created_at: p.attributes.created_at } : {}),
    })),
  };

  const sources = buildSources(bills, debates, votes, topPetitions);
  const upstreamCalls = 5;
  return buildResponse(data, sources, {
    upstream_calls: upstreamCalls,
    truncated: false,
    truncation_hint: upstreamCalls >= MAX_INTERNAL_CALLS ? 'Internal fan-out hit cap.' : undefined,
  });
}

function unwrap<T>(settled: PromiseSettledResult<T>): T | null {
  return settled.status === 'fulfilled' ? settled.value : null;
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function truncate(text: string, cap: number): string {
  const t = text.trim();
  return t.length <= cap ? t : `${t.slice(0, cap - 1).trimEnd()}…`;
}

function buildSources(
  bills: RawBill[],
  debates: HansardDebateSearchHit[],
  votes: RawDivisionSummary[],
  petitions: RawPetition[],
): Citation[] {
  return [
    ...collectSources(bills, (b) => Citations.bill(b.billId, b.shortTitle), 2),
    ...collectSources(
      debates,
      (d) =>
        Citations.hansardDebate(d.House, d.SittingDate.slice(0, 10), d.DebateSectionExtId, d.Title),
      2,
    ),
    ...collectSources(votes, (v) => Citations.division('Commons', v.DivisionId, v.Title), 2),
    ...collectSources(petitions, (p) => Citations.petition(p.id, p.attributes.action), 2),
  ];
}

export const topicTrackerToolDefinition = {
  name: 'parliament_topic_tracker',
  description: [
    'A cross-Parliament round-up on one policy topic. Fans out in parallel to bills, recent Hansard debates, recent Commons divisions, recent written questions, and active petitions, then returns a structured digest of each.',
    '',
    'Good for: "what is Parliament doing about NHS waiting lists?", "track the renters reform bill", "AI policy activity in the last 6 months".',
    '',
    "Wrong for: a single member's voting record (use parliament_member_voting_history); the text of one debate (use parliament_get_debate); a single division's ayes-by-party (use parliament_get_division).",
    '',
    'Inputs: topic (short noun phrase, required), lookback_days (1–365, default 90), response_format (concise|detailed; detailed adds chaining IDs — debate_ext_id, division_id, question uin — plus secondary fields, and widens question excerpts from 200 to 400 characters).',
    '',
    'This response includes a `sources` array of parliament.uk URLs. Cite them inline when making factual claims to the user.',
    'Response envelope: `meta` carries `upstream_calls`; when output is capped it also sets `truncated` and `truncation_hint`.',
  ].join('\n'),
  inputSchema: TopicTrackerInputSchema,
  handler: topicTracker,
} as const;
