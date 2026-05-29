import { describe, expect, it } from 'vitest';
import type { Citation } from '../../src/domain/citation.js';
import { collectSources } from '../../src/lib/buildSources.js';

const toCitation = (n: number): Citation => ({ title: `item ${n}`, url: `https://example/${n}` });

describe('collectSources', () => {
  it('maps each item through the citation factory', () => {
    expect(collectSources([1, 2, 3], toCitation)).toEqual([
      { title: 'item 1', url: 'https://example/1' },
      { title: 'item 2', url: 'https://example/2' },
      { title: 'item 3', url: 'https://example/3' },
    ]);
  });

  it('caps at the default of 5', () => {
    const sources = collectSources([1, 2, 3, 4, 5, 6, 7], toCitation);
    expect(sources).toHaveLength(5);
    expect(sources[4]?.title).toBe('item 5');
  });

  it('honours an explicit cap', () => {
    expect(collectSources([1, 2, 3, 4], toCitation, 2).map((s) => s.title)).toEqual([
      'item 1',
      'item 2',
    ]);
  });

  it('returns an empty array for no items', () => {
    expect(collectSources([], toCitation)).toEqual([]);
  });
});
