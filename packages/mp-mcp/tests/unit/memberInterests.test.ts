import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { memberInterests } from '../../src/tools/memberInterests.js';

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

const INTEREST = {
  id: 13091,
  summary: 'Payment received on 12 March 2025 - £18,450.00',
  parentInterestId: 11317,
  registrationDate: '2025-08-08',
  publishedDate: '2025-08-08',
  category: {
    id: 1,
    number: '1.1',
    name: 'Employment and earnings - Ad hoc payments',
    type: 'Commons',
  },
  member: { id: 172, nameDisplayAs: 'Ms Diane Abbott' },
  fields: [{ name: 'JobTitle', description: 'Type of work', type: 'String', value: 'Speech' }],
};

describe('memberInterests', () => {
  it('returns category-tagged entries with citations', async () => {
    mockAgent
      .get('https://interests-api.parliament.uk')
      .intercept({ path: /\/api\/v1\/Interests/, method: 'GET' })
      .reply(200, { items: [INTEREST], totalResults: 1 }, JSON_HDR);

    const result = await memberInterests({
      member_id: 172,
      limit: 20,
      response_format: 'concise',
    });

    expect(result.data.entries[0]?.category_number).toBe('1.1');
    expect(result.data.entries[0]?.summary).toContain('Payment received');
    expect(result.data.entries[0]?.fields).toBeUndefined();
    expect(result.sources[0]?.url).toBe('https://members.parliament.uk/member/172');
  });

  it('includes typed fields when detailed', async () => {
    mockAgent
      .get('https://interests-api.parliament.uk')
      .intercept({ path: /\/api\/v1\/Interests/, method: 'GET' })
      .reply(200, { items: [INTEREST], totalResults: 1 }, JSON_HDR);

    const result = await memberInterests({
      member_id: 172,
      limit: 20,
      response_format: 'detailed',
    });
    expect(result.data.entries[0]?.fields?.[0]).toEqual({ name: 'JobTitle', value: 'Speech' });
  });

  it('filters by category_number', async () => {
    const other = {
      ...INTEREST,
      id: 99,
      category: { ...INTEREST.category, number: '2.1', name: 'Donations' },
    };
    mockAgent
      .get('https://interests-api.parliament.uk')
      .intercept({ path: /\/api\/v1\/Interests/, method: 'GET' })
      .reply(200, { items: [INTEREST, other], totalResults: 2 }, JSON_HDR);

    const result = await memberInterests({
      member_id: 172,
      category_number: '1.1',
      limit: 20,
      response_format: 'concise',
    });
    expect(result.data.entries).toHaveLength(1);
    expect(result.data.entries[0]?.category_number).toBe('1.1');
  });
});
