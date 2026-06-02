import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { RawMemberVotingRecord } from '../../src/clients/commonsVotes.js';
import type { RawLordsMemberVotingRecord } from '../../src/clients/lordsVotes.js';
import { memberVotingHistory } from '../../src/tools/memberVotingHistory.js';
import { LORDS_MEMBER_VOTING_RECORDS, MEMBER_VOTING_RECORDS } from '../fixtures/voting.js';

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

// Captures the request path so we can assert server-side filters are sent.
function stubMemberVoting(records: RawMemberVotingRecord[]): { lastPath: () => string } {
  let path = '';
  mockAgent
    .get('https://commonsvotes-api.parliament.uk')
    .intercept({ path: /\/data\/divisions\.json\/membervoting/, method: 'GET' })
    .reply(
      200,
      (opts) => {
        path = opts.path;
        return records;
      },
      JSON_HDR,
    )
    .times(1);
  return { lastPath: () => path };
}

describe('memberVotingHistory (commons via membervoting)', () => {
  it('maps aye/no/teller from membervoting records and pins the shape', async () => {
    stubMemberVoting(MEMBER_VOTING_RECORDS);

    const result = await memberVotingHistory({
      member_id: 172,
      assembly: 'commons',
      limit: 5,
      response_format: 'detailed',
    });

    expect(result.data.votes).toMatchInlineSnapshot(`
      [
        {
          "ayes": 292,
          "date": "2026-03-11T00:00:00",
          "division_id": 2281,
          "division_number": 281,
          "house": "Commons",
          "noes": 161,
          "passed": true,
          "title": "Finance (No. 2) Bill: Third Reading",
          "vote": "aye",
        },
        {
          "ayes": 175,
          "date": "2026-03-11T00:00:00",
          "division_id": 2280,
          "division_number": 280,
          "house": "Commons",
          "noes": 292,
          "passed": false,
          "title": "Finance (No. 2) Bill Report Stage: Amendment 6",
          "vote": "no",
        },
        {
          "ayes": 310,
          "date": "2025-12-04T00:00:00",
          "division_id": 2270,
          "division_number": 270,
          "house": "Commons",
          "noes": 210,
          "passed": true,
          "title": "Renters Rights Bill: Lords Amendments",
          "vote": "teller",
        },
      ]
    `);
    expect(result.sources[0]?.url).toMatch(/Commons\/Division\/2281$/);
  });

  it('sends topic and dates as server-side filters (single call, no recency loop)', async () => {
    const stub = stubMemberVoting([MEMBER_VOTING_RECORDS[0] as RawMemberVotingRecord]);

    const result = await memberVotingHistory({
      member_id: 172,
      topic: 'Finance',
      from_date: '2026-01-01',
      to_date: '2026-06-01',
      assembly: 'commons',
      limit: 10,
      response_format: 'concise',
    });

    const q = new URLSearchParams(stub.lastPath().split('?')[1] ?? '');
    expect(q.get('queryParameters.memberId')).toBe('172');
    expect(q.get('queryParameters.searchTerm')).toBe('Finance');
    expect(q.get('queryParameters.startDate')).toBe('2026-01-01');
    expect(q.get('queryParameters.endDate')).toBe('2026-06-01');
    expect(result.meta?.upstream_calls).toBe(1);
    expect(result.data.votes).toHaveLength(1);
  });

  it('returns a soft empty result (not an error) when nothing matched', async () => {
    stubMemberVoting([]);

    const result = await memberVotingHistory({
      member_id: 172,
      topic: 'unrelated-keyword',
      assembly: 'commons',
      limit: 10,
      response_format: 'concise',
    });

    expect(result.data.votes).toHaveLength(0);
    expect(result.meta?.truncation_hint).toMatch(/abstained|too specific/i);
  });

  it('drops chaining fields in concise but keeps them in detailed', async () => {
    stubMemberVoting(MEMBER_VOTING_RECORDS);
    const concise = await memberVotingHistory({
      member_id: 172,
      assembly: 'commons',
      limit: 5,
      response_format: 'concise',
    });
    expect(concise.data.votes[0]).not.toHaveProperty('division_id');
    expect(concise.data.votes[0]).toHaveProperty('vote');

    stubMemberVoting(MEMBER_VOTING_RECORDS);
    const detailed = await memberVotingHistory({
      member_id: 172,
      assembly: 'commons',
      limit: 5,
      response_format: 'detailed',
    });
    expect(detailed.data.votes[0]).toHaveProperty('division_id');
  });
});

describe('memberVotingHistory (lords via Lords Votes membervoting)', () => {
  function stubLordsMemberVoting(records: RawLordsMemberVotingRecord[]): {
    lastPath: () => string;
  } {
    let path = '';
    mockAgent
      .get('https://lordsvotes-api.parliament.uk')
      .intercept({ path: /\/data\/Divisions\/membervoting/, method: 'GET' })
      .reply(
        200,
        (opts) => {
          path = opts.path;
          return records;
        },
        JSON_HDR,
      )
      .times(1);
    return { lastPath: () => path };
  }

  it('maps content/not-content to aye/no in a single server-side call', async () => {
    stubLordsMemberVoting(LORDS_MEMBER_VOTING_RECORDS);

    const result = await memberVotingHistory({
      member_id: 3899,
      assembly: 'lords',
      limit: 10,
      response_format: 'detailed',
    });

    expect(result.meta?.upstream_calls).toBe(1);
    expect(result.data.votes[0]).toMatchObject({
      house: 'Lords',
      vote: 'aye',
      title: 'Climate and Nature Bill: Committee Stage',
    });
    expect(result.data.votes[1]).toMatchObject({ house: 'Lords', vote: 'no' });
    expect(result.sources[0]?.url).toMatch(/Lords\/Division\/2950$/);
  });

  it('sends topic and dates as server-side filters', async () => {
    const stub = stubLordsMemberVoting([
      LORDS_MEMBER_VOTING_RECORDS[0] as RawLordsMemberVotingRecord,
    ]);

    await memberVotingHistory({
      member_id: 3899,
      topic: 'Climate',
      from_date: '2025-01-01',
      to_date: '2025-12-31',
      assembly: 'lords',
      limit: 10,
      response_format: 'concise',
    });

    const q = new URLSearchParams(stub.lastPath().split('?')[1] ?? '');
    expect(q.get('MemberId')).toBe('3899');
    expect(q.get('SearchTerm')).toBe('Climate');
    expect(q.get('StartDate')).toBe('2025-01-01');
    expect(q.get('EndDate')).toBe('2025-12-31');
  });
});
