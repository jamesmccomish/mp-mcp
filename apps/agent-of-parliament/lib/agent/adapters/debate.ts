import type { Citation, GetDebateData, House, SearchHansardData } from 'mp-mcp/types';
import { plainText } from './html';

export interface DebateHit {
  speaker: string;
  memberName: string;
  debateTitle: string;
  excerpt: string;
  date: string;
  section: string;
  house: House;
}

export interface DebateExcerpt {
  speaker: string;
  text: string;
}

export interface DebateSearchViewModel {
  mode: 'search';
  totalContributions: number;
  hitCount: number;
  hits: DebateHit[];
  sources: Citation[];
}

export interface DebateDetailViewModel {
  mode: 'debate';
  title: string;
  date: string;
  house: House;
  location: string;
  volume: number;
  contributions: DebateExcerpt[];
  truncated: boolean;
  totalItems: number;
  sources: Citation[];
}

export type DebateViewModel = DebateSearchViewModel | DebateDetailViewModel;

// parliament_search_hansard returns a `hits` array; parliament_get_debate returns a
// single debate with `contributions`. Both map onto the debate card, so the presence
// of `hits` discriminates which shape we were handed.
function isSearch(data: unknown): data is SearchHansardData {
  return typeof data === 'object' && data !== null && 'hits' in data;
}

// search-hit list OR single-debate text -> debate card view-model. `data` is the
// parsed envelope payload from a trusted mp-mcp tool, so it is narrowed to its
// contract once the shape is known.
export function adaptDebate(data: unknown, sources: Citation[]): DebateViewModel {
  if (isSearch(data)) {
    return {
      mode: 'search',
      totalContributions: data.total_contributions,
      hitCount: data.hits.length,
      hits: data.hits.map((h) => ({
        speaker: h.attributed_to,
        memberName: h.member_name,
        debateTitle: h.debate_title.trim(),
        excerpt: plainText(h.excerpt),
        date: h.date,
        section: h.section,
        house: h.house,
      })),
      sources,
    };
  }

  const d = data as GetDebateData;
  return {
    mode: 'debate',
    title: d.title,
    date: d.date,
    house: d.house,
    location: d.location,
    volume: d.volume,
    contributions: d.contributions.map((c) => ({
      speaker: c.attributed_to ?? '',
      text: plainText(c.text),
    })),
    truncated: d.truncated,
    totalItems: d.total_items,
    sources,
  };
}
