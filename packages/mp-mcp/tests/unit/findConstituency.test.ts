import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findConstituency } from '../../src/tools/findConstituency.js';
import { CHORLEY_CONSTITUENCY, constituencySearchEnvelope } from '../fixtures/members.js';

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

describe('findConstituency', () => {
  it('returns the constituency and its current member for a name query', async () => {
    mockAgent
      .get('https://members-api.parliament.uk')
      .intercept({ path: /searchText=Chorley/, method: 'GET' })
      .reply(200, constituencySearchEnvelope([CHORLEY_CONSTITUENCY]), JSON_HDR);

    const result = await findConstituency({ query: 'Chorley', response_format: 'detailed' });

    expect(result.data.matches[0]).toMatchInlineSnapshot(`
      {
        "current_member": {
          "constituency": "Chorley",
          "house": "Commons",
          "id": 467,
          "name": "Sir Lindsay Hoyle",
          "party": "Speaker",
          "status": "current",
        },
        "end_date": null,
        "id": 3985,
        "name": "Chorley",
        "start_date": "2024-05-31T00:00:00",
      }
    `);
    expect(result.sources[0]?.url).toBe('https://members.parliament.uk/constituency/3985');
  });

  it('omits id and dates in concise but keeps name and current member', async () => {
    mockAgent
      .get('https://members-api.parliament.uk')
      .intercept({ path: /searchText=Chorley/, method: 'GET' })
      .reply(200, constituencySearchEnvelope([CHORLEY_CONSTITUENCY]), JSON_HDR);

    const result = await findConstituency({ query: 'Chorley', response_format: 'concise' });
    const match = result.data.matches[0];
    expect(match).not.toHaveProperty('id');
    expect(match).not.toHaveProperty('start_date');
    expect(match?.name).toBe('Chorley');
    expect(match?.current_member?.name).toBe('Sir Lindsay Hoyle');
  });

  it('routes a postcode through postcodes.io to a constituency search', async () => {
    mockAgent
      .get('https://api.postcodes.io')
      .intercept({ path: '/postcodes/PR71AA', method: 'GET' })
      .reply(
        200,
        {
          status: 200,
          result: {
            postcode: 'PR7 1AA',
            parliamentary_constituency: 'Chorley',
            country: 'England',
            region: 'North West',
          },
        },
        JSON_HDR,
      );
    mockAgent
      .get('https://members-api.parliament.uk')
      .intercept({ path: /searchText=Chorley/, method: 'GET' })
      .reply(200, constituencySearchEnvelope([CHORLEY_CONSTITUENCY]), JSON_HDR);

    const result = await findConstituency({ query: 'PR7 1AA', response_format: 'concise' });
    expect(result.data.matches[0]?.name).toBe('Chorley');
    expect(result.meta?.upstream_calls).toBe(2);
  });

  it('throws NO_CONSTITUENCY_FOUND when nothing matches', async () => {
    mockAgent
      .get('https://members-api.parliament.uk')
      .intercept({ path: /searchText=Atlantis/, method: 'GET' })
      .reply(200, constituencySearchEnvelope([]), JSON_HDR);

    await expect(
      findConstituency({ query: 'Atlantis', response_format: 'concise' }),
    ).rejects.toMatchObject({ code: 'NO_CONSTITUENCY_FOUND' });
  });
});
