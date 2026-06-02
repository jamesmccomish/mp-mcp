import type { MemberOverviewData } from '@jamesmccomish/mp-mcp/types';
import { describe, expect, it } from 'vitest';
import { memberOverviewFixture } from './adapters/__fixtures__/memberOverview';
import { highlightsFromCards } from './highlights';

const mpData = memberOverviewFixture.data;

function mpCard(constituency: string, party: string) {
  return {
    kind: 'mp' as const,
    data: { ...mpData, member: { ...mpData.member, constituency, party } } as MemberOverviewData,
  };
}

describe('highlightsFromCards', () => {
  it('extracts constituency and party from MP cards', () => {
    expect(highlightsFromCards([mpCard('Bristol South', 'Labour')])).toEqual([
      { name: 'Bristol South', party: 'Labour' },
    ]);
  });

  it('ignores non-MP cards', () => {
    const cards = [
      { kind: 'vote' as const, data: {} },
      { kind: 'debate' as const, data: {} },
      mpCard('Bath', 'Liberal Democrat'),
    ];
    expect(highlightsFromCards(cards)).toEqual([{ name: 'Bath', party: 'Liberal Democrat' }]);
  });

  it('dedupes by normalized name, keeping the first', () => {
    const cards = [
      mpCard('Holborn and St Pancras', 'Labour'),
      mpCard('holborn  and st pancras', 'Labour'),
    ];
    expect(highlightsFromCards(cards)).toEqual([
      { name: 'Holborn and St Pancras', party: 'Labour' },
    ]);
  });

  it('skips members with no constituency', () => {
    expect(highlightsFromCards([mpCard('', 'Independent')])).toEqual([]);
  });
});
