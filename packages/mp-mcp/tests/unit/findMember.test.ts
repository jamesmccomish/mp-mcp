import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findMember } from '../../src/tools/findMember.js';
import { ABBOTT_RAW, HOYLE_RAW, memberSearchEnvelope } from '../fixtures/members.js';

let mockAgent: MockAgent;

beforeEach(() => {
  mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);
});

afterEach(async () => {
  await mockAgent.close();
});

function membersPool() {
  return mockAgent.get('https://members-api.parliament.uk');
}

function postcodesPool() {
  return mockAgent.get('https://api.postcodes.io');
}

const JSON_HDR = { headers: { 'content-type': 'application/json' } };

describe('findMember by name', () => {
  it('matches concise shape for a single result', async () => {
    membersPool()
      .intercept({ path: /Hoyle/, method: 'GET' })
      .reply(200, memberSearchEnvelope([HOYLE_RAW]), JSON_HDR);

    const result = await findMember({
      query: 'Hoyle',
      assembly: 'commons',
      current_only: true,
      response_format: 'concise',
    });

    expect(result.data.query_kind).toBe('name');
    expect(result.data.matches).toMatchInlineSnapshot(`
      [
        {
          "constituency": "Chorley",
          "house": "Commons",
          "id": 467,
          "name": "Sir Lindsay Hoyle",
          "party": "Speaker",
          "status": "current",
        },
      ]
    `);
    expect(result.sources).toMatchInlineSnapshot(`
      [
        {
          "title": "Sir Lindsay Hoyle — Member of Parliament",
          "url": "https://members.parliament.uk/member/467",
        },
      ]
    `);
  });

  it('includes detailed fields when response_format=detailed', async () => {
    membersPool()
      .intercept({ path: /Abbott/, method: 'GET' })
      .reply(200, memberSearchEnvelope([ABBOTT_RAW]), JSON_HDR);

    const result = await findMember({
      query: 'Diane Abbott',
      assembly: 'commons',
      current_only: true,
      response_format: 'detailed',
    });

    const m = result.data.matches[0] as Record<string, unknown>;
    expect(m.full_title).toBe('Rt Hon Diane Abbott MP');
    expect(m.thumbnail_url).toBeNull();
    expect(m.membership_started).toBe('1987-06-11T00:00:00');
  });

  it('throws NO_MEMBER_FOUND with steering when no match', async () => {
    membersPool()
      .intercept({ path: /Florbnet/, method: 'GET' })
      .reply(200, memberSearchEnvelope([]), JSON_HDR);
    membersPool()
      .intercept({ path: /Location=Florbnet/, method: 'GET' })
      .reply(200, memberSearchEnvelope([]), JSON_HDR);

    await expect(
      findMember({
        query: 'Florbnet',
        assembly: 'commons',
        current_only: true,
        response_format: 'concise',
      }),
    ).rejects.toMatchObject({
      code: 'NO_MEMBER_FOUND',
      suggestion: expect.stringMatching(/postcode/),
    });
  });
});

describe('findMember by postcode', () => {
  it('routes via postcodes.io to the constituency, returning the sitting MP', async () => {
    postcodesPool()
      .intercept({ path: '/postcodes/SW1A0AA', method: 'GET' })
      .reply(
        200,
        {
          status: 200,
          result: {
            postcode: 'SW1A 0AA',
            parliamentary_constituency: 'Chorley',
            country: 'England',
            region: 'London',
          },
        },
        JSON_HDR,
      );
    membersPool()
      .intercept({ path: /Location=Chorley/, method: 'GET' })
      .reply(200, memberSearchEnvelope([HOYLE_RAW]), JSON_HDR);

    const result = await findMember({
      query: 'SW1A 0AA',
      assembly: 'commons',
      current_only: true,
      response_format: 'concise',
    });

    expect(result.data.query_kind).toBe('postcode');
    expect(result.data.matches).toHaveLength(1);
    expect(result.meta?.upstream_calls).toBe(2);
  });
});
