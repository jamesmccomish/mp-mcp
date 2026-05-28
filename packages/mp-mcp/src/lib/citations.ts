import type { Citation, House } from '../domain/citation.js';

const MEMBERS_BASE = 'https://members.parliament.uk';
const HANSARD_BASE = 'https://hansard.parliament.uk';
const VOTES_BASE = 'https://votes.parliament.uk/Votes';
const BILLS_BASE = 'https://bills.parliament.uk/bills';
const COMMITTEES_BASE = 'https://committees.parliament.uk/committee';
const PETITIONS_BASE = 'https://petition.parliament.uk/petitions';

export const Citations = {
  member(id: number, displayName: string): Citation {
    return {
      title: `${displayName} — Member of Parliament`,
      url: `${MEMBERS_BASE}/member/${id}`,
    };
  },

  constituency(id: number, name: string): Citation {
    return {
      title: `${name} — Constituency`,
      url: `${MEMBERS_BASE}/constituency/${id}`,
    };
  },

  division(house: House, divisionId: number, title?: string): Citation {
    const housePath = house === 'Commons' ? 'Commons' : 'Lords';
    return {
      title: title ? `Division ${divisionId}: ${title}` : `${house} Division ${divisionId}`,
      url: `${VOTES_BASE}/${housePath}/Division/${divisionId}`,
    };
  },

  bill(id: number, shortTitle: string): Citation {
    return {
      title: `Bill: ${shortTitle}`,
      url: `${BILLS_BASE}/${id}`,
    };
  },

  committee(id: number, name: string): Citation {
    return {
      title: `${name} (Committee)`,
      url: `${COMMITTEES_BASE}/${id}`,
    };
  },

  petition(id: number, title: string): Citation {
    return {
      title: `Petition: ${title}`,
      url: `${PETITIONS_BASE}/${id}`,
    };
  },

  hansardDebate(house: House, date: string, debateExtId: string, title: string): Citation {
    const housePath = house === 'Commons' ? 'Commons' : 'Lords';
    return {
      title: `Hansard: ${title}`,
      url: `${HANSARD_BASE}/${housePath}/${date}/debates/${debateExtId}/${slugify(title)}`,
    };
  },

  hansardContribution(
    house: House,
    date: string,
    debateExtId: string,
    title: string,
    contributionId: string,
  ): Citation {
    const debate = Citations.hansardDebate(house, date, debateExtId, title);
    return {
      title: debate.title,
      url: `${debate.url}#contribution-${contributionId}`,
    };
  },

  hansardSearch(query: string): Citation {
    const params = new URLSearchParams({ searchTerm: query });
    return {
      title: `Hansard search: ${query}`,
      url: `${HANSARD_BASE}/search?${params.toString()}`,
    };
  },

  writtenQuestion(uin: string): Citation {
    return {
      title: `Written Question ${uin}`,
      url: `https://questions-statements.parliament.uk/written-questions/detail/${uin}`,
    };
  },
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}
