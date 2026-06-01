import { describe, expect, it } from 'vitest';
import { lobbyFill, partyShare } from './lobby';

describe('lobbyFill', () => {
  it('fills the larger side to 1 and scales the other proportionally', () => {
    expect(lobbyFill(324, 198)).toEqual({ aye: 1, no: 198 / 324 });
  });
  it('treats equal counts as full on both sides', () => {
    expect(lobbyFill(50, 50)).toEqual({ aye: 1, no: 1 });
  });
  it('never divides by zero', () => {
    expect(lobbyFill(0, 0)).toEqual({ aye: 0, no: 0 });
  });
});

describe('partyShare', () => {
  it('returns fractions of the combined total that sum to 1', () => {
    const out = partyShare([
      { party: 'Labour', count: 3 },
      { party: 'Conservative', count: 1 },
    ]);
    expect(out).toEqual([
      { party: 'Labour', count: 3, fraction: 0.75 },
      { party: 'Conservative', count: 1, fraction: 0.25 },
    ]);
  });
  it('returns an empty array for no tallies', () => {
    expect(partyShare([])).toEqual([]);
  });
});
