import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { memberVotingHistory } from '../../src/tools/memberVotingHistory.js';
import { VOTING_PAGE, votingEnvelope } from '../fixtures/voting.js';

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

function stubVoting(memberId: number, pages: (typeof VOTING_PAGE)[][]) {
  const pool = mockAgent.get('https://members-api.parliament.uk');
  for (const page of pages) {
    pool
      .intercept({ path: new RegExp(`/api/Members/${memberId}/Voting`), method: 'GET' })
      .reply(200, votingEnvelope(page), JSON_HDR);
  }
}

describe('memberVotingHistory', () => {
  it('maps aye/no/teller correctly and pins the response shape', async () => {
    stubVoting(172, [VOTING_PAGE, []]);

    const result = await memberVotingHistory({
      member_id: 172,
      assembly: 'commons',
      limit: 5,
      response_format: 'detailed',
    });

    expect(result.data.votes).toMatchInlineSnapshot(`
      [
        {
          "ayes": 320,
          "date": "2025-03-15T00:00:00",
          "division_id": 1001,
          "division_number": 100,
          "house": "Commons",
          "noes": 200,
          "passed": true,
          "title": "Climate Change Bill: Third Reading",
          "vote": "aye",
        },
        {
          "ayes": 290,
          "date": "2025-02-10T00:00:00",
          "division_id": 1002,
          "division_number": 87,
          "house": "Commons",
          "noes": 230,
          "passed": true,
          "title": "Finance Bill (No. 2): Second Reading",
          "vote": "no",
        },
        {
          "ayes": 310,
          "date": "2024-12-04T00:00:00",
          "division_id": 1003,
          "division_number": 45,
          "house": "Commons",
          "noes": 210,
          "passed": true,
          "title": "Renters Rights Bill: Lords Amendments",
          "vote": "teller",
        },
      ]
    `);
    expect(result.sources).toHaveLength(3);
    expect(result.sources[0]?.url).toMatch(/Commons\/Division\/1001$/);
  });

  it('filters by topic keyword (case-insensitive)', async () => {
    stubVoting(172, [VOTING_PAGE, []]);

    const result = await memberVotingHistory({
      member_id: 172,
      topic: 'climate',
      assembly: 'commons',
      limit: 10,
      response_format: 'concise',
    });

    expect(result.data.votes).toHaveLength(1);
    expect(result.data.votes[0]?.title).toContain('Climate Change');
  });

  it('throws QUERY_TOO_BROAD when filters eliminate everything', async () => {
    stubVoting(172, [VOTING_PAGE, []]);
    await expect(
      memberVotingHistory({
        member_id: 172,
        topic: 'unrelated-keyword',
        assembly: 'commons',
        limit: 10,
        response_format: 'concise',
      }),
    ).rejects.toMatchObject({ code: 'QUERY_TOO_BROAD' });
  });

  it('respects date filters', async () => {
    stubVoting(172, [VOTING_PAGE, []]);
    const result = await memberVotingHistory({
      member_id: 172,
      from_date: '2025-01-01',
      assembly: 'commons',
      limit: 10,
      response_format: 'concise',
    });
    expect(result.data.votes.every((v) => v.date >= '2025-01-01')).toBe(true);
  });

  it('drops chaining fields in concise but keeps them in detailed', async () => {
    stubVoting(172, [VOTING_PAGE]);
    const concise = await memberVotingHistory({
      member_id: 172,
      assembly: 'commons',
      limit: 5,
      response_format: 'concise',
    });
    expect(concise.data.votes[0]).not.toHaveProperty('division_id');
    expect(concise.data.votes[0]).toHaveProperty('vote');

    stubVoting(172, [VOTING_PAGE]);
    const detailed = await memberVotingHistory({
      member_id: 172,
      assembly: 'commons',
      limit: 5,
      response_format: 'detailed',
    });
    expect(detailed.data.votes[0]).toHaveProperty('division_id');
  });
});
