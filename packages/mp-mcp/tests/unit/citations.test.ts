import { describe, expect, it } from 'vitest';
import { Citations } from '../../src/lib/citations.js';

describe('Citations', () => {
  it('builds a stable members.parliament.uk URL', () => {
    const c = Citations.member(4514, 'Lindsay Hoyle');
    expect(c.url).toBe('https://members.parliament.uk/member/4514');
    expect(c.title).toContain('Lindsay Hoyle');
  });

  it('builds a Commons division URL', () => {
    const c = Citations.division('Commons', 1234, 'Renters Rights');
    expect(c.url).toBe('https://votes.parliament.uk/Votes/Commons/Division/1234');
    expect(c.title).toContain('Renters Rights');
  });

  it('builds a Lords division URL', () => {
    expect(Citations.division('Lords', 9).url).toBe(
      'https://votes.parliament.uk/Votes/Lords/Division/9',
    );
  });

  it('slugifies hansard debate titles deterministically', () => {
    const a = Citations.hansardDebate('Commons', '2025-01-15', 'abc-123', 'NHS Waiting Lists');
    const b = Citations.hansardDebate('Commons', '2025-01-15', 'abc-123', 'NHS WAITING LISTS!!!');
    expect(a.url).toBe(b.url);
    expect(a.url).toMatch(/nhs-waiting-lists$/);
  });

  it('appends contribution anchors to hansard debate URLs', () => {
    const c = Citations.hansardContribution(
      'Commons',
      '2025-01-15',
      'abc-123',
      'NHS Waiting Lists',
      'speech-789',
    );
    expect(c.url.endsWith('#contribution-speech-789')).toBe(true);
  });

  it('encodes search terms in hansard search URLs', () => {
    const c = Citations.hansardSearch('renters reform');
    expect(c.url).toContain('searchTerm=renters+reform');
  });

  it('builds committee, bill, and petition URLs', () => {
    expect(Citations.committee(327, 'Treasury Committee').url).toBe(
      'https://committees.parliament.uk/committee/327',
    );
    expect(Citations.bill(3737, 'Renters Rights Bill').url).toBe(
      'https://bills.parliament.uk/bills/3737',
    );
    expect(Citations.petition(700143, 'Save the NHS').url).toBe(
      'https://petition.parliament.uk/petitions/700143',
    );
  });

  it('builds written-question URLs by UIN', () => {
    expect(Citations.writtenQuestion('HL1234').url).toContain('/written-questions/detail/HL1234');
  });
});
