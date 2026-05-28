import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { memberOverview } from '../../src/tools/memberOverview.js';
import { ABBOTT_RAW } from '../fixtures/members.js';
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

function stubMemberDetails(id: number) {
  const m = mockAgent.get('https://members-api.parliament.uk');
  m.intercept({ path: `/api/Members/${id}`, method: 'GET' }).reply(
    200,
    { value: ABBOTT_RAW, links: [] },
    JSON_HDR,
  );
  m.intercept({ path: `/api/Members/${id}/Synopsis`, method: 'GET' }).reply(
    200,
    { value: 'The Rt Hon Ms Diane Abbott is the Independent MP for Hackney North.', links: [] },
    JSON_HDR,
  );
  m.intercept({ path: `/api/Members/${id}/Focus`, method: 'GET' }).reply(
    200,
    {
      value: [{ category: 'Political Interests', focus: ['Small businesses', 'education'] }],
      links: [],
    },
    JSON_HDR,
  );
  m.intercept({ path: `/api/Members/${id}/Contact`, method: 'GET' }).reply(
    200,
    {
      value: [
        {
          type: 'Constituency',
          typeDescription: 'Constituency',
          line1: '123 High Street',
          phone: '020 1234 5678',
          email: 'mp@example.com',
          website: 'https://example.com',
        },
      ],
      links: [],
    },
    JSON_HDR,
  );
  m.intercept({ path: new RegExp(`/api/Members/${id}/Voting`), method: 'GET' }).reply(
    200,
    votingEnvelope(VOTING_PAGE),
    JSON_HDR,
  );
  m.intercept({ path: new RegExp(`/api/Members/${id}/ContributionSummary`), method: 'GET' }).reply(
    200,
    {
      items: [
        {
          value: {
            totalContributions: 1,
            debateTitle: 'NHS Waiting Lists',
            debateId: 999,
            debateWebsiteId: 'AAA-BBB',
            sittingDate: '2026-04-20T00:00:00',
            section: 'Commons Chamber',
            house: 'Commons',
          },
          links: [],
        },
      ],
      totalResults: 1,
    },
    JSON_HDR,
  );
  m.intercept({ path: `/api/Members/${id}/RegisteredInterests`, method: 'GET' }).reply(
    200,
    {
      value: {
        interestCategories: [
          {
            id: 1,
            name: 'Category 1: Employment and earnings',
            interests: [
              {
                id: 100,
                interest: 'Sample registered interest text.',
                registrationDate: '2025-01-15T00:00:00',
                publishedDate: '2025-01-20T00:00:00',
              },
            ],
          },
        ],
      },
      links: [],
    },
    JSON_HDR,
  );
  mockAgent
    .get('https://committees-api.parliament.uk')
    .intercept({ path: new RegExp(`/api/Members\\?Members=${id}`), method: 'GET' })
    .reply(
      200,
      [
        {
          committees: [
            {
              id: 327,
              name: 'Treasury Committee',
              house: 'Commons',
              startDate: '1979-05-03T00:00:00',
              endDate: null,
              category: { id: 1, name: 'Select' },
              roles: [
                {
                  startDate: '2024-09-01T00:00:00',
                  endDate: null,
                  role: { id: 1, name: 'Member', isChair: false },
                },
              ],
            },
          ],
        },
      ],
      JSON_HDR,
    );
}

describe('memberOverview', () => {
  it('fans out to 8 upstream calls and synthesises a single response', async () => {
    stubMemberDetails(172);

    const result = await memberOverview({
      member_id: 172,
      recent_votes_limit: 3,
      response_format: 'concise',
    });

    expect(result.data.member.name).toBe('Diane Abbott');
    expect(result.data.synopsis).toContain('Diane Abbott');
    expect(result.data.focus[0]?.category).toBe('Political Interests');
    expect(result.data.contact_summary.email).toBe('mp@example.com');
    expect(result.data.committees).toHaveLength(1);
    expect(result.data.committees[0]?.name).toBe('Treasury Committee');
    expect(result.data.recent_votes).toHaveLength(3);
    expect(result.data.recent_contributions[0]?.debate_title).toBe('NHS Waiting Lists');
    expect(result.data.interests[0]?.category).toContain('Employment');
    expect(result.sources[0]?.url).toBe('https://members.parliament.uk/member/172');
    expect(result.meta?.upstream_calls).toBe(8);
  });
});
