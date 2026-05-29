import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { topicTracker } from '../../src/tools/topicTracker.js';

let mockAgent: MockAgent;

beforeEach(() => {
  mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);
});

afterEach(async () => {
  await mockAgent.close();
});

const JSON_HDR = { headers: { 'content-type': 'application/json' } };

const BILL = {
  billId: 3764,
  shortTitle: "Renters' Rights Act 2025",
  currentHouse: 'Unassigned',
  originatingHouse: 'Commons',
  lastUpdate: '2026-02-27T16:35:08',
  isAct: true,
  isDefeated: false,
  currentStage: {
    description: 'Royal Assent',
    abbreviation: 'RA',
    house: 'Unassigned',
    stageSittings: [{ date: '2025-10-27T00:00:00' }],
  },
};

const DEBATE = {
  Title: 'Renters Rights Bill',
  DebateSection: 'Commons Chamber',
  House: 'Commons' as const,
  SittingDate: '2025-06-15T00:00:00',
  DebateSectionExtId: 'D-99',
  Rank: 1,
};

const VOTE = {
  DivisionId: 5001,
  Date: '2025-06-15T00:00:00',
  Number: 200,
  Title: 'Renters Rights Bill: Third Reading',
  AyeCount: 300,
  NoCount: 200,
};

const QUESTION = {
  id: 1,
  uin: '12345',
  askingMemberId: 172,
  askingMember: null,
  house: 'Commons' as const,
  dateTabled: '2025-06-01T00:00:00',
  dateAnswered: '2025-06-08T00:00:00',
  questionText: 'To ask whether the Government will progress the Renters Rights Bill.',
  answerText: 'The Government remains committed.',
  answeringBodyName: 'MHCLG',
};

const PETITION = {
  type: 'petition' as const,
  id: 700001,
  attributes: {
    action: 'Strengthen renter protections',
    background: 'Renters need protection.',
    additional_details: null,
    state: 'open' as const,
    signature_count: 12345,
    created_at: '2025-04-01T00:00:00',
    closed_at: null,
    response_threshold_reached_at: null,
    debate_threshold_reached_at: null,
  },
};

function stubAll() {
  mockAgent
    .get('https://bills-api.parliament.uk')
    .intercept({ path: /\/api\/v1\/Bills/, method: 'GET' })
    .reply(200, { items: [BILL], totalResults: 1 }, JSON_HDR);

  mockAgent
    .get('https://hansard-api.parliament.uk')
    .intercept({ path: /\/search\/debates\.json/, method: 'GET' })
    .reply(200, { Results: [DEBATE], TotalResultCount: 1 }, JSON_HDR);

  mockAgent
    .get('https://commonsvotes-api.parliament.uk')
    .intercept({ path: /\/data\/divisions\.json\/search/, method: 'GET' })
    .reply(200, [VOTE], JSON_HDR);

  mockAgent
    .get('https://questions-statements-api.parliament.uk')
    .intercept({ path: /\/api\/writtenquestions\/questions/, method: 'GET' })
    .reply(200, { results: [{ value: QUESTION }], totalResults: 1 }, JSON_HDR);

  mockAgent
    .get('https://petition.parliament.uk')
    .intercept({ path: /\/petitions\.json/, method: 'GET' })
    .reply(200, { data: [PETITION] }, JSON_HDR);
}

describe('topicTracker', () => {
  it('returns a populated digest across all five sources', async () => {
    stubAll();

    const result = await topicTracker({
      topic: 'renters rights',
      lookback_days: 180,
      response_format: 'concise',
    });

    expect(result.data.bills_in_progress).toHaveLength(1);
    expect(result.data.recent_debates).toHaveLength(1);
    expect(result.data.recent_votes).toHaveLength(1);
    expect(result.data.recent_written_questions).toHaveLength(1);
    expect(result.data.active_petitions).toHaveLength(1);
    expect(result.meta?.upstream_calls).toBe(5);
    expect(result.sources.length).toBeGreaterThanOrEqual(4);
  });

  it('survives partial upstream failures (returns what it has)', async () => {
    mockAgent
      .get('https://bills-api.parliament.uk')
      .intercept({ path: /\/api\/v1\/Bills/, method: 'GET' })
      .reply(200, { items: [BILL] }, JSON_HDR);
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /\/search\/debates\.json/, method: 'GET' })
      .reply(500, 'boom')
      .times(3);
    mockAgent
      .get('https://commonsvotes-api.parliament.uk')
      .intercept({ path: /\/data\/divisions\.json\/search/, method: 'GET' })
      .reply(200, [VOTE], JSON_HDR);
    mockAgent
      .get('https://questions-statements-api.parliament.uk')
      .intercept({ path: /\/api\/writtenquestions\/questions/, method: 'GET' })
      .reply(200, { results: [{ value: QUESTION }] }, JSON_HDR);
    mockAgent
      .get('https://petition.parliament.uk')
      .intercept({ path: /\/petitions\.json/, method: 'GET' })
      .reply(200, { data: [] }, JSON_HDR);

    const result = await topicTracker({
      topic: 'renters rights',
      lookback_days: 90,
      response_format: 'concise',
    });

    expect(result.data.bills_in_progress).toHaveLength(1);
    expect(result.data.recent_debates).toHaveLength(0);
    expect(result.data.recent_votes).toHaveLength(1);
  });

  it('sorts petitions by signature count descending', async () => {
    const p1 = { ...PETITION, id: 1, attributes: { ...PETITION.attributes, signature_count: 100 } };
    const p2 = {
      ...PETITION,
      id: 2,
      attributes: { ...PETITION.attributes, signature_count: 5000 },
    };
    const p3 = { ...PETITION, id: 3, attributes: { ...PETITION.attributes, signature_count: 200 } };

    mockAgent
      .get('https://bills-api.parliament.uk')
      .intercept({ path: /\/api\/v1\/Bills/, method: 'GET' })
      .reply(200, { items: [] }, JSON_HDR);
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /\/search\/debates\.json/, method: 'GET' })
      .reply(200, { Results: [] }, JSON_HDR);
    mockAgent
      .get('https://commonsvotes-api.parliament.uk')
      .intercept({ path: /\/data\/divisions\.json\/search/, method: 'GET' })
      .reply(200, [], JSON_HDR);
    mockAgent
      .get('https://questions-statements-api.parliament.uk')
      .intercept({ path: /\/api\/writtenquestions\/questions/, method: 'GET' })
      .reply(200, { results: [] }, JSON_HDR);
    mockAgent
      .get('https://petition.parliament.uk')
      .intercept({ path: /\/petitions\.json/, method: 'GET' })
      .reply(200, { data: [p1, p2, p3] }, JSON_HDR);

    const result = await topicTracker({
      topic: 'foo',
      lookback_days: 90,
      response_format: 'concise',
    });
    expect(result.data.active_petitions.map((p) => p.id)).toEqual([2, 3, 1]);
  });

  it('exposes chaining IDs only in detailed mode', async () => {
    stubAll();
    const concise = await topicTracker({
      topic: 'renters rights',
      lookback_days: 180,
      response_format: 'concise',
    });
    expect(concise.data.recent_debates[0]).not.toHaveProperty('debate_ext_id');
    expect(concise.data.recent_votes[0]).not.toHaveProperty('division_id');

    stubAll();
    const detailed = await topicTracker({
      topic: 'renters rights',
      lookback_days: 180,
      response_format: 'detailed',
    });
    expect(detailed.data.recent_debates[0]?.debate_ext_id).toBe('D-99');
    expect(detailed.data.recent_votes[0]?.division_id).toBe(5001);
  });
});
