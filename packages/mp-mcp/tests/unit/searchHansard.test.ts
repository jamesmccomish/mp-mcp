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

const HIT = {
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

describe('searchHansard', () => {
  it('returns truncated excerpts and citations', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\.json/, method: 'GET' })
      .reply(
        200,
        {
          TotalContributions: 5,
          TotalWrittenStatements: 0,
          TotalWrittenAnswers: 0,
          TotalDebates: 1,
          TotalDivisions: 0,
          Contributions: [HIT],
        },
        JSON_HDR,
      );

    const result = await searchHansard({
      query: 'climate',
      section: 'all',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });

    expect(result.data.hits[0]?.excerpt.length).toBeLessThanOrEqual(400);
    expect(result.data.hits[0]?.excerpt.endsWith('…')).toBe(true);
    expect(result.sources[0]?.url).toContain('#contribution-C-1');
    expect(result.meta?.truncated).toBe(false);
  });

  it('signals truncation when there are more results than the page', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: /search\.json/, method: 'GET' })
      .reply(
        200,
        {
          TotalContributions: 4801,
          TotalWrittenStatements: 0,
          TotalWrittenAnswers: 0,
          TotalDebates: 1,
          TotalDivisions: 0,
          Contributions: [HIT],
        },
        JSON_HDR,
      );

    const result = await searchHansard({
      query: 'NHS',
      section: 'all',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });
    expect(result.meta?.truncated).toBe(true);
    expect(result.meta?.truncation_hint).toMatch(/Narrow/);
  });

  it('throws QUERY_TOO_BROAD when upstream reports zero hits', async () => {
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
        section: 'all',
        assembly: 'both',
        limit: 20,
        response_format: 'concise',
      }),
    ).rejects.toMatchObject({ code: 'QUERY_TOO_BROAD' });
  });

  it('selects the section-specific array rather than filtering contributions', async () => {
    const writtenAnswerHit = {
      ...HIT,
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
          Contributions: [HIT],
          WrittenAnswers: [writtenAnswerHit],
          WrittenStatements: [],
        },
        JSON_HDR,
      )
      .persist();

    const writtenAnswers = await searchHansard({
      query: 'schools',
      section: 'written_answers',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });
    expect(writtenAnswers.data.hits).toHaveLength(1);
    expect(writtenAnswers.data.hits[0]?.contribution_ext_id).toBe('WA-1');

    const debates = await searchHansard({
      query: 'schools',
      section: 'debates',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });
    expect(debates.data.hits).toHaveLength(1);
    expect(debates.data.hits[0]?.contribution_ext_id).toBe('C-1');
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
          Contributions: [HIT],
        },
        JSON_HDR,
      )
      .persist();

    const concise = await searchHansard({
      query: 'climate',
      section: 'all',
      assembly: 'both',
      limit: 20,
      response_format: 'concise',
    });
    const detailed = await searchHansard({
      query: 'climate',
      section: 'all',
      assembly: 'both',
      limit: 20,
      response_format: 'detailed',
    });

    expect(concise.data.hits[0]?.excerpt.length).toBeLessThanOrEqual(200);
    expect(detailed.data.hits[0]?.excerpt.length).toBeGreaterThan(200);
    expect(detailed.data.hits[0]?.excerpt.length).toBeLessThanOrEqual(400);
  });
});
