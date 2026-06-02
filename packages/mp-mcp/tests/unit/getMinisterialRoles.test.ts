import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getMinisterialRoles } from '../../src/tools/getMinisterialRoles.js';

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

const POSTS = [
  {
    value: {
      id: 1,
      name: 'Secretary of State for Health and Social Care',
      governmentDepartments: [{ id: 17, name: 'Department of Health and Social Care' }],
      postHolders: [
        {
          member: {
            value: { id: 4514, nameDisplayAs: 'Wes Streeting', latestParty: { name: 'Labour' } },
          },
          startDate: '2024-07-05T00:00:00',
          endDate: null,
          isPaid: true,
        },
      ],
    },
  },
  {
    value: {
      id: 2,
      name: 'Chancellor of the Exchequer',
      governmentDepartments: [{ id: 14, name: 'HM Treasury' }],
      postHolders: [
        {
          member: {
            value: { id: 4356, nameDisplayAs: 'Rachel Reeves', latestParty: { name: 'Labour' } },
          },
          startDate: '2024-07-05T00:00:00',
          endDate: null,
          isPaid: true,
        },
      ],
    },
  },
];

function postsPool() {
  return mockAgent.get('https://members-api.parliament.uk');
}

describe('getMinisterialRoles', () => {
  it('filters by department/title substring and returns the current holder', async () => {
    postsPool()
      .intercept({ path: '/api/Posts/GovernmentPosts', method: 'GET' })
      .reply(200, POSTS, JSON_HDR);

    const result = await getMinisterialRoles({
      branch: 'government',
      filter: 'health',
      limit: 25,
      response_format: 'concise',
    });

    expect(result.data.roles).toEqual([
      {
        post: 'Secretary of State for Health and Social Care',
        holder: 'Wes Streeting',
        department: 'Department of Health and Social Care',
      },
    ]);
    expect(result.sources[0]?.url).toContain('Government');
  });

  it('adds member_id and paid flag when detailed', async () => {
    postsPool()
      .intercept({ path: '/api/Posts/GovernmentPosts', method: 'GET' })
      .reply(200, POSTS, JSON_HDR);

    const result = await getMinisterialRoles({
      branch: 'government',
      filter: 'Treasury',
      limit: 25,
      response_format: 'detailed',
    });

    expect(result.data.roles[0]).toMatchObject({
      post: 'Chancellor of the Exchequer',
      holder: 'Rachel Reeves',
      member_id: 4356,
      is_paid: true,
    });
  });

  it('caps to limit and flags truncation', async () => {
    postsPool()
      .intercept({ path: '/api/Posts/GovernmentPosts', method: 'GET' })
      .reply(200, POSTS, JSON_HDR);

    const result = await getMinisterialRoles({
      branch: 'government',
      limit: 1,
      response_format: 'concise',
    });

    expect(result.data.roles).toHaveLength(1);
    expect(result.meta?.truncated).toBe(true);
    expect(result.meta?.truncation_hint).toMatch(/of 2/);
  });
});
