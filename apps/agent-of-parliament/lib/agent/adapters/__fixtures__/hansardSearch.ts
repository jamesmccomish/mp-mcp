import type { SearchHansardData, ToolResponse } from 'mp-mcp/types';

// Real capture: parliament_search_hansard("Ukraine", section=debates, detailed),
// 2026-05-31 — captured BEFORE the Hansard search-term fix, so the hits and the
// inflated global totals reflect the query term being ignored upstream. What this
// fixture pins for the card layer is the *shape* plus HTML stripping: hit 0's
// excerpt carries a <span class="column-number"> artifact the adapter must strip.
export const hansardSearchFixture = {
  data: {
    total_contributions: 9352318,
    total_written_answers: 4043068,
    total_debates: 1099304,
    hits: [
      {
        member_name: 'Mr Hamish Falconer',
        member_id: 5148,
        attributed_to: 'Mr Falconer',
        debate_title: ' Imprisonment of Craig and Lindsay Foreman in Iran',
        debate_ext_id: '3D7DD0D7-421A-4BF6-804F-6350FF95124F',
        contribution_ext_id: 'BC39CB9D-3F2B-4F43-8866-63356CB366B9',
        excerpt:
          'I can confirm to my hon. and learned Friend and to the House that we are progressing the appointment of an envoy. One of the issues we have sought to navigate in the appointment of an envoy is that the Government and I recognise the responsibilities that the Foreign Secretary and I have to this House and <span id="824" class="column-number" data-column-number="824"></span>to other Members, who wi…',
        date: '2026-05-21T00:00:00',
        house: 'Commons',
        section: 'Commons Chamber',
      },
      {
        member_name: 'Tony Vaughan',
        member_id: 5067,
        attributed_to: 'Tony Vaughan',
        debate_title: ' Imprisonment of Craig and Lindsay Foreman in Iran',
        debate_ext_id: '3D7DD0D7-421A-4BF6-804F-6350FF95124F',
        contribution_ext_id: '578C0A97-FD4C-4850-8607-9025467D97E6',
        excerpt:
          'Does the Minister agree that it is precisely because of the complexity of these cases, which potentially involve numerous different Government Departments, that we need an envoy for complex consular cases, who has not just the resources, but the authority to bring the Government together, and to act proactively to get such cases moving? Can he update the House on where that proposal is at, and wh…',
        date: '2026-05-21T00:00:00',
        house: 'Commons',
        section: 'Commons Chamber',
      },
      {
        member_name: 'Alicia Kearns',
        member_id: 4805,
        attributed_to: 'Alicia Kearns',
        debate_title: ' Imprisonment of Craig and Lindsay Foreman in Iran',
        debate_ext_id: '3D7DD0D7-421A-4BF6-804F-6350FF95124F',
        contribution_ext_id: 'CA612152-98D0-4902-AB0B-E7AEAB068BC9',
        excerpt:
          'The Minister has made the point about public versus private, and what works. The French approach of declaring their person arbitrarily detained worked; they are home. On the point made by my hon. Friend the Member for East Grinstead and Uckfield (Mims Davies), given that the Minister has just recognised that Iranian law does not provide for a fair trial, and that we cannot recognise due process t…',
        date: '2026-05-21T00:00:00',
        house: 'Commons',
        section: 'Commons Chamber',
      },
    ],
  },
  sources: [
    {
      title: 'Hansard:  Imprisonment of Craig and Lindsay Foreman in Iran',
      url: 'https://hansard.parliament.uk/Commons/2026-05-21/debates/3D7DD0D7-421A-4BF6-804F-6350FF95124F/imprisonment-of-craig-and-lindsay-foreman-in-iran#contribution-BC39CB9D-3F2B-4F43-8866-63356CB366B9',
    },
    {
      title: 'Hansard:  Imprisonment of Craig and Lindsay Foreman in Iran',
      url: 'https://hansard.parliament.uk/Commons/2026-05-21/debates/3D7DD0D7-421A-4BF6-804F-6350FF95124F/imprisonment-of-craig-and-lindsay-foreman-in-iran#contribution-578C0A97-FD4C-4850-8607-9025467D97E6',
    },
    {
      title: 'Hansard:  Imprisonment of Craig and Lindsay Foreman in Iran',
      url: 'https://hansard.parliament.uk/Commons/2026-05-21/debates/3D7DD0D7-421A-4BF6-804F-6350FF95124F/imprisonment-of-craig-and-lindsay-foreman-in-iran#contribution-CA612152-98D0-4902-AB0B-E7AEAB068BC9',
    },
  ],
} satisfies ToolResponse<SearchHansardData>;
