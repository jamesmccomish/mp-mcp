import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { isPostcode, lookupPostcode } from '../../src/clients/postcodes.js';

let mockAgent: MockAgent;

beforeEach(() => {
  mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);
});

afterEach(async () => {
  await mockAgent.close();
});

describe('isPostcode', () => {
  it.each([
    ['SW1A 0AA', true],
    ['sw1a0aa', true],
    ['BS3 4QH', true],
    ['EH8 9NX', true],
    ['M14 5SH', true],
    ['notapostcode', false],
    ['1234', false],
    ['', false],
  ])('isPostcode(%p) === %p', (input, expected) => {
    expect(isPostcode(input)).toBe(expected);
  });
});

describe('lookupPostcode', () => {
  it('returns the parliamentary constituency for a valid postcode', async () => {
    mockAgent
      .get('https://api.postcodes.io')
      .intercept({
        path: '/postcodes/SW1A0AA',
        method: 'GET',
      })
      .reply(
        200,
        {
          status: 200,
          result: {
            postcode: 'SW1A 0AA',
            parliamentary_constituency: 'Cities of London and Westminster',
            country: 'England',
            region: 'London',
          },
        },
        { headers: { 'content-type': 'application/json' } },
      );

    const result = await lookupPostcode('SW1A 0AA');
    expect(result).toEqual({
      postcode: 'SW1A 0AA',
      parliamentaryConstituency: 'Cities of London and Westminster',
      country: 'England',
      region: 'London',
    });
  });

  it('normalises lowercase / spaced postcodes before calling upstream', async () => {
    mockAgent
      .get('https://api.postcodes.io')
      .intercept({
        path: '/postcodes/SW1A0AA',
        method: 'GET',
      })
      .reply(
        200,
        {
          status: 200,
          result: {
            postcode: 'SW1A 0AA',
            parliamentary_constituency: 'Cities of London and Westminster',
            country: 'England',
            region: 'London',
          },
        },
        { headers: { 'content-type': 'application/json' } },
      );

    await expect(lookupPostcode('  sw1a 0aa  ')).resolves.toMatchObject({
      parliamentaryConstituency: 'Cities of London and Westminster',
    });
  });

  it('throws INVALID_INPUT for malformed postcodes (no upstream call)', async () => {
    await expect(lookupPostcode('not-a-postcode')).rejects.toMatchObject({
      code: 'INVALID_INPUT',
    });
  });

  it('throws NO_CONSTITUENCY_FOUND when postcodes.io reports nothing', async () => {
    mockAgent
      .get('https://api.postcodes.io')
      .intercept({
        path: '/postcodes/ZZ99ZZ',
        method: 'GET',
      })
      .reply(
        404,
        { status: 404, error: 'Postcode not found' },
        { headers: { 'content-type': 'application/json' } },
      );

    await expect(lookupPostcode('ZZ9 9ZZ')).rejects.toMatchObject({
      code: 'UPSTREAM_UNAVAILABLE',
    });
  });
});
