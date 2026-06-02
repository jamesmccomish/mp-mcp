import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getBill } from '../../src/tools/getBill.js';

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
  billId: 3680,
  shortTitle: 'Renters Rights Bill',
  currentHouse: 'Lords',
  originatingHouse: 'Commons',
  lastUpdate: '2026-01-15T09:30:00',
  isAct: false,
  isDefeated: false,
  currentStage: {
    description: 'Committee stage',
    abbreviation: 'CS',
    house: 'Lords',
    stageSittings: [],
  },
  longTitle: 'A Bill to make provision about the rights of tenants...',
  summary: 'The Bill reforms the private rented sector.',
  sponsors: [
    { member: { memberId: 4514, name: 'Angela Rayner', party: 'Labour' }, sortOrder: 1 },
    { organisation: { name: 'Ministry of Housing', url: null }, sortOrder: 2 },
  ],
};

function billsPool() {
  return mockAgent.get('https://bills-api.parliament.uk');
}

describe('getBill', () => {
  it('returns a concise bill with capped sponsor names', async () => {
    billsPool().intercept({ path: '/api/v1/Bills/3680', method: 'GET' }).reply(200, BILL, JSON_HDR);

    const result = await getBill({
      bill_id: 3680,
      include_stages: false,
      response_format: 'concise',
    });

    expect(result.data).toMatchObject({
      id: 3680,
      short_title: 'Renters Rights Bill',
      current_house: 'Lords',
      current_stage: 'Committee stage',
      is_act: false,
      is_defeated: false,
      sponsors: ['Angela Rayner', 'Ministry of Housing'],
    });
    expect(result.data.summary).toBeUndefined();
    expect(result.sources[0]?.url).toBe('https://bills.parliament.uk/bills/3680');
    expect(result.meta?.upstream_calls).toBe(1);
  });

  it('adds long title, summary, and originating house when detailed', async () => {
    billsPool().intercept({ path: '/api/v1/Bills/3680', method: 'GET' }).reply(200, BILL, JSON_HDR);

    const result = await getBill({
      bill_id: 3680,
      include_stages: false,
      response_format: 'detailed',
    });

    expect(result.data.long_title).toContain('rights of tenants');
    expect(result.data.summary).toContain('private rented sector');
    expect(result.data.originating_house).toBe('Commons');
  });

  it('appends stage history when include_stages is true', async () => {
    billsPool().intercept({ path: '/api/v1/Bills/3680', method: 'GET' }).reply(200, BILL, JSON_HDR);
    billsPool()
      .intercept({ path: /\/api\/v1\/Bills\/3680\/Stages/, method: 'GET' })
      .reply(
        200,
        {
          items: [
            {
              id: 1,
              stageId: 6,
              description: 'Second reading',
              abbreviation: '2R',
              house: 'Commons',
              stageSittings: [{ date: '2025-10-01T00:00:00' }],
              sortOrder: 1,
            },
          ],
          totalResults: 1,
        },
        JSON_HDR,
      );

    const result = await getBill({
      bill_id: 3680,
      include_stages: true,
      response_format: 'concise',
    });

    expect(result.data.stages).toEqual([
      { description: 'Second reading', house: 'Commons', date: '2025-10-01T00:00:00' },
    ]);
    expect(result.meta?.upstream_calls).toBe(2);
  });

  it('maps a 404 to NO_BILL_FOUND with steering', async () => {
    // 404 is retried by the http layer, so persist the reply across attempts;
    // the real API returns 404 each time for an unknown bill.
    billsPool()
      .intercept({ path: '/api/v1/Bills/999999', method: 'GET' })
      .reply(404, '', JSON_HDR)
      .persist();

    await expect(
      getBill({ bill_id: 999999, include_stages: false, response_format: 'concise' }),
    ).rejects.toMatchObject({ code: 'NO_BILL_FOUND' });
  });
});
