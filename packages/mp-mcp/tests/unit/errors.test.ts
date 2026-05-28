import { describe, expect, it } from 'vitest';
import { ParliamentToolError, serializeError } from '../../src/lib/errors.js';

describe('ParliamentToolError', () => {
  it('serializes its code, message, and suggestion', () => {
    const err = new ParliamentToolError(
      'NO_MEMBER_FOUND',
      'No MP matched "Florbnet".',
      'Try a postcode or check the spelling.',
    );
    expect(err.toPayload()).toEqual({
      error: {
        code: 'NO_MEMBER_FOUND',
        message: 'No MP matched "Florbnet".',
        suggestion: 'Try a postcode or check the spelling.',
      },
    });
  });

  it('serializeError preserves ParliamentToolError payloads', () => {
    const err = new ParliamentToolError('QUERY_TOO_BROAD', 'Too many hits.', 'Narrow it.');
    expect(serializeError(err)).toEqual(err.toPayload());
  });

  it('serializeError wraps unknown errors with a steering suggestion', () => {
    const result = serializeError(new Error('boom'));
    expect(result.error.code).toBe('UPSTREAM_UNAVAILABLE');
    expect(result.error.message).toBe('boom');
    expect(result.error.suggestion).toMatch(/Retry/);
  });

  it('serializeError accepts non-Error throwables', () => {
    expect(serializeError('weird')).toEqual({
      error: {
        code: 'UPSTREAM_UNAVAILABLE',
        message: 'weird',
        suggestion: expect.any(String),
      },
    });
  });
});
