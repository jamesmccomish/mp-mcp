import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { searchHansard } from '../../src/tools/searchHansard.js';

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

const CONTRIBUTION_HIT = {
  MemberName: 'Diane Abbott',
  MemberId: 172,
  AttributedTo: 'Diane Abbott (Hackney North and Stoke Newington) (Lab)',
  ItemId: 1,
  ContributionExtId: 'C-1',
  ContributionText: 'short snippet',
  ContributionTextFull: `${'A '.repeat(300)}long text needing truncation`,
  HRSTag: 'hs_Para',
  HansardSection: 'CL',
  Timecode: null,
  DebateSection: 'Climate Change',
  DebateSectionId: 1,
  DebateSectionExtId: 'D-1',
  SittingDate: '2025-03-15T00:00:00',
  Section: 'Debates',
  House: 'Commons' as const,
};

const DEBATE_HIT = {
  DebateSection: 'Commons Chamber',
  SittingDate: '2026-04-02T00:00:00',
  House: 'Commons' as const,
  Title: 'AI: Impact on Employment',
  DebateSectionExtId: 'AI-DEB-1',
  Rank: 304,
};

describe('searchHansard — default (debates) mode', () => {
  it('hits /search/debates.json and returns debate-title hits', async () => {
    let requestPath = '';
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\/debates\.json/, method: 'GET' })
      .reply(
        200,
        (opts) => {
          requestPath = opts.path;
          return { Results: [DEBATE_HIT], TotalResultCount: 17 };
        },
        JSON_HDR,
      );

    const result = await searchHansard({
      query: 'artificial intelligence',
      section: 'all',
      assembly: 'commons',
      limit: 5,
      response_format: 'concise',
    });

    const q = new URLSearchParams(requestPath.split('?')[1] ?? '');
    expect(q.get('queryParameters.searchTerm')).toBe('artificial intelligence');
    expect(q.get('queryParameters.house')).toBe('Commons');
    expect(q.get('queryParameters.take')).toBe('5');

    expect(result.data.mode).toBe('debates');
    expect(result.data.total).toBe(17);
    expect(result.data.debates).toHaveLength(1);
    expect(result.data.contributions).toEqual([]);
    expect(result.data.debates[0]).toMatchObject({
      title: 'AI: Impact on Employment',
      debate_ext_id: 'AI-DEB-1',
      house: 'Commons',
    });
    expect(result.sources[0]?.url).toContain('hansard.parliament.uk');
    expect(result.sources[0]?.url).toContain('AI-DEB-1');
  });

  it('signals truncation when there are more debates than the page', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\/debates\.json/, method: 'GET' })
      .reply(200, { Results: [DEBATE_HIT], TotalResultCount: 74 }, JSON_HDR);

    const result = await searchHansard({
      query: 'artificial intelligence',
      section: 'all',
      assembly: 'both',
      limit: 5,
      response_format: 'concise',
    });

    expect(result.meta?.truncated).toBe(true);
    expect(result.meta?.truncation_hint).toMatch(/74/);
    expect(result.meta?.truncation_hint).toMatch(/parliament_get_debate/);
  });

  it('throws QUERY_TOO_BROAD when no debates match', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\/debates\.json/, method: 'GET' })
      .reply(200, { Results: [], TotalResultCount: 0 }, JSON_HDR);

    await expect(
      searchHansard({
        query: 'gibberish-asdfqwer',
        section: 'all',
        assembly: 'both',
        limit: 20,
        response_format: 'concise',
      }),
    ).rejects.toMatchObject({ code: 'QUERY_TOO_BROAD' });
  });
});

describe('searchHansard — member_contributions mode', () => {
  it('hits /search.json filtered by member_id and returns contribution hits', async () => {
    let requestPath = '';
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\.json/, method: 'GET' })
      .reply(
        200,
        (opts) => {
          requestPath = opts.path;
          return {
            TotalContributions: 5,
            TotalWrittenStatements: 0,
            TotalWrittenAnswers: 0,
            TotalDebates: 1,
            TotalDivisions: 0,
            Contributions: [CONTRIBUTION_HIT],
          };
        },
        JSON_HDR,
      );

    const result = await searchHansard({
      query: 'climate change',
      member_id: 172,
      section: 'all',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });

    const q = new URLSearchParams(requestPath.split('?')[1] ?? '');
    expect(q.get('queryParameters.memberId')).toBe('172');
    expect(q.get('queryParameters.searchTerm')).toBe('climate change');

    expect(result.data.mode).toBe('member_contributions');
    expect(result.data.debates).toEqual([]);
    expect(result.data.contributions).toHaveLength(1);
    expect(result.data.contributions[0]?.excerpt.length).toBeLessThanOrEqual(400);
    expect(result.data.contributions[0]?.excerpt.endsWith('…')).toBe(true);
    expect(result.sources[0]?.url).toContain('#contribution-C-1');
  });

  it('selects the section-specific array rather than filtering contributions', async () => {
    const writtenAnswerHit = {
      ...CONTRIBUTION_HIT,
      ContributionExtId: 'WA-1',
      DebateSection: 'Written Answer on Schools',
      Section: 'Written Answers',
    };
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\.json/, method: 'GET' })
      .reply(
        200,
        {
          TotalContributions: 1,
          TotalWrittenStatements: 0,
          TotalWrittenAnswers: 1,
          TotalDebates: 1,
          TotalDivisions: 0,
          Contributions: [CONTRIBUTION_HIT],
          WrittenAnswers: [writtenAnswerHit],
          WrittenStatements: [],
        },
        JSON_HDR,
      )
      .persist();

    const writtenAnswers = await searchHansard({
      query: 'schools',
      member_id: 172,
      section: 'written_answers',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });
    expect(writtenAnswers.data.contributions).toHaveLength(1);
    expect(writtenAnswers.data.contributions[0]?.contribution_ext_id).toBe('WA-1');

    const debates = await searchHansard({
      query: 'schools',
      member_id: 172,
      section: 'debates',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });
    expect(debates.data.contributions).toHaveLength(1);
    expect(debates.data.contributions[0]?.contribution_ext_id).toBe('C-1');
  });

  it('caps excerpts tighter in concise than detailed', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\.json/, method: 'GET' })
      .reply(
        200,
        {
          TotalContributions: 1,
          TotalWrittenStatements: 0,
          TotalWrittenAnswers: 0,
          TotalDebates: 1,
          TotalDivisions: 0,
          Contributions: [CONTRIBUTION_HIT],
        },
        JSON_HDR,
      )
      .persist();

    const concise = await searchHansard({
      query: 'climate',
      member_id: 172,
      section: 'all',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });
    const detailed = await searchHansard({
      query: 'climate',
      member_id: 172,
      section: 'all',
      assembly: 'both',
      limit: 20,
      response_format: 'detailed',
    });

    expect(concise.data.contributions[0]?.excerpt.length).toBeLessThanOrEqual(200);
    expect(detailed.data.contributions[0]?.excerpt.length).toBeGreaterThan(200);
    expect(detailed.data.contributions[0]?.excerpt.length).toBeLessThanOrEqual(400);
  });

  it('throws UNEXPECTED_UPSTREAM_SHAPE when the API returns the silent-error body', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\.json/, method: 'GET' })
      .reply(200, { Message: 'An error has occurred.' }, JSON_HDR);

    await expect(
      searchHansard({
        query: 'climate',
        member_id: 172,
        section: 'all',
        assembly: 'both',
        limit: 20,
        response_format: 'concise',
      }),
    ).rejects.toMatchObject({ code: 'UNEXPECTED_UPSTREAM_SHAPE' });
  });

  it('throws QUERY_TOO_BROAD when upstream reports zero hits for this member', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\.json/, method: 'GET' })
      .reply(
        200,
        {
          TotalContributions: 0,
          TotalWrittenStatements: 0,
          TotalWrittenAnswers: 0,
          TotalDebates: 0,
          TotalDivisions: 0,
          Contributions: [],
        },
        JSON_HDR,
      );

    await expect(
      searchHansard({
        query: 'gibberish',
        member_id: 172,
        section: 'all',
        assembly: 'both',
        limit: 20,
        response_format: 'concise',
      }),
    ).rejects.toMatchObject({ code: 'QUERY_TOO_BROAD' });
  });
});
