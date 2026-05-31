import { describe, expect, it } from 'vitest';
import { divisionFixture } from './__fixtures__/division';
import { adaptVote } from './vote';

const { data, sources } = divisionFixture;

describe('adaptVote', () => {
  it('flattens the division into hero fields', () => {
    const vm = adaptVote(data, sources);
    expect(vm.divisionId).toBe(2347);
    expect(vm.house).toBe('Commons');
    expect(vm.divisionNumber).toBe(512);
    expect(vm.title).toBe('Privilege');
    expect(vm.date).toBe('2026-04-28T18:13:00');
    expect(vm.ayes).toBe(223);
    expect(vm.noes).toBe(335);
    expect(vm.passed).toBe(false);
  });

  it('sorts the aye party tally descending, ties broken alphabetically', () => {
    const vm = adaptVote(data, sources);
    expect(vm.ayesByParty[0]).toEqual({ party: 'Conservative', count: 100 });
    expect(vm.ayesByParty[1]).toEqual({ party: 'Liberal Democrat', count: 56 });
    expect(vm.ayesByParty[2]).toEqual({ party: 'Labour', count: 15 });

    const counts = vm.ayesByParty.map((p) => p.count);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));

    const tiedOnOne = vm.ayesByParty.filter((p) => p.count === 1).map((p) => p.party);
    expect(tiedOnOne).toEqual([...tiedOnOne].sort((a, b) => a.localeCompare(b)));
  });

  it('sorts the no party tally descending', () => {
    const vm = adaptVote(data, sources);
    expect(vm.noesByParty[0]).toEqual({ party: 'Labour', count: 334 });
    expect(vm.noesByParty[1]).toEqual({ party: 'Independent', count: 1 });
  });

  it('passes sources through', () => {
    const vm = adaptVote(data, sources);
    expect(vm.sources).toBe(sources);
  });
});
