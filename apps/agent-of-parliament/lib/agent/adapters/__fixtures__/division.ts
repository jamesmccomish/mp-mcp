import type { GetDivisionData, ToolResponse } from '@jamesmccomish/mp-mcp/types';

// Real capture: parliament_get_division(2347, concise) — "Privilege", a rejected
// Commons division (223 ayes / 335 noes) with a cross-party aye lobby against a
// near-unanimous Labour no lobby. Concise mode carries the party tallies but not
// the per-MP voter arrays, keeping the fixture small. Typed against the live tool
// contract so the fixture fails to compile if the shape drifts.
export const divisionFixture = {
  data: {
    id: 2347,
    house: 'Commons',
    division_number: 512,
    title: 'Privilege',
    date: '2026-04-28T18:13:00',
    ayes: 223,
    noes: 335,
    passed: false,
    ayes_by_party: {
      Conservative: 100,
      Independent: 9,
      Labour: 15,
      'Liberal Democrat': 56,
      'Democratic Unionist Party': 5,
      'Scottish National Party': 9,
      'Reform UK': 6,
      'Plaid Cymru': 4,
      'Your Party': 1,
      'Social Democratic & Labour Party': 2,
      'Green Party': 5,
      Alliance: 1,
      'Restore Britain': 1,
      'Ulster Unionist Party': 1,
      'Traditional Unionist Voice': 1,
    },
    noes_by_party: {
      Labour: 334,
      Independent: 1,
    },
  },
  sources: [
    {
      title: 'Division 2347: Privilege',
      url: 'https://votes.parliament.uk/Votes/Commons/Division/2347',
    },
  ],
} satisfies ToolResponse<GetDivisionData>;
