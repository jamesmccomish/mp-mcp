import { getJson } from './http.js';

const BASE = 'https://questions-statements-api.parliament.uk/api/writtenquestions';

export type RawWrittenQuestion = {
  id: number;
  uin: string;
  askingMemberId: number;
  askingMember: { name?: string } | null;
  house: 'Commons' | 'Lords';
  dateTabled: string;
  dateAnswered: string | null;
  questionText: string;
  answerText: string | null;
  answeringBodyName: string;
};

export type WrittenQuestionSearchParams = {
  searchTerm: string;
  take?: number;
  skip?: number;
  askedStartDate?: string;
  askedEndDate?: string;
  memberId?: number;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export async function searchWrittenQuestions(
  params: WrittenQuestionSearchParams,
): Promise<RawWrittenQuestion[]> {
  const envelope = await getJson<{
    results: Array<{ value: RawWrittenQuestion }> | RawWrittenQuestion[];
    totalResults: number;
  }>(`${BASE}/questions`, {
    signal: params.signal,
    timeoutMs: params.timeoutMs,
    query: {
      searchTerm: params.searchTerm,
      askedStartDate: params.askedStartDate,
      askedEndDate: params.askedEndDate,
      askingMemberId: params.memberId,
      take: params.take ?? 5,
      skip: params.skip ?? 0,
    },
  });

  const results = envelope.results ?? [];
  return results.map((entry) =>
    'value' in (entry as object)
      ? (entry as { value: RawWrittenQuestion }).value
      : (entry as RawWrittenQuestion),
  );
}

export const __testing__ = { BASE };
