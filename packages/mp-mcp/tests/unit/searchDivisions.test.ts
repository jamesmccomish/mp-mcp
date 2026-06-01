import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { searchDivisions } from '../../src/tools/searchDivisions.js';

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

const DIVISIONS = [
  {
    DivisionId: 2257,
    Date: '2026-02-11T18:20:00',
    Number: 428,
    Title: 'Referendums Relating to Council Tax Increases (Principles) (England) Report 2026-27',
    AyeCount: 279,
    NoCount: 90,
  },
  {
    DivisionId: 2204,
    Date: '2025-12-02T20:05:00',
    Number: 375,
    Title: 'Budget Resolution No. 51: Inheritance tax (pension interests)',
    AyeCount: 364,
    NoCount: 167,
  },
];

function stubSearch(rows: typeof DIVISIONS): { lastPath: () => string } {
  let path = '';
  mockAgent
    .get('https://commonsvotes-api.parliament.uk')
    .intercept({ path: /\/data\/divisions\.json\/search/, method: 'GET' })
    .reply(
      200,
      (opts) => {
        path = opts.path;
        return rows;
      },
      JSON_HDR,
    );
  return { lastPath: () => path };
}

describe('searchDivisions', () => {
  it('returns divisions with division_id + counts and a votes citation', async () => {
    stubSearch(DIVISIONS);
    const result = await searchDivisions({ topic: 'tax', limit: 10, response_format: 'concise' });

    expect(result.data.divisions).toHaveLength(2);
    expect(result.data.divisions[0]).toMatchObject({
      division_id: 2257,
      ayes: 279,
      noes: 90,
      passed: true,
    });
    expect(result.sources[0]?.url).toMatch(/Commons\/Division\/2257$/);
    expect(result.meta?.upstream_calls).toBe(1);
  });

  it('does not send a date window unless dates are provided', async () => {
    const stub = stubSearch(DIVISIONS);
    await searchDivisions({ topic: 'tax', limit: 5, response_format: 'concise' });
    const q = new URLSearchParams(stub.lastPath().split('?')[1] ?? '');
    expect(q.get('queryParameters.searchTerm')).toBe('tax');
    expect(q.has('queryParameters.startDate')).toBe(false);
    expect(q.has('queryParameters.endDate')).toBe(false);
  });

  it('forwards date bounds when given', async () => {
    const stub = stubSearch(DIVISIONS);
    await searchDivisions({
      topic: 'Finance',
      from_date: '2026-01-01',
      to_date: '2026-06-01',
      limit: 5,
      response_format: 'concise',
    });
    const q = new URLSearchParams(stub.lastPath().split('?')[1] ?? '');
    expect(q.get('queryParameters.startDate')).toBe('2026-01-01');
    expect(q.get('queryParameters.endDate')).toBe('2026-06-01');
  });

  it('adds the division number only in detailed mode', async () => {
    stubSearch(DIVISIONS);
    const concise = await searchDivisions({ topic: 'tax', limit: 5, response_format: 'concise' });
    expect(concise.data.divisions[0]).not.toHaveProperty('number');

    stubSearch(DIVISIONS);
    const detailed = await searchDivisions({ topic: 'tax', limit: 5, response_format: 'detailed' });
    expect(detailed.data.divisions[0]?.number).toBe(428);
  });

  it('sets a broadening hint when nothing matched', async () => {
    stubSearch([]);
    const result = await searchDivisions({ topic: 'VAT', limit: 5, response_format: 'concise' });
    expect(result.data.divisions).toHaveLength(0);
    expect(result.meta?.truncation_hint).toMatch(/literal title substring/i);
  });
});
