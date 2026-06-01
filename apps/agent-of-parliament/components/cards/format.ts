// Shared presentation helpers for the card components. Party colours follow each
// party's own brand; anything unmapped falls back to a neutral ink so a new or
// minor party never renders as an invisible/undefined swatch.
const PARTY_COLOUR: Record<string, string> = {
  Labour: '#e4003b',
  Conservative: '#0087dc',
  'Liberal Democrat': '#faa61a',
  'Scottish National Party': '#fff95d',
  'Green Party': '#02a95b',
  'Reform UK': '#12b6cf',
  'Plaid Cymru': '#005b54',
  'Democratic Unionist Party': '#d46a4c',
  Independent: '#8a8270',
};

export function partyColour(party: string): string {
  return PARTY_COLOUR[party] ?? '#8a8270';
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
