import { describe, expect, it } from 'vitest';
import { ping, pingToolDefinition } from '../../src/tools/ping.js';

describe('ping', () => {
  it('returns { ok: true } with an empty sources array', () => {
    expect(ping({})).toEqual({ ok: true, sources: [] });
  });

  it('registers under the parliament_ping name', () => {
    expect(pingToolDefinition.name).toBe('parliament_ping');
  });
});
