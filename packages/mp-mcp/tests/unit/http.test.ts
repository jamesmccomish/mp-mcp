import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getJson } from '../../src/clients/http.js';
import { __testing__ } from '../../src/clients/http.js';

let mockAgent: MockAgent;

beforeEach(() => {
  mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);
});

afterEach(async () => {
  await mockAgent.close();
});

describe('http.getJson', () => {
  it('sends the project user-agent and accepts JSON', async () => {
    let capturedHeaders: Record<string, string> | undefined;
    mockAgent
      .get('https://example.test')
      .intercept({
        path: '/things',
        method: 'GET',
      })
      .reply(
        200,
        (opts) => {
          capturedHeaders = opts.headers as Record<string, string>;
          return { ok: true };
        },
        { headers: { 'content-type': 'application/json' } },
      );

    await getJson('https://example.test/things');

    expect(capturedHeaders?.['user-agent']).toMatch(/^mp-mcp\//);
    expect(capturedHeaders?.accept).toBe('application/json');
  });

  it('appends query parameters in the order given', async () => {
    mockAgent
      .get('https://example.test')
      .intercept({
        path: '/q?a=1&b=two',
        method: 'GET',
      })
      .reply(200, { ok: true }, { headers: { 'content-type': 'application/json' } });

    await expect(
      getJson('https://example.test/q', { query: { a: 1, b: 'two', c: undefined } }),
    ).resolves.toEqual({ ok: true });
  });

  it('retries 5xx then succeeds, returning the final payload', async () => {
    const pool = mockAgent.get('https://example.test');
    pool.intercept({ path: '/flaky', method: 'GET' }).reply(503, 'busy');
    pool
      .intercept({ path: '/flaky', method: 'GET' })
      .reply(200, { ok: true }, { headers: { 'content-type': 'application/json' } });

    await expect(getJson('https://example.test/flaky')).resolves.toEqual({ ok: true });
  });

  it('throws UPSTREAM_UNAVAILABLE after configured MAX_ATTEMPTS of 5xx', async () => {
    const pool = mockAgent.get('https://example.test');
    pool.intercept({ path: '/down', method: 'GET' }).reply(503, 'busy').times(2);

    await expect(getJson('https://example.test/down')).rejects.toMatchObject({
      code: 'UPSTREAM_UNAVAILABLE',
    });
  });

  it('does not retry 4xx errors', async () => {
    mockAgent
      .get('https://example.test')
      .intercept({
        path: '/missing',
        method: 'GET',
      })
      .reply(404, 'not found');

    await expect(getJson('https://example.test/missing')).rejects.toMatchObject({
      code: 'UPSTREAM_UNAVAILABLE',
    });
  });

  it('classifies retryable network errors correctly', () => {
    const err = new Error('reset');
    (err as { code?: string }).code = 'ECONNRESET';
    expect(__testing__.isRetryable(err)).toBe(true);

    expect(__testing__.isRetryable(new Error('random'))).toBe(false);
  });

  it('treats 429 and 5xx as retryable statuses', () => {
    expect(__testing__.shouldRetryStatus(429)).toBe(true);
    expect(__testing__.shouldRetryStatus(503)).toBe(true);
    expect(__testing__.shouldRetryStatus(404)).toBe(false);
  });
});
