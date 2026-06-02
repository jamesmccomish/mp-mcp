import type { MemberOverviewData, ToolResponse } from '@jamesmccomish/mp-mcp/types';

// Real capture: parliament_member_overview(member_id 4444, detailed) — Karin Smyth,
// MP for Bristol South (postcode BS3 4QH, the "good first demo"). Exercises the
// MemberDetailed variant (thumbnail_url) and an HTML-bearing synopsis. Typed
// against the live tool contract so the fixture fails to compile if the shape drifts.
export const memberOverviewFixture = {
  data: {
    member: {
      id: 4444,
      name: 'Karin Smyth',
      party: 'Labour',
      constituency: 'Bristol South',
      house: 'Commons',
      status: 'current',
      full_title: 'Karin Smyth MP',
      gender: 'F',
      thumbnail_url: 'https://members-api.parliament.uk/api/Members/4444/Thumbnail',
      membership_started: '2015-05-07T00:00:00',
      membership_ended: null,
    },
    synopsis:
      "Karin Smyth is the Labour MP for <a href='/constituency/3950/overview'>Bristol South</a>, and has been an MP continually since 7 May 2015. \r\nShe currently holds the Government post of Minister of State (Department of Health and Social Care).",
    focus: [],
    contact_summary: {
      email: 'karin.smyth.mp@parliament.uk',
      phone: null,
      website: null,
      address: 'House of Commons',
    },
    committees: [
      {
        id: 127,
        name: 'Public Accounts Committee',
        house: 'Commons',
        current_role: 'Member',
        is_chair: false,
      },
      {
        id: 120,
        name: 'Northern Ireland Affairs Committee',
        house: 'Commons',
        current_role: 'Member',
        is_chair: false,
      },
      {
        id: 327,
        name: 'Public Administration and Constitutional Affairs Committee',
        house: 'Commons',
        current_role: 'Member',
        is_chair: false,
      },
      {
        id: 536,
        name: 'Health and Care Bill',
        house: 'Commons',
        current_role: 'Member',
        is_chair: false,
      },
      {
        id: 577,
        name: 'Down Syndrome Bill',
        house: 'Commons',
        current_role: 'Member',
        is_chair: false,
      },
      {
        id: 627,
        name: 'Worker Protection (Amendment of Equality Act 2010) Bill',
        house: 'Commons',
        current_role: 'Member',
        is_chair: false,
      },
    ],
    recent_votes: [
      {
        division_id: 2350,
        division_number: 515,
        house: 'Commons',
        title:
          'Draft Immigration and Asylum (Provision of Accommodation to Failed Asylum-Seekers) (Amendment) Regulations 2026',
        date: '2026-04-28T00:00:00',
        vote: 'aye',
        ayes: 304,
        noes: 28,
        passed: true,
      },
      {
        division_id: 2349,
        division_number: 514,
        house: 'Commons',
        title: 'Draft Asylum Seekers (Reception Conditions) (Amendment) Regulations 2026',
        date: '2026-04-28T00:00:00',
        vote: 'aye',
        ayes: 308,
        noes: 81,
        passed: true,
      },
      {
        division_id: 2347,
        division_number: 512,
        house: 'Commons',
        title: 'Privilege',
        date: '2026-04-28T00:00:00',
        vote: 'no',
        ayes: 223,
        noes: 335,
        passed: false,
      },
      {
        division_id: 2346,
        division_number: 511,
        house: 'Commons',
        title:
          "Children's School and Wellbeing Bill: Amendments (a) to (j) in lieu of Lords Amendments 38V to 38X",
        date: '2026-04-27T00:00:00',
        vote: 'aye',
        ayes: 272,
        noes: 64,
        passed: true,
      },
    ],
    recent_contributions: [
      {
        debate_title: 'Health and Social Care',
        date: '2026-04-28T00:00:00',
        section: 'Written Corrections',
        debate_ext_id: '522291A4-9B42-46C4-B95E-080B9D30022B',
      },
      {
        debate_title: 'Allied Health Professionals',
        date: '2026-04-23T00:00:00',
        section: 'Commons Chamber',
        debate_ext_id: 'C511DBB9-4B06-4497-83F8-F126D21814EF',
      },
      {
        debate_title: 'Maternity Commissioner',
        date: '2026-04-20T00:00:00',
        section: 'Westminster Hall',
        debate_ext_id: 'FD803B26-6F84-45B6-8FFF-7E8E6AB29318',
      },
      {
        debate_title: ' Women’s Health Strategy',
        date: '2026-04-16T00:00:00',
        section: 'Commons Chamber',
        debate_ext_id: '21F892BE-1073-4B6B-9ECC-904D61693EE1',
      },
      {
        debate_title: 'NHS Management',
        date: '2026-04-14T00:00:00',
        section: 'Commons Chamber',
        debate_ext_id: '42E18377-3932-45F7-8BC6-58B689EBF95F',
      },
    ],
    interests: [],
  },
  sources: [
    {
      title: 'Karin Smyth — Member of Parliament',
      url: 'https://members.parliament.uk/member/4444',
    },
    {
      title: 'Public Accounts Committee (Committee)',
      url: 'https://committees.parliament.uk/committee/127',
    },
    {
      title: 'Northern Ireland Affairs Committee (Committee)',
      url: 'https://committees.parliament.uk/committee/120',
    },
    {
      title: 'Public Administration and Constitutional Affairs Committee (Committee)',
      url: 'https://committees.parliament.uk/committee/327',
    },
    {
      title:
        'Division 2350: Draft Immigration and Asylum (Provision of Accommodation to Failed Asylum-Seekers) (Amendment) Regulations 2026',
      url: 'https://votes.parliament.uk/Votes/Commons/Division/2350',
    },
    {
      title:
        'Division 2349: Draft Asylum Seekers (Reception Conditions) (Amendment) Regulations 2026',
      url: 'https://votes.parliament.uk/Votes/Commons/Division/2349',
    },
  ],
} satisfies ToolResponse<MemberOverviewData>;
