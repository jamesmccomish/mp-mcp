import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getCommittee } from '../../src/tools/getCommittee.js';

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

const COMMITTEE = {
  id: 327,
  name: 'Treasury Committee',
  house: 'Commons',
  startDate: '1979-01-01T00:00:00',
  endDate: null,
  category: { id: 1, name: 'Select' },
  subCommittees: [],
  parentCommittee: null,
};

const MEMBERS = [
  {
    memberId: 100,
    name: 'Chair Person',
    partyName: 'Labour',
    partyId: 15,
    memberFrom: 'A',
    thumbnailUrl: null,
    startDate: '2024-09-01T00:00:00',
    endDate: null,
    isChair: true,
  },
  {
    memberId: 101,
    name: 'Member Two',
    partyName: 'Conservative',
    partyId: 4,
    memberFrom: 'B',
    thumbnailUrl: null,
    startDate: '2024-09-01T00:00:00',
    endDate: null,
    isChair: false,
  },
];

function stubCommittee(id = 327) {
  mockAgent
    .get('https://committees-api.parliament.uk')
    .intercept({ path: `/api/Committees/${id}`, method: 'GET' })
    .reply(200, COMMITTEE, JSON_HDR);
  mockAgent
    .get('https://committees-api.parliament.uk')
    .intercept({ path: `/api/Committees/${id}/Members`, method: 'GET' })
    .reply(200, { items: MEMBERS }, JSON_HDR);
}

describe('getCommittee', () => {
  it('resolves by id and surfaces chair and members', async () => {
    stubCommittee();
    const result = await getCommittee({
      committee_id: 327,
      include_evidence: false,
      response_format: 'concise',
    });
    expect(result.data.chair?.name).toBe('Chair Person');
    expect(result.data.members).toHaveLength(2);
    expect(result.sources[0]?.url).toBe('https://committees.parliament.uk/committee/327');
  });

  it('resolves by name when committee_id is absent', async () => {
    mockAgent
      .get('https://committees-api.parliament.uk')
      .intercept({ path: /\/api\/Committees\?/, method: 'GET' })
      .reply(200, { items: [{ ...COMMITTEE }], totalResults: 1 }, JSON_HDR);
    stubCommittee();

    const result = await getCommittee({
      name: 'Treasury',
      include_evidence: false,
      response_format: 'concise',
    });
    expect(result.data.name).toBe('Treasury Committee');
  });

  it('includes publications when include_evidence=true', async () => {
    stubCommittee();
    mockAgent
      .get('https://committees-api.parliament.uk')
      .intercept({ path: /\/api\/Committees\/327\/Publications\/Summary/, method: 'GET' })
      .reply(
        200,
        {
          items: [
            {
              id: 5001,
              title: 'Spring Budget 2026',
              type: { id: 1, name: 'Report' },
              publicationStartDate: '2026-03-15T00:00:00',
            },
          ],
        },
        JSON_HDR,
      );

    const result = await getCommittee({
      committee_id: 327,
      include_evidence: true,
      response_format: 'concise',
    });
    expect(result.data.recent_publications).toHaveLength(1);
  });

  it('throws INVALID_INPUT when neither id nor name passed', async () => {
    await expect(
      getCommittee({ include_evidence: false, response_format: 'concise' }),
    ).rejects.toMatchObject({ code: 'INVALID_INPUT' });
  });
});
