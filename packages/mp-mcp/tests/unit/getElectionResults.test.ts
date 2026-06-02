import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getElectionResults } from '../../src/tools/getElectionResults.js';

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

const LATEST = {
  value: {
    result: 'Lab Hold',
    electorate: 73000,
    turnout: 45000,
    majority: 12000,
    winningParty: { id: 15, name: 'Labour', abbreviation: 'Lab' },
    electionTitle: '2024 General Election',
    electionDate: '2024-07-04T00:00:00',
    isGeneralElection: true,
    constituencyName: 'Chorley',
    candidates: [
      {
        memberId: 467,
        name: 'Winner W',
        party: { name: 'Labour' },
        votes: 25000,
        voteShare: 55.5,
        rankOrder: 1,
      },
      {
        memberId: null,
        name: 'Runner R',
        party: { name: 'Conservative' },
        votes: 13000,
        voteShare: 28.9,
        rankOrder: 2,
      },
    ],
  },
};

function membersPool() {
  return mockAgent.get('https://members-api.parliament.uk');
}

describe('getElectionResults', () => {
  it('returns the latest result without candidates when concise', async () => {
    membersPool()
      .intercept({ path: '/api/Location/Constituency/4109/ElectionResult/Latest', method: 'GET' })
      .reply(200, LATEST, JSON_HDR);

    const result = await getElectionResults({
      constituency_id: 4109,
      include_history: false,
      response_format: 'concise',
    });

    expect(result.data.constituency_name).toBe('Chorley');
    expect(result.data.latest).toMatchObject({
      is_general_election: true,
      majority: 12000,
      winner: { name: 'Winner W', party: 'Labour' },
    });
    expect(result.data.latest.candidates).toBeUndefined();
    expect(result.sources[0]?.url).toBe('https://members.parliament.uk/constituency/4109');
  });

  it('includes the candidate breakdown when detailed', async () => {
    membersPool()
      .intercept({ path: '/api/Location/Constituency/4109/ElectionResult/Latest', method: 'GET' })
      .reply(200, LATEST, JSON_HDR);

    const result = await getElectionResults({
      constituency_id: 4109,
      include_history: false,
      response_format: 'detailed',
    });

    expect(result.data.latest.candidates).toHaveLength(2);
    expect(result.data.latest.candidates?.[0]).toEqual({
      name: 'Winner W',
      party: 'Labour',
      votes: 25000,
      vote_share: 55.5,
    });
  });

  it('maps a missing result to NO_CONSTITUENCY_FOUND', async () => {
    membersPool()
      .intercept({ path: '/api/Location/Constituency/999/ElectionResult/Latest', method: 'GET' })
      .reply(200, { value: null }, JSON_HDR);

    await expect(
      getElectionResults({
        constituency_id: 999,
        include_history: false,
        response_format: 'concise',
      }),
    ).rejects.toMatchObject({ code: 'NO_CONSTITUENCY_FOUND' });
  });
});
