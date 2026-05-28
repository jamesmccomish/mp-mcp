import { z } from 'zod';
import { type RawBill, searchBills } from '../clients/bills.js';
import { type RawDivisionSummary, searchCommonsDivisions } from '../clients/commonsVotes.js';
import { type HansardDebateSearchHit, searchHansardDebates } from '../clients/hansard.js';
import { type RawPetition, searchPetitions } from '../clients/petitions.js';
import { type RawWrittenQuestion, searchWrittenQuestions } from '../clients/writtenQuestions.js';
import type { Citation, ToolResponse } from '../domain/citation.js';
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
    current_house: string;
    current_stage: string | null;
    last_update: string;
    is_act: boolean;
  }>;
  recent_debates: Array<{
    title: string;
    house: 'Commons' | 'Lords';
    date: string;
    debate_ext_id: string;
  }>;
  recent_votes: Array<{
    division_id: number;
    number: number;
    title: string;
    date: string;
    ayes: number;
    noes: number;
  }>;
  recent_written_questions: Array<{
    uin: string;
    asking_member_id: number;
    house: 'Commons' | 'Lords';
    date_tabled: string;
    question: string;
    answered: boolean;
  }>;
  active_petitions: Array<{
    id: number;
    action: string;
    state: string;
    signature_count: number;
    created_at: string;
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

  const data: TopicTrackerData = {
    topic: input.topic,
    window: { from: fromIso, to: toIso },
    bills_in_progress: bills.slice(0, 5).map((b) => ({
      id: b.billId,
      short_title: b.shortTitle,
      current_house: b.currentHouse,
      current_stage: b.currentStage?.description ?? null,
      last_update: b.lastUpdate,
      is_act: b.isAct,
    })),
    recent_debates: debates.slice(0, 5).map((d) => ({
      title: d.Title,
      house: d.House,
      date: d.SittingDate,
      debate_ext_id: d.DebateSectionExtId,
    })),
    recent_votes: votes.slice(0, 5).map((v) => ({
      division_id: v.DivisionId,
      number: v.Number,
      title: v.Title,
      date: v.Date,
      ayes: v.AyeCount,
      noes: v.NoCount,
    })),
    recent_written_questions: questions.slice(0, 5).map((q) => ({
      uin: q.uin,
      asking_member_id: q.askingMemberId,
      house: q.house,
      date_tabled: q.dateTabled,
      question: truncate(q.questionText, 200),
      answered: q.dateAnswered != null,
    })),
    active_petitions: topPetitions.map((p) => ({
      id: p.id,
      action: p.attributes.action,
      state: p.attributes.state,
      signature_count: p.attributes.signature_count,
      created_at: p.attributes.created_at,
    })),
  };

  const sources = buildSources(data);
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

function buildSources(data: TopicTrackerData): Citation[] {
  const sources: Citation[] = [];
  for (const b of data.bills_in_progress.slice(0, 2)) {
    sources.push(Citations.bill(b.id, b.short_title));
  }
  for (const d of data.recent_debates.slice(0, 2)) {
    sources.push(Citations.hansardDebate(d.house, d.date.slice(0, 10), d.debate_ext_id, d.title));
  }
  for (const v of data.recent_votes.slice(0, 2)) {
    sources.push(Citations.division('Commons', v.division_id, v.title));
  }
  for (const p of data.active_petitions.slice(0, 2)) {
    sources.push(Citations.petition(p.id, p.action));
  }
  return sources;
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
    'Inputs: topic (short noun phrase, required), lookback_days (1–365, default 90), response_format (concise|detailed, default concise).',
    '',
    'This response includes a `sources` array of parliament.uk URLs. Cite them inline when making factual claims to the user.',
  ].join('\n'),
  inputSchema: TopicTrackerInputSchema,
  handler: topicTracker,
} as const;
