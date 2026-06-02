import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getStateOfParties } from '../../src/tools/getStateOfParties.js';

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

const SEAT_COUNTS = {
  items: [
    {
      value: {
        total: 121,
        male: 80,
        female: 40,
        nonBinary: 1,
        party: { id: 4, name: 'Conservative', abbreviation: 'Con' },
      },
    },
    {
      value: {
        total: 411,
        male: 200,
        female: 210,
        nonBinary: 1,
        party: { id: 15, name: 'Labour', abbreviation: 'Lab' },
      },
    },
  ],
  totalResults: 2,
};

describe('getStateOfParties', () => {
  it('returns seats sorted descending, concise by default', async () => {
    mockAgent
      .get('https://members-api.parliament.uk')
      .intercept({ path: /\/api\/Parties\/StateOfTheParties\/1\//, method: 'GET' })
      .reply(200, SEAT_COUNTS, JSON_HDR);

    const result = await getStateOfParties({
      assembly: 'commons',
      on_date: '2025-01-01',
      response_format: 'concise',
    });

    expect(result.data.house).toBe('Commons');
    expect(result.data.parties).toEqual([
      { party: 'Labour', seats: 411 },
      { party: 'Conservative', seats: 121 },
    ]);
    expect(result.sources[0]?.url).toContain('/parties/commons');
  });

  it('adds abbreviation and gender split when detailed', async () => {
    mockAgent
      .get('https://members-api.parliament.uk')
      .intercept({ path: /\/api\/Parties\/StateOfTheParties\/1\//, method: 'GET' })
      .reply(200, SEAT_COUNTS, JSON_HDR);

    const result = await getStateOfParties({
      assembly: 'commons',
      on_date: '2025-01-01',
      response_format: 'detailed',
    });

    expect(result.data.parties[0]).toMatchObject({
      party: 'Labour',
      abbreviation: 'Lab',
      gender: { male: 200, female: 210, non_binary: 1 },
    });
  });
});
