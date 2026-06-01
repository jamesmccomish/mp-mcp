import type { ToolResponse, TopicTrackerData } from 'mp-mcp/types';

// Representative parliament_topic_tracker(detailed) capture for "NHS waiting lists":
// one bill plus one enacted Act, two debates across both Houses, two divisions,
// two written questions (one unanswered), and two open petitions already sorted by
// signature count. Detailed-mode chaining fields (division_id, debate_ext_id, uin,
// asking_member_id, current_house, last_update, state, created_at) are present so
// the fixture exercises the full envelope; the adapter ignores the ones it doesn't
// surface. Typed against the live tool contract so it fails to compile on drift.
export const topicTrackerFixture = {
  data: {
    topic: 'NHS waiting lists',
    window: { from: '2025-12-02', to: '2026-05-31' },
    bills_in_progress: [
      {
        id: 3801,
        short_title: 'NHS (Waiting Times Targets) Bill',
        current_stage: '2nd reading',
        is_act: false,
        current_house: 'Commons',
        last_update: '2026-05-12T11:04:00',
      },
      {
        id: 3702,
        short_title: 'Health and Care (Amendment) Act 2026',
        current_stage: 'Royal Assent',
        is_act: true,
        current_house: 'Unassigned',
        last_update: '2026-03-18T16:20:00',
      },
    ],
    recent_debates: [
      {
        title: 'NHS Waiting Lists',
        house: 'Commons',
        date: '2026-05-19T00:00:00',
        debate_ext_id: 'A1B2C3D4-0000-1111-2222-333344445555',
      },
      {
        title: 'Elective Care Recovery Plan',
        house: 'Lords',
        date: '2026-04-22T00:00:00',
        debate_ext_id: 'B2C3D4E5-1111-2222-3333-444455556666',
      },
    ],
    recent_votes: [
      {
        title: 'Opposition Day: NHS Performance',
        date: '2026-03-10T17:42:00',
        ayes: 198,
        noes: 340,
        division_id: 2210,
        number: 301,
      },
      {
        title: 'Health Service Funding',
        date: '2026-02-04T16:08:00',
        ayes: 210,
        noes: 322,
        division_id: 2188,
        number: 284,
      },
    ],
    recent_written_questions: [
      {
        house: 'Commons',
        date_tabled: '2026-05-20T00:00:00',
        question:
          'To ask the Secretary of State for Health and Social Care, what steps her Department is taking to reduce the number of patients waiting more than 52 weeks for elective treatment.',
        answered: true,
        uin: '4821',
        asking_member_id: 5010,
      },
      {
        house: 'Commons',
        date_tabled: '2026-05-18T00:00:00',
        question:
          'To ask the Secretary of State for Health and Social Care, what assessment she has made of the impact of diagnostic capacity on cancer waiting times.',
        answered: false,
        uin: '4799',
        asking_member_id: 5221,
      },
    ],
    active_petitions: [
      {
        id: 760112,
        action: 'Increase NHS funding to clear the elective care backlog within two years',
        signature_count: 184302,
        state: 'open',
        created_at: '2026-01-14T09:30:00.000Z',
      },
      {
        id: 758904,
        action: 'Guarantee a maximum 18-week wait for routine hospital treatment',
        signature_count: 96741,
        state: 'open',
        created_at: '2026-02-27T12:11:00.000Z',
      },
    ],
  },
  sources: [
    {
      title: 'Bill: NHS (Waiting Times Targets) Bill',
      url: 'https://bills.parliament.uk/bills/3801',
    },
    {
      title: 'Hansard: NHS Waiting Lists',
      url: 'https://hansard.parliament.uk/Commons/2026-05-19/debates/A1B2C3D4-0000-1111-2222-333344445555/nhs-waiting-lists',
    },
    {
      title: 'Division 2210: Opposition Day: NHS Performance',
      url: 'https://votes.parliament.uk/Votes/Commons/Division/2210',
    },
    {
      title: 'Petition: Increase NHS funding to clear the elective care backlog within two years',
      url: 'https://petition.parliament.uk/petitions/760112',
    },
  ],
} satisfies ToolResponse<TopicTrackerData>;
