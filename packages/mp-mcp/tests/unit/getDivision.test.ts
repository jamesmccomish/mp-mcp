import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getDivision } from '../../src/tools/getDivision.js';
import { LORDS_DIVISION_DETAIL } from '../fixtures/voting.js';

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

const DIVISION_DETAIL = {
  DivisionId: 2347,
  Date: '2026-04-28T18:13:00',
  PublicationUpdated: '2026-04-29T10:26:35',
  Number: 512,
  Title: 'Privilege',
  AyeCount: 223,
  NoCount: 335,
  AyeTellers: [],
  NoTellers: [],
  Ayes: [
    { MemberId: 1, Name: 'Alice A', Party: 'Conservative', SubParty: null, MemberIsTeller: false },
    { MemberId: 2, Name: 'Bob B', Party: 'Conservative', SubParty: null, MemberIsTeller: false },
    { MemberId: 3, Name: 'Carla C', Party: 'Reform UK', SubParty: null, MemberIsTeller: false },
  ],
  Noes: [
    { MemberId: 10, Name: 'Dave D', Party: 'Labour', SubParty: null, MemberIsTeller: false },
    { MemberId: 11, Name: 'Eve E', Party: 'Labour', SubParty: null, MemberIsTeller: false },
  ],
  NoVoteRecorded: [],
};

describe('getDivision', () => {
  it('returns party tallies for ayes and noes', async () => {
    mockAgent
      .get('https://commonsvotes-api.parliament.uk')
      .intercept({ path: '/data/division/2347.json', method: 'GET' })
      .reply(200, DIVISION_DETAIL, JSON_HDR);

    const result = await getDivision({
      division_id: 2347,
      assembly: 'commons',
      response_format: 'concise',
    });

    expect(result.data.ayes_by_party).toEqual({ Conservative: 2, 'Reform UK': 1 });
    expect(result.data.noes_by_party).toEqual({ Labour: 2 });
    expect(result.data.passed).toBe(false);
    expect(result.data.ayes_members).toBeUndefined();
    expect(result.sources[0]?.url).toContain('/Votes/Commons/Division/2347');
  });

  it('includes member lists in detailed mode', async () => {
    mockAgent
      .get('https://commonsvotes-api.parliament.uk')
      .intercept({ path: '/data/division/2347.json', method: 'GET' })
      .reply(200, DIVISION_DETAIL, JSON_HDR);

    const result = await getDivision({
      division_id: 2347,
      assembly: 'commons',
      response_format: 'detailed',
    });

    expect(result.data.ayes_members).toHaveLength(3);
    expect(result.data.noes_members).toHaveLength(2);
  });

  it('fetches a Lords division, mapping content/not-content to ayes/noes', async () => {
    mockAgent
      .get('https://lordsvotes-api.parliament.uk')
      .intercept({ path: '/data/Divisions/2950', method: 'GET' })
      .reply(200, LORDS_DIVISION_DETAIL, JSON_HDR);

    const result = await getDivision({
      division_id: 2950,
      assembly: 'lords',
      response_format: 'detailed',
    });

    expect(result.data.house).toBe('Lords');
    expect(result.data.ayes).toBe(3);
    expect(result.data.noes).toBe(2);
    expect(result.data.ayes_by_party).toEqual({ Labour: 2, Crossbench: 1 });
    expect(result.data.noes_by_party).toEqual({ Conservative: 2 });
    expect(result.data.ayes_members).toHaveLength(3);
    expect(result.sources[0]?.url).toContain('/Votes/Lords/Division/2950');
  });
});
