import type { SearchHansardData, ToolResponse } from '@jamesmccomish/mp-mcp/types';

// Real capture: parliament_search_hansard("Ukraine"), default (debates) mode,
// 2026-06-03. The tool's default mode searches debate titles via
// /search/debates.json — no member_id supplied — so the payload is the
// metadata-only debate layer chainable to parliament_get_debate.
export const hansardSearchFixture = {
  data: {
    mode: 'debates',
    total: 4,
    debates: [
      {
        title: 'Ukraine: Reconstruction',
        house: 'Commons',
        date: '2026-05-22T00:00:00',
        debate_ext_id: '7B81A6F1-2C44-49E0-B23B-3A87FF1E2D11',
      },
      {
        title: 'Ukraine: Western Military Support',
        house: 'Lords',
        date: '2026-05-14T00:00:00',
        debate_ext_id: '21A5E3B2-99BA-4F0E-A641-9DDC4B6E5F88',
      },
      {
        title: ' Imprisonment of Craig and Lindsay Foreman in Iran ',
        house: 'Commons',
        date: '2026-05-21T00:00:00',
        debate_ext_id: '3D7DD0D7-421A-4BF6-804F-6350FF95124F',
      },
    ],
    contributions: [],
  },
  sources: [
    {
      title: 'Hansard: Ukraine: Reconstruction',
      url: 'https://hansard.parliament.uk/Commons/2026-05-22/debates/7B81A6F1-2C44-49E0-B23B-3A87FF1E2D11/ukraine-reconstruction',
    },
    {
      title: 'Hansard: Ukraine: Western Military Support',
      url: 'https://hansard.parliament.uk/Lords/2026-05-14/debates/21A5E3B2-99BA-4F0E-A641-9DDC4B6E5F88/ukraine-western-military-support',
    },
  ],
} satisfies ToolResponse<SearchHansardData>;

// Real capture shape: parliament_search_hansard("Ukraine", member_id=172),
// member_contributions mode, 2026-06-03. The tool only returns
// contribution-level excerpts when a member_id is supplied, which bounds the
// result set to that one member's record. The first hit carries a
// <span class="column-number"> artifact the adapter must strip.
export const hansardMemberSearchFixture = {
  data: {
    mode: 'member_contributions',
    total: 24,
    debates: [],
    contributions: [
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
    ],
  },
  sources: [
    {
      title: 'Hansard:  Imprisonment of Craig and Lindsay Foreman in Iran',
      url: 'https://hansard.parliament.uk/Commons/2026-05-21/debates/3D7DD0D7-421A-4BF6-804F-6350FF95124F/imprisonment-of-craig-and-lindsay-foreman-in-iran#contribution-BC39CB9D-3F2B-4F43-8866-63356CB366B9',
    },
  ],
} satisfies ToolResponse<SearchHansardData>;
