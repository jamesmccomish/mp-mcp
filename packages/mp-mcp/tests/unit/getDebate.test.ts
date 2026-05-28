import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getDebate } from '../../src/tools/getDebate.js';

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
const EXT_ID = '4B8243B1-AF90-4FF1-A54C-646AEA4CABDE';

function debateDetail(itemCount: number, itemSize = 100) {
  return {
    Overview: {
      Id: 1,
      ExtId: EXT_ID,
      Title: 'Climate Change',
      Date: '2026-03-19T00:00:00',
      Location: 'Commons Chamber',
      House: 'Commons',
      VolumeNo: 782,
      NextDebateExtId: null,
      NextDebateTitle: null,
      PreviousDebateExtId: null,
      PreviousDebateTitle: null,
    },
    Items: Array.from({ length: itemCount }, (_, i) => ({
      ItemId: i,
      ItemType: 'Contribution',
      Value: 'x'.repeat(itemSize),
      AttributedTo: null,
      MemberId: null,
      Timecode: null,
    })),
    ChildDebates: [],
  };
}

describe('getDebate', () => {
  it('returns the debate with contributions flattened from items', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: `/debates/debate/${EXT_ID}.json`, method: 'GET' })
      .reply(200, debateDetail(3), JSON_HDR);

    const result = await getDebate({ debate_ext_id: EXT_ID, response_format: 'concise' });
    expect(result.data.contributions).toHaveLength(3);
    expect(result.data.title).toBe('Climate Change');
    expect(result.data.truncated).toBe(false);
    expect(result.sources[0]?.url).toContain('hansard.parliament.uk');
  });

  it('truncates and sets meta when total chars exceed the ~15K token budget', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: `/debates/debate/${EXT_ID}.json`, method: 'GET' })
      .reply(200, debateDetail(200, 1000), JSON_HDR);

    const result = await getDebate({ debate_ext_id: EXT_ID, response_format: 'concise' });
    expect(result.data.truncated).toBe(true);
    expect(result.data.contributions.length).toBeLessThan(200);
    expect(result.meta?.truncated).toBe(true);
    expect(result.meta?.truncation_hint).toMatch(/contributions/);
  });

  it('extracts an ExtId from a hansard.parliament.uk URL', async () => {
    mockAgent
      .get('https://hansard-api.parliament.uk')
      .intercept({ path: `/debates/debate/${EXT_ID}.json`, method: 'GET' })
      .reply(200, debateDetail(1), JSON_HDR);

    const result = await getDebate({
      hansard_url: `https://hansard.parliament.uk/Commons/2026-03-19/debates/${EXT_ID}/Climate-Change`,
      response_format: 'concise',
    });
    expect(result.data.ext_id).toBe(EXT_ID);
  });

  it('throws INVALID_INPUT when neither argument is provided', async () => {
    await expect(getDebate({ response_format: 'concise' })).rejects.toMatchObject({
      code: 'INVALID_INPUT',
    });
  });
});
