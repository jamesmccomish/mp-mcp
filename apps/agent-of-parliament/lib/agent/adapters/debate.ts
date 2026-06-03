import type {
  Citation,
  GetDebateData,
  House,
  SearchHansardData,
} from '@jamesmccomish/mp-mcp/types';
import { plainText } from './html';

export interface DebateContributionHit {
  speaker: string;
  memberName: string;
  debateTitle: string;
  excerpt: string;
  date: string;
  section: string;
  house: House;
}

export interface DebateTitleHit {
  title: string;
  date: string;
  house: House;
  debateExtId: string;
}

export interface DebateExcerpt {
  speaker: string;
  text: string;
}

export interface DebateSearchViewModel {
  mode: 'search';
  // Which Hansard layer was searched. `debates` is title-only metadata for topic
  // discovery; `member_contributions` is one member's speeches/answers.
  searchMode: 'debates' | 'member_contributions';
  total: number;
  hitCount: number;
  debates: DebateTitleHit[];
  contributions: DebateContributionHit[];
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

// parliament_search_hansard payloads carry a `mode` discriminator; parliament_get_debate
// returns a single debate with `contributions` (a flat array of excerpts) and no `mode`.
// Presence of `mode` is what tells us which tool produced the data.
function isSearch(data: unknown): data is SearchHansardData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'mode' in data &&
    ((data as { mode: unknown }).mode === 'debates' ||
      (data as { mode: unknown }).mode === 'member_contributions')
  );
}

// search-hit list OR single-debate text -> debate card view-model. `data` is the
// parsed envelope payload from a trusted mp-mcp tool, so it is narrowed to its
// contract once the shape is known.
export function adaptDebate(data: unknown, sources: Citation[]): DebateViewModel {
  if (isSearch(data)) {
    const contributions: DebateContributionHit[] = data.contributions.map((h) => ({
      speaker: h.attributed_to,
      memberName: h.member_name,
      debateTitle: h.debate_title.trim(),
      excerpt: plainText(h.excerpt),
      date: h.date,
      section: h.section,
      house: h.house,
    }));
    const debates: DebateTitleHit[] = data.debates.map((d) => ({
      title: d.title.trim(),
      date: d.date,
      house: d.house,
      debateExtId: d.debate_ext_id,
    }));
    return {
      mode: 'search',
      searchMode: data.mode,
      total: data.total,
      hitCount: data.mode === 'debates' ? debates.length : contributions.length,
      debates,
      contributions,
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
