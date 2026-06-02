import { describe, expect, it } from 'vitest';
import { lookupConstituency, normalizeConstituency } from './geo';

describe('normalizeConstituency', () => {
  it('lowercases and collapses whitespace', () => {
    expect(normalizeConstituency('  Bristol   South ')).toBe('bristol south');
  });

  it('strips diacritics so accented names join', () => {
    expect(normalizeConstituency('Ynys Môn')).toBe('ynys mon');
  });

  it('flattens punctuation (commas, apostrophes)', () => {
    expect(normalizeConstituency('Argyll, Bute and South Lochaber')).toBe(
      'argyll bute and south lochaber',
    );
    expect(normalizeConstituency('Na h-Eileanan an Iar')).toBe('na h eileanan an iar');
  });

  it('treats & and "and" the same', () => {
    expect(normalizeConstituency('Cities of London & Westminster')).toBe(
      normalizeConstituency('Cities of London and Westminster'),
    );
  });
});

describe('lookupConstituency', () => {
  it('resolves a real 2024 constituency by exact name', () => {
    expect(lookupConstituency('Bristol South')?.name).toBe('Bristol South');
  });

  it('resolves despite casing and spacing drift', () => {
    expect(lookupConstituency('holborn  and st pancras')?.name).toBe('Holborn and St Pancras');
  });

  it('returns undefined for a name with no boundary', () => {
    expect(lookupConstituency('Not A Real Constituency')).toBeUndefined();
  });
});
