import { describe, expect, it } from 'vitest';
import { ResponseFormatSchema, buildResponse, shape } from '../../src/lib/responseFormat.js';

describe('ResponseFormatSchema', () => {
  it('defaults to concise', () => {
    expect(ResponseFormatSchema.parse(undefined)).toBe('concise');
  });

  it('accepts detailed', () => {
    expect(ResponseFormatSchema.parse('detailed')).toBe('detailed');
  });

  it('rejects unknown values', () => {
    expect(() => ResponseFormatSchema.parse('verbose')).toThrow();
  });
});

describe('shape', () => {
  const raw = { id: 1, name: 'Alice', dob: '1980-01-01', portraitUrl: 'https://x/y.jpg' };

  const shapes = {
    concise: (r: typeof raw) => ({ name: r.name }),
    detailed: (r: typeof raw) => r,
  };

  it('uses the concise shape by default', () => {
    expect(shape(raw, 'concise', shapes)).toEqual({ name: 'Alice' });
  });

  it('uses the detailed shape when requested', () => {
    expect(shape(raw, 'detailed', shapes)).toEqual(raw);
  });
});

describe('buildResponse', () => {
  it('omits meta when no meta passed', () => {
    expect(buildResponse({ x: 1 }, [{ title: 't', url: 'u' }])).toEqual({
      data: { x: 1 },
      sources: [{ title: 't', url: 'u' }],
    });
  });

  it('includes meta when passed', () => {
    expect(
      buildResponse({ x: 1 }, [{ title: 't', url: 'u' }], { upstream_calls: 3, truncated: false }),
    ).toEqual({
      data: { x: 1 },
      sources: [{ title: 't', url: 'u' }],
      meta: { upstream_calls: 3, truncated: false },
    });
  });
});
